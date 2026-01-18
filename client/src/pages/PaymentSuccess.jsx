import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmBookingPayment } from "../services/paymentService";
import { useBooking } from "../contexts/BookingContext";

const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const bookingId = searchParams.get("bookingId");
    const { fetchMyBookings } = useBooking();

    // შენი მითითებული ოქროსფერი (Vibrant Gold)
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
        <section className="bg-[#050505] min-h-screen flex items-center justify-center py-20 px-6 relative overflow-hidden font-sans">
            
            {/* დიდი ფონური წარწერები უფრო მკვეთრი დიზაინისთვის */}
            <div className="absolute top-10 left-0 text-[15vw] font-black text-white/[0.02] leading-none select-none pointer-events-none tracking-tighter uppercase">
                NOVARIDE
            </div>
            <div className="absolute bottom-10 right-0 text-[15vw] font-black text-white/[0.02] leading-none select-none pointer-events-none tracking-tighter uppercase">
                PREMIUM
            </div>

            <div className="max-w-4xl w-full relative z-10 text-center">
                
                {/* ცენტრალური Success აიკონი და ანიმაცია */}
                <div className="mb-12 relative inline-block">
                    <div className="absolute inset-0 rounded-full blur-3xl opacity-20 animate-pulse" style={{ backgroundColor: accentColor }}></div>
                    <div className="relative w-32 h-32 md:w-40 md:h-40 border-2 rounded-full flex items-center justify-center mx-auto transition-transform duration-700 hover:scale-110" style={{ borderColor: accentColor }}>
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2.5" className="drop-shadow-2xl">
                            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

                {/* მთავარი ტექსტი */}
                <div className="mb-12">
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4 italic">
                        Booking <span style={{ color: accentColor }}>Successful</span>
                    </h1>
                    <div className="h-1 w-24 mx-auto mb-6" style={{ backgroundColor: accentColor }}></div>
                    <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto">
                        Your transaction has been processed securely. Your high-end journey with NovaRide starts now.
                    </p>
                </div>

                {/* ინფორმაციის სექცია - უფრო სუფთა და მკაფიო */}
                <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
                    <div className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 text-left">Reference Number</p>
                        <p className="text-xl font-black text-white text-left italic">#{bookingId?.slice(-8).toUpperCase() || "NR-777-GOLD"}</p>
                    </div>
                    <div className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl backdrop-blur-sm flex items-center justify-between">
                        <div className="text-left">
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Order Status</p>
                            <p className="text-lg font-black text-white uppercase italic">Confirmed</p>
                        </div>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-500/10 border border-green-500/20">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
                        </div>
                    </div>
                </div>

                {/* მოქმედების ღილაკები */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <button
                        onClick={() => navigate("/panel")}
                        style={{ backgroundColor: accentColor }}
                        className="w-full sm:w-auto px-12 py-5 text-black font-black uppercase tracking-[0.2em] text-[12px] rounded-full hover:shadow-[0_0_40px_rgba(254,154,0,0.4)] transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
                    >
                        Go to My Dashboard
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="w-full sm:w-auto px-12 py-5 border-2 border-white/10 text-white font-black uppercase tracking-[0.2em] text-[12px] rounded-full hover:bg-white hover:text-black transition-all duration-300"
                    >
                        Back to Fleet
                    </button>
                </div>

                {/* დამხმარე მესიჯი */}
                <p className="mt-12 text-gray-600 text-[10px] font-bold uppercase tracking-[0.3em]">
                    A digital access key has been sent to your email address.
                </p>

            </div>

            {/* დეკორატიული ელემენტები კუთხეებში */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.01] rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/[0.01] rounded-full -ml-48 -mb-48"></div>

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




