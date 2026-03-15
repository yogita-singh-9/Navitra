'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Building2,
    LayoutDashboard,
    CalendarDays,
    BarChart3,
    Users,
    Filter,
    Download,
    Plus,
    Trash2,
    UserCog,
    Ban,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    LogOut,
    X
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function HotelStaffDirectory() {
    const [userName, setUserName] = useState<string>('');
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
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

    const staffData = [
        { id: 'EMP-042', name: 'Sarah Jenkins', email: 's.jenkins@vanguard.com', dept: 'Operations', role: 'Admin', roleColor: 'bg-sky-100 text-[#00b4f0]', checked: true, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150' },
        { id: 'EMP-118', name: 'Marcus Chen', email: 'm.chen@vanguard.com', dept: 'Hospitality', role: 'Manager', roleColor: 'bg-emerald-100 text-emerald-600', checked: true, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150' },
        { id: 'EMP-089', name: 'Elena Rodriguez', email: 'e.rodriguez@vanguard.com', dept: 'Front Desk', role: 'Staff', roleColor: 'bg-slate-100 text-slate-600', checked: false, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150' },
        { id: 'EMP-234', name: 'Jamie Wilson', email: 'j.wilson@vanguard.com', dept: 'Maintenance', role: 'Technician', roleColor: 'bg-amber-100 text-amber-600', checked: false, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150' },
        { id: 'EMP-015', name: 'Amira Khan', email: 'a.khan@vanguard.com', dept: 'Operations', role: 'Super User', roleColor: 'bg-purple-100 text-purple-600', checked: false, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150' },
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 font-display text-slate-900">

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
                    <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors" href="/analytics">
                        <BarChart3 className="w-5 h-5" />
                        <span className="text-sm font-medium">Analytics</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#00b4f0]/10 text-[#00b4f0]" href="/staff">
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
                <div className="p-8 max-w-6xl mx-auto w-full space-y-8">

                    {/* Page Header */}
                    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-2">Staff Directory</h2>
                            <p className="text-slate-500 text-sm font-medium">Manage enterprise-wide staff members, roles, and bulk permissions.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                                <Filter className="w-4 h-4" />
                                Filter
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                                <Download className="w-4 h-4" />
                                Export
                            </button>
                            <button
                                onClick={() => setIsInviteModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-[#00b4f0] hover:bg-sky-400 text-white rounded-lg text-sm font-bold shadow-sm transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Invite Staff
                            </button>
                        </div>
                    </header>

                    {/* Main White Box Container */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

                        {/* Bulk Actions Banner */}
                        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">BULK ACTIONS:</span>
                                <div className="flex items-center gap-2">
                                    <button className="flex flex-col items-center justify-center w-20 h-16 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-colors gap-1.5 text-slate-600">
                                        <Trash2 className="w-4 h-4" />
                                        <span className="text-[10px] font-bold">Delete</span>
                                    </button>
                                    <button className="flex flex-col items-center justify-center w-24 h-16 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-colors gap-1.5 text-slate-600">
                                        <UserCog className="w-4 h-4" />
                                        <span className="text-[10px] font-bold">Change Role</span>
                                    </button>
                                    <button className="flex flex-col items-center justify-center w-24 h-16 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-colors gap-1.5 text-slate-600">
                                        <Ban className="w-4 h-4" />
                                        <span className="text-[10px] font-bold">Deactivate</span>
                                    </button>
                                </div>
                            </div>
                            <span className="text-sm font-medium text-slate-500 italic">2 staff members selected</span>
                        </div>

                        {/* Table Header */}
                        <div className="grid grid-cols-12 px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                            <div className="col-span-1 border-r border-transparent">
                                <div className="w-4 h-4 rounded border border-slate-300 bg-white"></div>
                            </div>
                            <div className="col-span-3">
                                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">STAFF MEMBER</span>
                            </div>
                            <div className="col-span-3">
                                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">EMAIL</span>
                            </div>
                            <div className="col-span-2">
                                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">DEPARTMENT</span>
                            </div>
                            <div className="col-span-2">
                                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">PERMISSIONS</span>
                            </div>
                            <div className="col-span-1 text-right">
                                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">ACTIONS</span>
                            </div>
                        </div>

                        {/* Table Body */}
                        <div className="divide-y divide-slate-100">
                            {staffData.map((staff, idx) => (
                                <div key={idx} className="grid grid-cols-12 items-center px-6 py-4 hover:bg-slate-50/50 transition-colors">
                                    <div className="col-span-1">
                                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${staff.checked ? 'bg-[#00b4f0] border-[#00b4f0]' : 'bg-white border-slate-300'}`}>
                                            {staff.checked && (
                                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-span-3 flex items-center gap-3">
                                        <img src={staff.avatar} alt={staff.name} className="w-10 h-10 rounded-full object-cover border border-slate-100" />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-900 leading-tight">{staff.name}</span>
                                            <span className="text-[10px] font-medium text-slate-400">ID: {staff.id}</span>
                                        </div>
                                    </div>
                                    <div className="col-span-3">
                                        <span className="text-sm font-medium text-slate-600">{staff.email}</span>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-sm font-medium text-slate-600">{staff.dept}</span>
                                    </div>
                                    <div className="col-span-2">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide ${staff.roleColor}`}>
                                            {staff.role}
                                        </span>
                                    </div>
                                    <div className="col-span-1 flex justify-end">
                                        <button className="text-sm font-bold text-[#00b4f0] hover:text-sky-600 transition-colors">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Footer */}
                        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                            <p className="text-sm font-medium text-slate-500">
                                Showing <span className="font-bold text-slate-800">1-5</span> of <span className="font-bold text-slate-800">124</span> staff members
                            </p>
                            <div className="flex items-center gap-1">
                                <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#00b4f0] text-white text-sm font-bold shadow-sm">
                                    1
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 text-sm font-medium transition-colors">
                                    2
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 text-sm font-medium transition-colors">
                                    3
                                </button>
                                <span className="w-8 h-8 flex items-center justify-center text-slate-400 tracking-widest text-sm">...</span>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 text-sm font-medium transition-colors">
                                    25
                                </button>
                                <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* Bottom Padding spacer */}
                    <div className="pb-10"></div>
                </div>
            </main>

            {/* Invite Staff Modal Overlay */}
            {isInviteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-xl font-black text-slate-900">Invite new staff</h3>
                            <button
                                onClick={() => setIsInviteModalOpen(false)}
                                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. John Doe"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00b4f0]/20 focus:border-[#00b4f0] transition-all"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="john@vanguard.com"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00b4f0]/20 focus:border-[#00b4f0] transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">Department</label>
                                    <div className="relative">
                                        <select className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#00b4f0]/20 focus:border-[#00b4f0] transition-all cursor-pointer">
                                            <option>Operations</option>
                                            <option>Hospitality</option>
                                            <option>Front Desk</option>
                                            <option>Maintenance</option>
                                        </select>
                                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">Role</label>
                                    <div className="relative">
                                        <select className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#00b4f0]/20 focus:border-[#00b4f0] transition-all cursor-pointer">
                                            <option>Admin</option>
                                            <option>Manager</option>
                                            <option>Staff</option>
                                            <option>Technician</option>
                                            <option>Super User</option>
                                        </select>
                                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                            <button
                                onClick={() => setIsInviteModalOpen(false)}
                                className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button className="px-5 py-2.5 bg-[#00b4f0] hover:bg-sky-400 text-white rounded-lg text-sm font-bold shadow-sm shadow-[#00b4f0]/20 transition-all">
                                Send Invitation
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
