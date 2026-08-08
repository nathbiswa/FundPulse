"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Cpu,
    Users,
    Palette,
    HeartPulse,
    GraduationCap,
    Leaf,
    ArrowRight,
    Compass
} from "lucide-react";

const categories = [
    {
        id: "Technology",
        name: "Technology & Innovation",
        count: "24+ Campaigns",
        description: "Solar gadgets, hardware prototypes, open-source software, and robotics.",
        icon: Cpu,
        color: "from-blue-500 to-indigo-600",
        bgLight: "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900",
    },
    {
        id: "Community",
        name: "Community & Causes",
        count: "38+ Campaigns",
        description: "Neighborhood initiatives, clean energy grids, and social welfare causes.",
        icon: Users,
        color: "from-emerald-500 to-teal-600",
        bgLight: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900",
    },
    {
        id: "Art",
        name: "Art & Creative Crafts",
        count: "19+ Campaigns",
        description: "Indie games, artisan woodworking, digital art studios, and music.",
        icon: Palette,
        color: "from-purple-500 to-pink-600",
        bgLight: "bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900",
    },
    {
        id: "Health",
        name: "Health & Care",
        count: "15+ Campaigns",
        description: "Medical research, urban honeybee sanctuaries, and wellness tools.",
        icon: HeartPulse,
        color: "from-rose-500 to-red-600",
        bgLight: "bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900",
    },
    {
        id: "Education",
        name: "Education & STEM",
        count: "21+ Campaigns",
        description: "Kids learning robotics kits, digital libraries, and skill workshops.",
        icon: GraduationCap,
        color: "from-amber-500 to-orange-600",
        bgLight: "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900",
    },
    {
        id: "Environment",
        name: "Eco & Environment",
        count: "17+ Campaigns",
        description: "Tree planting drives, ocean plastic cleanup, and zero-waste solutions.",
        icon: Leaf,
        color: "from-teal-500 to-emerald-600",
        bgLight: "bg-teal-50 dark:bg-teal-950/30 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-900",
    },
];

export default function ExploreByCategory() {
    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-1.5"
                        >
                            <Compass className="w-4 h-4" /> Diverse Projects
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1"
                        >
                            Explore by Category
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            href="/explore-campaigns"
                            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                        >
                            <span>View All Categories</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat, index) => {
                        const IconComponent = cat.icon;
                        return (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                whileHover={{ y: -6 }}
                            >
                                <Link
                                    href={`/explore-campaigns?category=${encodeURIComponent(cat.id)}`}
                                    className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between h-full group block"
                                >
                                    <div>
                                        {/* Header: Icon & Active Count Badge */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${cat.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                                                <IconComponent className="w-6 h-6" />
                                            </div>
                                            <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${cat.bgLight}`}>
                                                {cat.count}
                                            </span>
                                        </div>

                                        {/* Category Title */}
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                            {cat.name}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                                            {cat.description}
                                        </p>
                                    </div>

                                    {/* Action Link Footer */}
                                    <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                                        <span>Explore Campaigns</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}