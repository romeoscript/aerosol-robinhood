"use client";
import React from "react";
import { Zap, Shield, Globe, Users, Smartphone, Lock } from "lucide-react";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Send and receive payments in seconds with Robinhood Chain's efficient L2 technology.",
      color: "cyan",
      emoji: "⚡"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Bank-Level Security",
      description: "Your funds are protected by cryptographic security and smart contract technology.",
      color: "green",
      emoji: "🔒"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Access",
      description: "Send money to anyone, anywhere in the world, 24/7 without borders or restrictions.",
      color: "fuchsia",
      emoji: "🌍"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Social Integration",
      description: "Connect your Twitter account and send payments using just social media handles.",
      color: "yellow",
      emoji: "👥"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile First",
      description: "Optimized for mobile devices with a seamless, intuitive user experience.",
      color: "cyan",
      emoji: "📱"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Zero Fees",
      description: "No platform fees, no hidden costs. Only pay minimal Robinhood Chain network fees.",
      color: "fuchsia",
      emoji: "💰"
    }
  ];

  return (
    <div className="py-24 bg-black relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[100px]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="border-2 border-cyan-400 px-4 py-2 bg-black">
              <span className="text-cyan-400 font-mono text-sm uppercase tracking-wider">
                // FEATURES
              </span>
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-500">
              EasyPay
            </span>
            ?
          </h2>
          <p className="text-xl text-cyan-300 max-w-3xl mx-auto font-mono">
            &gt; Experience the future of digital payments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-all"></div>
              
              {/* Card */}
              <div className="relative bg-black border-2 border-cyan-500/50 group-hover:border-cyan-500 p-6 transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transform hover:scale-105">
                {/* Emoji */}
                <div className="text-4xl mb-4">{feature.emoji}</div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-cyan-300/80 leading-relaxed text-sm">
                  {feature.description}
                </p>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-fuchsia-400"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
