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
        <section className="bg-[#080808] min-h-screen py-32 px-6 relative overflow-hidden font-sans flex items-center justify-center">

            {/* Background Typography - Matching the Work component */}
            <div className="absolute top-0 left-0 text-[18vw] font-black text-white/[0.02] leading-none select-none pointer-events-none uppercase">
                SUCCESS
            </div>

            <div className="max-w-7xl mx-auto w-full relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 items-center">

                    {/* Left Side: Content */}
                    <div className="lg:col-span-6 text-left">
                        <div className="mb-12">
                            <span style={{ color: accentColor }} className="font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
                                // Transaction Completed
                            </span>
                            <h2 className="text-5xl md:text-7xl font-black text-white leading-tight uppercase tracking-tighter mb-6">
                                Booking <br />
                                <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>Confirmed.</span>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
                                Your reservation has been secured. A confirmation email containing your digital key and trip details is being prepared for your inbox.
                            </p>
                        </div>

                        {/* Order Details Strip */}
                        <div className="bg-white/[0.03] border-l-2 p-8 mb-10 flex flex-col md:flex-row gap-12" style={{ borderLeftColor: accentColor }}>
                            <div>
                                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2 font-bold font-mono">Reference ID</p>
                                <p className="text-white text-xl font-black italic uppercase tracking-tighter">
                                    #{bookingId?.slice(-8).toUpperCase() || "NR-777-GOLD"}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2 font-bold font-mono">System Status</p>
                                <div className="flex items-center gap-3">
                                    <p className="text-white text-xl font-black italic uppercase tracking-tighter">Verified Safe</p>
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => navigate("/panel")}
                                style={{ backgroundColor: accentColor }}
                                className="px-10 py-5 text-black font-semibold text-[15px] rounded-sm hover:brightness-110 transition-all active:scale-95"
                            >
                                view My Bookings
                            </button>
                            <button
                                onClick={() => navigate("/")}
                                className="px-10 py-5 border border-white/10 text-white font-medium text-[14px] rounded-sm hover:bg-white hover:text-black transition-all"
                            >
                                go to Home
                            </button>
                        </div>
                    </div>

                    {/* Right Side: Visual Showcase */}
                    <div className="lg:col-span-6 relative h-[500px] md:h-[600px] w-full mt-12 lg:mt-0">
                        <div className="absolute inset-0 bg-[#111] border border-white/5 rounded-2xl overflow-hidden shadow-2xl group">
                            <img
                                src="/success.png"
                                className="w-full h-full object-contain p-12 transition-all duration-1000 group-hover:scale-105"
                                alt="Success Illustration"
                            />

                            {/* Floating Glass Status Element */}
                            <div className="absolute bottom-12 left-12 p-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl max-w-[240px]">
                                <div className="flex gap-2 mb-4">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-500 opacity-50"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-500 opacity-20"></div>
                                </div>
                                <p style={{ color: accentColor }} className="text-[10px] font-mono mb-2 uppercase tracking-widest">Security Link</p>
                                <p className="text-white text-sm font-bold leading-tight uppercase italic">
                                    Encryption Protocol Active: Secure Confirmation
                                </p>
                            </div>
                        </div>

                        {/* Large Background Icon Overlay (Animated) */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
                            <div className="w-[500px] h-[500px] border rounded-full opacity-10 animate-spin-slow" style={{ borderColor: accentColor }}></div>
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
                .animate-spin-slow {
                    animation: spin 15s linear infinite;
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




