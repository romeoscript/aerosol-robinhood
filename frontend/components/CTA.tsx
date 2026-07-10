"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <div className="py-24 bg-black relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[150px] animate-pulse"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-fuchsia-500/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          
          {/* Terminal Header */}
          <div className="inline-block mb-8">
            <div className="border-2 border-cyan-400 px-6 py-3 bg-black">
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-green-400" />
                <span className="text-cyan-400 font-mono text-sm tracking-wider">
                  system@easypay:~$ ready_to_start
                </span>
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
            Ready to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-500">
              Level Up
            </span>
            ?
          </h2>

          {/* Subtitle - Terminal Style */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-black/80 border-2 border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm font-mono text-left shadow-[0_0_50px_rgba(6,182,212,0.3)]">
              <p className="text-cyan-300 text-lg leading-relaxed">
                <span className="text-fuchsia-400">&gt;</span> Join thousands of users
                <br />
                <span className="text-fuchsia-400">&gt;</span> Send ETH instantly with Twitter handles
                <br />
                <span className="text-fuchsia-400">&gt;</span> Zero platform fees • Maximum freedom
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <Link href="/profile">
            <button className="group relative px-12 py-6 overflow-hidden">
              {/* Neon border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-yellow-500 opacity-75 blur-sm group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-[2px] bg-black"></div>
              
              {/* Button content */}
              <div className="relative flex items-center gap-3">
                <span className="text-white font-bold text-2xl tracking-wide uppercase">
                  Start Now
                </span>
                <ArrowRight className="w-6 h-6 text-fuchsia-400 group-hover:translate-x-2 transition-transform" />
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-fuchsia-500/20 to-yellow-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
            </button>
          </Link>

          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { value: "10K+", label: "Users" },
              { value: "$2M+", label: "Volume" },
              { value: "99.9%", label: "Uptime" }
            ].map((stat, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-cyan-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-all"></div>
                <div className="relative bg-black border-2 border-cyan-500/50 group-hover:border-cyan-500 p-4 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                  <div className="text-3xl font-black text-cyan-400 mb-1 font-mono">
                    {stat.value}
                  </div>
                  <div className="text-white/70 text-xs uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CTA;
