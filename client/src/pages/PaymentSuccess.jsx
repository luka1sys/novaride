import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmBookingPayment } from "../services/paymentService";
import { useBooking } from "../contexts/BookingContext";

const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const bookingId = searchParams.get("bookingId");
    const { fetchMyBookings } = useBooking();
    const accentColor = "#ff3131";

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
        <section className="bg-[#080808] min-h-screen flex items-center justify-center py-20 px-6 relative overflow-hidden font-sans">
            {/* Background Typography - Work სექციის მსგავსი */}
            <div className="absolute top-0 left-0 text-[18vw] font-black text-white/[0.02] leading-none select-none pointer-events-none tracking-tighter uppercase">
                SUCCESS
            </div>
            <div className="absolute bottom-0 right-0 text-[18vw] font-black text-white/[0.02] leading-none select-none pointer-events-none tracking-tighter uppercase">
                RIDE
            </div>

            <div className="max-w-5xl w-full relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    
                    {/* მარცხენა მხარე: ინფორმაცია */}
                    <div className="text-left">
                        <div className="mb-8">
                            <span style={{ color: accentColor }} className="font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
                                // Transaction Complete
                            </span>
                            <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] uppercase tracking-tighter mb-6">
                                Payment <br />
                                <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>Confirmed.</span>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-md italic">
                                Your premium vehicle is now reserved. Get ready to hit the road with NovaRide.
                            </p>
                        </div>

                        {/* ინფო ბარათი - Glassmorphism */}
                        <div className="bg-white/[0.03] border border-white/10 backdrop-blur-md p-8 rounded-2xl mb-8 relative group overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: accentColor }}></div>
                            
                            <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
                                <div>
                                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Order Identifier</p>
                                    <p className="text-xl font-black text-white uppercase tracking-tighter italic">#{bookingId?.slice(-8) || "NOVARIDE-2024"}</p>
                                </div>
                                <span className="text-[10px] font-black uppercase text-green-500 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                                    Secure
                                </span>
                            </div>

                            <p className="text-sm text-gray-400 font-medium leading-relaxed">
                                A confirmation email with your <span className="text-white font-bold italic underline decoration-[#ff3131] decoration-2">Digital Key</span> has been dispatched to your inbox.
                            </p>
                        </div>

                        {/* ღილაკები */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => navigate("/panel")}
                                className="px-8 py-5 bg-white text-black font-black uppercase tracking-widest text-[11px] rounded-sm hover:invert transition-all duration-300 flex items-center justify-center gap-3"
                            >
                                View My Bookings
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <button
                                onClick={() => navigate("/")}
                                className="px-8 py-5 border border-white/20 text-white font-black uppercase tracking-widest text-[11px] rounded-sm hover:bg-white hover:text-black transition-all duration-300"
                            >
                                Back to Fleet
                            </button>
                        </div>
                    </div>

                    {/* მარჯვენა მხარე: ვიზუალური ეფექტი */}
                    <div className="relative hidden lg:block">
                        <div className="aspect-square bg-gradient-to-tr from-[#111] to-[#080808] border border-white/10 rounded-full flex items-center justify-center p-12 relative overflow-hidden group">
                            
                            {/* მბრუნავი ანიმაცია ფონზე */}
                            <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                                <div className="absolute inset-0 animate-spin-slow" style={{ background: `conic-gradient(from 0deg, transparent, ${accentColor}, transparent)` }}></div>
                            </div>

                            <div className="relative z-10 text-center">
                                <div className="w-32 h-32 border-2 border-white/10 rounded-full flex items-center justify-center mb-6 mx-auto animate-pulse">
                                     <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="1.5">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <p className="text-white font-black italic text-4xl uppercase tracking-tighter">Verified</p>
                                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-2">NovaRide Security System</p>
                            </div>

                            {/* მცოცავი Glass ბარათი */}
                            <div className="absolute bottom-10 right-0 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl animate-bounce">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
                                    <span className="text-[9px] text-white font-bold uppercase tracking-widest">Active License</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
                .animate-spin-slow {
                    animation: spin 6s linear infinite;
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




