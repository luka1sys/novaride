import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useBooking } from "../contexts/BookingContext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    IconCar, IconCalendarStats, IconSettings,
    IconLogout, IconMenu2, IconActivity, IconMapPin, IconCrown, IconUser, IconMail, IconId
} from "@tabler/icons-react";
import ChangePassword from "./ChangePassword"; // დაიმპორტე შენი კომპონენტი

const Panel = () => {
    const { logout, user } = useAuth();
    const { myBookings } = useBooking();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("dashboard"); // სტეიტი ტაბების გადასართავად

    const accentColor = "rgb(254, 154, 0)";

    return (
        <div className="flex h-screen bg-[#050505] font-sans text-white overflow-hidden pt-[80px] md:pt-[90px] relative z-[10]">
            {/* --- BACKGROUND GLOW EFFECT --- */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[rgb(254,154,0)]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[300px] h-[300px] bg-[rgb(254,154,0)]/10 blur-[100px] rounded-full pointer-events-none" />

            {/* --- MOBILE OVERLAY --- */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[150] md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* --- SIDEBAR --- */}
            <aside className={`
                fixed md:relative z-[160]
                w-72 bg-[#0A0A0A] border-r border-white/5 
                flex flex-col transition-all duration-500 ease-in-out
                h-full
                ${isSidebarOpen ? "left-0" : "-left-full md:left-0"}
            `}>
                <div className="p-8 mb-4">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/20 transition-transform group-hover:scale-110" style={{ backgroundColor: accentColor }}>
                            <IconActivity size={20} color="black" stroke={3} />
                        </div>
                        <span className="text-xl font-black italic tracking-tighter uppercase">Nexus</span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto no-scrollbar">
                    <p className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 mb-4">User Menu</p>
                    
                    <button 
                        onClick={() => { setActiveTab("dashboard"); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${activeTab === 'dashboard' ? 'bg-white/5 text-white' : 'text-gray-500 hover:bg-white/5'}`}
                    >
                        <span style={{ color: activeTab === 'dashboard' ? accentColor : 'inherit' }}><IconActivity size={20} /></span>
                        Dashboard
                    </button>

                    <div className="pt-8 mt-8 border-t border-white/5 space-y-1.5">
                        <p className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 mb-4">Settings</p>
                        <button 
                            onClick={() => { setActiveTab("settings"); setIsSidebarOpen(false); }}
                            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all group ${activeTab === 'settings' ? 'bg-white/5 text-white' : 'text-gray-500 hover:bg-white/5'}`}
                        >
                            <IconSettings size={20} className={activeTab === 'settings' ? "text-[#FE9A00]" : "group-hover:rotate-45 transition-transform"} />
                            Profile Config
                        </button>
                        <button
                            onClick={logout}
                            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold text-red-500/70 hover:bg-red-500/5 transition-all"
                        >
                            <IconLogout size={20} />
                            Terminate Session
                        </button>
                    </div>
                </nav>

                <div className="p-6">
                    <div className="bg-white/[0.03] border border-white/5 rounded-[24px] p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-yellow-400 p-[1px]">
                            <div className="w-full h-full bg-black rounded-xl flex items-center justify-center font-bold text-xs text-white uppercase">
                                {user?.fullname?.charAt(0) || 'U'}
                            </div>
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-bold truncate text-white">{user?.fullname}</p>
                            <p className="text-[9px] font-black uppercase tracking-tighter text-gray-500">{user?.role || 'Client'}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 flex flex-col h-full overflow-y-auto no-scrollbar relative z-10">
                
                <header className="h-20 flex items-center justify-between px-8 md:px-12 sticky top-0 z-40 backdrop-blur-md bg-[#050505]/60 border-b border-white/5">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-3 bg-white/5 rounded-xl border border-white/10">
                            <IconMenu2 size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-black uppercase tracking-tighter italic">
                                {activeTab === "dashboard" ? "Overview " : "Profile "} 
                                <span className="text-gray-600">{activeTab === "dashboard" ? "Dashboard" : "Security"}</span>
                            </h1>
                            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">
                                {activeTab === "dashboard" ? `Welcome back, ${user?.fullname?.split(' ')[0]}!` : "Manage your credentials"}
                            </p>
                        </div>
                    </div>
                </header>

                <div className="p-8 md:p-12 pt-6">
                    <AnimatePresence mode="wait">
                        {activeTab === "dashboard" ? (
                            <motion.div 
                                key="dashboard"
                                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                            >
                                {/* STATS GRID */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                                    <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-[32px] group">
                                        <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center mb-4 text-[#FE9A00]"><IconCalendarStats /></div>
                                        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Active Bookings</p>
                                        <p className="text-3xl font-black mt-1 italic">{myBookings.length}</p>
                                    </div>
                                    <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-[32px] group">
                                        <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center mb-4 text-white"><IconMapPin /></div>
                                        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Distance Covered</p>
                                        <p className="text-3xl font-black mt-1 italic">1,240 <span className="text-sm text-gray-600">km</span></p>
                                    </div>
                                    <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-[32px] group">
                                        <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center mb-4 text-green-500"><IconCrown /></div>
                                        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Tier Status</p>
                                        <p className="text-3xl font-black mt-1 italic uppercase">VIP</p>
                                    </div>
                                </div>

                                {/* TABLE HISTORY */}
                                <div className="bg-[#0A0A0A] rounded-[40px] border border-white/5 overflow-hidden">
                                    {/* ... შენი არსებული ცხრილის კოდი აქ ... */}
                                    <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Booking History</h3>
                                    </div>
                                    <div className="p-8 text-center text-gray-600 italic tracking-widest uppercase text-xs">
                                        {myBookings.length > 0 ? "Rendering data terminal..." : "No active records detection"}
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="settings"
                                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
                            >
                                {/* მარცხნივ იუზერის ინფო */}
                                <div className="space-y-6">
                                    <div className="bg-[#0A0A0A] border border-white/5 rounded-[40px] p-8 md:p-10 shadow-xl relative overflow-hidden">
                                        <div className="absolute -top-10 -right-10 opacity-[0.03] text-white"><IconUser size={200} /></div>
                                        <h3 className="text-lg font-black uppercase tracking-tighter italic text-white mb-8 flex items-center gap-2">
                                            <IconId className="text-[#FE9A00]" /> Account <span className="text-[#FE9A00]">Identity</span>
                                        </h3>
                                        <div className="space-y-6 relative z-10">
                                            <div>
                                                <p className="text-[10px] uppercase font-black text-gray-600 tracking-widest mb-1">Full Name</p>
                                                <div className="flex items-center gap-3"><IconUser size={18} className="text-gray-400" /><p className="text-white font-bold">{user?.fullname}</p></div>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase font-black text-gray-600 tracking-widest mb-1">Email</p>
                                                <div className="flex items-center gap-3"><IconMail size={18} className="text-gray-400" /><p className="text-white font-bold">{user?.email}</p></div>
                                            </div>
                                            <div className="pt-4 border-t border-white/5">
                                                <span className="text-[10px] font-black text-[#FE9A00] uppercase tracking-[0.2em] bg-[#FE9A00]/10 px-4 py-2 rounded-full border border-[#FE9A00]/20">
                                                    {user?.role || 'Standard User'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-[#FE9A00]/5 border border-[#FE9A00]/10 rounded-3xl p-6 italic text-[11px] text-gray-400">
                                        * Security changes are logged. Your current session will remain active after password update.
                                    </div>
                                </div>

                                {/* მარჯვნივ შენი ფორმა */}
                                <ChangePassword />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default Panel;