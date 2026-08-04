// 1. ফাইলটির একদম উপরে এই লাইনটি দিন (বাধ্যতামূলক)
"use client";

import React, { useState, useEffect, useRef } from "react";
// Next.js-এর জন্য Router এবং Link ইমপোর্ট করুন (react-router-dom এর বদলে)
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import {
    Bell,
    Coins,
    LayoutDashboard,
    LogOut,
    Menu,
    X,
    Code2,
    User,
    Compass
} from "lucide-react";
import Image from "next/image";

const Navbar = ({ user, dbUser, notifications = [], onLogout }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const notificationRef = useRef(null);
    const profileRef = useRef(null);

    const router = useRouter();
    const pathname = usePathname(); // একটিভ লিঙ্ক চেক করার জন্য

    const CLIENT_GITHUB_REPO = "https://github.com/nathbiswa/FundPulse";

    // Hide pop-ups on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsNotificationOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            if (onLogout) await onLogout();
            setIsProfileOpen(false);
            router.push("/");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const getLinkClass = (path) =>
        `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === path
            ? "bg-emerald-600 text-white font-semibold"
            : "text-gray-700 hover:bg-gray-100 hover:text-emerald-600 dark:text-gray-200 dark:hover:bg-gray-800"
        }`;

    return (
        <nav className="bg-white/90 backdrop-blur-md dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                                🌱
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                FundPulse
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-2">
                        <Link href="/explore-campaigns" className={getLinkClass("/explore-campaigns")}>
                            <span className="flex items-center gap-1.5">
                                <Compass className="w-4 h-4" />
                                Explore Campaigns
                            </span>
                        </Link>

                        {user && (
                            <Link href="/dashboard" className={getLinkClass("/dashboard")}>
                                <span className="flex items-center gap-1.5">
                                    <LayoutDashboard className="w-4 h-4" />
                                    Dashboard
                                </span>
                            </Link>
                        )}
                    </div>

                    {/* Right Tools */}
                    <div className="hidden md:flex items-center gap-4">
                        <a
                            href={CLIENT_GITHUB_REPO}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800"
                        >
                            <Code2 className="w-4 h-4" />
                            Join as Developer
                        </a>

                        {user ? (
                            <div className="flex items-center gap-3">
                                {/* Available Credits */}
                                <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800">
                                    <Coins className="w-4 h-4 text-amber-500 animate-pulse" />
                                    <span>{dbUser?.credits ?? user?.credits ?? 0} Credits</span>
                                </div>

                                {/* Notifications Dropdown */}
                                <div className="relative" ref={notificationRef}>
                                    <button
                                        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                                        className="relative p-2 text-gray-600 hover:text-emerald-600 hover:bg-gray-100 rounded-full transition-colors dark:text-gray-300 dark:hover:bg-gray-800"
                                    >
                                        <Bell className="w-5 h-5" />
                                        {notifications?.length > 0 && (
                                            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
                                        )}
                                    </button>

                                    {isNotificationOpen && (
                                        <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50">
                                            <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                                                    Notifications
                                                </h4>
                                                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                                                    {notifications.length} New
                                                </span>
                                            </div>

                                            <div className="max-h-72 overflow-y-auto divide-y divide-gray-50 dark:divide-gray-700">
                                                {notifications?.length > 0 ? (
                                                    notifications.map((item, index) => (
                                                        <Link
                                                            key={index}
                                                            href={item.actionRoute || "/dashboard"}
                                                            onClick={() => setIsNotificationOpen(false)}
                                                            className="block p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                                        >
                                                            <p className="text-xs text-gray-700 dark:text-gray-200 leading-relaxed">
                                                                {item.message}
                                                            </p>
                                                        </Link>
                                                    ))
                                                ) : (
                                                    <div className="py-6 text-center text-gray-400 text-xs">
                                                        No notifications yet
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Profile Dropdown */}
                                <div className="relative" ref={profileRef}>
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center gap-2 p-1 rounded-full border-2 border-emerald-500/30 hover:border-emerald-500 transition-all"
                                    >
                                        <Image
                                            src={user?.photoURL || dbUser?.photo_url || "https://i.ibb.co/mR40B2y/user-placeholder.png"}
                                            width={40}
                                            height={40}
                                            alt="Avatar"
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                    </button>

                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50">
                                            <div className="px-4 py-2.5 border-b border-gray-100 dark:border-gray-700">
                                                <p className="text-sm font-bold text-gray-800 dark:text-gray-100 truncate">
                                                    {user?.displayName || dbUser?.name || "User Name"}
                                                </p>
                                                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                            </div>

                                            <Link
                                                href="/dashboard"
                                                onClick={() => setIsProfileOpen(false)}
                                                className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
                                            >
                                                <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                                                My Dashboard
                                            </Link>

                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/login"
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-200"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 shadow-sm"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Button */}
                    <div className="flex items-center md:hidden gap-2">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 rounded-lg"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;