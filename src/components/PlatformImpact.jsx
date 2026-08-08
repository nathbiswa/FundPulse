"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Coins,
    Rocket,
    Users,
    ShieldCheck,
    Globe2,
    TrendingUp
} from "lucide-react";

const stats = [
    {
        value: "185,000+",
        label: "Platform Credits Contributed",
        description: "Total credits backed by supporters across all active campaigns.",
        icon: Coins,
        color: "text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900",
    },
    {
        value: "420+",
        label: "Successful Campaigns Funded",
        description: "Verified projects that reached or exceeded their funding goal.",
        icon: Rocket,
        color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900",
    },
    {
        value: "3,100+",
        label: "Active Global Supporters",
        description: "Community members discovering, backing, and reviewing ideas.",
        icon: Users,
        color: "text-teal-500 bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-900",
    },
    {
        value: "96.4%",
        label: "Creator Success Rate",
        description: "High approval & withdrawal reliability backed by Admin review.",
        icon: ShieldCheck,
        color: "text-blue-500 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900",
    },
];

export default function PlatformImpact() {
    return (
        <section className="py-20 bg-slate-900 text-white relative overflow-hidden border-y border-slate-800">

            {/* Background Accent Lines */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center justify-center gap-1.5"
                    >
                        <Globe2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                        Global Reach & Trust
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl font-extrabold mt-2 text-white"
                    >
                        Platform Impact in Numbers
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-sm text-slate-400 mt-3 leading-relaxed"
                    >
                        Real-time platform metrics demonstrating community strength, credit usage, and successful payouts.
                    </motion.p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((item, index) => {
                        const IconComp = item.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                whileHover={{ y: -6 }}
                                className="bg-slate-800/80 border border-slate-700/80 p-8 rounded-3xl text-center backdrop-blur-sm shadow-lg hover:border-emerald-500/50 transition-all group"
                            >
                                {/* Icon Circle */}
                                <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center border ${item.color} mb-5 shadow-inner group-hover:scale-110 transition-transform`}>
                                    <IconComp className="w-7 h-7" />
                                </div>

                                {/* Big Number */}
                                <h3 className="text-3xl sm:text-4xl font-black text-white group-hover:text-emerald-400 transition-colors">
                                    {item.value}
                                </h3>

                                {/* Label */}
                                <h4 className="text-sm font-bold text-slate-200 mt-2">
                                    {item.label}
                                </h4>

                                {/* Subtext */}
                                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}