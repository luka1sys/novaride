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
        <section className="bg-[#050505] min-h-screen flex items-center justify-center py-10 px-6 relative overflow-hidden font-sans">
            
            {/* ფონური ტექსტი - უფრო მცირე ზომის */}
            <div className="absolute top-5 left-5 text-[10vw] font-black text-white/[0.01] select-none pointer-events-none uppercase">
                Nova
            </div>

            {/* მთავარი კონტეინერი - შეზღუდული სიგანით (max-w-2xl) */}
            <div className="max-w-2xl w-full bg-[#0a0a0a] border border-white/5 rounded-[40px] p-8 md:p-12 relative z-10 shadow-2xl text-center">
                
                {/* ფოტოს სექცია - success.png */}
                <div className="mb-8 relative inline-block">
                    <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full"></div>
                    <img 
                        src="/success.png" 
                        alt="Success" 
                        className="w-32 h-32 md:w-40 md:h-40 object-contain relative z-10 mx-auto animate-bounce-slow"
                    />
                </div>

                {/* სათაური და სტატუსი */}
                <div className="mb-8">
                    <span style={{ color: accentColor }} className="text-[10px] font-black uppercase tracking-[0.5em] block mb-2">
                        Transaction Completed
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic">
                        Booking <span style={{ color: accentColor }}>Confirmed</span>
                    </h1>
                </div>

                {/* ინფორმაციის ბლოკი - კომპაქტური */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-left w-full md:w-auto">
                        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">Reference</p>
                        <p className="text-lg font-black text-white italic tracking-tight">
                            #{bookingId?.slice(-8).toUpperCase() || "NR-777-GOLD"}
                        </p>
                    </div>
                    
                    <div className="h-px md:h-8 w-full md:w-px bg-white/10"></div>

                    <div className="flex items-center gap-3 w-full md:w-auto justify-start md:justify-end">
                        <div className="text-right">
                            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">Status</p>
                            <p className="text-sm font-black text-white uppercase italic">Verified Safe</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        </div>
                    </div>
                </div>

                {/* ღილაკები - უფრო კომპაქტური */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => navigate("/panel")}
                        style={{ backgroundColor: accentColor }}
                        className="w-full sm:w-auto px-8 py-4 text-black font-black uppercase tracking-widest text-[11px] rounded-xl hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-orange-500/20"
                    >
                        Go to Dashboard
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="w-full sm:w-auto px-8 py-4 border border-white/10 text-white font-black uppercase tracking-widest text-[11px] rounded-xl hover:bg-white hover:text-black transition-all"
                    >
                        Back to Fleet
                    </button>
                </div>

                <p className="mt-8 text-gray-600 text-[9px] font-bold uppercase tracking-[0.2em]">
                    Confirmation mail is on its way to your inbox
                </p>
            </div>

            {/* დეკორატიული "ორბიტები" */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/[0.02] rounded-full pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/[0.01] rounded-full pointer-events-none"></div>

            <style jsx>{`
                .animate-bounce-slow {
                    animation: bounce 3s infinite;
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
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




