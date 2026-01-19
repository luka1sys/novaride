import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useBooking } from "../contexts/BookingContext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    IconCar, IconCalendarStats, IconSettings,
    IconLogout, IconMenu2, IconActivity, IconMapPin, IconCrown, IconLock,
    IconUser, IconMail, IconEye, IconEyeOff
} from "@tabler/icons-react";

const Panel = () => {
    const { logout, user, changeUserPassword } = useAuth();
    const { myBookings } = useBooking();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("dashboard");

    // პაროლის ფორმის სტეიტები
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // პაროლის ხილვადობის სტეიტები
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const accentColor = "rgb(254, 154, 0)";

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        setLoading(true);
        try {
            await changeUserPassword({ currentPassword, newPassword });
            alert("Password changed successfully!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setActiveTab("dashboard");
        } catch (error) {
            alert("Failed to change password. Please check your current password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-[#050505] font-sans text-white overflow-hidden pt-[80px] md:pt-[90px] relative z-[10]">
            {/* BACKGROUND GLOW */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[rgb(254,154,0)]/5 blur-[120px] rounded-full pointer-events-none" />
            
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
            <aside className={`fixed md:relative z-[160] w-72 bg-[#0A0A0A] border-r border-white/5 flex flex-col transition-all duration-500 ease-in-out h-full ${isSidebarOpen ? "left-0" : "-left-full md:left-0"}`}>
                <div className="p-8 mb-4">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/20 transition-transform group-hover:scale-110" style={{ backgroundColor: accentColor }}>
                            <IconActivity size={20} color="black" stroke={3} />
                        </div>
                        <span className="text-xl font-black italic tracking-tighter uppercase text-white">Elite</span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto no-scrollbar">
                    <p className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 mb-4">User Menu</p>
                    <button onClick={() => { setActiveTab("dashboard"); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${activeTab === 'dashboard' ? 'bg-white/5 text-white' : 'text-gray-500 hover:bg-white/5'}`}>
                        <span style={{ color: activeTab === 'dashboard' ? accentColor : 'inherit' }}><IconActivity size={20} /></span>
                        Dashboard
                    </button>

                    <div className="pt-8 mt-8 border-t border-white/5 space-y-1.5">
                        <p className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 mb-4">Settings</p>
                        <button onClick={() => { setActiveTab("security"); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all group ${activeTab === 'security' ? 'bg-white/5 text-white' : 'text-gray-500 hover:bg-white/5'}`}>
                            <IconSettings size={20} className={`${activeTab === 'security' ? '' : 'group-hover:rotate-45'} transition-transform`} style={{ color: activeTab === 'security' ? accentColor : 'inherit' }} />
                            Security Config
                        </button>
                        <button onClick={logout} className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold text-red-500/70 hover:bg-red-500/5 transition-all">
                            <IconLogout size={20} />
                            Terminate Session
                        </button>
                    </div>
                </nav>

                <div className="p-6">
                    <div className="bg-white/[0.03] border border-white/5 rounded-[24px] p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-yellow-400 p-[1px]">
                            <div className="w-full h-full bg-black rounded-xl flex items-center justify-center font-bold text-xs text-white">
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
                        <h1 className="text-2xl font-black uppercase tracking-tighter italic">
                            {activeTab === "dashboard" ? "Overview " : "Security "} 
                            <span className="text-gray-600">{activeTab === "dashboard" ? "Dashboard" : "Settings"}</span>
                        </h1>
                    </div>
                </header>

                <div className="p-8 md:p-12 pt-6">
                    {activeTab === "dashboard" ? (
                        <>
                            {/* STATS GRID */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                                <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-[32px] group">
                                    <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center mb-4 text-[#FE9A00]"><IconCalendarStats /></div>
                                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Active Bookings</p>
                                    <p className="text-3xl font-black mt-1 italic">{myBookings.length}</p>
                                </div>
                                <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-[32px]">
                                    <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center mb-4 text-white"><IconMapPin /></div>
                                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Active Status</p>
                                    <p className="text-3xl font-black mt-1 italic">Verified</p>
                                </div>
                                <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-[32px]">
                                    <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center mb-4 text-green-500"><IconCrown /></div>
                                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Member Tier</p>
                                    <p className="text-3xl font-black mt-1 italic uppercase">{user?.role || 'Client'}</p>
                                </div>
                            </div>

                            {/* TABLE... (შენარჩუნებულია უცვლელად) */}
                            <div className="bg-[#0A0A0A] rounded-[40px] border border-white/5 overflow-hidden shadow-2xl">
                                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Booking History</h3>
                                </div>
                                <div className="p-4 md:p-8 overflow-x-auto no-scrollbar">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-white/5">
                                                <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-600 tracking-[0.2em]">Vehicle</th>
                                                <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-600 tracking-[0.2em]">Date</th>
                                                <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-600 tracking-[0.2em]">Status</th>
                                                <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-600 tracking-[0.2em] text-right">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/[0.02]">
                                            {myBookings.length > 0 ? myBookings.map((booking, index) => (
                                                <tr key={index} className="group hover:bg-white/[0.02] transition-colors">
                                                    <td className="px-6 py-6 font-bold italic">{booking.car.model}</td>
                                                    <td className="px-6 py-6 text-xs text-gray-500">{new Date(booking.startDate).toLocaleDateString('ka-GE')}</td>
                                                    <td className="px-6 py-6"><span className="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-orange-500/10 text-orange-500 border border-orange-500/20">{booking.status}</span></td>
                                                    <td className="px-6 py-6 text-right font-black italic text-lg">${booking.totalPrice}</td>
                                                </tr>
                                            )) : (
                                                <tr><td colSpan="4" className="py-20 text-center text-gray-600 font-bold italic uppercase tracking-widest">No active history</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    ) : (
                        /* --- SECURITY CONFIG TAB --- */
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            
                            {/* USER DATA CARD */}
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="lg:col-span-5 space-y-4"
                            >
                                <div className="bg-[#0A0A0A] border border-white/5 rounded-[40px] p-8 shadow-2xl relative overflow-hidden">
                                    <div className="relative z-10">
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FE9A00] mb-6 text-center lg:text-left">Profile Identity</p>
                                        
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-4 group">
                                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                                                    <IconUser size={22} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] uppercase font-black text-gray-600 tracking-widest">Full Name</p>
                                                    <p className="font-bold text-lg italic tracking-tight">{user?.fullname}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 group">
                                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                                                    <IconMail size={22} />
                                                </div>
                                                <div className="overflow-hidden">
                                                    <p className="text-[10px] uppercase font-black text-gray-600 tracking-widest">Email Address</p>
                                                    <p className="font-bold text-sm truncate text-gray-300">{user?.email || "not-provided@elite.com"}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 group">
                                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                                                    <IconCrown size={22} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] uppercase font-black text-gray-600 tracking-widest">Account Status</p>
                                                    <p className="font-bold italic text-[#FE9A00] uppercase text-sm tracking-tighter">{user?.role || 'Client'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-10 -right-10 opacity-[0.02] text-white rotate-12 pointer-events-none">
                                        <IconUser size={200} />
                                    </div>
                                </div>
                                
                                <div className="bg-orange-500/5 border border-orange-500/10 rounded-[30px] p-6">
                                    <p className="text-[9px] leading-relaxed text-orange-500/60 font-medium uppercase tracking-widest text-center">
                                        User data is encrypted and synced with our primary node. Contact support to change your identity information.
                                    </p>
                                </div>
                            </motion.div>

                            {/* CHANGE PASSWORD FORM */}
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="lg:col-span-7"
                            >
                                <div className="bg-[#0A0A0A] border border-white/5 rounded-[40px] p-8 md:p-12 relative overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 right-0 p-8 opacity-5 text-[#FE9A00]"><IconLock size={120} /></div>
                                    <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-8">Update <span className="text-[#FE9A00]">Security</span></h3>
                                    
                                    <form onSubmit={handlePasswordSubmit} className="space-y-6 relative z-10">
                                        {/* Current Password */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1">Current Password</label>
                                            <div className="relative">
                                                <input 
                                                    type={showCurrent ? "text" : "password"}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#FE9A00]/50 transition-all text-sm pr-12"
                                                    placeholder="••••••••"
                                                    value={currentPassword}
                                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                                    required
                                                />
                                                <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors">
                                                    {showCurrent ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                                                </button>
                                            </div>
                                        </div>

                                        {/* New Password */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1">New Password</label>
                                            <div className="relative">
                                                <input 
                                                    type={showNew ? "text" : "password"}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#FE9A00]/50 transition-all text-sm pr-12"
                                                    placeholder="••••••••"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    required
                                                />
                                                <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors">
                                                    {showNew ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Confirm Password */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1">Confirm New Password</label>
                                            <div className="relative">
                                                <input 
                                                    type={showConfirm ? "text" : "password"}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#FE9A00]/50 transition-all text-sm pr-12"
                                                    placeholder="••••••••"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    required
                                                />
                                                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors">
                                                    {showConfirm ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                                                </button>
                                            </div>
                                        </div>

                                        <button 
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-[#FE9A00] text-black font-black uppercase tracking-widest py-5 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-orange-500/10 disabled:opacity-50"
                                        >
                                            {loading ? "Processing..." : "Apply New Password"}
                                        </button>
                                    </form>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Panel;