import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmBookingPayment } from "../services/paymentService";
import { useBooking } from "../contexts/BookingContext";

const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const bookingId = searchParams.get("bookingId");
    const { fetchMyBookings } = useBooking();
    
    // ოქროსფერი აქცენტი (Luxury Gold)
    const accentColor = "rgb(212, 175, 55)"; 

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
        <section className="bg-[#050505] min-h-screen flex items-center justify-center py-20 px-6 relative overflow-hidden font-sans selection:bg-gold selection:text-black">
            
            {/* Background Typography - ნაცრისფერი/ოქროსფერი დაბალი ოპასით */}
            <div className="absolute top-0 left-0 text-[18vw] font-black text-white/[0.01] leading-none select-none pointer-events-none tracking-tighter uppercase">
                SUCCESS
            </div>
            <div className="absolute bottom-0 right-0 text-[18vw] font-black text-white/[0.01] leading-none select-none pointer-events-none tracking-tighter uppercase">
                LUXURY
            </div>

            <div className="max-w-5xl w-full relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* მარცხენა მხარე: ინფორმაცია */}
                    <div className="text-left">
                        <div className="mb-10">
                            <span style={{ color: accentColor }} className="font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">
                                // Excellence Delivered
                            </span>
                            <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.85] uppercase tracking-tighter mb-8">
                                Ride <br />
                                <span className="text-transparent" style={{ WebkitTextStroke: `1px ${accentColor}` }}>Secured.</span>
                            </h2>
                            <p className="text-gray-500 text-lg leading-relaxed max-w-md font-light">
                                Your reservation has been finalized. Experience the pinnacle of road travel with <span className="text-white font-medium">NovaRide Premium</span>.
                            </p>
                        </div>

                        {/* ინფო ბარათი - Luxury Style */}
                        <div className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 backdrop-blur-2xl p-8 rounded-3xl mb-10 relative group overflow-hidden shadow-2xl">
                            {/* ოქროსფერი ხაზი */}
                            <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: accentColor }}></div>
                            
                            <div className="flex justify-between items-start mb-8 border-b border-white/5 pb-5">
                                <div>
                                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">Booking Reference</p>
                                    <p className="text-2xl font-black text-white uppercase tracking-tighter italic">#{bookingId?.slice(-8) || "NOVA-GOLD-2026"}</p>
                                </div>
                                <span 
                                    style={{ color: accentColor, borderColor: `${accentColor}33`, backgroundColor: `${accentColor}11` }}
                                    className="text-[10px] font-black uppercase px-4 py-1.5 rounded-full border"
                                >
                                    Confirmed
                                </span>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="mt-1">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                                </div>
                                <p className="text-sm text-gray-400 font-medium leading-relaxed">
                                    Your encrypted <span className="text-white font-bold italic underline underline-offset-4">Digital Key</span> and arrival instructions have been sent to your registered email.
                                </p>
                            </div>
                        </div>

                        {/* ღილაკები */}
                        <div className="flex flex-col sm:flex-row gap-5">
                            <button
                                onClick={() => navigate("/panel")}
                                style={{ backgroundColor: accentColor }}
                                className="px-10 py-6 text-black font-black uppercase tracking-widest text-[11px] rounded-xl hover:scale-105 transition-all duration-500 flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
                            >
                                Access Dashboard
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <button
                                onClick={() => navigate("/")}
                                className="px-10 py-6 border border-white/20 text-white font-black uppercase tracking-widest text-[11px] rounded-xl hover:bg-white hover:text-black transition-all duration-500"
                            >
                                Return to Fleet
                            </button>
                        </div>
                    </div>

                    {/* მარჯვენა მხარე: ოქროსფერი ვიზუალი */}
                    <div className="relative hidden lg:block">
                        <div className="aspect-square bg-[#0a0a0a] border border-white/5 rounded-[60px] flex items-center justify-center p-16 relative overflow-hidden group shadow-[0_0_100px_rgba(0,0,0,1)]">
                            
                            {/* ოქროსფერი მბრუნავი აურა */}
                            <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-1000">
                                <div className="absolute inset-0 animate-spin-slow" style={{ background: `conic-gradient(from 0deg, transparent, ${accentColor}, transparent)` }}></div>
                            </div>

                            <div className="relative z-10 text-center">
                                <div className="w-40 h-40 border border-white/5 rounded-full flex items-center justify-center mb-8 mx-auto relative">
                                    {/* ორმაგი წრე */}
                                    <div className="absolute inset-0 border border-gold/20 rounded-full animate-ping"></div>
                                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="1">
                                        <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <h3 className="text-white font-black italic text-5xl uppercase tracking-tighter mb-2">Elite</h3>
                                <div className="h-px w-12 bg-gray-700 mx-auto mb-4"></div>
                                <p className="text-gray-500 text-[9px] font-bold uppercase tracking-[0.5em]">Verified Nova Member</p>
                            </div>

                            {/* Floating "Confirmed" Badge */}
                            <div className="absolute top-10 right-10 p-5 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl rotate-6 group-hover:rotate-0 transition-transform duration-700">
                                <div className="flex flex-col items-center gap-1">
                                    <span style={{ color: accentColor }} className="text-[14px] font-black tracking-tighter italic uppercase">Payment</span>
                                    <span className="text-white text-[10px] font-bold uppercase tracking-widest">Verified</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
                .animate-spin-slow {
                    animation: spin 10s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
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




