'use client';

import {
    Compass,
    Home,
    Luggage,
    MessageSquare,
    MapPin
} from 'lucide-react';
import SearchWidget from '@/components/traveler/SearchWidget';
import MapWrapper from '@/components/traveler/MapWrapper';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function TravelerDashboard() {
    const [userName, setUserName] = useState<string>('');
    const router = useRouter();

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/login');
    };

    useEffect(() => {
        async function getUserSession() {
            const supabase = createClient();
            const { data: { session } } = await supabase.auth.getSession();

            if (session?.user?.user_metadata?.full_name) {
                setUserName(session.user.user_metadata.full_name);
            }
        }
        getUserSession();
    }, []);

    // Use a fallback or split first name for UI
    const displayName = userName || 'Guest';
    const firstName = displayName.split(' ')[0];
    const initial = displayName.charAt(0).toUpperCase();

    return (
        <div className="flex min-h-screen bg-slate-50 font-display text-slate-900">

            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-200 flex flex-col bg-white sticky top-0 h-screen hidden md:flex">
                <div className="p-6 flex items-center gap-3">
                    <div className="bg-[#00AEEF] p-2 rounded-lg text-white shadow-md shadow-sky-200">
                        <Compass className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="font-bold text-xl tracking-tight leading-none text-slate-800">Navitra</h1>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1.5 mt-4">
                    <a className="flex items-center gap-3 px-3 py-3 rounded-lg bg-sky-50 text-[#00AEEF] font-semibold" href="#">
                        <Home className="w-5 h-5" />
                        <span>Home</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors" href="/trips">
                        <Luggage className="w-5 h-5" />
                        <span>My Trips</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors" href="/explore">
                        <MapPin className="w-5 h-5" />
                        <span>Explore</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors" href="/messages">
                        <MessageSquare className="w-5 h-5" />
                        <span>Messages</span>
                    </a>
                </nav>

                {/* User Profile Footer */}
                <div className="p-4 mt-auto border-t border-slate-100 bg-white">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors group">
                        <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center overflow-hidden border border-sky-200 shrink-0">
                            <div className="w-full h-full text-[#00AEEF] flex items-center justify-center font-bold text-lg">{initial}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-800 truncate">{displayName}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Log Out"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">

                {/* Dashboard Content */}
                <div className="p-8 max-w-6xl mx-auto w-full flex flex-col gap-10">

                    {/* Top Section: Greeting & Search Widget */}
                    <section className="space-y-6 pt-6">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-2">Welcome back, {firstName}</h2>
                            <p className="text-slate-500 font-medium">Where would you like to go next? Book your next trip with Navitra.</p>
                        </div>
                        {/* The MakeMyTrip style Widget */}
                        <div className="pb-4">
                            <SearchWidget />
                        </div>
                    </section>

                    {/* Map Section */}
                    <section className="flex flex-col h-[500px] mb-12">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                                <MapPin className="text-[#00AEEF] bg-sky-100 p-1.5 rounded-lg w-8 h-8" />
                                Interactive Route Map
                            </h3>
                        </div>

                        <div className="w-full h-full bg-white rounded-3xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                            <MapWrapper />
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
}
