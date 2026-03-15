'use client';

import { useState, useEffect } from 'react';
import {
    Compass,
    Home,
    Luggage,
    MapPin,
    MessageSquare,
    Plane,
    Bed,
    ArrowRight,
    MapPin as MapPinDrop,
    Plus,
    Minus
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function TravelerTrips() {
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

    const displayName = userName || 'Guest User';
    const initial = displayName.charAt(0).toUpperCase();

    return (
        <div className="flex h-screen bg-slate-50 font-display text-slate-900 overflow-hidden">

            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-200 flex flex-col bg-white sticky top-0 h-screen hidden md:flex shrink-0">
                <div className="p-6 flex items-center gap-3">
                    <div className="bg-[#00AEEF] p-2 rounded-lg text-white shadow-md shadow-sky-200">
                        <Compass className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="font-bold text-xl tracking-tight leading-none text-slate-800">Navitra</h1>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1.5 mt-4">
                    <a className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors" href="/dashboard">
                        <Home className="w-5 h-5" />
                        <span>Home</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-3 rounded-lg bg-sky-50 text-[#00AEEF] font-semibold" href="/trips">
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
                            <p className="text-[10px] text-slate-500 font-medium tracking-wide">Premium Member</p>
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

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="max-w-7xl mx-auto p-8 lg:p-12">

                    {/* Header */}
                    <header className="mb-10">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">My Trip History</h1>
                        <p className="text-slate-500 font-medium">Manage your past adventures and explore new personalized recommendations.</p>
                    </header>

                    <div className="flex flex-col lg:flex-row gap-10">

                        {/* Left Column: Timeline & Recommendations */}
                        <div className="flex-1 space-y-12 max-w-4xl">

                            {/* Recent History Timeline */}
                            <section>
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-bold text-slate-900">Recent History</h2>
                                    <div className="flex items-center gap-3">
                                        <button className="px-5 py-2 rounded-full border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors bg-white">All Types</button>
                                        <button className="px-5 py-2 rounded-full border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors bg-white">2023</button>
                                    </div>
                                </div>

                                <div className="relative pl-6 sm:pl-10 space-y-10">
                                    {/* Vertical Line */}
                                    <div className="absolute left-[11px] top-6 bottom-0 w-px bg-slate-200"></div>

                                    {/* Trip 1 */}
                                    <div className="relative">
                                        <div className="absolute -left-10 sm:-left-14 top-8 w-6 h-6 rounded-full bg-white border-4 border-white shadow-sm flex items-center justify-center z-10">
                                            <div className="w-3.5 h-3.5 bg-[#00AEEF] rounded-full"></div>
                                        </div>

                                        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col sm:flex-row gap-6">
                                            <div className="w-full sm:w-48 h-32 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                                                <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80" alt="Tokyo" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <span className="text-[10px] font-bold text-[#00AEEF] tracking-widest uppercase mb-1 block">FEB 2024</span>
                                                        <h3 className="text-xl font-bold text-slate-900">San Francisco to Tokyo</h3>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase block mb-1">SPENDING</span>
                                                        <p className="text-xl font-black text-slate-900">₹2,65,000</p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-3 mt-4 sm:mt-0">
                                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
                                                        <Plane className="w-4 h-4 text-slate-400" />
                                                        <span className="text-xs font-semibold text-slate-600">JL757</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
                                                        <Bed className="w-4 h-4 text-slate-400" />
                                                        <span className="text-xs font-semibold text-slate-600">Park Hyatt Tokyo</span>
                                                    </div>
                                                </div>

                                                <div className="mt-6 sm:mt-auto">
                                                    <button className="bg-[#00AEEF] hover:bg-sky-400 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors w-full sm:w-auto text-center">
                                                        Repeat Trip
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Trip 2 */}
                                    <div className="relative">
                                        <div className="absolute -left-10 sm:-left-14 top-8 w-6 h-6 rounded-full bg-white border-4 border-white shadow-sm flex items-center justify-center z-10">
                                            <div className="w-3.5 h-3.5 bg-slate-300 rounded-full"></div>
                                        </div>

                                        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col sm:flex-row gap-6">
                                            <div className="w-full sm:w-48 h-32 rounded-xl overflow-hidden shrink-0 bg-slate-100 grayscale hover:grayscale-0 transition-all duration-500">
                                                <img src="https://images.unsplash.com/photo-1513635269975-5969336cd7ce?auto=format&fit=crop&q=80" alt="London" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1 block">NOV 2023</span>
                                                        <h3 className="text-xl font-bold text-slate-900">New York to London</h3>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase block mb-1">SPENDING</span>
                                                        <p className="text-xl font-black text-slate-900">₹1,80,000</p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-3 mt-4 sm:mt-0">
                                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
                                                        <Plane className="w-4 h-4 text-slate-400" />
                                                        <span className="text-xs font-semibold text-slate-600">BA112</span>
                                                    </div>
                                                </div>

                                                <div className="mt-6 sm:mt-auto flex justify-end w-full">
                                                    <button className="bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 px-6 py-2.5 rounded-xl text-sm font-bold transition-colors w-full sm:w-auto text-center">
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </section>

                            <hr className="border-slate-200" />

                            {/* AI Recommendations */}
                            <section>
                                <div className="flex items-end justify-between mb-8">
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900">Based on your history</h2>
                                        <p className="text-sm text-slate-500 font-medium mt-1">Recommended for you by AI</p>
                                    </div>
                                    <button className="text-[#00AEEF] font-bold text-sm hover:text-sky-600 flex items-center gap-2 transition-colors">
                                        View All Recommendations <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {/* Recommendation 1 */}
                                    <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group hover:shadow-lg transition-shadow">
                                        <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-200 mb-5">
                                            <img src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80" alt="Sydney" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-xs font-black text-[#00AEEF] shadow-sm tracking-wide">
                                                98% Match
                                            </div>
                                        </div>
                                        <div className="px-2">
                                            <h3 className="text-xl font-bold text-slate-900 mb-2">Sydney, Australia</h3>
                                            <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6 line-clamp-2">
                                                Similar to your Tokyo trip, Sydney offers vibrant urban culture and world-class culinary experiences with stunning coastal views.
                                            </p>
                                            <button className="w-full bg-[#00AEEF] hover:bg-sky-400 text-white py-3.5 rounded-xl font-bold transition-colors shadow-sm">
                                                Explore Destination
                                            </button>
                                        </div>
                                    </div>

                                    {/* Recommendation 2 */}
                                    <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group hover:shadow-lg transition-shadow">
                                        <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-200 mb-5">
                                            <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80" alt="Kyoto" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-xs font-black text-emerald-500 shadow-sm tracking-wide">
                                                92% Match
                                            </div>
                                        </div>
                                        <div className="px-2">
                                            <h3 className="text-xl font-bold text-slate-900 mb-2">Kyoto, Japan</h3>
                                            <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6 line-clamp-2">
                                                Since you enjoyed San Francisco and Tokyo, we think you'll appreciate the historical depth and peaceful gardens of Kyoto.
                                            </p>
                                            <button className="w-full bg-[#00AEEF] hover:bg-sky-400 text-white py-3.5 rounded-xl font-bold transition-colors shadow-sm">
                                                Explore Destination
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>

                        </div>

                        {/* Right Column: Widgets */}
                        <div className="w-full lg:w-[320px] xl:w-[380px] shrink-0 space-y-8">

                            {/* Interactive Route Map Widget */}
                            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                                <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-5">
                                    <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-[#00AEEF]">
                                        <MapPinDrop className="w-4 h-4" />
                                    </div>
                                    Interactive Route Map
                                </h3>

                                <div className="bg-slate-300 rounded-2xl h-48 mb-6 relative overflow-hidden group">
                                    <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80" alt="World Map" className="w-full h-full object-cover mix-blend-multiply opacity-70 group-hover:scale-105 transition-transform duration-1000" />

                                    {/* Mock Map Pins */}
                                    <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-[#00AEEF] rounded-full border-2 border-white shadow-md"></div>
                                    <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-[#00AEEF] rounded-full border-2 border-white shadow-md"></div>
                                    <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-[#00AEEF] rounded-full border-2 border-white shadow-md"></div>

                                    {/* Map Controls */}
                                    <div className="absolute top-3 left-3 bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                                        <button className="p-1.5 hover:bg-slate-50 border-b border-slate-200 text-slate-600"><Plus className="w-4 h-4" /></button>
                                        <button className="p-1.5 hover:bg-slate-50 text-slate-600"><Minus className="w-4 h-4" /></button>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium">Total Distance Traveled</span>
                                        <span className="font-bold text-slate-900">24,580 km</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium">Countries Visited</span>
                                        <span className="font-bold text-slate-900">12</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium">Carbon Offset</span>
                                        <span className="font-bold text-emerald-500">1.2 Tons CO₂</span>
                                    </div>
                                </div>

                                <button className="w-full bg-white border-2 border-[#00AEEF] text-[#00AEEF] hover:bg-sky-50 py-3 rounded-xl font-bold transition-colors">
                                    Download Travel Map
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </main>

        </div>
    );
}
