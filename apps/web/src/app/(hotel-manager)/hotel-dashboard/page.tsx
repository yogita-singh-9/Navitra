'use client';

import { useEffect, useState } from 'react';
import {
    Building2,
    LayoutDashboard,
    CalendarDays,
    BarChart3,
    Users,
    Search,
    Bell,
    Settings,
    Plus,
    AlertTriangle,
    TrendingUp,
    TrendingDown,
    LogOut
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function HotelManagerDashboard() {
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

    const displayName = userName || 'Navitra Manager';
    const initial = displayName.charAt(0).toUpperCase();

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 font-display text-slate-900">

            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-200 bg-white flex flex-col hidden md:flex">
                <div className="p-6 flex items-center gap-3">
                    <div className="bg-[#00b4f0] rounded-lg w-10 h-10 flex items-center justify-center text-white shadow-sm">
                        <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-slate-900 text-base font-bold leading-tight uppercase tracking-wide truncate max-w-[140px]">
                            Navitra
                        </h1>
                        {/* Enterprise SaaS removed */}
                    </div>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1">
                    <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#00b4f0]/10 text-[#00b4f0]" href="/hotel-dashboard">
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="text-sm font-medium">Home</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors" href="/bookings">
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
                <div className="p-4 border-t border-slate-200">
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

            <main className="flex-1 flex flex-col overflow-y-auto">

                {/* Header removed as requested */}

                <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">

                    {/* Alert Protector */}
                    <div className="grid grid-cols-1">
                        <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-red-100 rounded-lg text-red-600">
                                    <AlertTriangle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-red-900 font-bold text-base">Overbooking Risk Protector</h3>
                                    <p className="text-red-700 text-sm">Action Required: 3 room types are currently at &gt;90% capacity. Potential double-booking detected in Standard Suite.</p>
                                </div>
                            </div>
                            <div className="flex gap-2 shrink-0">
                                <button className="px-4 py-2 bg-white border border-red-200 text-red-700 rounded-lg text-sm font-bold hover:bg-red-50 transition-colors">View Affected</button>
                                <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-colors shadow-sm shadow-red-500/20">Resolve Now</button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                        {/* Navitra Pricing Engine */}
                        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-bold">Navitra Pricing Engine</h3>
                                    <p className="text-sm text-slate-500">Live price adjustments based on real-time occupancy</p>
                                </div>
                                {/* Manual / Auto removed as requested */}
                            </div>

                            {/* Chart Placeholder */}
                            <div className="h-64 relative mt-4">
                                <div className="absolute inset-0 flex items-end gap-2 px-2">
                                    {[40, 60, 80, 100, 70, 50, 30].map((h, i) => (
                                        <div key={i} className="w-full bg-slate-100 rounded-t h-full relative group flex items-end">
                                            <div
                                                className="w-full bg-[#00b4f0]/40 rounded-t transition-all duration-500 relative"
                                                style={{ height: `${h}%` }}
                                            >
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10">Occ: {h}%</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Line graph overlay mock */}
                                <svg className="absolute inset-0 h-full w-full pointer-events-none" preserveAspectRatio="none">
                                    <path d="M 0 180 Q 150 160 300 120 T 600 80 T 900 150" fill="none" stroke="#00b4f0" strokeDasharray="5,5" strokeWidth="3"></path>
                                </svg>

                                <div className="absolute top-0 right-0 flex flex-col gap-2 bg-white/80 p-2 rounded backdrop-blur-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 bg-[#00b4f0]/40 rounded-sm"></span>
                                        <span className="text-xs font-semibold text-slate-500">Occupancy %</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 border-t-2 border-[#00b4f0] border-dashed inline-block"></span>
                                        <span className="text-xs font-semibold text-slate-500">Price Adjustment</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mt-6">
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Avg. Occupancy</span>
                                    <p className="text-2xl font-black mt-1 text-slate-800">78.4%</p>
                                    <span className="text-green-500 text-xs font-bold flex items-center gap-1 mt-1">
                                        <TrendingUp className="w-3 h-3" /> +4.2%
                                    </span>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">RevPAR</span>
                                    <p className="text-2xl font-black mt-1 text-slate-800">₹15,420</p>
                                    <span className="text-green-500 text-xs font-bold flex items-center gap-1 mt-1">
                                        <TrendingUp className="w-3 h-3" /> +12%
                                    </span>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">ADR</span>
                                    <p className="text-2xl font-black mt-1 text-slate-800">₹19,300</p>
                                    <span className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1">
                                        <TrendingDown className="w-3 h-3" /> -2.1%
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Room Heatmap */}
                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-bold">Room Heatmap</h3>
                                    <p className="text-sm text-slate-500">Live floor status</p>
                                </div>
                                <select className="bg-slate-100 border-none rounded-lg text-xs font-bold py-1.5 px-3 outline-none text-slate-700">
                                    <option>Floor 1</option>
                                    <option>Floor 2</option>
                                    <option>Floor 3</option>
                                </select>
                            </div>

                            {/* Grid map */}
                            <div className="grid grid-cols-5 gap-2 flex-1 content-start">
                                {[...Array(25)].map((_, i) => {
                                    const num = 101 + i;
                                    // Randomly assign some statuses for demo
                                    const isClean = [113].includes(num); // Cleaning
                                    const isVacant = [103, 107, 108, 114, 115, 121, 122, 125].includes(num);
                                    const isVIP = num === 120;

                                    let bgState = 'bg-red-500 text-white'; // Occupied default
                                    let statusTitle = `Room ${num} - Occupied`;

                                    if (isVacant) {
                                        bgState = 'bg-slate-100 text-slate-800 hover:bg-slate-200';
                                        statusTitle = `Room ${num} - Vacant`;
                                    } else if (isClean) {
                                        bgState = 'bg-orange-400 text-white';
                                        statusTitle = `Room ${num} - Cleaning`;
                                    } else if (isVIP) {
                                        bgState = 'bg-[#00b4f0] text-white shadow-md shadow-sky-500/40';
                                        statusTitle = `Room ${num} - VIP Arrival`;
                                    }

                                    return (
                                        <div
                                            key={num}
                                            className={`aspect-square rounded-md flex items-center justify-center text-[11px] font-bold cursor-pointer transition-transform hover:scale-105 ${bgState}`}
                                            title={statusTitle}
                                        >
                                            {num}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-8 space-y-3">
                                <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                        <span className="font-semibold text-slate-600">Occupied (15)</span>
                                    </div>
                                    <span className="font-bold">60%</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-slate-200 rounded-full"></span>
                                        <span className="font-semibold text-slate-600">Vacant (8)</span>
                                    </div>
                                    <span className="font-bold">32%</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                                        <span className="font-semibold text-slate-600">Cleaning (1)</span>
                                    </div>
                                    <span className="font-bold">4%</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-[#00b4f0] rounded-full"></span>
                                        <span className="font-semibold text-slate-600">VIP (1)</span>
                                    </div>
                                    <span className="font-bold">4%</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Reservations Table */}
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-lg font-bold">Navitra Reservations</h3>
                            <button className="text-sm font-bold text-[#00b4f0] hover:underline">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs uppercase tracking-wider">
                                        <th className="px-6 py-4 font-bold">Guest Name</th>
                                        <th className="px-6 py-4 font-bold">Property</th>
                                        <th className="px-6 py-4 font-bold">Check-In</th>
                                        <th className="px-6 py-4 font-bold">Status</th>
                                        <th className="px-6 py-4 font-bold text-right">Rate</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-[#00b4f0]/10 flex items-center justify-center text-[#00b4f0] font-bold text-xs">JS</div>
                                                <span className="text-sm font-bold text-slate-800">Jordan Smith</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-600">Standard Suite</td>
                                        <td className="px-6 py-4 text-sm text-slate-500 font-medium">Oct 24, 2023</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-wide">Confirmed</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-black text-slate-800 text-right">₹37,500</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">MA</div>
                                                <span className="text-sm font-bold text-slate-800">Maria Alvarez</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-600">Deluxe Room</td>
                                        <td className="px-6 py-4 text-sm text-slate-500 font-medium">Oct 25, 2023</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 bg-[#00b4f0]/20 text-[#00b4f0] text-[10px] font-bold rounded-full uppercase tracking-wide">Checked In</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-black text-slate-800 text-right">₹26,800</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs">LB</div>
                                                <span className="text-sm font-bold text-slate-800">Liam Brown</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-600">Standard Suite</td>
                                        <td className="px-6 py-4 text-sm text-slate-500 font-medium">Oct 24, 2023</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 bg-red-100 text-red-700 text-[10px] font-bold rounded-full uppercase tracking-wide">Alert</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-black text-slate-800 text-right">₹42,000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
