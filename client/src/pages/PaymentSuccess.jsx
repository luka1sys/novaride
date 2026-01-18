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
                fetchMyBookings();
            })
            .catch(err => console.error("Failed to confirm", err));
    }, [bookingId, fetchMyBookings]);

    return (
        <section className="bg-[#030303] min-h-screen flex items-center justify-center py-10 px-6 relative overflow-hidden font-sans">
            
            {/* დინამიური ფონის განათება (Animated Glow) */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full opacity-20 blur-[120px] animate-pulse" style={{ backgroundColor: accentColor }}></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full opacity-10 blur-[100px]" style={{ backgroundColor: accentColor }}></div>

            {/* მთავარი დახვეწილი კონტეინერი */}
            <div className="max-w-xl w-full relative z-10">
                
                {/* ზედა სექცია: სურათი ნეონურ რგოლში */}
                <div className="flex justify-center mb-10">
                    <div className="relative p-1 rounded-full bg-gradient-to-b from-white/20 to-transparent">
                        <div className="bg-[#080808] rounded-full p-4 relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/[0.02] animate-pulse"></div>
                            <img 
                                src="/success.png" 
                                alt="Success" 
                                className="w-24 h-24 md:w-28 md:h-28 object-contain relative z-10 drop-shadow-[0_0_15px_rgba(254,154,0,0.5)]"
                            />
                        </div>
                    </div>
                </div>

                {/* ტექსტური ბლოკი */}
                <div className="text-center mb-10">
                    <span 
                        style={{ color: accentColor }} 
                        className="text-[10px] font-bold uppercase tracking-[0.8em] block mb-4 opacity-80"
                    >
                        // Privilege Confirmed
                    </span>
                    <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-6 italic">
                        Elite <br />
                        <span className="text-transparent font-light" style={{ WebkitTextStroke: "1px white", opacity: 0.8 }}>Reserved.</span>
                    </h1>
                    <p className="text-gray-500 text-sm md:text-base font-light max-w-sm mx-auto leading-relaxed">
                        Your premium vehicle is ready for departure. Experience the gold standard of NovaRide.
                    </p>
                </div>

                {/* Glassmorphism ბარათი ინფორმაციით */}
                <div className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-[30px] p-1 shadow-2xl mb-10">
                    <div className="bg-[#0a0a0a]/80 rounded-[28px] p-6 flex items-center justify-between">
                        <div className="text-left">
                            <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mb-1">Receipt ID</p>
                            <p className="text-lg font-black text-white font-mono">#{bookingId?.slice(-8).toUpperCase() || "NV-777X"}</p>
                        </div>
                        <div className="h-10 w-[1px] bg-white/10"></div>
                        <div className="text-right flex items-center gap-3">
                            <div>
                                <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mb-1">Security</p>
                                <p className="text-sm font-black text-white uppercase italic tracking-tighter">Verified</p>
                            </div>
                            <div className="w-2 h-2 rounded-full shadow-[0_0_10px_#22c55e]" style={{ backgroundColor: "#22c55e" }}></div>
                        </div>
                    </div>
                </div>

                {/* ღილაკები - Luxury Style */}
                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => navigate("/panel")}
                        className="group relative w-full overflow-hidden rounded-2xl p-[1.5px] transition-all hover:scale-[1.02] active:scale-95"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600 animate-gradient-x"></div>
                        <div className="relative flex items-center justify-center gap-3 bg-black rounded-2xl py-5 transition-all group-hover:bg-transparent">
                            <span className="text-white font-black uppercase tracking-[0.3em] text-[11px] group-hover:text-black transition-colors">
                                Access My Panel
                            </span>
                            <svg className="w-4 h-4 text-white group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="w-full py-5 border border-white/5 rounded-2xl text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-white/5 hover:text-white transition-all"
                    >
                        Back to Fleet
                    </button>
                </div>

                <p className="text-center mt-10 text-[8px] text-gray-700 font-bold uppercase tracking-[0.5em]">
                    Powered by NovaRide Security Architecture
                </p>
            </div>

            {/* Custom Animations */}
            <style jsx>{`
                @keyframes gradient-x {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient-x {
                    background-size: 200% 200%;
                    animation: gradient-x 3s ease infinite;
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




