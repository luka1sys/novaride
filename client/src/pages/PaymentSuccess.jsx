import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion"; // დააინსტალირე: npm install framer-motion
import { CheckCircle2, Car, Calendar, ArrowRight } from "lucide-react"; // დააინსტალირე: npm install lucide-react
import { confirmBookingPayment } from "../services/paymentService";
import { useBooking } from "../contexts/BookingContext";

const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const bookingId = searchParams.get("bookingId");
    const { fetchMyBookings } = useBooking();
    const [isConfirming, setIsConfirming] = useState(true);

    useEffect(() => {
        if (!bookingId) {
            setIsConfirming(false);
            return;
        }

        confirmBookingPayment(bookingId)
            .then(() => {
                fetchMyBookings();
                setIsConfirming(false);
            })
            .catch(err => {
                console.error("Failed to confirm booking", err);
                setIsConfirming(false);
            });
    }, [bookingId, fetchMyBookings]);

    if (isConfirming) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff3131]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4 font-sans overflow-hidden">
            {/* ფონური დეკორაცია */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#ff3131]"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl w-full"
            >
                <div className="bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-12 border border-gray-100 relative overflow-hidden">

                    {/* წარმატების სიმბოლო */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="flex justify-center mb-8"
                    >
                        <div className="bg-green-50 p-4 rounded-full">
                            <CheckCircle2 className="w-16 h-16 text-green-500" strokeWidth={1.5} />
                        </div>
                    </motion.div>

                    <div className="text-center mb-10">
                        <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase mb-2">
                            PAYMENT <span className="text-[#ff3131]">DONE.</span>
                        </h1>
                        <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]">
                            Your journey with NovaRide begins now
                        </p>
                    </div>

                    {/* ბარათი დეტალებით */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex items-center gap-4">
                            <div className="bg-white p-3 rounded-xl shadow-sm">
                                <Car className="w-5 h-5 text-[#ff3131]" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Booking ID</p>
                                <p className="text-sm font-black text-black">#{bookingId?.slice(-8) || "N/A"}</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex items-center gap-4">
                            <div className="bg-white p-3 rounded-xl shadow-sm">
                                <Calendar className="w-5 h-5 text-[#ff3131]" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Status</p>
                                <p className="text-sm font-black text-green-600">CONFIRMED</p>
                            </div>
                        </div>
                    </div>

                    <p className="text-center text-gray-500 text-sm font-medium mb-10 px-4">
                        We've sent the <span className="text-black font-bold">Digital Key</span> and rental agreement to your email. You can also access them in your dashboard.
                    </p>

                    {/* ღილაკები */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <button
                            onClick={() => navigate("/panel")}
                            className="flex-1 py-5 bg-black text-white font-black uppercase tracking-widest text-[11px] rounded-2xl hover:bg-[#ff3131] transition-all duration-300 flex items-center justify-center gap-2 group"
                        >
                            Manage Booking
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="flex-1 py-5 border-2 border-black text-black font-black uppercase tracking-widest text-[11px] rounded-2xl hover:bg-black hover:text-white transition-all duration-300"
                        >
                            Return Home
                        </button>
                    </div>
                </div>

                {/* დეკორატიული ტექსტი ფონზე */}
                <div className="mt-8 text-center">
                    <p className="text-[60px] font-black italic tracking-tighter uppercase text-gray-200/40 select-none leading-none">
                        NOVARIDE
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




