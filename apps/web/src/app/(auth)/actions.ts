'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/login?error=Could not authenticate user')
    }

    const { data: { user } } = await supabase.auth.getUser()
    const role = user?.user_metadata?.role

    if (role === 'hotel-staff') {
        redirect('/hotel-dashboard')
    } else if (role === 'tour-guide') {
        redirect('/tour-dashboard')
    }

    // Default redirect
    redirect('/dashboard')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    // Extract all fields
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('fullName') as string
    const userRole = formData.get('userRole') as string

    // Hotel manager specific fields
    const hotelName = formData.get('hotelName') as string | null
    const hotelAddress = formData.get('hotelAddress') as string | null

    // Sign up user via Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                role: userRole,
            }
        }
    })

    // Notice: For production, we should handle storing the Hotel specific data in a separate 'hotels' table 
    // or a extended 'user_profiles' table after the auth user is created.
    // We also need to handle the File uploads (exterior/interior pics) into a Supabase Storage Bucket.

    if (authError) {
        redirect(`/signup?error=${authError.message}`)
    }

    // If role is Hotel Manager, we need to handle the extra metadata/files.
    if (userRole === 'hotel-staff' && authData.user) {
        // 1. Upload files to Storage
        const exteriorPics = formData.getAll('exteriorPics') as File[]
        const interiorPics = formData.getAll('interiorPics') as File[]

        // We will need a bucket named 'hotel-images' 
        const uploadPromises = [...exteriorPics, ...interiorPics].map(async (file) => {
            if (file.size > 0) {
                const fileExt = file.name.split('.').pop()
                const fileName = `${authData.user!.id}/${Math.random()}.${fileExt}`
                await supabase.storage.from('hotel-images').upload(fileName, file)
                // In a real app we'd save the URL to the db
            }
        })

        await Promise.all(uploadPromises)

        // 2. Insert into a hypothetical 'hotels' table (Assuming it exists via migration)
        const { error: dbError } = await supabase.from('hotels').insert({
            owner_id: authData.user.id,
            name: hotelName,
            address: hotelAddress,
        })

        if (dbError) {
            console.error("Failed to insert hotel data:", dbError)
        }
    }

    if (userRole === 'hotel-staff') {
        redirect('/hotel-dashboard?message=Check your email to confirm your account')
    } else if (userRole === 'tour-guide') {
        redirect('/tour-dashboard?message=Check your email to confirm your account')
    } else {
        redirect('/dashboard?message=Check your email to confirm your account')
    }
}
