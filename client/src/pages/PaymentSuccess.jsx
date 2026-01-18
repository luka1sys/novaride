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
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-8 relative overflow-hidden">
            
            {/* დახვეწილი ფონის ელემენტი - მხოლოდ ერთი რბილი ნათება */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>

            <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-md w-full"
            >
                {/* სტატუსის პატარა ინდიკატორი ზემოთ */}
                <div className="flex justify-center mb-12">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "fit-content" }}
                        className="overflow-hidden border-b border-emerald-500/30 pb-2"
                    >
                        <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.5em] flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                            Verified & Secured
                        </span>
                    </motion.div>
                </div>

                {/* მთავარი სათაური - აქცენტი ტიპოგრაფიაზე */}
                <div className="text-center mb-10">
                    <h1 className="text-6xl font-black italic tracking-[0.05em] text-white leading-none uppercase">
                        READY <br />
                        <span style={{ color: accentColor }} className="not-italic">TO RIDE.</span>
                    </h1>
                </div>

                {/* ტექსტური ბლოკი - მინიმალისტური */}
                <div className="text-center mb-14 px-6">
                    <p className="text-gray-500 text-[13px] font-medium leading-relaxed tracking-wide">
                        Your luxury experience has been confirmed. 
                        Booking <span className="text-white">#{bookingId?.slice(-6).toUpperCase()}</span> is now active in your digital garage.
                    </p>
                </div>

                {/* ღილაკები - Modern Split Design */}
                <div className="flex flex-col gap-4">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate("/panel")}
                        className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-[11px] rounded-full shadow-2xl transition-all"
                    >
                        Enter Dashboard
                    </motion.button>
                    
                    <button
                        onClick={() => navigate("/")}
                        className="w-full py-4 text-white/30 hover:text-white font-bold uppercase tracking-[0.3em] text-[9px] transition-all"
                    >
                        Return to Fleet
                    </button>
                </div>

                {/* Footer Decor - პრემიუმ ბრენდინგისთვის */}
                <div className="mt-24 flex flex-col items-center gap-4">
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent"></div>
                    <p className="text-[10px] text-white/10 font-black uppercase tracking-[1em] ml-[1em]">
                        NOVAMOTORS
                    </p>
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




