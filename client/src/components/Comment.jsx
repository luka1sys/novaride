import React from 'react';

const Comment = () => {
    // მონაცემების მასივი
    const testimonials = [
        {
            id: 1,
            name: "Leslie Alexander",
            role: "Project Manager",
            image: "/coment1.jpg",
            stars: 5,
        },
        {
            id: 2,
            name: "Alis White",
            role: "Project Manager",
            image: "/coment2.jpg",
            stars: 4,
        },
        {
            id: 3,
            name: "Floyd Miles",
            role: "Project Manager",
            image: "/coment3.jpg",
            stars: 5,
        }
    ];

    const brandAccent = '#fe9a00'; // შენი ძირითადი ნარინჯისფერი

    return (
        <section className="py-24 px-4 md:px-10 bg-[#050505]">
            <div className="max-w-7xl mx-auto">
                
                {/* სათაურის ნაწილი */}
                <div className="mb-16">
                    <span className="text-[#fe9a00] font-bold uppercase tracking-[0.2em] text-sm mb-4 block">
                        Testimonials
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white leading-tight max-w-2xl uppercase tracking-tighter">
                        What our customers are <br /> 
                        <span className="text-gray-500">saying about us</span>
                    </h2>
                </div>

                {/* ქარდების კონტეინერი */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {testimonials.map((item) => (
                        <div 
                            key={item.id} 
                            className="bg-white rounded-[40px] p-10 flex flex-col h-full transition-transform hover:-translate-y-2 duration-300"
                        >
                            {/* ვარსკვლავები */}
                            <div className="flex gap-1 mb-8">
                                {[...Array(5)].map((_, i) => (
                                    <svg 
                                        key={i}
                                        className={`w-5 h-5 ${i < item.stars ? 'text-[#ff4d1c]' : 'text-gray-200'}`} 
                                        fill="currentColor" 
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            {/* ტექსტი */}
                            <p className="text-gray-600 text-[17px] leading-relaxed mb-12 flex-grow">
                                Renting a car from nova ride was a great decision. Not only did I get a reliable and comfortable vehicle, but the prices were also very competitive.
                            </p>

                            {/* ხაზი */}
                            <div className="w-full h-[1px] bg-gray-100 mb-8"></div>

                            {/* მომხმარებლის ინფო */}
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-50">
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="w-full h-full object-cover grayscale" 
                                    />
                                </div>
                                <div>
                                    <h4 className="text-gray-900 font-black text-lg uppercase tracking-tight">{item.name}</h4>
                                    <p className="text-gray-400 text-sm font-medium">{item.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ნავიგაციის ღილაკები */}
                <div className="flex justify-center gap-4">
                    <button className="w-14 h-14 rounded-full bg-[#ff4d1c] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-orange-900/20">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button className="w-14 h-14 rounded-full bg-[#ff4d1c] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-orange-900/20">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

            </div>
        </section>
    );
}

export default Comment;