"use client";
import React from "react";
import Link from "next/link";
import { Twitter, Mail, Terminal } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-black border-t-2 border-cyan-500/50 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
      
      {/* Subtle glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-cyan-500/20 blur-[100px]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 border-2 border-cyan-400 px-4 py-2 bg-black">
                <Terminal className="w-4 h-4 text-green-400" />
                <span className="text-white font-bold text-xl tracking-wide">EasyPay</span>
              </div>
            </div>
            <p className="text-cyan-300/80 text-sm font-mono mb-4">
              &gt; Send ETH with Twitter handles
              <br />
              &gt; Zero fees • Instant transfers
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-cyan-400 font-bold text-sm uppercase tracking-wider mb-4 border-b-2 border-cyan-500/30 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <Link href="/terms">
                <li className="text-cyan-300/80 hover:text-cyan-400 text-sm font-mono transition-colors cursor-pointer hover:translate-x-1 transform duration-200">
                  &gt; Terms of Service
                </li>
              </Link>
              <Link href="/privacy">
                <li className="text-cyan-300/80 hover:text-cyan-400 text-sm font-mono transition-colors cursor-pointer hover:translate-x-1 transform duration-200">
                  &gt; Privacy Policy
                </li>
              </Link>
              <a href="mailto:contact@easypay.app">
                <li className="text-cyan-300/80 hover:text-cyan-400 text-sm font-mono transition-colors cursor-pointer hover:translate-x-1 transform duration-200">
                  &gt; Contact Us
                </li>
              </a>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-cyan-400 font-bold text-sm uppercase tracking-wider mb-4 border-b-2 border-cyan-500/30 pb-2">
              Connect
            </h3>
            <div className="flex gap-4">
              <a
                href="https://x.com/easypay_app"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 bg-black border-2 border-cyan-500/50 hover:border-cyan-500 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
              >
                <Twitter className="w-5 h-5 text-cyan-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href="mailto:contact@easypay.app"
                className="group relative p-3 bg-black border-2 border-fuchsia-500/50 hover:border-fuchsia-500 transition-all hover:shadow-[0_0_20px_rgba(217,70,239,0.5)]"
              >
                <Mail className="w-5 h-5 text-fuchsia-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-cyan-500/30 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-cyan-300/60 text-sm font-mono">
              &copy; 2025 EasyPay. All rights reserved.
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs font-mono uppercase tracking-wider">
                System Online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-fuchsia-400"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-fuchsia-400"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400"></div>
    </footer>
  );
};

export default Footer;
