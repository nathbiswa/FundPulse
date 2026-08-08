"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    TrendingUp,
    Coins,
    ArrowRight,
    Target,
    Loader2,
    Sparkles,
    AlertCircle
} from "lucide-react";

// ব্যাকএন্ড কানেক্ট না থাকলে ব্যাকআপ মক ডাটা (যাতে UI ভেঙে না যায়)
const fallbackCampaigns = [
    {
        _id: "1",
        campaign_title: "Solar-Powered Water Pump for Rural Villages",
        category: "Technology",
        amount_raised: 4200,
        funding_goal: 5000,
        campaign_image_url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop",
        story: "Bringing clean drinking water and farm irrigation using sustainable solar energy.",
    },
    {
        _id: "2",
        campaign_title: "Community Organic Rooftop Solar Grid",
        category: "Community",
        amount_raised: 3800,
        funding_goal: 4000,
        campaign_image_url: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop",
        story: "Neighborhood-owned solar grid reducing electricity bills for local families.",
    },
    {
        _id: "3",
        campaign_title: "Artisan Woodworking & Craft Studio",
        category: "Art",
        amount_raised: 3100,
        funding_goal: 3500,
        campaign_image_url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop",
        story: "Preserving traditional artisan woodworking skills with modern equipment.",
    },
    {
        _id: "4",
        campaign_title: "NextGen STEM Robotics Kits for Kids",
        category: "Technology",
        amount_raised: 2800,
        funding_goal: 3000,
        campaign_image_url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop",
        story: "Interactive robotics and coding kits for underprivileged public school children.",
    },
    {
        _id: "5",
        campaign_title: "Urban Rooftop Honeybee Sanctuary",
        category: "Health",
        amount_raised: 2400,
        funding_goal: 2500,
        campaign_image_url: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&auto=format&fit=crop",
        story: "Protecting essential pollinators by deploying bee-friendly hives in city centers.",
    },
    {
        _id: "6",
        campaign_title: "Indie Board Game: Legends of Eldoria",
        category: "Art",
        amount_raised: 1950,
        funding_goal: 2000,
        campaign_image_url: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=600&auto=format&fit=crop",
        story: "Cooperative fantasy strategy board game with handcrafted miniatures.",
    },
];

export default function TopFundedCampaigns() {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopCampaigns = async () => {
            try {
                // আপনার ব্যাকএন্ড API এর ইউআরএল (প্রয়োজনে পোর্ট পরিবর্তন করে নিন)
                const res = await fetch("http://localhost:5000/api/campaigns/top-funded");
                if (res.ok) {
                    const data = await res.json();
                    setCampaigns(data.length > 0 ? data : fallbackCampaigns);
                } else {
                    setCampaigns(fallbackCampaigns);
                }
            } catch (error) {
                console.log("Backend offline, using fallback dataset.");
                setCampaigns(fallbackCampaigns);
            } finally {
                setLoading(false);
            }
        };

        fetchTopCampaigns();
    }, []);

    return (
        <section id="top-funded" className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
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
                            <TrendingUp className="w-4 h-4" /> Top Funded Performers
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1"
                        >
                            Top 6 Funded Campaigns
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            href="/explore-campaigns"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500 shadow-sm transition-all"
                        >
                            <span>Explore All Campaigns</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>

                {/* Loading Spinner */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-emerald-600 mb-3" />
                        <p className="text-xs font-semibold text-slate-500">Fetching top campaigns from MongoDB...</p>
                    </div>
                ) : (
                    /* Cards Grid with Framer Motion Stagger */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {campaigns.slice(0, 6).map((camp, index) => {
                            const raised = camp.amount_raised || camp.raised || 0;
                            const goal = camp.funding_goal || camp.goal || 1000;
                            const percent = Math.min(100, Math.round((raised / goal) * 100));

                            return (
                                <motion.div
                                    key={camp._id || index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -6 }}
                                    className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between group"
                                >
                                    {/* Image Header */}
                                    <div className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                                        <Image
                                            src={camp.campaign_image_url || camp.image || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600"}
                                            alt={camp.campaign_title || "Campaign"}
                                            fill
                                            unoptimized
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />

                                        {/* Category Badge */}
                                        <span className="absolute top-3 left-3 px-3 py-1 bg-slate-900/80 text-emerald-400 text-[11px] font-bold rounded-full backdrop-blur-md border border-emerald-500/30">
                                            {camp.category || "General"}
                                        </span>

                                        {/* Raised Pill */}
                                        <span className="absolute bottom-3 right-3 px-3 py-1 bg-emerald-600/90 text-white text-[11px] font-bold rounded-full backdrop-blur-md shadow-md flex items-center gap-1">
                                            <Coins className="w-3.5 h-3.5 text-amber-300" />
                                            {raised} Credits
                                        </span>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                                                {camp.campaign_title || camp.title}
                                            </h3>
                                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                                                {camp.story || camp.campaign_story || "No description available."}
                                            </p>
                                        </div>

                                        {/* Progress Bar & Goals */}
                                        <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                                    <Sparkles className="w-3.5 h-3.5" />
                                                    {percent}% Funded
                                                </span>
                                                <span className="text-slate-500 dark:text-slate-400 font-medium">
                                                    Goal: {goal} Credits
                                                </span>
                                            </div>

                                            {/* Animated Progress Line */}
                                            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${percent}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, delay: 0.2 }}
                                                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full"
                                                />
                                            </div>
                                        </div>

                                        {/* View Details Link Button */}
                                        <Link
                                            href={`/campaigns/${camp._id}`}
                                            className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 rounded-xl transition-all"
                                        >
                                            <span>View Details & Contribute</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>

                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

            </div>
        </section>
    );
}