"use client";
import { Twitter, Wallet, DollarSign, ArrowRight, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HowToUseEasyPay() {
    const steps = [
        {
            number: "01",
            title: "Connect Your Accounts",
            description: "Link your Twitter account and connect your Robinhood Chain wallet to get started with EasyPay.",
            icon: <Twitter className="w-6 h-6" />,
            color: "cyan",
            emoji: "🔗"
        },
        {
            number: "02", 
            title: "Fund Your Wallet",
            description: "Add ETH to your wallet to start sending payments. You can deposit from any EVM wallet.",
            icon: <DollarSign className="w-6 h-6" />,
            color: "fuchsia",
            emoji: "💵"
        },
        {
            number: "03",
            title: "Send Payments",
            description: "Simply tweet '@easypay, send [amount] ETH to @username' and watch the magic happen!",
            icon: <ArrowRight className="w-6 h-6" />,
            color: "yellow",
            emoji: "🚀"
        }
    ];

    return (
        <div className="py-24 bg-black relative overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
            
            {/* Animated Lines */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
                <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-pulse"></div>
                <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-fuchsia-500 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-block mb-4">
                        <div className="border-2 border-fuchsia-400 px-4 py-2 bg-black">
                            <span className="text-fuchsia-400 font-mono text-sm uppercase tracking-wider">
                                // HOW IT WORKS
                            </span>
                        </div>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
                        How{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-500">
                            EasyPay
                        </span>{" "}
                        Works
                    </h2>
                    <p className="text-xl text-cyan-300 max-w-3xl mx-auto font-mono">
                        &gt; Get started in 3 simple steps
                    </p>
                </div>

                {/* Steps */}
                <div className="relative max-w-6xl mx-auto">
                    {/* Connection Line - Hidden on mobile */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-yellow-500 transform -translate-y-1/2 opacity-30"></div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
                        {steps.map((step, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="relative group"
                            >
                                {/* Step Number - Gaming Style */}
                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                                    <div className="w-16 h-16 bg-black border-2 border-cyan-400 group-hover:border-cyan-300 flex items-center justify-center transition-all group-hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]">
                                        <span className="text-cyan-400 font-black text-2xl font-mono">
                                            {step.number}
                                        </span>
                                    </div>
                                </div>

                                {/* Step Content */}
                                <div className="relative bg-black border-2 border-cyan-500/50 group-hover:border-cyan-500 p-8 pt-14 transition-all group-hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transform hover:scale-105">
                                    {/* Emoji */}
                                    <div className="text-4xl mb-4">{step.emoji}</div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">
                                        {step.title}
                                    </h3>
                                    <p className="text-cyan-300/80 leading-relaxed text-sm">
                                        {step.description}
                                    </p>

                                    {/* Corner accents */}
                                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
                                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-fuchsia-400"></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Demo Section - Terminal Style */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-20 max-w-4xl mx-auto"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 blur-xl"></div>
                        
                        <div className="relative bg-black border-2 border-cyan-500/50 p-8">
                            <div className="text-center mb-6">
                                <div className="flex items-center justify-center gap-2 mb-4">
                                    <Terminal className="w-5 h-5 text-green-400" />
                                    <h3 className="text-2xl font-black text-cyan-400 uppercase tracking-wider">
                                        Example Tweet
                                    </h3>
                                </div>
                            </div>

                            {/* Mock Twitter Interface - Console Style */}
                            <div className="bg-black border-2 border-green-500/30 p-6 font-mono">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center font-bold text-black">
                                        U
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <span className="text-white font-bold">Your Name</span>
                                            <span className="text-cyan-400">@yourusername</span>
                                            <span className="text-green-400">· 2m</span>
                                        </div>
                                        <div className="text-cyan-300 text-lg leading-relaxed">
                                            Hi <span className="text-cyan-400 font-bold">@easypay</span>, send 1 ETH to <span className="text-fuchsia-400 font-bold">@friend</span> 🚀
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
