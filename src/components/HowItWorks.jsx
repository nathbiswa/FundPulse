"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Coins,
    Rocket,
    HeartHandshake,
    Wallet,
    CheckCircle2,
    ArrowRight,
    Sparkles
} from "lucide-react";

const steps = [
    {
        step: "01",
        title: "Register & Get Bonus Credits",
        description: "Supporters instantly get 50 free credits, and Creators get 20 free credits upon signup to kickstart their journey.",
        icon: Coins,
        color: "from-amber-500 to-amber-600",
        badge: "Instant Welcome Bonus",
    },
    {
        step: "02",
        title: "Launch or Explore Campaigns",
        description: "Creators create campaign stories with funding goals & rewards. Supporters discover verified projects.",
        icon: Rocket,
        color: "from-emerald-500 to-teal-600",
        badge: "Verified Causes",
    },
    {
        step: "03",
        title: "Contribute Platform Credits",
        description: "Supporters pledge credits to projects they care about. Track pending & approved contributions in real time.",
        icon: HeartHandshake,
        color: "from-teal-500 to-cyan-600",
        badge: "Transparent Tracking",
    },
    {
        step: "04",
        title: "Withdraw & Earn Rewards",
        description: "Creators request withdrawals at 20 Credits = $1 USD. Supporters unlock exclusive creator rewards.",
        icon: Wallet,
        color: "from-indigo-500 to-emerald-600",
        badge: "Fast Payouts",
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-20 bg-slate-900 text-white relative overflow-hidden">

            {/* Background Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center justify-center gap-1.5"
                    >
                        <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                        Simple & Transparent Process
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl font-extrabold mt-2 text-white"
                    >
                        How FundPulse Works
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-sm text-slate-400 mt-3 leading-relaxed"
                    >
                        Whether you are a creator looking to fund your next big idea or a supporter wanting to make an impact, getting started takes less than a minute.
                    </motion.p>
                </div>

                {/* Steps Grid with Framer Motion Stagger Animation */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((item, index) => {
                        const IconComp = item.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                whileHover={{ y: -8 }}
                                className="bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/50 p-6 rounded-3xl relative backdrop-blur-sm transition-all duration-300 flex flex-col justify-between group"
                            >
                                <div>
                                    {/* Top Header: Step Number & Badge */}
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-3xl font-black text-slate-700 group-hover:text-emerald-400 transition-colors">
                                            {item.step}
                                        </span>
                                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-700/60 text-emerald-300 border border-emerald-500/20">
                                            {item.badge}
                                        </span>
                                    </div>

                                    {/* Icon Circle */}
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white shadow-lg mb-5 group-hover:scale-110 transition-transform`}>
                                        <IconComp className="w-6 h-6" />
                                    </div>

                                    {/* Step Title */}
                                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                                        {item.title}
                                    </h3>

                                    {/* Step Description */}
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Bottom Step Indicator Line */}
                                <div className="pt-6 mt-6 border-t border-slate-700/60 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>Step {index + 1} Complete</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}