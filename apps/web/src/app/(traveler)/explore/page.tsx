'use client';

import { useState, useEffect } from 'react';
import {
    Compass,
    Home,
    Luggage,
    MapPin,
    MessageSquare,
    ChevronLeft,
    ChevronRight,
    Heart,
    ArrowRight,
    ArrowUpRight,
    Star,
    Flame,
    Users
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function TravelerExplore() {
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
                    <a className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors" href="/trips">
                        <Luggage className="w-5 h-5" />
                        <span>My Trips</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-3 rounded-lg bg-sky-50 text-[#00AEEF] font-semibold" href="/explore">
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

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto">
                <div className="max-w-[1200px] mx-auto p-6 md:p-10 lg:p-12 space-y-16">

                    {/* SEO Heading Screen Reader Only */}
                    <h1 className="sr-only">Explore Destinations on Navitra</h1>

                    {/* Hero Banner Section */}
                    <section className="relative w-full h-[32rem] sm:h-[36rem] rounded-3xl overflow-hidden shadow-xl group">
                        <img
                            src="https://images.unsplash.com/photo-1516483638261-f4dafaf00bc6?auto=format&fit=crop&q=80"
                            alt="The Timeless Elegance of Amalfi Coast"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[20s] ease-linear"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/30 to-transparent"></div>

                        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col justify-end h-full">
                            <div className="max-w-2xl">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00AEEF] text-white text-[11px] font-black uppercase tracking-widest shadow-sm mb-6">
                                    <Flame className="w-3.5 h-3.5" />
                                    Trending Now
                                </span>
                                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-4 drop-shadow-md">
                                    The Timeless Elegance of Amalfi Coast
                                </h1>
                                <p className="text-slate-200 text-lg md:text-xl font-medium leading-relaxed mb-8 max-w-xl drop-shadow-sm">
                                    Experience the pinnacle of Mediterranean luxury where turquoise waters meet dramatic limestone cliffs.
                                </p>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                    <button className="bg-[#00AEEF] hover:bg-sky-400 text-white px-8 py-3.5 rounded-xl text-base font-bold shadow-lg shadow-sky-500/30 transition-all transform hover:scale-105">
                                        Explore Now
                                    </button>
                                    <div className="flex items-center gap-3">
                                        <div className="flex -space-x-2">
                                            <div className="w-8 h-8 rounded-full border-2 border-[#1E293B] overflow-hidden"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&q=80" alt="User" /></div>
                                            <div className="w-8 h-8 rounded-full border-2 border-[#1E293B] overflow-hidden"><img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&q=80" alt="User" /></div>
                                            <div className="w-8 h-8 rounded-full border-2 border-[#1E293B] bg-slate-800 flex items-center justify-center text-xs font-bold text-white"><Users className="w-3.5 h-3.5" /></div>
                                        </div>
                                        <span className="text-sm font-semibold text-slate-300 drop-shadow-md">Over <span className="text-white">50k+</span> booked this month</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Controls */}
                        <div className="absolute right-8 md:right-12 bottom-8 md:bottom-12 flex gap-3">
                            <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-slate-900 transition-colors shadow-lg">
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-slate-900 transition-colors shadow-lg">
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </section>

                    {/* Curated Packages */}
                    <section>
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Curated Packages</h2>
                                <p className="text-slate-500 font-medium mt-1 text-lg">Hand-picked experiences with exclusive Navitra benefits.</p>
                            </div>
                            <button className="text-[#00AEEF] font-bold text-sm hover:text-sky-600 flex items-center gap-1.5 transition-colors">
                                View all <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Card 1 */}
                            <div className="bg-white rounded-[2rem] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 group hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
                                <div className="relative h-64 rounded-3xl overflow-hidden mb-6">
                                    <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80" alt="Kyoto" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                                        All-Inclusive
                                    </div>
                                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/95 backdrop-blur rounded-full flex items-center justify-center shadow-sm text-slate-400 hover:text-rose-500 transition-colors">
                                        <Heart className="w-5 h-5 fill-current" />
                                    </div>
                                </div>
                                <div className="px-3 pb-3">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-slate-900">Zen in Kyoto</h3>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Star className="w-3.5 h-3.5 fill-[#00AEEF] text-[#00AEEF]" />
                                            <span className="text-sm font-bold text-[#00AEEF]">4.9</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                                        7 Days • 5-Star Boutique Ryokan • Private Temple Access
                                    </p>
                                    <div className="flex items-end justify-between pt-4 border-t border-slate-100">
                                        <div>
                                            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-0.5 block">STARTING AT</span>
                                            <div className="flex items-end gap-1">
                                                <span className="text-2xl font-black text-slate-900 leading-none">₹2,70,000</span>
                                                <span className="text-sm font-medium text-slate-500 mb-0.5">/pp</span>
                                            </div>
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-sky-50 text-[#00AEEF] flex items-center justify-center group-hover:bg-[#00AEEF] group-hover:text-white transition-colors">
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white rounded-[2rem] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 group hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
                                <div className="relative h-64 rounded-3xl overflow-hidden mb-6">
                                    <img src="https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=600&q=80" alt="Santorini" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                                        All-Inclusive
                                    </div>
                                    <div className="absolute top-4 right-4 w-10 h-10 bg-[#1E293B] backdrop-blur rounded-full flex items-center justify-center shadow-sm text-rose-500">
                                        <Heart className="w-5 h-5 fill-current" />
                                    </div>
                                </div>
                                <div className="px-3 pb-3">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-slate-900">Santorini Escape</h3>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Star className="w-3.5 h-3.5 fill-[#00AEEF] text-[#00AEEF]" />
                                            <span className="text-sm font-bold text-[#00AEEF]">4.8</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                                        5 Days • Infinity Pool Suite • Sunset Cruise Included
                                    </p>
                                    <div className="flex items-end justify-between pt-4 border-t border-slate-100">
                                        <div>
                                            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-0.5 block">STARTING AT</span>
                                            <div className="flex items-end gap-1">
                                                <span className="text-2xl font-black text-slate-900 leading-none">₹2,35,000</span>
                                                <span className="text-sm font-medium text-slate-500 mb-0.5">/pp</span>
                                            </div>
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-sky-50 text-[#00AEEF] flex items-center justify-center group-hover:bg-[#00AEEF] group-hover:text-white transition-colors">
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white rounded-[2rem] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 group hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
                                <div className="relative h-64 rounded-3xl overflow-hidden mb-6">
                                    <img src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80" alt="Maldives" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                                        All-Inclusive
                                    </div>
                                    <div className="absolute top-4 right-4 w-10 h-10 bg-[#1E293B] backdrop-blur rounded-full flex items-center justify-center shadow-sm text-rose-500">
                                        <Heart className="w-5 h-5 fill-current" />
                                    </div>
                                </div>
                                <div className="px-3 pb-3">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-slate-900">Maldives Serenity</h3>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Star className="w-3.5 h-3.5 fill-[#00AEEF] text-[#00AEEF]" />
                                            <span className="text-sm font-bold text-[#00AEEF]">5.0</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                                        10 Days • Private Island • Underwater Dining
                                    </p>
                                    <div className="flex items-end justify-between pt-4 border-t border-slate-100">
                                        <div>
                                            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-0.5 block">STARTING AT</span>
                                            <div className="flex items-end gap-1">
                                                <span className="text-2xl font-black text-slate-900 leading-none">₹4,50,000</span>
                                                <span className="text-sm font-medium text-slate-500 mb-0.5">/pp</span>
                                            </div>
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-sky-50 text-[#00AEEF] flex items-center justify-center group-hover:bg-[#00AEEF] group-hover:text-white transition-colors">
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Flash Sale Banner */}
                    <section className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
                        {/* Abstract dark decor */}
                        <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#00AEEF]/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10 flex-1">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/20 text-orange-500 text-[11px] font-black uppercase tracking-widest rounded-full mb-6 border border-orange-500/30">
                                <Flame className="w-3.5 h-3.5" />
                                Flash Sale
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
                                Escape for less this Summer
                            </h2>
                            <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-lg">
                                Unlock up to <span className="text-orange-500 font-bold">30% Off</span> on select premium destinations. Offer expires in 48 hours.
                            </p>
                        </div>

                        <div className="relative z-10 w-full md:w-auto shrink-0 flex flex-col sm:flex-row md:flex-col lg:flex-row items-center gap-4 bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10">
                            <div className="bg-white rounded-2xl px-8 py-4 text-center w-full sm:w-auto">
                                <span className="block text-[10px] font-black text-slate-400 tracking-widest uppercase mb-1">PROMO CODE</span>
                                <span className="block text-2xl font-black text-[#00AEEF] tracking-wide">NAVITRA30</span>
                            </div>
                            <button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-5 rounded-2xl font-black text-lg shadow-lg shadow-orange-500/20 transition-all transform hover:-translate-y-0.5">
                                Claim Discount
                            </button>
                        </div>
                    </section>

                    {/* Hidden Gems Carousel */}
                    <section>
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Hidden Gems</h2>
                                <p className="text-slate-500 font-medium mt-1 text-lg">Discover the world's most breathtaking off-the-beaten-path locations.</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="w-10 h-10 rounded-full border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-50 hover:text-slate-900 transition-colors">
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button className="w-10 h-10 rounded-full border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-50 hover:text-slate-900 transition-colors">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Gem 1 */}
                            <div className="relative h-80 rounded-[2rem] overflow-hidden group cursor-pointer shadow-md shadow-slate-200/50">
                                <img src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80" alt="Ha Long Bay" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                                <div className="absolute top-5 left-5 bg-[#00AEEF] px-3 py-1.5 rounded-full text-[11px] font-black text-white tracking-wide shadow-sm">
                                    Newly Added
                                </div>
                                <div className="absolute bottom-5 left-5 right-5">
                                    <h3 className="text-2xl font-bold text-white mb-1">Ha Long Bay</h3>
                                    <p className="text-sm font-medium text-slate-300">Vietnam • Remote Luxury</p>
                                </div>
                            </div>

                            {/* Gem 2 */}
                            <div className="relative h-80 rounded-[2rem] overflow-hidden group cursor-pointer shadow-md shadow-slate-200/50">
                                <img src="https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=600&q=80" alt="Lake Bled" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                                <div className="absolute top-5 left-5 bg-[#00AEEF] px-3 py-1.5 rounded-full text-[11px] font-black text-white tracking-wide shadow-sm">
                                    Newly Added
                                </div>
                                <div className="absolute bottom-5 left-5 right-5">
                                    <h3 className="text-2xl font-bold text-white mb-1">Lake Bled</h3>
                                    <p className="text-sm font-medium text-slate-300">Slovenia • Alpine Serenity</p>
                                </div>
                            </div>

                            {/* Gem 3 */}
                            <div className="relative h-80 rounded-[2rem] overflow-hidden group cursor-pointer shadow-md shadow-slate-200/50">
                                <img src="https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&q=80" alt="Cappadocia" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                                <div className="absolute top-5 left-5 bg-[#00AEEF] px-3 py-1.5 rounded-full text-[11px] font-black text-white tracking-wide shadow-sm">
                                    Newly Added
                                </div>
                                <div className="absolute bottom-5 left-5 right-5">
                                    <h3 className="text-2xl font-bold text-white mb-1">Cappadocia</h3>
                                    <p className="text-sm font-medium text-slate-300">Turkey • Surreal Landscapes</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Trust & Stats Footer */}
                    <section className="bg-white rounded-[2rem] p-10 lg:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col xl:flex-row items-center justify-between gap-12">

                        <div className="flex-1 max-w-xl text-center xl:text-left">
                            <div className="flex items-center justify-center xl:justify-start -space-x-3 mb-6">
                                <div className="w-12 h-12 rounded-full border-4 border-white shadow-sm overflow-hidden z-30"><img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=64&q=80" alt="User" /></div>
                                <div className="w-12 h-12 rounded-full border-4 border-white shadow-sm overflow-hidden z-20"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&q=80" alt="User" /></div>
                                <div className="w-12 h-12 rounded-full border-4 border-white shadow-sm overflow-hidden z-10"><img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=64&q=80" alt="User" /></div>
                                <div className="w-12 h-12 rounded-full border-4 border-white shadow-sm bg-[#00AEEF] flex items-center justify-center text-xs font-black text-white">+12k</div>
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 mb-3">Trusted by 200,000+ Travelers</h2>
                            <p className="text-slate-500 font-medium leading-relaxed">Join the most exclusive community of luxury globetrotters and management professionals.</p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center xl:justify-end gap-x-12 gap-y-10 shrink-0">
                            <div className="text-center">
                                <div className="text-4xl md:text-5xl font-black text-[#00AEEF] mb-1">4.9<span className="text-3xl">/5</span></div>
                                <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">App Store Rating</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl md:text-5xl font-black text-[#00AEEF] mb-1">150<span className="text-3xl">+</span></div>
                                <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Destinations</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl md:text-5xl font-black text-[#00AEEF] mb-1">24<span className="text-3xl">/7</span></div>
                                <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Concierge</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl md:text-5xl font-black text-[#00AEEF] mb-1">0<span className="text-3xl">%</span></div>
                                <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Booking Fees</div>
                            </div>
                        </div>

                    </section>

                    {/* Simple Bottom Spacing Boilerplate Footer */}
                    <footer className="pt-8 pb-4 flex flex-col md:flex-row items-center justify-between text-xs font-medium text-slate-400 border-t border-slate-200 gap-4">
                        <div className="flex items-center gap-2">
                            <Compass className="w-4 h-4 text-[#00AEEF]" />
                            <span className="font-bold text-slate-900">Navitra</span>
                        </div>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-slate-600 transition-colors">Destinations</a>
                            <a href="#" className="hover:text-slate-600 transition-colors">Concierge</a>
                            <a href="#" className="hover:text-slate-600 transition-colors">Corporate</a>
                            <a href="#" className="hover:text-slate-600 transition-colors">Privacy</a>
                        </div>
                        <p>© 2026 Navitra Travel Management Group. All rights reserved.</p>
                    </footer>

                </div>
            </main>
        </div>
    );
}
