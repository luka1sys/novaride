import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    // თქვენი ახალი ფერი: ნარინჯისფერი
    const brandAccent = 'rgb(254, 154, 0)';

    return (
        <section className="bg-black py-20 px-4 md:px-10 relative overflow-hidden">
            {/* ფონის დეკორაციები - Grid Pattern ნარინჯისფერში */}
            <div className="absolute inset-0 opacity-[0.1] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none">
                <div 
                    className="absolute inset-0" 
                    style={{ 
                        backgroundImage: `linear-gradient(${brandAccent} 1px, transparent 1px), linear-gradient(90deg, ${brandAccent} 1px, transparent 1px)`, 
                        backgroundSize: '50px 50px' 
                    }}
                ></div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto relative rounded-[40px] border border-white/10 bg-[#080808] overflow-hidden"
            >
                {/* Ambient Glows ნარინჯისფერში */}
                <div className="absolute -top-24 -right-24 w-96 h-96 blur-[120px] rounded-full opacity-15" style={{ backgroundColor: brandAccent }}></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 blur-[120px] rounded-full opacity-10" style={{ backgroundColor: brandAccent }}></div>

                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-8 md:px-20 py-20 gap-16">
                    
                    {/* ტექსტური ბლოკი */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 mb-8">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: brandAccent }}></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: brandAccent }}></span>
                                </span>
                                <span className="text-[10px] text-white/60 uppercase tracking-[0.3em] font-bold">Booking Open 24/7</span>
                            </div>

                            <h2 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase mb-8">
                                Take the <br /> 
                                <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>Wheel</span> <br />
                                <span style={{ color: brandAccent }}>Today.</span>
                            </h2>

                            <p className="text-gray-400 text-lg md:text-xl max-w-md leading-relaxed mb-12">
                                Unlock premium luxury and performance. Your dream car is just one click away from the open road.
                            </p>

                            <div className="flex flex-wrap gap-6 items-center">
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_50px_rgba(254,154,0,0.2)]"
                                    style={{ backgroundColor: brandAccent, color: '#000' }}
                                >
                                    Book Now
                                </motion.button>
                                
                                <button 
                                    className="text-white font-bold uppercase tracking-widest text-xs border-b-2 border-white/10 pb-2 transition-colors hover:border-[rgb(254,154,0)]"
                                >
                                    View Full Fleet
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* სურათის ბლოკი */}
                    <div className="w-full lg:w-1/2 relative group">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="relative z-10"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            
                            <img 
                                src="/cta-car-img.png" 
                                alt="Luxury Car" 
                                className="w-full h-auto drop-shadow-[0_35px_50px_rgba(0,0,0,0.9)] relative z-20"
                            />

                            {/* Floating Stats */}
                            <motion.div 
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute -top-4 -right-4 md:right-0 p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 z-30 hidden md:block shadow-2xl"
                            >
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Top Speed</p>
                                <p className="text-xl font-black text-white italic" style={{ color: brandAccent }}>320 KM/H</p>
                            </motion.div>
                        </motion.div>
                    </div>

                </div>
            </motion.div>
        </section>
    );
}

export default Contact;