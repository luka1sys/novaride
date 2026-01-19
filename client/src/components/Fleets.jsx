import { useRef } from "react";
import { useCars } from "../contexts/CarsContext";
import { Link } from "react-router-dom";

const Fleets = () => {
    const scrollRef = useRef(null);
    const { cars } = useCars();

    const scroll = (direction) => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            // მობილურზე უფრო მცირე მანძილზე დასქროლოს, რომ შემდეგი ქარდი არ გამოტოვოს
            const scrollAmount = window.innerWidth < 768 
                ? container.offsetWidth * 0.8 
                : container.offsetWidth * 0.5;
            
            const scrollTo = direction === 'left' 
                ? container.scrollLeft - scrollAmount 
                : container.scrollLeft + scrollAmount;
                
            container.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <section className="bg-[#050505] text-white py-16 md:py-24 overflow-hidden border-t border-white/5">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-8">
                    <div className="w-full">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-[1px] bg-[#FE9A00]"></div>
                            <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-gray-400 font-bold">
                                Premium Fleet
                            </span>
                        </div>
                        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] uppercase italic">
                            Elite <br />
                            <span className="stroke-text">Machines</span>
                        </h2>
                    </div>
                    
                    {/* Controls - მობილურზეც დავტოვოთ, რომ მომხმარებელს არჩევანი ჰქონდეს */}
                    <div className="flex gap-4 pb-2 ml-auto md:ml-0">
                        <button onClick={() => scroll('left')} className="p-3 md:p-5 border border-white/10 hover:bg-[#FE9A00] hover:text-black transition-all duration-500 rounded-full active:scale-90">
                            <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M5 12L12 19M5 12L12 5"/></svg>
                        </button>
                        <button onClick={() => scroll('right')} className="p-3 md:p-5 border border-white/10 hover:bg-[#FE9A00] hover:text-black transition-all duration-500 rounded-full active:scale-90">
                            <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12H19M19 12L12 5M19 12L12 19"/></svg>
                        </button>
                    </div>
                </div>

                {/* Horizontal Car List */}
                <div 
                    ref={scrollRef}
                    className="flex gap-5 md:gap-10 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-10 -mx-4 px-4 md:mx-0 md:px-0"
                >
                    {cars.map((car, index) => (
                        <div key={car._id} className="snap-center flex-shrink-0 w-[88vw] sm:w-[450px] md:w-[600px] lg:w-[700px] relative group">
                            
                            {/* Number Indicator - ზომები ოპტიმიზირებულია */}
                            <span className="absolute -top-6 md:-top-10 -left-2 text-6xl md:text-8xl font-black opacity-10 text-white z-0 pointer-events-none italic">
                                0{index + 1}
                            </span>

                            {/* Image Container */}
                            <div className="relative overflow-hidden aspect-[16/10] sm:aspect-[4/3] md:aspect-[16/10] rounded-2xl bg-[#111] z-10 border border-white/5">
                                <img 
                                    src={car.images[0]} 
                                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                                    alt={car.brand} 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/20 to-transparent p-5 md:p-10 flex justify-between items-end">
                                    <div className="flex-grow pr-4">
                                        <p className="text-[#FE9A00] font-bold text-[10px] md:text-xs tracking-widest uppercase mb-1">{car.brand}</p>
                                        <h3 className="text-xl sm:text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none truncate">{car.model}</h3>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <span className="block text-xl md:text-3xl font-black text-white">${car.pricePerDay}</span>
                                        <span className="text-[10px] text-gray-400 uppercase tracking-tighter font-bold">Day Rate</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tech Specs Section */}
                            <div className="mt-6 flex items-center justify-between border-b border-white/10 pb-8">
                                <div className="flex gap-6 md:gap-12">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] md:text-[10px] uppercase text-gray-500 font-black mb-1 tracking-widest">Power</span>
                                        <span className="text-xs md:text-sm font-bold uppercase">{car.fueltype}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] md:text-[10px] uppercase text-gray-500 font-black mb-1 tracking-widest">Capacity</span>
                                        <span className="text-xs md:text-sm font-bold uppercase">{car.pasenger} Seats</span>
                                    </div>
                                </div>
                                
                                <Link 
                                    to={`/car/${car._id}`}
                                    className="flex items-center gap-3 group/link"
                                >
                                    <span className="hidden sm:inline-block text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-[#FE9A00] transition-colors">Details</span>
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#FE9A00] group-hover:bg-[#FE9A00] group-hover:text-black transition-all duration-500">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform">
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
                    -webkit-text-stroke: 1.5px rgba(255,255,255,0.2);
                }
                @media (max-width: 768px) {
                    .stroke-text { -webkit-text-stroke: 1px rgba(255,255,255,0.2); }
                }
            `}</style>
        </section>
    );
};

export default Fleets;