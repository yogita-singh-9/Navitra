-- Create custom types for user roles
CREATE TYPE user_role AS ENUM ('traveler', 'hotel-staff', 'tour-guide', 'admin');

-- Create a public profiles table that ties to auth.users
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'traveler',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own profile
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

-- Trigger to automatically create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'full_name', 
    (NEW.raw_user_meta_data->>'role')::user_role
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- Create the hotels table
CREATE TABLE public.hotels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  manager_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  -- Assuming we store an array of storage bucket file paths or URLs
  exterior_images TEXT[] DEFAULT '{}',
  interior_images TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for hotels
ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;

-- Allow public read access to hotels
CREATE POLICY "Hotels are viewable by everyone" 
ON public.hotels FOR SELECT 
USING (true);

-- Allow hotel managers to insert/update their own hotels
CREATE POLICY "Managers can insert their hotels" 
ON public.hotels FOR INSERT 
WITH CHECK (auth.uid() = manager_id);

CREATE POLICY "Managers can update their hotels" 
ON public.hotels FOR UPDATE 
USING (auth.uid() = manager_id);


-- Create the storage bucket for hotel images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('hotel-images', 'hotel-images', true);

-- Policy to allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'hotel-images' 
  AND auth.role() = 'authenticated'
);

-- Policy to allow public viewing of hotel images
CREATE POLICY "Public can view hotel images"
ON storage.objects FOR SELECT
USING (bucket_id = 'hotel-images');
