"use client";
import React, { useState } from "react";
import { Copy, Check, Zap, Terminal } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  const [isContractCopied, setIsContractCopied] = useState(false);
  const contractAddress = "GEHJx1yb83BDdjWp6UJWWann9aAkVKwvzU49Qp7jpump";

  const copyContractAddress = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setIsContractCopied(true);
      setTimeout(() => setIsContractCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy contract address:", error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>
      
      {/* Animated Neon Lines - Subtle */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-pulse"></div>
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-fuchsia-500 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center max-w-6xl mx-auto">
          
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-8 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-fuchsia-500 blur-xl opacity-50 animate-pulse"></div>
            <div className="relative bg-black border-2 border-cyan-400 px-6 py-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
                <span className="text-cyan-400 font-bold tracking-wider text-sm uppercase">
                  ⚡ ZERO FEES • INSTANT TRANSFER ⚡
                </span>
              </div>
            </div>
          </motion.div>

          {/* Main Heading with Glow */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-black mb-8 leading-tight"
          >
            <div className="relative inline-block">
              <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                Send Money with
              </span>
            </div>
            <br />
            <div className="relative inline-block mt-4">
              <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-500 blur-lg opacity-70">
                Social Handles
              </span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-500">
                Social Handles
              </span>
            </div>
          </motion.h1>

          {/* Terminal-Style Subtitle */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl mx-auto mb-12"
          >
            <div className="bg-black/80 border-2 border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm font-mono text-left shadow-[0_0_50px_rgba(6,182,212,0.3)]">
              <div className="flex items-center gap-2 mb-3">
                <Terminal className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm">system@easypay:~$</span>
                <span className="text-cyan-400 animate-blink">_</span>
              </div>
              <p className="text-cyan-300 text-lg leading-relaxed">
                <span className="text-fuchsia-400">&gt;</span> Send <span className="text-yellow-400 font-bold">ETH</span> payments using Twitter handles
                <br />
                <span className="text-fuchsia-400">&gt;</span> No wallet addresses needed
                <br />
                <span className="text-fuchsia-400">&gt;</span> Zero platform fees • Instant transfers
              </p>
            </div>
          </motion.div>

          {/* Contract Address - Console Style */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative max-w-3xl mx-auto mb-16"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 blur-xl"></div>
            <div className="relative bg-black/90 border-2 border-cyan-500/50 rounded-none p-6 font-mono shadow-[0_0_50px_rgba(6,182,212,0.2)]">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center">
                    <span className="text-black font-black text-xl">C</span>
                  </div>
                  <div className="text-left">
                    <p className="text-cyan-400 font-bold text-sm uppercase tracking-wider">Contract Address</p>
                    <p className="text-fuchsia-400 text-xs">Click to copy</p>
                  </div>
                </div>
                <div
                  onClick={copyContractAddress}
                  className="group bg-black border border-cyan-500/30 hover:border-cyan-500 rounded-none px-4 py-3 cursor-pointer transition-all flex items-center gap-3 min-w-0 flex-1 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                >
                  <code className="text-green-400 text-sm truncate flex-1">
                    {contractAddress.length > 20 ? `${contractAddress.slice(0, 12)}...${contractAddress.slice(-12)}` : contractAddress}
                  </code>
                  {isContractCopied ? (
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 animate-pulse" />
                  ) : (
                    <Copy className="w-5 h-5 text-cyan-400 group-hover:text-fuchsia-400 transition-colors flex-shrink-0" />
                  )}
                </div>
              </div>
              {isContractCopied && (
                <div className="text-green-400 text-sm text-center mt-3 font-bold animate-pulse">
                  &gt;&gt; COPIED TO CLIPBOARD &lt;&lt;
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Particles - Subtle */}
      <div className="absolute top-32 left-20 w-3 h-3 bg-cyan-400 rounded-full animate-bounce opacity-40"></div>
      <div className="absolute top-48 right-32 w-3 h-3 bg-fuchsia-400 rounded-full animate-bounce opacity-40" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-32 left-32 w-3 h-3 bg-yellow-400 rounded-full animate-bounce opacity-40" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default Hero;
