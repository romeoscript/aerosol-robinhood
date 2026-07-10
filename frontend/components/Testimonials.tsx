"use client";
import React from "react";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      handle: "@sarahcrypto",
      role: "Crypto Enthusiast",
      content: "EasyPay has completely changed how I send money to friends. No more copying long wallet addresses!",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      handle: "@marcusdev",
      role: "Developer",
      content: "The zero fees and instant transfers are game-changing. I use EasyPay for all my crypto payments now.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Emma Thompson",
      handle: "@emmathompson",
      role: "Content Creator",
      content: "Finally, a crypto payment app that's actually easy to use! The mobile experience is flawless.",
      rating: 5,
      avatar: "ET"
    },
    {
      name: "David Kim",
      handle: "@davidkim",
      role: "Entrepreneur",
      content: "EasyPay makes crypto accessible to everyone. My non-crypto friends can now receive payments easily.",
      rating: 5,
      avatar: "DK"
    }
  ];

  return (
    <div className="py-24 bg-black relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[100px]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="border-2 border-yellow-400 px-4 py-2 bg-black">
              <span className="text-yellow-400 font-mono text-sm uppercase tracking-wider">
                // TESTIMONIALS
              </span>
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-500">
              Users Say
            </span>
          </h2>
          <p className="text-xl text-cyan-300 max-w-3xl mx-auto font-mono">
            &gt; Join thousands of satisfied users
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-all"></div>
              
              {/* Card */}
              <div className="relative bg-black border-2 border-cyan-500/50 group-hover:border-cyan-500 p-6 transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                  <Quote className="w-8 h-8 text-cyan-400" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-cyan-300/80 mb-6 leading-relaxed text-sm">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center text-black font-bold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{testimonial.name}</div>
                    <div className="text-cyan-400 text-xs">{testimonial.handle}</div>
                  </div>
                </div>

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-fuchsia-400"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
