import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from "react-router-dom";
import ChooseUs from "../components/ChooseU";
import ExecutivePartners from "../components/ExecutivePartners";
import Footer from "../components/Footer";
import WatchOurVideo from "../components/WatchOurVideo";
import About from "./About";

const AboutPage = () => {
    // Parallax ეფექტი ფონისთვის
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);

    return (
        <main className="bg-[#050505] min-h-screen text-white overflow-hidden selection:bg-amber-500 selection:text-black font-sans">
            
            {/* --- IMMERSIVE HERO SECTION --- */}
            <div className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
                {/* Parallax Background */}
                <motion.div 
                    style={{ y: y1 }}
                    className="absolute inset-0 z-0 scale-110"
                >
                    <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: "url('imgi_17_team-2.jpg')" }}
                    />
                    {/* მუქი Overlay შრეები უკეთესი კონტრასტისთვის */}
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#050505]"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-[#050505]/60"></div>
                </motion.div>

                <div className="relative z-10 text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-amber-500 font-bold tracking-[0.5em] uppercase text-[10px] md:text-xs mb-4 block">
                            Our Journey & Legacy
                        </span>
                        <h1 className="text-6xl md:text-[120px] font-black tracking-tighter uppercase leading-none italic mb-8">
                            Beyond <br /> 
                            <span className="text-transparent stroke-white opacity-80">The Drive</span>
                        </h1>
                        
                        <div className="flex items-center justify-center gap-6">
                            <div className="h-[1px] w-12 bg-amber-500/50"></div>
                            <nav className="flex items-center gap-4 text-white/80 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
                                <Link to="/" className="hover:text-amber-500 transition-all duration-300">Home</Link>
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                <span className="text-amber-500">Our Story</span>
                            </nav>
                            <div className="h-[1px] w-12 bg-amber-500/50"></div>
                        </div>
                    </motion.div>
                </div>

                {/* დეკორატიული ელემენტი ქვედა კუთხეში */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-20"></div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="relative z-10">
                {/* About Section - მცირე Reveal ანიმაციით */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <About />
                </motion.div>

                {/* Partners Section - ფონური განათებით */}
                <section className="relative py-10 overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 blur-[120px] rounded-full z-0 pointer-events-none"></div>
                    <ExecutivePartners />
                </section>
                
                {/* დახვეწილი გამყოფი ხაზი */}
                <div className="container mx-auto px-6 md:px-16">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>
                
                <WatchOurVideo />

                {/* Choose Us Section - მუქი ბლოკი */}
                <div className="bg-[#080808] py-10 border-y border-white/5">
                    <ChooseUs />
                </div>
            </div>

            {/* --- CALL TO ACTION (Optional) --- */}
            <section className="py-24 text-center px-6">
                <h3 className="text-3xl md:text-5xl font-bold mb-8 uppercase tracking-tighter">Ready to experience <br/> <span className="text-amber-500">The Excellence?</span></h3>
                <Link to="/carspage">
                    <button className="px-10 py-4 bg-amber-500 text-black font-black uppercase tracking-widest hover:bg-white transition-all duration-500 rounded-sm shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                        Explore Our Fleet
                    </button>
                </Link>
            </section>
            <Comment/>
            <Footer />
            {/* CSS for Text Stroke */}
            <style jsx>{`
                .stroke-white {
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.6);
                }
                @media (max-width: 768px) {
                    .stroke-white {
                        -webkit-text-stroke: 0.5px rgba(255, 255, 255, 0.6);
                    }
                }
            `}</style>
        </main>
    );
};

export default AboutPage;











// import { Link } from "react-router-dom";
// import { useEffect, useRef } from "react";

// const About = () => {
//     const containerRef = useRef(null);

//     useEffect(() => {
//         const handleScroll = () => {
//             if (containerRef.current) {
//                 const scrolled = window.scrollY;
//                 const elements = containerRef.current.querySelectorAll('.parallax-layer');
//                 elements.forEach((el, index) => {
//                     const speed = 0.05 + (index * 0.02);
//                     el.style.transform = `translateY(${scrolled * speed}px)`;
//                 });
//             }
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     return (
//         <section ref={containerRef} className='relative w-full min-h-screen flex flex-col lg:flex-row items-center justify-center py-32 px-6 md:px-16 lg:px-24 gap-16 overflow-hidden'>
            
//             {/* Soft Black Glass Background */}
//             <div className="absolute inset-0 -z-10">
//                 {/* ეს არის მთავარი "ბლანტი" ფენა */}
//                 <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[100px]"></div>
                
//                 {/* რბილი ნათება სიღრმისთვის */}
//                 <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-amber-500/5 rounded-full blur-[120px]"></div>
//                 <div className="absolute bottom-[0%] right-[-5%] w-[40%] h-[40%] bg-slate-400/5 rounded-full blur-[100px]"></div>
                
//                 {/* ძალიან ნაზი მარცვლოვანი ტექსტურა (Noise) */}
//                 <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
//             </div>

//             {/* Left Section - Image Composition */}
//             <div className='relative w-full lg:w-1/2 flex justify-center items-center z-20'>
//                 <div className="relative group">
//                     {/* Image with Glassy Border */}
//                     <div className="relative z-10 w-[280px] h-[400px] md:w-[450px] md:h-[600px] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
//                         <img 
//                             src="https://demo.awaikenthemes.com/novaride/wp-content/uploads/2024/08/about-img-1.jpg" 
//                             className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
//                             alt="Premium Automotive" 
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
//                     </div>

//                     {/* Glass Badge */}
//                     <div className="absolute -bottom-10 -right-6 md:-right-10 z-30 bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl transition-all duration-500 hover:-translate-y-2">
//                         <div className="text-center">
//                             <p className="text-amber-500 font-black text-5xl md:text-6xl leading-none">15</p>
//                             <p className="text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase mt-3">Years of Luxury</p>
//                         </div>
//                     </div>

//                     {/* Floating Glow Behind Image */}
//                     <div className="absolute -inset-4 bg-amber-500/5 blur-3xl -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
//                 </div>
//             </div>

//             {/* Right Section - Content */}
//             <div className='w-full lg:w-1/2 flex flex-col items-start z-30'>
//                 {/* Floating Tag */}
//                 <div className="inline-flex items-center gap-4 mb-8 bg-white/5 backdrop-blur-xl border border-white/10 px-5 py-2 rounded-full">
//                     <span className="text-amber-500 text-[10px] font-bold tracking-[0.5em] uppercase">
//                         The Heritage
//                     </span>
//                 </div>

//                 {/* Headline */}
//                 <h2 className='text-5xl md:text-7xl font-extralight leading-[1.1] text-white tracking-tight mb-10'>
//                     Elegance in <br />
//                     <span className='text-amber-500 italic font-black'>Motion</span>
//                 </h2>

//                 {/* Description */}
//                 <p className='text-white/40 text-lg font-light max-w-xl mb-14 leading-relaxed'>
//                     We don't just provide transport; we offer a sanctuary on wheels. 
//                     Every detail is crafted for those who appreciate the finer things 
//                     in life, ensuring a journey that is as quiet as it is powerful.
//                 </p>

//                 {/* Feature Cards - Ultra Minimal Glass */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-16">
//                     {[
//                         { title: "Elite Selection", desc: "Only the top 1% of luxury vehicles." },
//                         { title: "Seamless Tech", desc: "One-tap booking, real-time tracking." }
//                     ].map((feature, index) => (
//                         <div key={index} className="p-7 rounded-[1.5rem] border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.05] transition-all duration-500">
//                             <h3 className="text-white font-bold text-[11px] uppercase tracking-widest mb-3">
//                                 {feature.title}
//                             </h3>
//                             <p className="text-white/30 text-sm leading-relaxed font-light">
//                                 {feature.desc}
//                             </p>
//                         </div>
//                     ))}
//                 </div>

//                 {/* CTA with Soft Glow */}
//                 <div className="flex flex-col sm:flex-row items-center gap-10 w-full pt-10 border-t border-white/5">
//                     <Link to="/contactus" className="group relative">
//                         <div className="absolute -inset-1 bg-amber-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                         <div className="relative px-12 py-5 bg-white text-slate-950 font-black tracking-[0.2em] text-[11px] rounded-full transition-all duration-500 group-hover:-translate-y-1 uppercase">
//                             Our Story
//                         </div>
//                     </Link>

//                     <div className="flex gap-12">
//                         <div>
//                             <p className="text-white text-2xl font-light">99%</p>
//                             <p className="text-white/20 text-[8px] font-bold tracking-[0.3em] uppercase">Satisfaction</p>
//                         </div>
//                         <div>
//                             <p className="text-white text-2xl font-light">24/7</p>
//                             <p className="text-white/20 text-[8px] font-bold tracking-[0.3em] uppercase">Availability</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Background Decorative Text - Floating Luxe */}
//             <div className="absolute -bottom-10 -right-10 opacity-[0.01] pointer-events-none select-none">
//                 <h2 className="text-[350px] font-black text-white leading-none">NOVA</h2>
//             </div>
//         </section>
//     );
// }

// export default About;