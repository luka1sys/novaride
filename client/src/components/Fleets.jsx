import { useRef } from "react";
import { useCars } from "../contexts/CarsContext";
import { Link } from "react-router-dom";

const Fleets = () => {
    const scrollRef = useRef(null);
    const { cars } = useCars();

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            // მობილურზე უფრო ცოტათი გადასქროლოს, დესკტოპზე ბევრად
            const scrollAmount = window.innerWidth < 768 ? clientWidth * 0.9 : clientWidth * 0.5;
            const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <section className="bg-[#050505] text-white py-16 md:py-32 overflow-hidden border-t border-white/5">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
                    <div className="w-full">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 md:w-12 h-[1px] bg-[#FE9A00]"></div>
                            <span className="text-[10px] tracking-[0.4em] uppercase text-[#FE9A00] font-bold">
                                Premium Fleet
                            </span>
                        </div>
                        <h2 className="text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] uppercase italic">
                            Elite <br />
                            <span className="stroke-text">Machines</span>
                        </h2>
                    </div>
                    
                    {/* Controls - მობილურზეც დავტოვოთ, ოღონდ პატარები */}
                    <div className="flex gap-3 md:gap-4 ml-auto md:ml-0">
                        <button onClick={() => scroll('left')} className="p-3 md:p-5 border border-white/10 hover:bg-[#FE9A00] hover:text-black transition-all duration-500 rounded-full group">
                            <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M5 12L12 19M5 12L12 5"/></svg>
                        </button>
                        <button onClick={() => scroll('right')} className="p-3 md:p-5 border border-white/10 hover:bg-[#FE9A00] hover:text-black transition-all duration-500 rounded-full group">
                            <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12H19M19 12L12 5M19 12L12 19"/></svg>
                        </button>
                    </div>
                </div>

                {/* Horizontal Car List */}
                <div 
                    ref={scrollRef}
                    className="flex gap-6 md:gap-10 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-10 -mx-4 px-4 md:mx-0 md:px-0"
                >
                    {cars.map((car, index) => (
                        <div key={car._id} className="snap-center flex-shrink-0 w-[90vw] sm:w-[500px] md:w-[700px] relative group">
                            
                            {/* Number Indicator - ზომა და პოზიცია გასწორებულია */}
                            <span className="absolute -top-6 md:-top-10 -left-2 text-6xl md:text-9xl font-black opacity-5 text-white z-0 pointer-events-none italic">
                                {index < 9 ? `0${index + 1}` : index + 1}
                            </span>

                            {/* Image Container */}
                            <div className="relative overflow-hidden aspect-[16/10] md:aspect-[16/9] rounded-2xl bg-[#0a0a0a] z-10 border border-white/5">
                                <img 
                                    src={car.images[0]} 
                                    className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                                    alt={car.brand} 
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/20 to-transparent p-6 md:p-10 flex justify-between items-end">
                                    <div className="flex-grow">
                                        <p className="text-[#FE9A00] font-bold text-[10px] md:text-xs tracking-widest uppercase mb-2">{car.brand}</p>
                                        <h3 className="text-2xl md:text-5xl font-black uppercase tracking-tighter leading-none">{car.model}</h3>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <span className="block text-2xl md:text-4xl font-black text-white">${car.pricePerDay}</span>
                                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Per Day</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tech Specs Section */}
                            <div className="mt-8 flex items-center justify-between border-b border-white/10 pb-8 group-hover:border-[#FE9A00]/50 transition-colors">
                                <div className="flex gap-8 md:gap-16">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase text-gray-500 font-black mb-2 tracking-widest">Power Source</span>
                                        <span className="text-xs md:text-base font-bold uppercase text-gray-200">{car.fueltype}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase text-gray-500 font-black mb-2 tracking-widest">Capacity</span>
                                        <span className="text-xs md:text-base font-bold uppercase text-gray-200">{car.pasenger} Seats</span>
                                    </div>
                                </div>
                                
                                <Link 
                                    to={`/car/${car._id}`}
                                    className="flex items-center gap-4 group/link"
                                >
                                    <span className="hidden sm:inline-block text-[11px] font-black uppercase tracking-[0.2em] text-white/50 group-hover/link:text-[#FE9A00] transition-colors">Experience</span>
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center group-hover/link:border-[#FE9A00] group-hover/link:bg-[#FE9A00] group-hover/link:text-black transition-all duration-500">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover/link:translate-x-1 transition-transform">
                                            <path d="M5 12H19M19 12L12 5M19 12L12 19"/>
                                        </svg>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                .stroke-text {
                    color: transparent;
                    -webkit-text-stroke: 1.5px rgba(255,255,255,0.15);
                }
                @media (max-width: 768px) {
                    .stroke-text { -webkit-text-stroke: 1px rgba(255,255,255,0.2); }
                }
            `}</style>
        </section>
    );
};

export default Fleets;