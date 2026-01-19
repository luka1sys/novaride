import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useBooking } from "../contexts/BookingContext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    IconCar, IconCalendarStats, IconSettings,
    IconLogout, IconMenu2, IconActivity, IconMapPin, IconCrown, IconUser, IconMail, IconId
} from "@tabler/icons-react";
import ChangePassword from "../components/ChangePasswordForm";

const Panel = () => {
    const { logout, user } = useAuth();
    const { myBookings } = useBooking();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("dashboard");

    const accentColor = "rgb(254, 154, 0)";

    return (
        <div className="flex h-screen bg-[#050505] font-sans text-white overflow-hidden pt-[80px] md:pt-[90px] relative z-[10]">
            {/* BACKGROUND EFFECTS */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[rgb(254,154,0)]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[300px] h-[300px] bg-[rgb(254,154,0)]/10 blur-[100px] rounded-full pointer-events-none" />

            {/* SIDEBAR */}
            <aside className={`fixed md:relative z-[160] w-72 bg-[#0A0A0A] border-r border-white/5 flex flex-col transition-all duration-500 h-full ${isSidebarOpen ? "left-0" : "-left-full md:left-0"}`}>
                <div className="p-8 mb-4">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/20" style={{ backgroundColor: accentColor }}>
                            <IconActivity size={20} color="black" stroke={3} />
                        </div>
                        <span className="text-xl font-black italic tracking-tighter uppercase">Nexus</span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-1.5">
                    <button 
                        onClick={() => { setActiveTab("dashboard"); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${activeTab === 'dashboard' ? 'bg-white/5 text-white' : 'text-gray-500 hover:bg-white/5'}`}
                    >
                        <IconActivity size={20} style={{ color: activeTab === 'dashboard' ? accentColor : '' }} />
                        Dashboard
                    </button>
                    <button 
                        onClick={() => { setActiveTab("settings"); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${activeTab === 'settings' ? 'bg-white/5 text-white' : 'text-gray-500 hover:bg-white/5'}`}
                    >
                        <IconSettings size={20} style={{ color: activeTab === 'settings' ? accentColor : '' }} />
                        Profile Config
                    </button>
                    <button onClick={logout} className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold text-red-500/70 hover:bg-red-500/5 transition-all">
                        <IconLogout size={20} />
                        Terminate Session
                    </button>
                </nav>

                <div className="p-6">
                    <div className="bg-white/[0.03] border border-white/5 rounded-[24px] p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-yellow-400 p-[1px]">
                            <div className="w-full h-full bg-black rounded-xl flex items-center justify-center font-bold text-xs">
                                {user?.fullname?.charAt(0) || 'U'}
                            </div>
                        </div>
                        <div className="overflow-hidden text-left">
                            <p className="text-xs font-bold truncate text-white">{user?.fullname}</p>
                            <p className="text-[9px] font-black uppercase tracking-tighter text-gray-500">{user?.role || 'Client'}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 flex flex-col h-full overflow-y-auto no-scrollbar relative z-10">
                <header className="h-20 flex items-center justify-between px-8 md:px-12 sticky top-0 z-40 backdrop-blur-md bg-[#050505]/60 border-b border-white/5">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-3 bg-white/5 rounded-xl">
                            <IconMenu2 size={20} />
                        </button>
                        <h1 className="text-2xl font-black uppercase tracking-tighter italic">
                            {activeTab === "dashboard" ? "Overview " : "Profile "} 
                            <span className="text-gray-600">{activeTab === "dashboard" ? "Dashboard" : "Security"}</span>
                        </h1>
                    </div>
                </header>

                <div className="p-8 md:p-12 pt-6">
                    <AnimatePresence mode="wait">
                        {activeTab === "dashboard" ? (
                            <motion.div key="dashboard" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                                {/* STATS GRID */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                                    <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-[32px]">
                                        <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center mb-4 text-[#FE9A00]"><IconCalendarStats /></div>
                                        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Active Bookings</p>
                                        <p className="text-3xl font-black mt-1 italic">{myBookings.length}</p>
                                    </div>
                                    <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-[32px]">
                                        <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center mb-4 text-white"><IconMapPin /></div>
                                        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Distance Covered</p>
                                        <p className="text-3xl font-black mt-1 italic">1,240 <span className="text-sm text-gray-600">km</span></p>
                                    </div>
                                    <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-[32px]">
                                        <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center mb-4 text-green-500"><IconCrown /></div>
                                        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Tier Status</p>
                                        <p className="text-3xl font-black mt-1 italic uppercase">VIP</p>
                                    </div>
                                </div>

                                {/* BOOKING HISTORY TABLE */}
                                <div className="bg-[#0A0A0A] rounded-[40px] border border-white/5 overflow-hidden shadow-2xl relative">
                                    <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Booking History</h3>
                                        <Link to="/cars" className="text-[10px] font-black uppercase tracking-widest text-orange-500 hover:underline">New Reservation +</Link>
                                    </div>
                                    
                                    <div className="p-4 md:p-8 overflow-x-auto no-scrollbar">
                                        <table className="w-full text-left border-collapse min-w-[600px]">
                                            <thead>
                                                <tr className="border-b border-white/5">
                                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-600 tracking-[0.2em]">Vehicle</th>
                                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-600 tracking-[0.2em]">Date</th>
                                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-600 tracking-[0.2em]">Status</th>
                                                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-600 tracking-[0.2em] text-right">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/[0.02]">
                                                {myBookings.length > 0 ? (
                                                    myBookings.map((booking, index) => (
                                                        <tr key={index} className="group hover:bg-white/[0.02] transition-colors">
                                                            <td className="px-6 py-6 font-bold italic">
                                                                <div className="flex items-center gap-3">
                                                                    <IconCar size={18} className="text-orange-500" />
                                                                    {booking.car?.model || "Standard Vehicle"}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-6 text-xs text-gray-500 font-medium">
                                                                {booking.startDate ? new Date(booking.startDate).toLocaleDateString('ka-GE') : '---'}
                                                            </td>
                                                            <td className="px-6 py-6">
                                                                <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${booking.status === 'confirmed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'}`}>
                                                                    {booking.status}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-6 text-right font-black italic text-lg text-white">
                                                                ${booking.totalPrice}
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4" className="px-6 py-20 text-center text-gray-600 font-bold italic tracking-widest uppercase text-xs">
                                                            No active history detected.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div key="settings" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                                {/* IDENTITY CARD */}
                                <div className="space-y-6 text-left">
                                    <div className="bg-[#0A0A0A] border border-white/5 rounded-[40px] p-8 md:p-10 shadow-xl relative overflow-hidden text-left">
                                        <div className="absolute -top-10 -right-10 opacity-[0.03] text-white"><IconUser size={200} /></div>
                                        <h3 className="text-lg font-black uppercase tracking-tighter italic text-white mb-8 flex items-center gap-2">
                                            <IconId className="text-[#FE9A00]" /> Account <span className="text-[#FE9A00]">Identity</span>
                                        </h3>
                                        <div className="space-y-6">
                                            <div>
                                                <p className="text-[10px] uppercase font-black text-gray-600 tracking-widest mb-1">Full Name</p>
                                                <div className="flex items-center gap-3 text-white font-bold"><IconUser size={18} className="text-gray-400" />{user?.fullname}</div>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase font-black text-gray-600 tracking-widest mb-1">Email</p>
                                                <div className="flex items-center gap-3 text-white font-bold"><IconMail size={18} className="text-gray-400" />{user?.email}</div>
                                            </div>
                                            <div className="pt-4 border-t border-white/5">
                                                <span className="text-[10px] font-black text-[#FE9A00] uppercase tracking-[0.2em] bg-[#FE9A00]/10 px-4 py-2 rounded-full border border-[#FE9A00]/20">
                                                    {user?.role || 'Standard User'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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