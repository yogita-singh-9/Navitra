'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Building2,
    LayoutDashboard,
    CalendarDays,
    BarChart3,
    Users,
    Sun,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    LogOut,
    CheckCircle2
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function HotelAnalytics() {
    const [userName, setUserName] = useState<string>('');
    const [hotelName, setHotelName] = useState<string>('Hotel Sunset');
    const router = useRouter();

    useEffect(() => {
        async function getUserSession() {
            const supabase = createClient();
            const { data: { session } } = await supabase.auth.getSession();

            if (session?.user?.user_metadata) {
                if (session.user.user_metadata.full_name) {
                    setUserName(session.user.user_metadata.full_name);
                }
                // Try to find a hotel name, otherwise default to "Navitra Hotel"
                if (session.user.user_metadata.hotel_name) {
                    setHotelName(session.user.user_metadata.hotel_name);
                } else if (session.user.user_metadata.business_name) {
                    setHotelName(session.user.user_metadata.business_name);
                } else {
                    setHotelName('Navitra Hotel');
                }
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
        <div className="flex h-screen overflow-hidden bg-slate-50 relative font-display text-slate-900">

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
                    <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors" href="/bookings">
                        <CalendarDays className="w-5 h-5" />
                        <span className="text-sm font-medium">Bookings</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#00b4f0]/10 text-[#00b4f0]" href="/analytics">
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
                        <div className="w-9 h-9 rounded-full bg-[#00AEEF]/10 flex items-center justify-center overflow-hidden border border-sky-100 shrink-0 text-[#00AEEF] font-bold">
                            {initial}
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                            <span className="text-xs font-bold truncate text-slate-800">{displayName}</span>
                            <span className="text-[10px] text-slate-500">Hotel Manager</span>
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
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                <div className="p-8 max-w-7xl mx-auto w-full space-y-8">

                    {/* Header Row */}
                    <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pb-2">
                        {/* Title & Dropdown */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                                <Sun className="w-5 h-5 text-orange-500" />
                            </div>
                            <div className="flex items-center gap-1 cursor-pointer">
                                <h1 className="text-2xl font-black text-slate-900 tracking-tight">{hotelName}</h1>
                                <ChevronDown className="w-5 h-5 text-slate-400 mt-1" />
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        <nav className="flex items-center gap-6 text-sm font-bold overflow-x-auto pb-2 xl:pb-0 scrollbar-hide">
                            <a href="#" className="text-slate-900 border-b-2 border-[#00b4f0] pb-1 whitespace-nowrap">Overview</a>
                            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors pb-1 whitespace-nowrap">Urgent</a>
                            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors pb-1 whitespace-nowrap">Calendar</a>
                            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors pb-1 whitespace-nowrap">All stay dates</a>
                            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors pb-1 whitespace-nowrap">Group pricing</a>
                            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors pb-1 whitespace-nowrap">Restriction</a>
                            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors pb-1 whitespace-nowrap">Forecast</a>
                        </nav>
                    </header>

                    {/* Date Selector */}
                    <div>
                        <div className="inline-flex items-center px-4 py-2.5 bg-white border border-slate-200 rounded-full shadow-sm gap-6">
                            <button className="text-slate-400 hover:text-slate-600 transition-colors">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="text-sm font-bold text-slate-900 w-24 text-center">July 2026</span>
                            <button className="text-slate-400 hover:text-slate-600 transition-colors">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

                        {/* Card 1: REVPAR */}
                        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col h-[320px]">
                            <div className="flex justify-between items-start mb-8">
                                <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase">REVPAR</h3>
                                <p className="text-4xl font-black tracking-tighter text-slate-900">₹9,980</p>
                            </div>

                            <div className="space-y-6 mt-auto">
                                {/* OTB VS. LY */}
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-xs font-bold text-slate-500">OTB VS. LY</span>
                                        <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded">▲ +5.4%</span>
                                    </div>
                                    <div className="space-y-2">
                                        {/* Current OTB Bar */}
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-8 bg-[#00b4f0] rounded-r-lg relative flex items-center px-3" style={{ width: '90%' }}>
                                                <span className="text-xs font-bold text-white absolute right-3">9,980</span>
                                            </div>
                                            <div className="w-[10%]"></div>
                                        </div>
                                        {/* LY Bar */}
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-5 bg-slate-200 rounded-r-md relative flex items-center px-3" style={{ width: '85%' }}>
                                                <span className="text-[10px] font-bold text-slate-500 absolute right-3">9,472</span>
                                            </div>
                                            <div className="w-[15%]"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* MONTH FORECAST VS. LY */}
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-xs font-bold text-slate-500">MONTH FORECAST VS. LY</span>
                                        <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded">▲ +5.2%</span>
                                    </div>
                                    <div className="space-y-2">
                                        {/* Forecast Bar */}
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-8 bg-slate-400 rounded-r-lg relative flex items-center px-3" style={{ width: '95%' }}>
                                                <span className="text-xs font-bold text-white absolute right-3">10,150</span>
                                            </div>
                                            <div className="w-[5%]"></div>
                                        </div>
                                        {/* LY Bar */}
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-5 bg-slate-200 rounded-r-md relative flex items-center px-3" style={{ width: '90%' }}>
                                                <span className="text-[10px] font-bold text-slate-500 absolute right-3">9,646</span>
                                            </div>
                                            <div className="w-[10%]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: OCCUPANCY */}
                        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col h-[320px]">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase">OCCUPANCY</h3>
                                <p className="text-4xl font-black tracking-tighter text-slate-900">55%</p>
                            </div>

                            <div className="flex-1 flex px-2 relative">
                                {/* Split Background Blocks like mockup */}
                                <div className="absolute inset-y-12 left-0 w-1/2 bg-[#00b4f0] opacity-10"></div>
                                <div className="absolute inset-y-12 right-0 w-1/2 bg-slate-600 opacity-60"></div>

                                <div className="flex-1 flex flex-col items-center justify-center z-10 pt-8">
                                    <span className="text-[10px] font-bold text-slate-500 mb-4 z-10">CURRENT OTB</span>
                                    <div className="relative w-28 h-28 rounded-full bg-white flex items-center justify-center shadow-sm">
                                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                                            <circle cx="56" cy="56" r="48" fill="none" stroke="#f1f5f9" strokeWidth="16" />
                                            {/* 55% of 2 * pi * 48 (~301) = 165 */}
                                            <circle cx="56" cy="56" r="48" fill="none" stroke="#00b4f0" strokeWidth="16" strokeDasharray="165 301" />
                                        </svg>
                                        <span className="text-2xl font-black text-slate-900 z-10">55%</span>
                                    </div>
                                    <div className="mt-5 text-center bg-white px-2 py-1 rounded">
                                        <span className="text-[10px] text-slate-400 block mb-1">Same time LY</span>
                                        <div className="flex items-center justify-center gap-1.5">
                                            <span className="text-xs font-bold text-slate-800">52%</span>
                                            <span className="text-[10px] font-bold text-emerald-500">▲ +5.4</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col items-center justify-center z-10 pt-8">
                                    <span className="text-[10px] font-bold text-slate-500 mb-4 z-10">MONTH FORECAST</span>
                                    <div className="relative w-28 h-28 rounded-full bg-white flex items-center justify-center shadow-sm">
                                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                                            <circle cx="56" cy="56" r="48" fill="none" stroke="#f1f5f9" strokeWidth="16" />
                                            {/* 82% of ~301 = 246 */}
                                            <circle cx="56" cy="56" r="48" fill="none" stroke="#64748b" strokeWidth="16" strokeDasharray="246 301" />
                                        </svg>
                                        <span className="text-2xl font-black text-slate-900 z-10">82%</span>
                                    </div>
                                    <div className="mt-5 text-center bg-white px-2 py-1 rounded">
                                        <span className="text-[10px] text-slate-400 block mb-1">End of month LY</span>
                                        <div className="flex items-center justify-center gap-1.5">
                                            <span className="text-xs font-bold text-slate-800">76%</span>
                                            <span className="text-[10px] font-bold text-emerald-500">▲ +7.9</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: ROOM NIGHTS */}
                        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col h-[320px]">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase">ROOM NIGHTS</h3>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#00b4f0]"></div>
                                    <span className="text-[10px] font-bold text-slate-400 tracking-wide">FORECAST</span>
                                </div>
                            </div>

                            <div className="flex-1 relative flex items-end justify-between px-2 pb-6">
                                {/* Bar Chart Background */}
                                {[60, 50, 65, 85, 40, 50, 75, 95, 45, 80].map((h, i) => (
                                    <div key={i} className="w-1/12 bg-slate-50 rounded-sm relative" style={{ height: `${h}%` }}></div>
                                ))}

                                {/* Curved Line Mockup */}
                                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                                    <path
                                        d="M 5 180 C 60 160, 80 170, 130 170 C 180 170, 200 130, 240 120 C 270 110, 290 190, 320 190 C 340 190, 360 150, 380 120"
                                        fill="none"
                                        stroke="#00b4f0"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        className="drop-shadow-sm"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Card 4: REVENUE */}
                        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col h-[320px]">
                            <div className="flex justify-between items-start mb-8">
                                <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase">REVENUE</h3>
                                <p className="text-4xl font-black tracking-tighter text-slate-900">₹2,45,19,534</p>
                            </div>

                            <div className="space-y-6 mt-auto">
                                {/* OTB VS. LY */}
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-xs font-bold text-slate-500">OTB VS. LY</span>
                                        <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded">▲ +5.6%</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-8 bg-[#00b4f0] rounded-r-lg relative flex items-center px-3" style={{ width: '92%' }}>
                                                <span className="text-xs font-bold text-white absolute right-3">2,45,19k</span>
                                            </div>
                                            <div className="w-[8%]"></div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-5 bg-slate-200 rounded-r-md relative flex items-center px-3" style={{ width: '87%' }}>
                                                <span className="text-[10px] font-bold text-slate-500 absolute right-3">2,32,22k</span>
                                            </div>
                                            <div className="w-[13%]"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* MONTH FORECAST VS. LY */}
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-xs font-bold text-slate-500">MONTH FORECAST VS. LY</span>
                                        <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded">▲ +4.5%</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-8 bg-slate-400 rounded-r-lg relative flex items-center px-3" style={{ width: '96%' }}>
                                                <span className="text-xs font-bold text-white absolute right-3">2,47,25k</span>
                                            </div>
                                            <div className="w-[4%]"></div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-5 bg-slate-200 rounded-r-md relative flex items-center px-3" style={{ width: '91%' }}>
                                                <span className="text-[10px] font-bold text-slate-500 absolute right-3">2,36,96k</span>
                                            </div>
                                            <div className="w-[9%]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 5: ADR */}
                        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col h-[320px]">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase">ADR</h3>
                                <div className="text-right">
                                    <p className="text-4xl font-black tracking-tighter text-slate-900 mb-1">₹14,974</p>
                                    <div className="flex items-center justify-end gap-1.5 text-xs font-bold">
                                        <span className="text-slate-400">STLY: ₹14,714</span>
                                        <span className="text-emerald-500">▲ +1.7</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 relative flex items-end justify-between px-2 pb-6 mt-4">
                                {/* Bar Chart Background */}
                                {[30, 40, 50, 40, 30, 20, 60, 40, 50, 80, 50, 40, 60].map((h, i) => (
                                    <div key={i} className="w-[6%] bg-slate-50 rounded-sm relative" style={{ height: `${h}%` }}></div>
                                ))}

                                {/* Jagged Line Mockup */}
                                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                                    <path
                                        d="M 5 210 L 35 190 L 65 200 L 95 180 L 125 220 L 155 170 L 185 200 L 215 190 L 245 180 L 275 160 L 305 130 L 335 160 L 365 200"
                                        fill="none"
                                        stroke="#00b4f0"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="drop-shadow-sm"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Card 6: COMPETITOR PRICING */}
                        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col h-[320px]">
                            <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-6">COMPETITOR PRICING</h3>

                            <div className="mb-6">
                                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-2 block">SELECT ROOM TYPE</span>
                                <button className="w-full flex items-center justify-between px-4 py-3 border border-slate-200 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                    <span className="text-sm font-bold text-slate-800">BAR prices</span>
                                    <ChevronDown className="w-4 h-4 text-slate-400" />
                                </button>
                            </div>

                            <div className="flex-1 flex flex-col">
                                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-3 block">HOTEL</span>

                                <div className="space-y-2">
                                    {/* Your best price via active box design */}
                                    <div className="flex items-center justify-between px-4 py-3 bg-sky-50 border border-sky-100 rounded-xl">
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 rounded bg-[#00b4f0] flex items-center justify-center">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                                            </div>
                                            <span className="text-sm font-bold text-slate-900">Your best price</span>
                                        </div>
                                        <span className="text-base font-black text-[#00b4f0]">₹15,566</span>
                                    </div>

                                    <div className="flex items-center justify-between px-4 py-3 bg-white border border-transparent hover:bg-slate-50 rounded-xl transition-colors">
                                        <span className="text-sm font-semibold text-slate-600">Hotel Portinar</span>
                                        <span className="text-base font-black text-slate-900">₹16,243</span>
                                    </div>

                                    <div className="flex items-center justify-between px-4 py-3 bg-white border border-transparent hover:bg-slate-50 rounded-xl transition-colors">
                                        <span className="text-sm font-semibold text-slate-600">River Haven</span>
                                        <span className="text-base font-black text-slate-900">₹15,058</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Bottom Padding spacer */}
                    <div className="pb-10"></div>
                </div>
            </main>
        </div>
    );
}
