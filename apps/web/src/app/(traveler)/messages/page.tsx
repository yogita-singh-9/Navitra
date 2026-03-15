'use client';

import { useState, useEffect } from 'react';
import {
    Compass,
    Home,
    Luggage,
    Building2,
    LayoutDashboard,
    Map as MapIcon,
    MapPin,
    MessageSquare,
    User,
    Search,
    Filter,
    Video,
    Phone,
    BellOff,
    MoreVertical,
    Paperclip,
    Smile,
    Send,
    CheckCheck,
    Check
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function TravelerMessages() {
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

    const displayName = userName || 'Traveler Account';
    const initial = displayName.charAt(0).toUpperCase();

    return (
        <div className="flex h-screen bg-white font-display text-slate-900 overflow-hidden">

            {/* Sidebar - Matching Traveler Dashboard Structure */}
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
                    <a className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors" href="/explore">
                        <MapPin className="w-5 h-5" />
                        <span>Explore</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-3 rounded-lg bg-sky-50 text-[#00AEEF] font-semibold" href="/messages">
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

            {/* Main Messaging Interface */}
            <main className="flex-1 flex flex-col md:flex-row overflow-hidden bg-white">

                {/* Contacts List / Threads (Left Pane) */}
                <section className="w-full md:w-[340px] border-r border-slate-200 flex flex-col bg-slate-50/50 shrink-0">

                    <div className="p-5 border-b border-slate-200 bg-white">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-black text-slate-900 tracking-tight">Messages</h2>
                            <button className="flex items-center gap-1.5 text-xs font-bold text-[#00b4f0] hover:text-sky-600 transition-colors">
                                <Filter className="w-3 h-3" />
                                FILTER
                            </button>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input
                                className="w-full bg-slate-100/80 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#00b4f0]/50 outline-none text-slate-800 placeholder:text-slate-400 transition-all font-medium"
                                placeholder="Search hotels, agents..."
                                type="text"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {/* Active Thread */}
                        <div className="flex items-start gap-3 p-4 bg-white border-l-4 border-l-[#00b4f0] border-b border-b-slate-100 cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.02)] transition-colors hover:bg-slate-50">
                            <div className="relative shrink-0">
                                <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 bg-slate-100">
                                    <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80" alt="Grand Hotel" className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                            </div>
                            <div className="flex-1 min-w-0 pt-0.5">
                                <div className="flex justify-between items-center mb-0.5">
                                    <h3 className="font-bold text-slate-900 text-sm truncate pr-2">The Grand Hotel Front Desk</h3>
                                    <span className="text-[10px] font-bold text-slate-400 shrink-0">11:02 PM</span>
                                </div>
                                <p className="text-xs font-semibold tracking-wide text-[#00b4f0] mb-0.5 truncate">
                                    Late Check-in | Booking #892AX
                                </p>
                                <p className="text-xs text-slate-500 truncate font-medium">
                                    Perfect, thank you! One more thing...
                                </p>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-[#00b4f0] mt-2 shrink-0"></div>
                        </div>

                        {/* Unread Thread */}
                        <div className="flex items-start gap-3 p-4 bg-white border-b border-b-slate-100 cursor-pointer hover:bg-slate-50 transition-colors">
                            <div className="relative shrink-0">
                                <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 bg-slate-100">
                                    <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80" alt="Tour Guide" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0 pt-0.5">
                                <div className="flex justify-between items-center mb-0.5">
                                    <h3 className="font-bold text-slate-900 text-sm truncate pr-2">Anna (Amalfi Guide)</h3>
                                    <span className="text-[10px] font-bold text-slate-400 shrink-0">2m ago</span>
                                </div>
                                <p className="text-xs font-semibold tracking-wide text-slate-600 mb-0.5 truncate">
                                    Meeting Point Update
                                </p>
                                <p className="text-xs text-slate-500 truncate">
                                    We will meet at the port at 9:00 AM instead of 8:30.
                                </p>
                            </div>
                        </div>

                        {/* Read Threads */}
                        <div className="flex items-start gap-3 p-4 bg-white border-b border-b-slate-100 cursor-pointer hover:bg-slate-50 transition-colors">
                            <div className="relative shrink-0">
                                <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
                                    <Building2 className="w-6 h-6 text-slate-400" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0 pt-0.5">
                                <div className="flex justify-between items-center mb-0.5">
                                    <h3 className="font-bold text-slate-900 text-sm truncate pr-2">Villa Serenity</h3>
                                    <span className="text-[10px] font-bold text-slate-400 shrink-0">1h ago</span>
                                </div>
                                <p className="text-xs font-semibold tracking-wide text-slate-600 mb-0.5 truncate">
                                    Airport Transfer
                                </p>
                                <p className="text-xs text-slate-400 truncate">
                                    Yes, the driver will hold a sign with your name.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-white border-b border-b-slate-100 cursor-pointer hover:bg-slate-50 transition-colors">
                            <div className="relative shrink-0">
                                <div className="w-12 h-12 rounded-full bg-[#00b4f0]/10 flex items-center justify-center border border-slate-200 text-[#00b4f0] font-bold text-sm">
                                    NS
                                </div>
                                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-slate-300 border-2 border-white rounded-full"></div>
                            </div>
                            <div className="flex-1 min-w-0 pt-0.5">
                                <div className="flex justify-between items-center mb-0.5">
                                    <h3 className="font-bold text-slate-900 text-sm truncate pr-2">Navitra Support</h3>
                                    <span className="text-[10px] font-bold text-slate-400 shrink-0">Yesterday</span>
                                </div>
                                <p className="text-xs font-semibold tracking-wide text-slate-600 mb-0.5 truncate">
                                    Refund Status
                                </p>
                                <p className="text-xs text-slate-400 truncate">
                                    Your refund for flight AF192 has been processed.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Messaging Canvas (Right Pane) */}
                <section className="flex-1 flex flex-col bg-white">

                    {/* Chat Header */}
                    <div className="h-20 px-6 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                                <h2 className="font-black text-lg text-slate-900">The Grand Hotel Front Desk</h2>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Active Front Desk</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                                <Video className="w-5 h-5 fill-slate-200" />
                            </button>
                            <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                                <Phone className="w-5 h-5 fill-slate-200" />
                            </button>
                            <div className="w-px h-6 bg-slate-200 mx-1"></div>
                            <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                                <BellOff className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Chat Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-slate-50/30">

                        {/* Time Divider */}
                        <div className="flex justify-center my-2">
                            <span className="px-4 py-1 bg-slate-100 text-[10px] font-bold text-slate-400 rounded-full uppercase tracking-widest">
                                Yesterday, Oct 24
                            </span>
                        </div>

                        {/* Sent Message (From Traveler - Alex Rivero context) */}
                        <div className="flex flex-col items-end gap-1">
                            <div className="max-w-[75%] bg-white border border-slate-200 text-slate-700 px-5 py-3 rounded-2xl rounded-tr-sm shadow-sm font-medium leading-relaxed text-[13px]">
                                Hi Grand Hotel Team, I just wanted to let you know that my flight was delayed. I'll probably be arriving around 11 PM tonight.
                            </div>
                            <div className="flex items-center gap-1.5 mr-1 text-[10px] text-slate-400 font-semibold tracking-wide">
                                10:45 PM <CheckCheck className="w-3.5 h-3.5 text-sky-400" />
                            </div>
                        </div>

                        {/* Received Message (From Hotel) */}
                        <div className="flex flex-col items-start gap-1 mt-2">
                            <div className="flex items-end gap-3 max-w-[85%]">
                                <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 shrink-0 mb-1">
                                    <img src="https://images.unsplash.com/photo-1542314831-c53cd6b7608b?auto=format&fit=crop&q=80" alt="Hotel Staff" className="w-full h-full object-cover" />
                                </div>
                                <div className="bg-[#00b4f0] text-white px-5 py-3 rounded-2xl rounded-tl-sm shadow-sm font-medium leading-relaxed text-[13px]">
                                    Hello {displayName.split(' ')[0]}! Thanks for letting us know. We've marked your reservation for a late arrival. Our 24/7 front desk will be ready to check you in whenever you arrive. Travel safely!
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 ml-11 text-[10px] text-slate-400 font-semibold tracking-wide">
                                10:52 PM
                            </div>
                        </div>

                        {/* Time Divider */}
                        <div className="flex justify-center my-4">
                            <span className="px-3 py-1 bg-sky-50 text-[10px] font-bold text-[#00b4f0] rounded-full uppercase tracking-widest border border-sky-100 shadow-sm">
                                New Message
                            </span>
                        </div>

                        {/* Sent Message (From Traveler) */}
                        <div className="flex flex-col items-end gap-1 mb-2">
                            <div className="max-w-[75%] bg-white border border-slate-200 text-slate-700 px-5 py-3 rounded-2xl rounded-tr-sm shadow-sm font-medium leading-relaxed text-[13px]">
                                Perfect, thank you! One more thing, is it possible to have some extra pillows in the room? I have some back issues.
                            </div>
                            <div className="flex items-center gap-1.5 mr-1 text-[10px] text-[#00b4f0] font-semibold tracking-wide">
                                11:02 PM <Check className="w-3.5 h-3.5" />
                            </div>
                        </div>

                        {/* Padding buffer to keep input from covering last message */}
                        <div className="pb-4"></div>
                    </div>

                    {/* Input Area */}
                    <div className="border-t border-slate-200 bg-white p-4 shrink-0">

                        {/* Smart Replies */}
                        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                            <button className="px-4 py-1.5 rounded-full border border-sky-200 text-sky-600 bg-sky-50 hover:bg-sky-100 text-xs font-bold whitespace-nowrap transition-colors">
                                Request Early Check-in
                            </button>
                            <button className="px-4 py-1.5 rounded-full border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 text-xs font-bold whitespace-nowrap transition-colors">
                                Room Service Menu
                            </button>
                            <button className="px-4 py-1.5 rounded-full border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 text-xs font-bold whitespace-nowrap transition-colors">
                                Pool Hours
                            </button>
                            <button className="px-4 py-1.5 rounded-full border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 text-xs font-bold whitespace-nowrap transition-colors">
                                Wifi Password
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            <button className="p-2.5 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors shrink-0">
                                <Paperclip className="w-5 h-5" />
                            </button>

                            <div className="flex-1 bg-white border border-slate-200 rounded-full flex items-center pr-1.5 pl-4 shadow-sm focus-within:ring-2 focus-within:ring-[#00b4f0]/50 focus-within:border-[#00b4f0] transition-all">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    className="w-full bg-transparent border-none outline-none py-3 text-[13px] font-medium text-slate-800 placeholder:text-slate-400"
                                />
                                <button className="p-2 text-slate-400 hover:text-[#00b4f0] transition-colors shrink-0">
                                    <Smile className="w-5 h-5" />
                                </button>
                            </div>

                            <button className="bg-[#00b4f0] hover:bg-sky-400 text-white p-3 rounded-full flex items-center justify-center shrink-0 shadow-md transition-colors transform hover:scale-105 active:scale-95">
                                <Send className="w-5 h-5 ml-0.5" />
                            </button>
                        </div>

                    </div>
                </section>

            </main>
        </div>
    );
}
