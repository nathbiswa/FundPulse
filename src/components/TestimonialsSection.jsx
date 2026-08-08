"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, MessageSquareQuote } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Ayesha Rahman",
        role: "Community Organizer",
        text: "FundPulse helped our team raise 3,800 credits in less than three weeks for our rooftop solar grid initiative. The approval process was fast and transparent!",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop",
        campaign: "Community Solar Grid Project",
    },
    {
        id: 2,
        name: "David Chen",
        role: "Hardware Tech Founder",
        text: "The credit-backed system is brilliant. Our supporters loved receiving immediate bonus credits upon registration, which boosted early contributions to our project.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop",
        campaign: "EcoFilter Purifier",
    },
    {
        id: 3,
        name: "Sophia Martinez",
        role: "Indie Game Developer",
        text: "Withdrawing raised credits was smooth and straightforward. The 20 Credits = $1 USD conversion is crystal clear. I’ll definitely launch my next game here!",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop",
        campaign: "Legends of Eldoria Game",
    },
];

export default function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // অটো-স্লাইড (৬ সেকেন্ড পর পর)
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const active = testimonials[currentIndex];

    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center justify-center gap-1.5"
                    >
                        <MessageSquareQuote className="w-4 h-4" /> Community Reviews
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1"
                    >
                        Feedback From Satisfied Users
                    </motion.h2>
                </div>

                {/* Testimonial Card Slider Box */}
                <div className="relative bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl">

                    <Quote className="w-12 h-12 text-emerald-500/20 dark:text-emerald-400/20 absolute top-6 right-8 pointer-events-none" />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col md:flex-row items-center gap-8"
                        >
                            {/* User Photo */}
                            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0">
                                <Image
                                    src={active.avatar}
                                    alt={active.name}
                                    fill
                                    unoptimized
                                    className="rounded-full object-cover ring-4 ring-emerald-500/30 shadow-md"
                                />
                            </div>

                            {/* Review Quote & Info */}
                            <div className="space-y-4 text-center md:text-left flex-1">
                                {/* Rating Stars */}
                                <div className="flex justify-center md:justify-start gap-1 text-amber-400">
                                    {[...Array(active.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                                    ))}
                                </div>

                                {/* Quote Text */}
                                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 italic leading-relaxed">
                                    "{active.text}"
                                </p>

                                {/* Name, Role & Campaign */}
                                <div>
                                    <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                                        {active.name}
                                    </h4>
                                    <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                                        {active.role} • <span className="text-slate-500 font-normal">{active.campaign}</span>
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Slider Arrows */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex gap-2">
                            {testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-8 bg-emerald-600 dark:bg-emerald-400" : "w-2 bg-slate-300 dark:bg-slate-700"
                                        }`}
                                    aria-label={`Slide ${idx + 1}`}
                                />
                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={prevTestimonial}
                                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 text-slate-700 dark:text-slate-200 transition-colors"
                                aria-label="Previous Testimonial"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextTestimonial}
                                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 text-slate-700 dark:text-slate-200 transition-colors"
                                aria-label="Next Testimonial"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}