import { useState } from "react";
import { useBooking } from "../contexts/BookingContext";

const CreateBookingForm = ({ carId }) => {
    const { createBooking, proccedToCheckout, error } = useBooking();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!startDate || !endDate) return alert("Please select both dates");

        setLoading(true);
        try {
            const booking = await createBooking({ carId, startDate, endDate });
            await proccedToCheckout(booking._id);
            setStartDate("");
            setEndDate("");
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            {/* Error Message Section */}
            {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border-l-4 border-[#ff3131] rounded-r-xl animate-shake">
                    <svg className="text-[#ff3131] shrink-0" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-[11px] font-black uppercase tracking-tight text-[#ff3131]">
                        {error}
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-[0.2em] ml-1">
                        Pick-up Date
                    </label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#ff3131] focus:border-transparent outline-none transition-all font-medium text-gray-700"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-[0.2em] ml-1">
                        Return Date
                    </label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#ff3131] focus:border-transparent outline-none transition-all font-medium text-gray-700"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-bold text-gray-400 tracking-[0.2em] ml-1">
                    Special Instructions (Optional)
                </label>
                <textarea
                    placeholder="E.g. I will arrive late, please prepare a child seat..."
                    rows="3"
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#ff3131] focus:border-transparent outline-none transition-all font-medium text-gray-700 resize-none"
                ></textarea>
            </div>

            <div className="p-5 border border-gray-100 rounded-2xl flex justify-between items-center bg-white shadow-sm shadow-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#ff3131] rounded-full animate-ping"></div>
                    <p className="text-[11px] font-bold uppercase tracking-tight italic">Instant confirmation</p>
                </div>
                <div className="text-right">
                    <span className="text-xl font-black italic">$0.00 <span className="text-[10px] text-gray-400 not-italic uppercase tracking-tighter">Initial</span></span>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-5 rounded-xl font-black uppercase tracking-[0.2em] text-sm transition-all duration-300 transform active:scale-95 shadow-lg 
                    ${loading
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-black text-white hover:bg-[#ff3131] hover:shadow-red-200"
                    }`}
            >
                {loading ? "Processing..." : "Confirm Reservation"}
            </button>

            <p className="text-center text-[9px] text-gray-400 uppercase tracking-widest">
                NovaRide • Premium Fleet Services
            </p>
        </form>
    );
};

export default CreateBookingForm;