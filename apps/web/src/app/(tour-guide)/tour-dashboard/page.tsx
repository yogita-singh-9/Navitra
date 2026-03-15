'use client';

import { useEffect, useState } from 'react';
import {
    Menu,
    Map,
    Users,
    CalendarDays,
    Banknote,
    Search,
    Bell,
    HelpCircle,
    Plus,
    CheckCircle2,
    TrendingDown,
    TrendingUp,
    MapPin,
    Clock,
    Settings
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function TourDashboard() {
    const [userName, setUserName] = useState<string>('');

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

    const displayName = userName || 'Alex Rivero';
    const initial = displayName.charAt(0).toUpperCase();

    return (
        <div className="flex flex-col md:flex-row h-screen bg-slate-50 font-display text-slate-900 overflow-hidden">

            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-200 bg-white flex-col hidden md:flex shrink-0">
                <div className="p-6 flex items-center gap-3">
                    <div className="bg-[#00b4f0] rounded-lg w-10 h-10 flex items-center justify-center text-white shadow-sm shrink-0">
                        <Map className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-slate-900 text-base font-bold leading-tight tracking-wide truncate max-w-[140px]">
                            Vanguard Travel
                        </h1>
                        <p className="text-[10px] text-slate-500 font-medium tracking-wide">Tour Operator</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors" href="#">
                        <Menu className="w-5 h-5" />
                        <span className="text-sm font-semibold">Dashboard</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#00b4f0]/10 text-[#00b4f0]" href="#">
                        <Map className="w-5 h-5 fill-[#00b4f0]/20" />
                        <span className="text-sm font-semibold">Tours</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors" href="#">
                        <CalendarDays className="w-5 h-5" />
                        <span className="text-sm font-semibold">Bookings</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors" href="#">
                        <Users className="w-5 h-5" />
                        <span className="text-sm font-semibold">Customers</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors" href="#">
                        <Banknote className="w-5 h-5" />
                        <span className="text-sm font-semibold">Finance</span>
                    </a>
                </nav>

                {/* User Profile Footer */}
                <div className="p-4 border-t border-slate-200 bg-white flex flex-col gap-4">
                    <button className="bg-[#00b4f0] hover:bg-[#00b4f0]/90 text-white w-full py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors">
                        <Plus className="w-4 h-4" />
                        New Tour
                    </button>
                    <div className="flex items-center justify-between px-2 cursor-pointer group">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 text-slate-700 font-bold overflow-hidden">
                                {initial}
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-xs font-bold truncate text-slate-900 group-hover:text-[#00b4f0] transition-colors">{displayName}</span>
                                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Senior Agent</span>
                            </div>
                        </div>
                        <Settings className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors shrink-0" />
                    </div>
                </div>
            </aside>

            <main className="flex-1 flex flex-col overflow-y-auto">

                {/* Header */}
                <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0 sticky top-0 z-10 hidden sm:flex">
                    <h2 className="text-lg font-bold text-slate-900">Tour Management Hub</h2>

                    <div className="flex items-center gap-6">
                        <div className="relative w-80 hidden lg:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-1.5 text-sm focus:ring-2 focus:ring-[#00b4f0]/50 outline-none text-slate-800 transition-shadow"
                                placeholder="Search tours, bookings, or travelers..."
                                type="text"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>
                            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                                <HelpCircle className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </header>

                <div className="p-4 md:p-8 space-y-8 flex-1">

                    {/* Top Section: Title & KPIs */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Tour Inventory</h1>
                            <p className="text-slate-500 mt-1">Manage your active tour packages and booking lifecycles.</p>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-white border border-slate-200 rounded-xl px-6 py-4 shadow-sm min-w-[140px]">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Active Tours</p>
                                <p className="text-3xl font-black text-[#00b4f0]">24</p>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-xl px-6 py-4 shadow-sm min-w-[160px]">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Revenue <span className="text-[10px] text-slate-400">(MTD)</span></p>
                                <p className="text-3xl font-black text-slate-900">₹1.42 Cr</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">

                        {/* Left Column (Main Inventory & Trackers) */}
                        <div className="xl:col-span-3 space-y-8">

                            {/* Bookings Overview Analytics */}
                            <section>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Analytics & Performance</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Trending Package */}
                                    <div className="bg-gradient-to-br from-white to-sky-50 border border-sky-100 rounded-xl p-5 shadow-sm">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-bold text-sky-600 bg-sky-100 px-2 py-1 rounded">MOST TRENDING</span>
                                            <TrendingUp className="w-4 h-4 text-sky-500" />
                                        </div>
                                        <h4 className="font-bold text-slate-900 text-lg">Amalfi Coast Explorer</h4>
                                        <p className="text-sm text-slate-500 mt-1">142 bookings this month</p>
                                        <div className="mt-4 flex items-center gap-2">
                                            <div className="flex -space-x-2">
                                                {[1, 2, 3, 4].map(i => <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white z-10"></div>)}
                                            </div>
                                            <span className="text-xs font-semibold text-sky-600">+12% vs last week</span>
                                        </div>
                                    </div>

                                    {/* Least Booked Package */}
                                    <div className="bg-gradient-to-br from-white to-orange-50 border border-orange-100 rounded-xl p-5 shadow-sm">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded">LEAST BOOKED</span>
                                            <TrendingDown className="w-4 h-4 text-orange-500" />
                                        </div>
                                        <h4 className="font-bold text-slate-900 text-lg">Alpine Winter Retreat</h4>
                                        <p className="text-sm text-slate-500 mt-1">12 bookings this month</p>
                                        <div className="mt-4 w-full bg-orange-100 rounded-full h-1.5">
                                            <div className="bg-orange-400 h-1.5 rounded-full" style={{ width: '15%' }}></div>
                                        </div>
                                        <p className="text-[10px] text-orange-600 font-bold tracking-wide mt-2 uppercase">Consider Promotion</p>
                                    </div>

                                    {/* Packages Booking Chart Summary */}
                                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                                        <h4 className="font-bold text-slate-900 text-sm mb-3">Bookings Per Package</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-full bg-slate-100 h-6 rounded overflow-hidden relative">
                                                    <div className="absolute top-0 left-0 h-full bg-[#00b4f0]" style={{ width: '85%' }}></div>
                                                    <span className="absolute inset-y-0 left-2 flex items-center text-xs font-bold text-white drop-shadow">Amalfi Coast</span>
                                                </div>
                                                <span className="text-sm font-bold text-slate-700 w-8">85</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-full bg-slate-100 h-6 rounded overflow-hidden relative">
                                                    <div className="absolute top-0 left-0 h-full bg-sky-400" style={{ width: '65%' }}></div>
                                                    <span className="absolute inset-y-0 left-2 flex items-center text-xs font-bold text-white drop-shadow">Kyoto Cherry</span>
                                                </div>
                                                <span className="text-sm font-bold text-slate-700 w-8">65</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-full bg-slate-100 h-6 rounded overflow-hidden relative">
                                                    <div className="absolute top-0 left-0 h-full bg-slate-300" style={{ width: '32%' }}></div>
                                                    <span className="absolute inset-y-0 left-2 flex items-center text-xs font-bold text-slate-700">Swiss Alps</span>
                                                </div>
                                                <span className="text-sm font-bold text-slate-700 w-8">32</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Booking Lifecycle Tracker / Current Bookings */}
                            <section>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Current Bookings Lifecycle</h3>
                                    <button className="text-[#00b4f0] text-sm font-bold hover:underline">View All Bookings</button>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {/* Lifecycle Column 1 */}
                                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col hidden md:flex">
                                        <div className="p-3 border-b border-slate-100 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                                            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Pending Deposit</span>
                                            <span className="ml-auto text-xs font-bold text-slate-400">12</span>
                                        </div>
                                        <div className="p-2 space-y-1.5 flex-1 bg-slate-50/50">
                                            <div className="bg-white border border-slate-200 p-2 rounded flex justify-between items-center cursor-pointer hover:border-yellow-300 transition-colors">
                                                <span className="text-xs font-semibold">J. Smith - Amalfi</span>
                                                <span className="text-slate-300 text-[10px]">&gt;</span>
                                            </div>
                                            <div className="bg-white border border-slate-200 p-2 rounded flex justify-between items-center cursor-pointer hover:border-yellow-300 transition-colors">
                                                <span className="text-xs font-semibold">M. Tan - Kyoto</span>
                                                <span className="text-slate-300 text-[10px]">&gt;</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Lifecycle Column 2 */}
                                    <div className="bg-white border-2 border-sky-400 rounded-xl overflow-hidden shadow-sm shadow-sky-100 flex flex-col scale-105 z-10">
                                        <div className="p-3 border-b border-slate-100 flex items-center gap-2 bg-sky-50">
                                            <span className="w-2 h-2 rounded-full bg-[#00b4f0]"></span>
                                            <span className="text-[10px] font-bold text-sky-900 uppercase tracking-wider">Deposit Paid</span>
                                            <span className="ml-auto text-xs font-bold text-[#00b4f0]">08</span>
                                        </div>
                                        <div className="p-2 space-y-1.5 flex-1 bg-white">
                                            <div className="bg-white border border-slate-200 p-2 rounded flex justify-between items-center cursor-pointer hover:border-[#00b4f0] transition-colors shadow-sm">
                                                <span className="text-xs font-semibold">K. Lee - Swiss Alps</span>
                                                <span className="text-slate-300 text-[10px]">&gt;</span>
                                            </div>
                                            <div className="bg-white border border-slate-200 p-2 rounded flex justify-between items-center cursor-pointer hover:border-[#00b4f0] transition-colors shadow-sm">
                                                <span className="text-xs font-semibold">D. Wright - Safari</span>
                                                <span className="text-slate-300 text-[10px]">&gt;</span>
                                            </div>
                                            <div className="bg-white border border-slate-200 p-2 rounded border-dashed opacity-50 flex justify-center items-center">
                                                <span className="text-[10px] font-medium text-slate-400 italic">6 more...</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Lifecycle Column 3 */}
                                    <div className="bg-white border-l-4 border-emerald-400 border-y border-r border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
                                        <div className="p-3 border-b border-slate-100 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Fully Confirmed</span>
                                            <span className="ml-auto text-xs font-bold text-slate-400">26</span>
                                        </div>
                                        <div className="p-4 flex-1 flex items-center justify-center bg-slate-50/50">
                                            <span className="text-xs font-medium text-slate-400 italic text-center text-balance">26 Confirmed Bookings waiting for Docs</span>
                                        </div>
                                    </div>

                                    {/* Lifecycle Column 4 */}
                                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col hidden md:flex">
                                        <div className="p-3 border-b border-slate-100 flex items-center gap-2">
                                            <CheckCircle2 className="w-3 h-3 text-slate-400" />
                                            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Docs Sent</span>
                                            <span className="ml-auto text-xs font-bold text-slate-400">04</span>
                                        </div>
                                        <div className="p-2 space-y-1.5 flex-1 bg-slate-50/50">
                                            <div className="bg-slate-100 border border-slate-200 p-2 rounded flex justify-between items-center text-slate-500">
                                                <span className="text-xs font-semibold">B. Miller - Safari</span>
                                                <CheckCircle2 className="w-3 h-3" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Tour Inventory Grid */}
                            <section>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Tour Inventory Grid</h3>
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-50">Filter</button>
                                        <button className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-50">Sort</button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {/* Inventory Card 1 */}
                                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm group hover:shadow-md transition-shadow">
                                        <div className="h-48 bg-slate-200 relative overflow-hidden">
                                            <img src="https://images.unsplash.com/photo-1533587851505-d119e1319b7f?auto=format&fit=crop&q=80" alt="Amalfi Coast" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-black tracking-widest uppercase shadow-sm">
                                                Italy
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-black text-slate-900 text-lg">Amalfi Coast Explorer</h4>
                                                <span className="text-lg font-black text-[#00b4f0]">₹2,49,900</span>
                                            </div>
                                            <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5 mb-6">
                                                <Clock className="w-4 h-4" /> 7 Days <span className="text-slate-300">•</span> Luxury Accommodations
                                            </p>

                                            <div className="mb-6">
                                                <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider mb-2">
                                                    <span className="text-[#00b4f0]">Availability</span>
                                                    <span className="text-slate-900">12/20 Seats</span>
                                                </div>
                                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-[#00b4f0] rounded-full" style={{ width: '60%' }}></div>
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <button className="flex-1 bg-slate-900 text-white font-bold py-2.5 rounded-lg text-sm hover:bg-slate-800 transition-colors shadow-sm">
                                                    Quick Book
                                                </button>
                                                <button className="px-3 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                                                    <Settings className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Inventory Card 2 */}
                                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm group hover:shadow-md transition-shadow">
                                        <div className="h-48 bg-slate-200 relative overflow-hidden">
                                            <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80" alt="Kyoto Cherry Blossom" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0" />
                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-black tracking-widest uppercase shadow-sm">
                                                Japan
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-black text-slate-900 text-lg">Kyoto Cherry Blossom</h4>
                                                <span className="text-lg font-black text-[#00b4f0]">₹1,85,000</span>
                                            </div>
                                            <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5 mb-6">
                                                <Clock className="w-4 h-4" /> 5 Days <span className="text-slate-300">•</span> Guided Photography
                                            </p>

                                            <div className="mb-6">
                                                <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider mb-2">
                                                    <span className="text-red-500">Availability</span>
                                                    <span className="text-red-600">18/20 Seats (Filling Fast!)</span>
                                                </div>
                                                <div className="h-2 w-full bg-red-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-red-500 rounded-full" style={{ width: '90%' }}></div>
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <button className="flex-1 bg-slate-900 text-white font-bold py-2.5 rounded-lg text-sm hover:bg-slate-800 transition-colors shadow-sm">
                                                    Quick Book
                                                </button>
                                                <button className="px-3 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                                                    <Settings className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </section>
                        </div>

                        {/* Right Column (Controls & Upsell) */}
                        <div className="space-y-6">

                            {/* Availability Control */}
                            <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg ring-1 ring-white/10">
                                <div className="flex items-center gap-3 mb-4">
                                    <Settings className="w-5 h-5 text-sky-400" />
                                    <h3 className="font-bold tracking-wide">Availability Control</h3>
                                </div>
                                <p className="text-slate-400 text-xs mb-6">Instantly toggle availability to manage last-minute capacity or overbooking.</p>

                                <div className="space-y-3">
                                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-sm">Amalfi (Jul 12)</p>
                                            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mt-0.5">Currently Open</p>
                                        </div>
                                        <div className="w-10 h-6 bg-[#00b4f0] rounded-full relative cursor-pointer shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
                                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 flex items-center justify-between opacity-70">
                                        <div>
                                            <p className="font-semibold text-sm">Kyoto (Apr 05)</p>
                                            <p className="text-[10px] text-red-400 font-bold uppercase tracking-wider mt-0.5">Sold Out</p>
                                        </div>
                                        <div className="w-10 h-6 bg-slate-700 rounded-full relative cursor-pointer shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
                                            <div className="absolute left-1 top-1 w-4 h-4 bg-slate-400 rounded-full shadow-sm"></div>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full mt-6 py-2.5 rounded-lg border border-slate-700 text-sm font-semibold hover:bg-slate-800 transition-colors">
                                    Manage All Dates
                                </button>
                            </div>

                            {/* Upsell Opportunities */}
                            <div className="bg-white border-2 border-sky-100 rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <TrendingUp className="w-5 h-5 text-sky-500" />
                                    <h3 className="font-bold tracking-wide uppercase text-sm text-slate-800">Upsell Opportunities</h3>
                                </div>
                                <p className="text-slate-500 text-xs mb-6">Travelers with flights but no tours booked in the same destination.</p>

                                <div className="space-y-4">
                                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold text-xs shrink-0">SJ</div>
                                            <div>
                                                <p className="font-bold text-sm text-slate-900 leading-tight">Sarah Jenkins</p>
                                                <p className="text-[10px] text-slate-500 mt-0.5">In Naples: Aug 12-19</p>
                                            </div>
                                        </div>
                                        <button className="w-full py-2 bg-[#00b4f0] text-white rounded-lg text-xs font-bold hover:bg-sky-400 transition-colors">
                                            Send Amalfi Offer
                                        </button>
                                    </div>

                                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs shrink-0">DC</div>
                                            <div>
                                                <p className="font-bold text-sm text-slate-900 leading-tight">David Chen</p>
                                                <p className="text-[10px] text-slate-500 mt-0.5">In Tokyo: Sep 20-25</p>
                                            </div>
                                        </div>
                                        <button className="w-full py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors">
                                            Send Kyoto Offer
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </main>
        </div>
    );
}
