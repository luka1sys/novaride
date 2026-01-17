import { useRef } from "react";
import { useCars } from "../contexts/CarsContext";
import { Link } from "react-router-dom";

const Fleets = () => {
    const scrollRef = useRef(null);
    const { cars } = useCars();
    const accentColor = "#FE9A00";

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <section className="bg-[#050505] text-white py-16 md:py-24 overflow-hidden border-t border-white/5">
            <div className="max-w-[1400px] mx-auto px-4 md:px-6">
                
                {/* Header: Responsive Design */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-[1px] bg-[#FE9A00]"></div>
                            <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-gray-400 font-bold">
                                Premium Fleet
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase">
                            Elite <br />
                            <span className="stroke-text">Machines</span>
                        </h2>
                    </div>
                    
                    {/* Controls - Hidden on Mobile */}
                    <div className="hidden md:flex gap-4 pb-2">
                        <button onClick={() => scroll('left')} className="p-4 border border-white/10 hover:bg-[#FE9A00] hover:text-black transition-all duration-500 rounded-full">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M5 12L12 19M5 12L12 5"/></svg>
                        </button>
                        <button onClick={() => scroll('right')} className="p-4 border border-white/10 hover:bg-[#FE9A00] hover:text-black transition-all duration-500 rounded-full">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12H19M19 12L12 5M19 12L12 19"/></svg>
                        </button>
                    </div>
                </div>

                {/* Horizontal List */}
                <div 
                    ref={scrollRef}
                    className="flex gap-4 md:gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-6"
                >
                    {cars.map((car, index) => (
                        <div key={car._id} className="snap-center flex-shrink-0 w-[90vw] md:w-[600px] relative group">
                            {/* Number Indicator - Smaller on mobile */}
                            <span className="absolute -top-4 md:-top-6 -left-1 text-5xl md:text-7xl font-black opacity-5 text-white z-0 pointer-events-none">
                                0{index + 1}
                            </span>

                            <div className="relative overflow-hidden aspect-[4/3] md:aspect-[16/10] rounded-lg bg-[#111]">
                                <img 
                                    src={car.images[0]} 
                                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                                    alt={car.brand} 
                                />
                                {/* Overlay Info */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-6 md:p-8 flex justify-between items-end">
                                    <div>
                                        <p className="text-[#FE9A00] font-bold text-[10px] md:text-xs tracking-widest uppercase mb-1">{car.brand}</p>
                                        <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter">{car.model}</h3>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-xl md:text-2xl font-black">${car.pricePerDay}</span>
                                        <span className="text-[9px] text-gray-400 uppercase tracking-tighter">Day Rate</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tech Specs Line */}
                            <div className="mt-5 flex items-center justify-between border-b border-white/5 pb-6">
                                <div className="flex gap-6 md:gap-12">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] md:text-[10px] uppercase text-gray-500 font-bold mb-1">Power</span>
                                        <span className="text-[12px] md:text-sm font-medium uppercase">{car.fueltype}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] md:text-[10px] uppercase text-gray-500 font-bold mb-1">Capacity</span>
                                        <span className="text-[12px] md:text-sm font-medium uppercase">{car.pasenger} Seats</span>
                                    </div>
                                </div>
                                
                                <Link 
                                    to={`/car/${car._id}`}
                                    className="flex items-center gap-3 group/link"
                                >
                                    <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-widest group-hover:text-[#FE9A00] transition-colors">Details</span>
                                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#FE9A00] group-hover:bg-[#FE9A00]/10 transition-all">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform"><path d="M5 12H19M19 12L12 5M19 12L12 19"/></svg>
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
                    -webkit-text-stroke: 1px rgba(255,255,255,0.3);
                }
            `}</style>
        </section>
    );
};

export default Fleets;