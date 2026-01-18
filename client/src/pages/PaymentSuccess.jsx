import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmBookingPayment } from "../services/paymentService";
import { useBooking } from "../contexts/BookingContext";

const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const bookingId = searchParams.get("bookingId");
    const { fetchMyBookings } = useBooking();

    useEffect(() => {
        if (!bookingId) return;
        confirmBookingPayment(bookingId)
            .then(() => fetchMyBookings())
            .catch(err => console.error("Failed to confirm booking", err));
    }, [bookingId, fetchMyBookings]);

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 font-sans antialiased overflow-hidden relative">
            
            {/* ფონური დეკორატიული ელემენტი (Blur effect) */}
            <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#ff3131] opacity-[0.05] rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-white opacity-[0.03] rounded-full blur-[100px]"></div>

            <div className="max-w-2xl w-full relative z-10">
                {/* მთავარი კონტეინერი */}
                <div className="bg-white rounded-[48px] p-8 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.4)] text-center relative overflow-hidden">
                    
                    {/* წითელი ზედა ხაზი */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-[#ff3131]"></div>

                    {/* ჩეკის აიკონი (Pure CSS) */}
                    <div className="mb-10 flex justify-center">
                        <div className="w-20 h-20 bg-black rounded-3xl rotate-12 flex items-center justify-center shadow-xl shadow-red-500/20 group hover:rotate-0 transition-transform duration-500">
                            <div className="w-10 h-10 border-b-4 border-r-4 border-[#ff3131] rotate-45 mb-2 mr-1"></div>
                        </div>
                    </div>

                    {/* ტექსტი */}
                    <div className="space-y-4 mb-12">
                        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">
                            DRIVE <span className="text-[#ff3131] block md:inline underline decoration-black decoration-4 underline-offset-8">LOCKED.</span>
                        </h1>
                        <div className="flex items-center justify-center gap-3">
                            <span className="h-[1px] w-8 bg-gray-300"></span>
                            <p className="text-gray-400 font-bold uppercase tracking-[0.4em] text-[10px]">
                                Transaction Confirmed
                            </p>
                            <span className="h-[1px] w-8 bg-gray-300"></span>
                        </div>
                    </div>

                    {/* საინფორმაციო ბლოკი (Modern minimalist style) */}
                    <div className="bg-gray-50 border border-gray-100 rounded-[32px] p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-left">
                            <p className="text-[10px] font-black uppercase text-[#ff3131] tracking-widest mb-1">Booking Identity</p>
                            <p className="text-xl font-mono font-bold text-black tracking-tighter">#{bookingId?.slice(-8).toUpperCase() || "N1-SUCCESS"}</p>
                        </div>
                        <div className="h-px md:h-12 w-full md:w-px bg-gray-200"></div>
                        <div className="text-center md:text-right max-w-[250px]">
                            <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                                Confirmation and digital key sent to your <span className="text-black font-bold italic">Private Inbox</span>.
                            </p>
                        </div>
                    </div>

                    {/* ღილაკები */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => navigate("/panel")}
                            className="flex-[2] py-6 bg-black text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-[#ff3131] transition-all duration-500 shadow-lg shadow-black/10 hover:shadow-[#ff3131]/20 active:scale-95"
                        >
                            Access Dashboard
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="flex-1 py-6 border-2 border-black text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-black hover:text-white transition-all duration-500 active:scale-95"
                        >
                            Fleet
                        </button>
                    </div>
                </div>

                {/* ქვედა ბრენდინგი */}
                <div className="mt-10 flex flex-col items-center gap-2">
                    <p className="text-[12px] font-black uppercase tracking-[0.8em] text-white/40">
                        NovaRide
                    </p>
                    <div className="w-12 h-1 bg-[#ff3131]"></div>
                </div>
            </div>
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




