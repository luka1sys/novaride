import React from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        id: 1,
        name: "Leslie Alexander",
        role: "Project Manager",
        image: "/coment1.jpg",
        stars: 5,
        text: "Renting a car from nova ride was a great decision. Not only did I get a reliable and comfortable vehicle, but the prices were also very competitive."
    },
    {
        id: 2,
        name: "Alis White",
        role: "Project Manager",
        image: "/coment2.jpg",
        stars: 4,
        text: "Renting a car from nova ride was a great decision. Not only did I get a reliable and comfortable vehicle, but the prices were also very competitive."
    },
    {
        id: 3,
        name: "Floyd Miles",
        role: "Project Manager",
        image: "/coment3.jpg",
        stars: 5,
        text: "Renting a car from nova ride was a great decision. Not only did I get a reliable and comfortable vehicle, but the prices were also very competitive."
    },
    {
        id: 4,
        name: "Annette Black",
        role: "Project Manager",
        image: "/coment4.jpg",
        stars: 5,
        text: "Renting a car from nova ride was a great decision. Not only did I get a reliable and comfortable vehicle, but the prices were also very competitive."
    }
];

const Comment = () => {
    const brandAccent = '#fe9a00'; // შენი ნარინჯისფერი

    return (
        <section className="bg-white py-24 px-6">
            <div className="max-w-7xl mx-auto">

                {/* Header ნაწილი */}
                <div className="mb-16">
                    <span className="text-orange-600 font-bold uppercase tracking-widest text-sm mb-4 block">
                        Testimonials
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight max-w-xl">
                        What our customers are saying about us
                    </h2>
                </div>

                {/* ქარდების Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {testimonials.slice(0, 3).map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white border border-gray-100 rounded-[32px] p-10 shadow-sm hover:shadow-xl transition-shadow duration-300"
                        >
                            {/* ვარსკვლავები */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        fill={i < item.stars ? "#ff4d1c" : "none"}
                                        stroke={i < item.stars ? "#ff4d1c" : "#cbd5e1"}
                                    />
                                ))}
                            </div>

                            {/* ტექსტი */}
                            <p className="text-gray-600 text-lg leading-relaxed mb-10">
                                {item.text}
                            </p>

                            <hr className="border-gray-100 mb-8" />

                            {/* იუზერის ინფო */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                />
                                <div>
                                    <h4 className="text-gray-900 font-bold text-xl leading-none mb-1">{item.name}</h4>
                                    <p className="text-gray-400 text-sm font-medium">{item.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* ნავიგაციის ისრები */}
                <div className="flex justify-center gap-4">
                    <button className="w-14 h-14 rounded-full bg-[#ff4d1c] text-white flex items-center justify-center hover:brightness-110 transition-all shadow-lg">
                        <ChevronLeft size={24} />
                    </button>
                    <button className="w-14 h-14 rounded-full bg-[#ff4d1c] text-white flex items-center justify-center hover:brightness-110 transition-all shadow-lg">
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Comment;