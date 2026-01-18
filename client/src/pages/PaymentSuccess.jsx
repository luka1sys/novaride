import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmBookingPayment } from "../services/paymentService";
import { useBooking } from "../contexts/BookingContext";

const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const bookingId = searchParams.get("bookingId");
    const { fetchMyBookings } = useBooking();

    const accentColor = "rgb(254, 154, 0)";

    useEffect(() => {
        if (!bookingId) return;

        confirmBookingPayment(bookingId)
            .then(() => {
                console.log("Booking confirmed");
                fetchMyBookings();
            })
            .catch(err => console.error("Failed to confirm booking", err));
    }, [bookingId, fetchMyBookings]);

    return (
        <section className="bg-[#050505] min-h-screen pt-24 pb-12 px-6 relative overflow-hidden font-sans flex flex-col items-center">
            
            {/* Background Branding - Subtle and deep */}
            <div className="absolute top-40 left-10 text-[12vw] font-black text-white/[0.01] select-none pointer-events-none uppercase tracking-tighter">
                Premium
            </div>

            {/* Main Success Card */}
            <div className="max-w-xl w-full bg-[#0a0a0a] border border-white/5 rounded-[48px] p-10 md:p-14 relative z-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] text-center">
                
                {/* Image Section with Gold Halo */}
                <div className="mb-10 relative inline-block">
                    <div className="absolute inset-0 bg-orange-500/10 blur-[50px] rounded-full scale-150"></div>
                    <img 
                        src="/success.png" 
                        alt="Success" 
                        className="w-28 h-28 md:w-36 md:h-36 object-contain relative z-10 mx-auto animate-float"
                    />
                </div>

                {/* Typography Heading */}
                <div className="space-y-3 mb-10">
                    <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none italic">
                        Ride <span style={{ color: accentColor }}>Secured</span>
                    </h1>
                    <p className="text-gray-400 text-sm font-medium tracking-widest uppercase opacity-60">
                        Reservation Successful
                    </p>
                </div>

                {/* Minimalist Data Strip */}
                <div className="grid grid-cols-2 gap-4 mb-12">
                    <div className="bg-white/[0.02] border border-white/5 rounded-3xl py-5 px-4 text-left">
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mb-1">Booking ID</span>
                        <span className="text-sm font-black text-white tracking-tight">
                            #{bookingId?.slice(-8).toUpperCase() || "NV-A92-GOLD"}
                        </span>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-3xl py-5 px-4 text-left">
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mb-1">Status</span>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-white uppercase italic">Active</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></div>
                        </div>
                    </div>
                </div>

                {/* Call to Action Buttons */}
                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => navigate("/panel")}
                        style={{ backgroundColor: accentColor }}
                        className="w-full py-5 text-black font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl hover:scale-[1.02] transition-all active:scale-95 shadow-2xl shadow-orange-500/20"
                    >
                        Enter Dashboard
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="w-full py-5 border border-white/10 text-gray-300 font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl hover:bg-white hover:text-black transition-all"
                    >
                        Return to Fleet
                    </button>
                </div>

                {/* Footer Disclaimer */}
                <div className="mt-12 pt-8 border-t border-white/5">
                    <p className="text-gray-600 text-[9px] font-bold uppercase tracking-[0.3em] leading-loose">
                        Your digital key and arrival instructions <br />
                        have been dispatched to your email.
                    </p>
                </div>
            </div>

            {/* Subtle Abstract Background Elements */}
            <div className="absolute top-[20%] right-[-5%] w-96 h-96 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-[120px] pointer-events-none"></div>

            <style jsx>{`
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
            `}</style>
        </section>
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




