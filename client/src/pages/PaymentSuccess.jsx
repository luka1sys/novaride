import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmBookingPayment } from "../services/paymentService";
import { useBooking } from "../contexts/BookingContext";
import { motion } from "framer-motion";

const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const bookingId = searchParams.get("bookingId");
    const { fetchMyBookings } = useBooking();
    const accentColor = "rgb(254, 154, 0)";

    useEffect(() => {
        if (!bookingId) return;
        confirmBookingPayment(bookingId)
            .then(() => fetchMyBookings())
            .catch(err => console.error("Failed to confirm booking", err));
    }, [bookingId, fetchMyBookings]);

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">

            {/* ანიმირებული ფონის ნათება */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl w-full z-10"
            >
                {/* მთავარი კონტეინერი */}
                <div className="relative bg-[#0a0a0a] border border-white/5 rounded-[40px] p-10 md:p-16 shadow-2xl overflow-hidden">

                    {/* ზედა დეკორატიული ხაზი */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>

                    {/* წარმატების იკონკა */}
                    <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
                        className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-10"
                    >
                        <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                    </motion.div>

                    <div className="text-center mb-12">
                        <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase mb-4 text-white">
                            Ride <span className="text-emerald-500">Secured</span>
                        </h1>
                        <p className="text-gray-500 font-bold uppercase tracking-[0.4em] text-[10px]">
                            Transaction completed successfully
                        </p>
                    </div>

                    {/* დეტალების ბარათი */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8 mb-10 backdrop-blur-sm">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex flex-col items-start">
                                <span className="text-[9px] font-bold uppercase text-gray-500 tracking-widest mb-1">Booking Reference</span>
                                <span className="text-white font-mono text-sm">#{bookingId?.slice(-8).toUpperCase() || "NVR-2024"}</span>
                            </div>
                            {/* აი შენი მწვანე ბეიჯი გაუმჯობესებული დიზაინით */}
                            <div className="flex flex-col items-end">
                                <span className="text-[9px] font-bold uppercase text-gray-500 tracking-widest mb-1">Status</span>
                                <span className="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 text-[10px] font-black uppercase tracking-wider">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                    Confirmed
                                </span>
                            </div>
                        </div>

                        <p className="text-sm text-gray-400 font-medium leading-relaxed border-t border-white/5 pt-6">
                            Your reservation is now active. A digital key and rental agreement have been dispatched to your registered email address.
                        </p>
                    </div>

                    {/* ღილაკები */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <button
                            onClick={() => navigate("/panel")}
                            style={{ backgroundColor: accentColor }}
                            className="flex-1 py-5 text-black font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl hover:brightness-110 transition-all shadow-[0_10px_20px_rgba(254,154,0,0.15)] active:scale-95"
                        >
                            Manage Booking
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="flex-1 py-5 border border-white/10 bg-white/5 text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl hover:bg-white hover:text-black transition-all active:scale-95"
                        >
                            Return Home
                        </button>
                    </div>
                </div>

                {/* Footer Decor */}
                <div className="mt-10 flex justify-center items-center gap-4 opacity-30">
                    <div className="h-[1px] w-12 bg-white/20"></div>
                    <span className="text-[10px] text-white font-bold uppercase tracking-[0.5em]">NovaRide Elite</span>
                    <div className="h-[1px] w-12 bg-white/20"></div>
                </div>
            </motion.div>
        </div>
    );
};
export default PaymentSuccessPage;













// import { useState } from "react";
// import { useAuth } from "../contexts/AuthContext";
// import { useBooking } from "../contexts/BookingContext";

// const Panel = () => {
//     const { logout, user } = useAuth();
//     const { myBookings } = useBooking();
//     const [showSettings, setShowSettings ]= useState(false);




//     return (
//         <div className="flex min-h-screen  bg-[#fcfcfc] font-sans">

//             {/* --- SIDEBAR --- */}
//             <aside className="w-64 bg-black ml-[20px] rounded-tl-[30px] text-white flex flex-col hidden md:flex">
//                 <div className="p-8 text-2xl font-black italic tracking-tighter">
//                     NOVA<span className="text-[#ff3131]">RIDE</span>
//                 </div>

//                 <nav className="flex-1 px-4 space-y-2">
//                     <a href="#" className="flex items-center p-3 bg-[#ff3131] rounded-lg font-bold">Dashboard</a>
//                     <button  href="#" className="flex items-center cursor-pointer p-3 hover:bg-white/10 rounded-lg transition-colors">My Bookings</button >

//                     <button className="flex items-center  cursor-pointer p-3 hover:bg-white/10 rounded-lg transition-colors" onClick={(e) => {
//                         e.preventDefault();
//                         setShowSettings(prev => !prev);
//                     }}>Settings</button>
//                 </nav>
//                 {showSettings &&
//                     <div className="mb-[400px] p-3 pl-15 border-t border-white/10">
//                         <button onClick={logout} className="flex items-center text-gray-400 hover:text-[#ff3131] transition-colors">
//                             Logout →
//                         </button>
//                     </div>
//                 }


//             </aside>

//             {/* --- MAIN CONTENT --- */}
//             <main className="flex-1 flex flex-col">

//                 {/* Top Header */}
//                 <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8">
//                     <h1 className="text-xl font-bold uppercase tracking-tight">User Dashboard</h1>
//                     <div className="flex items-center gap-4">
//                         <div className="text-right">
//                             <p className="text-sm font-bold leading-none">{user.fullname}</p>
//                             <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{user.role}</p>
//                         </div>
//                         <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-[#ff3131]">
//                             {user.fullname?.charAt(0).toUpperCase()}
//                         </div>
//                     </div>
//                 </header>

//                 <div className="p-8 space-y-8">

//                     {/* --- STATS SECTION --- */}
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
//                             <div className="absolute top-0 right-0 w-16 h-16 bg-[#ff3131]/5 rounded-bl-full transition-all group-hover:scale-110"></div>
//                             <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Active Bookings</p>
//                             <p className="text-4xl font-black mt-2">{myBookings.length}</p>
//                         </div>
//                         <div className="bg-black text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
//                             <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total Distance</p>
//                             <p className="text-4xl font-black mt-2 italic">1,240 <span className="text-[#ff3131] text-lg">km</span></p>
//                         </div>
//                         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//                             <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Account Status</p>
//                             <p className="text-xl font-bold mt-2 text-green-500 flex items-center gap-2">
//                                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Verified
//                             </p>
//                         </div>
//                     </div>

//                     {/* --- TABLE SECTION --- */}
//                     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//                         <div className="p-6 border-b border-gray-50 flex justify-between items-center">
//                             <h3 className="font-black uppercase tracking-tight italic text-lg">Recent Bookings</h3>
//                             <button className="text-[#ff3131] text-xs font-bold uppercase hover:underline">View All</button>
//                         </div>
//                         <div className="overflow-x-auto">
//                             <table className="w-full text-left border-collapse">
//                                 <thead className="bg-gray-50/50">
//                                     <tr>
//                                         <th className="p-4 text-[10px] uppercase font-bold text-gray-400 tracking-widest">Car Model</th>
//                                         <th className="p-4 text-[10px] uppercase font-bold text-gray-400 tracking-widest">Date</th>
//                                         <th className="p-4 text-[10px] uppercase font-bold text-gray-400 tracking-widest">Status</th>
//                                         <th className="p-4 text-[10px] uppercase font-bold text-gray-400 tracking-widest text-right">Price</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="divide-y divide-gray-50">
//                                     {
//                                         myBookings.map((booking, index) => (
//                                             <tr key={index}>
//                                                 <td className="p-4 font-bold group-hover:text-[#ff3131]">{booking.car.model}</td>
//                                                 <td className="p-4 text-sm text-gray-500">
//                                                     {booking.startDate ? new Date(booking.startDate).toLocaleDateString('ka-GE') : '---'}
//                                                 </td>
//                                                 <td className={`p-4 text-[10px] font-bold uppercase ${booking.status === 'confirmed' ? 'text-green-500' : 'text-orange-500'}`}> {booking.status}</td>
//                                                 <td className="p-4 text-right font-black italic">${booking.totalPrice}</td>
//                                             </tr>
//                                         ))
//                                     }
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>

//                 </div>
//             </main>
//         </div>
//     );
// };

// export default Panel;




