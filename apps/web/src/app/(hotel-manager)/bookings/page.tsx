'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Building2,
    LayoutDashboard,
    CalendarDays,
    BarChart3,
    Users,
    Search,
    ChevronLeft,
    ChevronRight,
    Calendar,
    ChevronDown,
    Lock,
    RefreshCw,
    LayoutGrid,
    Star,
    MoreHorizontal,
    XCircle,
    User,
    LogOut
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function HotelBookings() {
    const [userName, setUserName] = useState<string>('');
    const router = useRouter();

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

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/login');
    };

    const displayName = userName || 'Navitra Manager';
    const initial = displayName.charAt(0).toUpperCase();

    return (
        <div className="flex h-screen overflow-hidden bg-white font-display text-slate-800">

            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-200 bg-white flex flex-col hidden md:flex shrink-0 z-20">
                <div className="p-6 flex items-center gap-3">
                    <div className="bg-[#00b4f0] rounded-lg w-10 h-10 flex items-center justify-center text-white shadow-sm">
                        <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-slate-900 text-base font-bold leading-tight uppercase tracking-wide truncate max-w-[140px]">
                            Navitra
                        </h1>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1">
                    <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors" href="/hotel-dashboard">
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="text-sm font-medium">Home</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#00b4f0]/10 text-[#00b4f0]" href="/bookings">
                        <CalendarDays className="w-5 h-5" />
                        <span className="text-sm font-medium">Bookings</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors" href="/analytics">
                        <BarChart3 className="w-5 h-5" />
                        <span className="text-sm font-medium">Analytics</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors" href="/staff">
                        <Users className="w-5 h-5" />
                        <span className="text-sm font-medium">Staff</span>
                    </a>
                </nav>

                {/* User Profile Footer */}
                <div className="p-4 border-t border-slate-200 bg-white">
                    <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-slate-50 border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors group">
                        <div className="w-9 h-9 rounded-full bg-[#00AEEF]/10 flex items-center justify-center overflow-hidden border border-sky-100 shrink-0">
                            <div className="w-full h-full text-[#00AEEF] flex items-center justify-center font-bold text-base">{initial}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-800 truncate">{displayName}</p>
                            <p className="text-[10px] text-slate-500 font-medium tracking-wide">Administrator</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                            title="Log Out"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">

                {/* Top Toolbar */}
                <header className="h-16 border-b border-slate-200 px-6 flex items-center justify-between shrink-0 bg-white z-10">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <button className="p-1 hover:bg-slate-100 rounded text-slate-600 transition-colors">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <span className="font-bold text-slate-800">Today</span>
                            <button className="p-1 hover:bg-slate-100 rounded text-slate-600 transition-colors">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="h-6 w-px bg-slate-200"></div>

                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                                <Calendar className="w-4 h-4 text-slate-400" />
                                Feb 27 - Mar 2
                                <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
                            </button>

                            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-500 hover:bg-slate-50 transition-colors">
                                Select space
                                <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search within property..."
                                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4f0]/20 focus:border-[#00b4f0] w-64 transition-all"
                            />
                        </div>
                        <button className="bg-[#00b4f0] hover:bg-sky-400 text-white px-5 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors">
                            Options
                        </button>
                    </div>
                </header>

                {/* Day Headers */}
                <div className="flex border-b border-slate-200 bg-white shrink-0">
                    {/* Corner Cell */}
                    <div className="w-16 border-r border-slate-200 shrink-0 flex items-end p-2">
                        <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Room</span>
                    </div>
                    {/* Dates */}
                    <div className="flex-1 grid grid-cols-4">
                        <div className="border-r border-slate-200 py-3 flex flex-col items-center justify-center bg-rose-50/30">
                            <span className="text-xs font-black text-rose-500 tracking-widest uppercase">Fri</span>
                            <span className="text-sm font-black text-rose-600">Feb 27</span>
                        </div>
                        <div className="border-r border-slate-200 py-3 flex flex-col items-center justify-center">
                            <span className="text-xs font-semibold text-slate-500">Sat</span>
                            <span className="text-sm font-black text-slate-900">Feb 28</span>
                        </div>
                        <div className="border-r border-slate-200 py-3 flex flex-col items-center justify-center">
                            <span className="text-xs font-semibold text-slate-500">Sun</span>
                            <span className="text-sm font-black text-slate-900">Mar 1</span>
                        </div>
                        <div className="py-3 flex flex-col items-center justify-center">
                            <span className="text-xs font-semibold text-slate-500">Mon</span>
                            <span className="text-sm font-black text-slate-900">Mar 2</span>
                        </div>
                    </div>
                </div>

                {/* Timeline Grid Area */}
                <div className="flex-1 overflow-auto bg-slate-50 relative flex">

                    {/* Vertical Category Labels & Rooms List */}
                    <div className="w-16 shrink-0 border-r border-slate-200 bg-white relative flex flex-col">

                        {/* SINGLE ROOMS group */}
                        <div className="relative flex-1 min-h-[300px] border-b border-slate-200 flex items-center justify-center">
                            <div className="absolute inset-y-0 left-0 w-8 border-r border-slate-100 flex items-center justify-center">
                                <span className="transform -rotate-90 text-[10px] font-bold text-slate-400 tracking-[0.2em] whitespace-nowrap">SINGLE ROOMS</span>
                            </div>
                            <div className="ml-8 w-full flex flex-col h-full">
                                {[101, 102, 103, 104, 105].map((num) => (
                                    <div key={num} className="flex-1 border-b border-slate-100 last:border-b-0 flex items-center justify-center relative min-h-[60px]">
                                        <div className={`absolute left-2 w-2 h-2 rounded-full ${num === 102 ? 'bg-orange-500' : num === 104 ? 'bg-orange-500' : 'bg-emerald-500'}`}></div>
                                        <span className="text-sm font-bold text-slate-700">{num}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* DOUBLE ROOMS group */}
                        <div className="relative flex-1 min-h-[240px] border-b border-slate-200 flex items-center justify-center">
                            <div className="absolute inset-y-0 left-0 w-8 border-r border-slate-100 flex items-center justify-center">
                                <span className="transform -rotate-90 text-[10px] font-bold text-slate-400 tracking-[0.2em] whitespace-nowrap">DOUBLE ROOMS</span>
                            </div>
                            <div className="ml-8 w-full flex flex-col h-full">
                                {[106, 107, 108, 109].map((num) => (
                                    <div key={num} className="flex-1 border-b border-slate-100 last:border-b-0 flex items-center justify-center relative min-h-[60px]">
                                        <div className={`absolute left-2 w-2 h-2 rounded-full ${num === 107 ? 'bg-red-500' : num === 108 ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                                        <span className="text-sm font-bold text-slate-700">{num}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* TRIPLE ROOMS group */}
                        <div className="relative flex-1 min-h-[180px] flex items-center justify-center bg-white">
                            <div className="absolute inset-y-0 left-0 w-8 border-r border-slate-100 flex items-center justify-center">
                                <span className="transform -rotate-90 text-[10px] font-bold text-slate-400 tracking-[0.2em] whitespace-nowrap">TRIPLE ROOMS</span>
                            </div>
                            <div className="ml-8 w-full flex flex-col h-full">
                                {[110, 111, 112].map((num) => (
                                    <div key={num} className="flex-1 border-b border-slate-100 last:border-b-0 flex items-center justify-center relative min-h-[60px]">
                                        <div className={`absolute left-2 w-2 h-2 rounded-full ${num === 110 ? 'bg-orange-500' : num === 112 ? 'bg-red-500' : 'bg-orange-500'}`}></div>
                                        <span className="text-sm font-bold text-slate-700">{num}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Timeline Grid Layout - Maps strictly to the room rows */}
                    <div className="flex-1 grid grid-cols-4 bg-white min-w-[800px] relative">
                        {/* Vertical day splitters */}
                        <div className="col-start-1 col-span-1 border-r border-slate-100/50"></div>
                        <div className="col-start-2 col-span-1 border-r border-slate-100/50"></div>
                        <div className="col-start-3 col-span-1 border-r border-slate-100/50"></div>
                        <div className="col-start-4 col-span-1"></div>

                        {/* Horizontal Row Guides */}
                        <div className="absolute inset-0 flex flex-col pointer-events-none">
                            <div className="h-[300px] border-b border-slate-200 flex flex-col">
                                {[...Array(5)].map((_, i) => <div key={i} className="flex-1 border-b border-slate-100 last:border-b-0"></div>)}
                            </div>
                            <div className="h-[240px] border-b border-slate-200 flex flex-col">
                                {[...Array(4)].map((_, i) => <div key={i} className="flex-1 border-b border-slate-100 last:border-b-0"></div>)}
                            </div>
                            <div className="h-[180px] flex flex-col">
                                {[...Array(3)].map((_, i) => <div key={i} className="flex-1 border-b border-slate-100 last:border-b-0"></div>)}
                            </div>
                        </div>

                        {/* =========================================
                            BOOKING BLOCKS OVERLAYS 
                            Y positions correspond exactly to rooms.
                            Each room row is ~60px high. 
                            Room 101 starts at top = 0.
                        ========================================= */}

                        {/* 102: Maxwell Carter */}
                        <div className="absolute top-[70px] left-2 right-[70%] h-10 px-1 hover:z-20 group">
                            <div className="w-full h-full bg-slate-50 border border-slate-200 rounded-lg flex items-center px-3 gap-2 shadow-sm border-l-4 border-l-rose-400 cursor-pointer group-hover:bg-white group-hover:border-slate-300">
                                <Lock className="w-3.5 h-3.5 text-slate-600" />
                                <span className="text-sm font-bold text-slate-800 truncate">Maxwell Carter</span>
                            </div>
                        </div>

                        {/* 103: Ethan Davis (Trailing edge) */}
                        <div className="absolute top-[130px] left-[70%] right-[-10%] h-10 px-1 hover:z-20 group">
                            <div className="w-full h-full bg-slate-50 border border-slate-200 rounded-lg flex items-center px-3 shadow-sm border-l-4 border-l-rose-400 cursor-pointer">
                                <span className="text-sm font-bold text-slate-800 truncate">Ethan Davis</span>
                            </div>
                        </div>

                        {/* 104: Small utility block */}
                        <div className="absolute top-[190px] left-[40%] w-[120px] h-10 px-1 hover:z-20 group">
                            <div className="w-full h-full bg-slate-50/50 border border-slate-200 rounded-lg flex items-center justify-end px-3 gap-3">
                                <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                                <LayoutGrid className="w-3.5 h-3.5 text-slate-400" />
                            </div>
                        </div>

                        {/* 105: Olivia Bennett */}
                        <div className="absolute top-[250px] left-[30%] w-[50%] h-10 px-1 z-10 hover:z-20 group">
                            <div className="w-full h-full bg-white border border-slate-200 rounded-lg flex items-center justify-between px-3 shadow-[0_4px_15px_rgb(0,0,0,0.05)] border-l-4 border-l-rose-500 cursor-pointer transition-shadow">
                                <div className="flex items-center gap-2">
                                    <Lock className="w-3.5 h-3.5 text-slate-600" />
                                    <span className="text-sm font-bold text-slate-800 truncate">Olivia Bennett</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Star className="w-3.5 h-3.5 text-slate-400 fill-slate-400" />
                                    <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                                    <LayoutGrid className="w-3.5 h-3.5 text-slate-400" />
                                </div>
                            </div>
                        </div>

                        {/* 105: Isabella Hunter (Trailing component) */}
                        <div className="absolute top-[250px] left-[85%] right-[-10%] h-10 px-1 hover:z-20 group">
                            <div className="w-full h-full bg-slate-50 border border-slate-200 rounded-lg flex items-center px-3 gap-2 shadow-sm border-l-4 border-l-rose-400 cursor-pointer">
                                <Lock className="w-3.5 h-3.5 text-slate-600" />
                                <span className="text-sm font-bold text-slate-800 truncate">Isabella Hunter</span>
                            </div>
                        </div>

                        {/* 108: Out of order */}
                        <div className="absolute top-[430px] left-[10%] w-[90%] h-10 px-1 hover:z-20 group">
                            <div className="w-full h-full bg-slate-100/60 border border-slate-200/80 rounded-lg flex items-center px-3 gap-2 border-l-4 border-l-slate-400 cursor-not-allowed">
                                <XCircle className="w-4 h-4 text-slate-400" />
                                <span className="text-sm font-medium text-slate-500">Out of order - Bathroom renovations</span>
                            </div>
                        </div>

                        {/* 110: Liam Johnson (No lock) & Ava Martinez */}
                        <div className="absolute top-[550px] left-[40%] w-[25%] h-10 px-1 z-10 hover:z-20 group">
                            <div className="w-full h-full bg-white border border-slate-200 rounded-lg flex items-center px-3 shadow-md border-l-4 border-l-rose-400 cursor-pointer">
                                <span className="text-sm font-bold text-slate-800 truncate">Liam Johnson</span>
                            </div>
                        </div>

                        <div className="absolute top-[550px] left-[65%] w-[35%] h-10 px-1 z-10 hover:z-20 group">
                            <div className="w-full h-full bg-white border border-slate-200 rounded-lg flex items-center px-3 gap-2 shadow-md border-l-4 border-l-rose-500 cursor-pointer">
                                <Lock className="w-3.5 h-3.5 text-slate-600" />
                                <span className="text-sm font-bold text-slate-800 truncate">Ava Martinez</span>
                            </div>
                        </div>

                        {/* 111: Cleanup utility block */}
                        <div className="absolute top-[610px] left-[65%] w-[120px] h-10 px-1 group">
                            <div className="w-full h-full bg-slate-50/50 border border-slate-200 rounded-lg flex items-center justify-end px-3 gap-3">
                                <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                                <LayoutGrid className="w-3.5 h-3.5 text-slate-400" />
                                <User className="w-3.5 h-3.5 text-slate-400" />
                            </div>
                        </div>

                    </div>
                </div>

                {/* Bottom Status Bar */}
                <footer className="h-12 border-t border-slate-200 bg-white shrink-0 px-6 flex items-center justify-between text-xs font-semibold">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <span className="text-slate-500">Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <span className="text-slate-500">Maintenance</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                            <span className="text-slate-500">Busy</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 text-slate-500">
                        <p>Occupancy: <span className="text-slate-900 font-bold ml-1 text-sm">84%</span></p>
                        <p>Cleaning required: <span className="text-slate-900 font-bold ml-1 text-sm">12</span></p>
                    </div>
                </footer>

            </main>
        </div>
    );
}
