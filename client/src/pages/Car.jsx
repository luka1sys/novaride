import { useRef } from "react";
import Footer from "../components/Footer";
import { useCars } from "../contexts/CarsContext";
import { useNavigate, useParams } from "react-router-dom";

const Car = () => {
    const { cars } = useCars();
    const { id } = useParams();
    const scrollRef = useRef(null);
    const navigate = useNavigate();

    const car = cars.find(c => c._id === id);

    if (!car) {
        return <div className="h-screen flex items-center justify-center text-white bg-[#050505] text-2xl font-medium">Machine Not Found</div>;
    }

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <main className="bg-[#050505] text-[#e0e0e0] min-h-screen font-sans selection:bg-[#FE9A00] selection:text-black">

            {/* Elegant Hero Section */}
            <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
                <img
                    src={car.images[0]}
                    className="w-full h-full object-cover opacity-50"
                    alt={car.brand}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/60 flex flex-col justify-end pb-16 px-6 md:px-12">
                    <div className="max-w-[1200px] mx-auto w-full">
                        <p className="text-[#FE9A00] font-medium text-lg mb-2">Premium Vehicle Details</p>
                        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                            {car.brand} <span className="font-light text-gray-400">{car.model}</span>
                        </h1>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Left Column: Images & Features (7 Columns) */}
                <div className="lg:col-span-8 space-y-16">

                    {/* Image Slider */}
                    <div className="relative group overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                        <div
                            ref={scrollRef}
                            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4"
                        >
                            {car.images.map((img, i) => (
                                <div key={i} className="flex-shrink-0 w-full aspect-video snap-center">
                                    <img src={img} className="w-full h-full object-cover" alt="" />
                                </div>
                            ))}
                        </div>
                        <div className="absolute bottom-8 right-8 flex gap-4">
                            <button onClick={() => scroll('left')} className="p-4 bg-black/60 backdrop-blur-md border border-white/20 rounded-full hover:bg-[#FE9A00] hover:text-black transition-all">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                            </button>
                            <button onClick={() => scroll('right')} className="p-4 bg-black/60 backdrop-blur-md border border-white/20 rounded-full hover:bg-[#FE9A00] hover:text-black transition-all">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                            </button>
                        </div>
                    </div>

                    {/* Amenities Section */}
                    <div>
                        <h3 className="text-2xl font-bold mb-10 text-white flex items-center gap-4">
                            Equipment & Features <div className="h-[1px] flex-1 bg-white/10"></div>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Object.entries(car.features).map(([key, value]) => {
                                if (typeof value !== 'boolean') return null;
                                return (
                                    <div key={key} className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 transition-all hover:bg-white/[0.05]">
                                        <div className={`w-2 h-2 rounded-full ${value ? 'bg-[#FE9A00] shadow-[0_0_10px_#FE9A00]' : 'bg-white/10'}`}></div>
                                        <span className={`text-[15px] font-medium ${value ? 'text-gray-200' : 'text-gray-600'}`}>
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Column: Information & Booking Card (4 Columns) */}
                <section className="lg:col-span-4 lg:sticky lg:top-10 self-start h-fit w-full bg-[#0c0c0c] border border-white/10 overflow-hidden rounded-[40px] pb-10 shadow-2xl relative">
                    
                    {/* Background Glow */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FE9A00] opacity-5 blur-[100px]"></div>

                    {/* Price Display */}
                    <div className="flex relative h-[100px] px-8 md:px-10 mt-8 items-center border-b border-white/5">
                        <p className="text-5xl md:text-6xl font-bold text-white tracking-tighter">
                            ${car.pricePerDay}
                        </p>
                        <p className="text-lg text-gray-500 ml-3 self-end mb-3 font-medium">/ per Day</p>
                    </div>

                    {/* Specs Table */}
                    <div className="mt-8 flex flex-col gap-6 px-8 md:px-10">
                        {[
                            { icon: "/810008.png", label: "Doors", val: car.doors },
                            { icon: "/imgi_4_icon-passengers (1).svg", label: "Passenger", val: car.pasenger },
                            { icon: "/imgi_5_icon-transmission.svg", label: "Transmission", val: car.transmission?.split(' ')[0] },
                            { icon: "/imgi_6_icon-age.svg", label: "Year", val: car.year },
                            { icon: "/car-seat-with-seatbelt-svgrepo-com (2).svg", label: "Seats", val: car.pasenger },
                            { icon: "/imgi_8_icon-aircondition.svg", label: "Air Condition", val: car.features.airCondition ? "Yes" : "No" }
                        ].map((item, index) => (
                            <div key={index} className="flex relative items-center gap-4 group">
                                <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl group-hover:bg-[#FE9A00]/10 transition-colors">
                                    <img className="w-6 h-6 object-contain brightness-200 opacity-70 group-hover:opacity-100" src={item.icon} alt={item.label} />
                                </div>
                                <p className="text-[17px] text-gray-400 font-medium">{item.label}</p>
                                <p className="absolute right-0 text-[18px] font-bold text-white">{item.val}</p>
                            </div>
                        ))}
                    </div>

                    <hr className="w-[85%] border-white/5 mx-auto mt-10" />

                    {/* Booking Buttons */}
                    <div className="mt-8 flex items-center justify-center gap-4 px-6 md:px-8">
                        {/* Custom Book Now Button Group */}
                        <div className="group flex items-center">
                            <button
                                onClick={() => navigate(`/bookingpage/${car._id}`)}
                                className="w-[130px] md:w-[150px] h-[60px] cursor-pointer rounded-l-[30px] bg-[#FE9A00] flex justify-center items-center text-black font-black text-[17px] hover:bg-white transition-all duration-300"
                            >
                                Book Now
                            </button>
                            <button 
                                onClick={() => navigate(`/bookingpage/${car._id}`)}
                                className="bg-[#FE9A00] w-[60px] h-[60px] rounded-r-[30px] border-l border-black/10 group-hover:bg-white cursor-pointer flex justify-center items-center transition-all duration-500"
                            >
                                <svg 
                                    className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-500" 
                                    fill="none" height="30" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M15.0378 6.34317L13.6269 7.76069L16.8972 11.0157L3.29211 11.0293L3.29413 13.0293L16.8619 13.0157L13.6467 16.2459L15.0643 17.6568L20.7079 11.9868L15.0378 6.34317Z" fill="black" />
                                </svg>
                            </button>
                        </div>

                        <p className="text-gray-600 font-bold text-sm">OR</p>

                        {/* WhatsApp Button */}
                        <button className="bg-[#25D366] hover:scale-110 flex justify-center items-center w-[60px] h-[60px] rounded-full cursor-pointer transition-all duration-300 group shadow-[0_0_15px_rgba(37,211,102,0.2)]">
                            <img 
                                className="w-8 h-8" 
                                src="/whatsapp-svgrepo-com (1).svg" 
                                alt="WhatsApp" 
                            />
                        </button>
                    </div>

                    <p className="mt-8 text-center text-[10px] uppercase tracking-[0.2em] text-gray-600 font-bold px-10">
                        Premium Service • 24/7 Support
                    </p>
                </section>
            </div>

            <Footer />

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                @keyframes shine {
                    from { transform: translateX(-100%) skewX(-25deg); }
                    to { transform: translateX(200%) skewX(-25deg); }
                }
            `}</style>
        </main>
    );
};

export default Car;