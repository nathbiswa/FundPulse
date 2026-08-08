"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Coins,
    Rocket,
    HeartHandshake
} from "lucide-react";

const heroSlides = [
    {
        id: 1,
        badge: "🌱 Crowdfunding Platform",
        title: "Empower Innovative Ideas & Community Causes",
        subtitle: "Discover groundbreaking projects, contribute platform credits, and help creators bring their visions to life.",
        ctaPrimaryText: "Explore Campaigns",
        ctaPrimaryLink: "/explore-campaigns",
        ctaSecondaryText: "Get 50 Bonus Credits",
        ctaSecondaryLink: "/register",
        bgGradient: "from-slate-950 via-emerald-950 to-teal-950",
        icon: Sparkles,
    },
    {
        id: 2,
        badge: "🚀 For Passionate Creators",
        title: "Launch Your Project & Raise Credits Effortlessly",
        subtitle: "Share your campaign story, set funding goals, and receive support from an active global community.",
        ctaPrimaryText: "Start a Campaign",
        ctaPrimaryLink: "/register",
        ctaSecondaryText: "Learn How It Works",
        ctaSecondaryLink: "#how-it-works",
        bgGradient: "from-teal-950 via-slate-900 to-emerald-950",
        icon: Rocket,
    },
    {
        id: 3,
        badge: "💎 For Dedicated Supporters",
        title: "Support Verified Creators & Earn Rewards",
        subtitle: "Use your platform credits to back projects you believe in and receive exclusive creator rewards.",
        ctaPrimaryText: "Join as Supporter",
        ctaPrimaryLink: "/register",
        ctaSecondaryText: "View Top Funded",
        ctaSecondaryLink: "#top-funded",
        bgGradient: "from-emerald-950 via-teal-950 to-slate-950",
        icon: HeartHandshake,
    },
];

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // অটো-স্লাইডার (৫ সেকেন্ড পর পর)
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
    };

    const activeSlide = heroSlides[currentSlide];
    const IconComponent = activeSlide.icon;

    return (
        <section className="relative overflow-hidden">
            {/* Dynamic Background with Smooth Color Shift */}
            <div
                className={`relative min-h-[540px] sm:min-h-[620px] flex items-center justify-center bg-gradient-to-br ${activeSlide.bgGradient} text-white transition-colors duration-1000 ease-in-out py-20 px-4`}
            >
                {/* Animated Background Glowing Lights */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-1/4 left-1/3 -translate-x-1/2 w-96 h-96 bg-emerald-500/25 rounded-full blur-3xl pointer-events-none"
                />

                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"
                />

                {/* Content Container with AnimatePresence */}
                <div className="max-w-4xl mx-auto text-center z-10 min-h-[300px] flex flex-col items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="space-y-6"
                        >
                            {/* Badge */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.1, duration: 0.4 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-inner"
                            >
                                <IconComponent className="w-4 h-4 text-emerald-400 animate-pulse" />
                                <span>{activeSlide.badge}</span>
                            </motion.div>

                            {/* Title */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white drop-shadow-lg"
                            >
                                {activeSlide.title}
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
                            >
                                {activeSlide.subtitle}
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="flex flex-wrap items-center justify-center gap-4 pt-4"
                            >
                                {/* Primary Button */}
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        href={activeSlide.ctaPrimaryLink}
                                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/30 transition-all"
                                    >
                                        <span>{activeSlide.ctaPrimaryText}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </motion.div>

                                {/* Secondary Button */}
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        href={activeSlide.ctaSecondaryLink}
                                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/20 transition-all hover:border-emerald-400"
                                    >
                                        <Coins className="w-4 h-4 text-amber-400" />
                                        <span>{activeSlide.ctaSecondaryText}</span>
                                    </Link>
                                </motion.div>
                            </motion.div>

                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Previous Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevSlide}
                    className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white backdrop-blur-md border border-white/10 transition-all z-20"
                    aria-label="Previous Slide"
                >
                    <ChevronLeft className="w-6 h-6" />
                </motion.button>

                {/* Next Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextSlide}
                    className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white backdrop-blur-md border border-white/10 transition-all z-20"
                    aria-label="Next Slide"
                >
                    <ChevronRight className="w-6 h-6" />
                </motion.button>

                {/* Slide Indicators / Dots */}
                <div className="absolute bottom-6 flex items-center gap-2.5 z-20">
                    {heroSlides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                            className={`h-2.5 rounded-full transition-all duration-500 ${idx === currentSlide
                                ? "w-8 bg-emerald-400 shadow-md shadow-emerald-400/50"
                                : "w-2.5 bg-white/40 hover:bg-white/70"
                                }`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}