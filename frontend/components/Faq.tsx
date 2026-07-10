"use client";
import React, { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Twitter,
  Wallet,
  Shield,
  Zap,
  HelpCircle,
  DollarSign,
} from "lucide-react";
import { motion } from "framer-motion";

export default function FAQSection() {
  const [expandedQuestion, setExpandedQuestion] = useState(0);

  const faqData = [
    {
      id: 0,
      question: "How does sending money with Twitter handles work?",
      answer:
        "Simply tweet '@easypay, send [amount] ETH to @username' and our bot will automatically process the transaction. The recipient will receive the ETH in their connected wallet instantly. No need to remember complicated wallet addresses!",
      icon: <Twitter className="w-5 h-5" />,
      category: "How it Works",
    },
    {
      id: 1,
      question: "Is it safe to connect my Twitter account?",
      answer:
        "Yes, absolutely safe. We only read your public Twitter information to verify your identity and process transactions. We never post on your behalf or access private data. Your wallet keys remain secure and under your control.",
      icon: <Shield className="w-5 h-5" />,
      category: "Security",
    },
    {
      id: 2,
      question: "Are there any fees for sending money?",
      answer:
        "EasyPay charges zero platform fees! You only pay the minimal Robinhood Chain network transaction fees (typically a few cents on this L2). We believe in making crypto payments as affordable as possible.",
      icon: <DollarSign className="w-5 h-5" />,
      category: "Pricing",
    },
    {
      id: 3,
      question: "What if the recipient doesn't have an EasyPay account?",
      answer:
        "No problem! When you send money to someone without an account, they'll receive a notification to sign up and claim their funds. The money is held securely until they create an account and connect their wallet.",
      icon: <HelpCircle className="w-5 h-5" />,
      category: "How it Works",
    },
    {
      id: 4,
      question: "Can I use any EVM wallet with EasyPay?",
      answer:
        "Yes! EasyPay supports all major EVM wallets including MetaMask and others on Robinhood Chain. You can also create a new wallet directly through our platform during the setup process.",
      icon: <Wallet className="w-5 h-5" />,
      category: "Wallets",
    },
    {
      id: 5,
      question: "How fast are the transactions?",
      answer:
        "Transactions are processed on Robinhood Chain, an Ethereum L2, typically confirming within seconds. As soon as you tweet, the money is on its way!",
      icon: <Zap className="w-5 h-5" />,
      category: "Speed",
    },
    {
      id: 6,
      question: "What's the minimum and maximum amount I can send?",
      answer:
        "You can send as little as 0.0001 ETH or as much as your balance allows per transaction. Daily limits may apply for new accounts as a security measure.",
      icon: <DollarSign className="w-5 h-5" />,
      category: "Limits",
    },
    {
      id: 7,
      question: "How do I get support if I have issues?",
      answer:
        "We offer 24/7 support through our Discord community and Twitter. You can also reach us via email at support@easypay.app. Our team typically responds within 2 hours.",
      icon: <HelpCircle className="w-5 h-5" />,
      category: "Support",
    },
  ];

  return (
    <div className="py-24 bg-black relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
      
      {/* Animated Lines */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-yellow-500 to-transparent animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-fuchsia-500 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="border-2 border-yellow-400 px-4 py-2 bg-black">
              <span className="text-yellow-400 font-mono text-sm uppercase tracking-wider">
                // FAQ
              </span>
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-500">
              Questions
            </span>
          </h2>
          <p className="text-xl text-cyan-300 max-w-3xl mx-auto font-mono">
            &gt; Everything you need to know about sending ETH with EasyPay
          </p>
        </div>

        {/* FAQ Container */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqData.map((faq) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: faq.id * 0.05 }}
              className="group relative"
            >
              {/* Glow effect on active */}
              {expandedQuestion === faq.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 blur-xl"></div>
              )}
              
              {/* FAQ Item */}
              <div
                className={`relative bg-black border-2 transition-all ${
                  expandedQuestion === faq.id
                    ? "border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.5)]"
                    : "border-cyan-500/50 hover:border-cyan-500/80"
                }`}
              >
                {/* Question */}
                <button
                  onClick={() =>
                    setExpandedQuestion(expandedQuestion === faq.id ? -1 : faq.id)
                  }
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left group"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {/* Icon */}
                    <div className={`p-2 transition-all ${
                      expandedQuestion === faq.id
                        ? "bg-gradient-to-br from-cyan-500 to-fuchsia-500"
                        : "bg-cyan-500/20"
                    }`}>
                      <div className={expandedQuestion === faq.id ? "text-black" : "text-cyan-400"}>
                        {faq.icon}
                      </div>
                    </div>

                    {/* Question Text */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  {/* Expand Icon */}
                  <div className="flex-shrink-0">
                    {expandedQuestion === faq.id ? (
                      <ChevronDown className="w-6 h-6 text-cyan-400" />
                    ) : (
                      <ChevronRight className="w-6 h-6 text-cyan-400 group-hover:text-fuchsia-400 transition-colors" />
                    )}
                  </div>
                </button>

                {/* Answer */}
                {expandedQuestion === faq.id && (
                  <div className="px-6 pb-6">
                    <div className="pl-14 border-l-2 border-fuchsia-500/50 ml-6">
                      <p className="text-cyan-300/80 leading-relaxed pl-4">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}

                {/* Corner accents */}
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-fuchsia-400"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-black/80 border-2 border-cyan-500/50 rounded-lg p-8 max-w-2xl mx-auto shadow-[0_0_50px_rgba(6,182,212,0.2)]">
            <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-wide">
              Still Have Questions?
            </h3>
            <p className="text-cyan-300 mb-6 font-mono">
              &gt; Join our community or reach out to support
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://discord.gg/easypay"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-black border-2 border-cyan-400 hover:border-cyan-300 text-cyan-400 hover:text-white font-bold uppercase tracking-wide transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
              >
                Join Discord
              </a>
              <a
                href="https://x.com/easypay_app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-black border-2 border-fuchsia-400 hover:border-fuchsia-300 text-fuchsia-400 hover:text-white font-bold uppercase tracking-wide transition-all hover:shadow-[0_0_20px_rgba(217,70,239,0.5)]"
              >
                Follow on X
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
