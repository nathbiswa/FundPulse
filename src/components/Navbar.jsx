"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import {
    Bell,
    Coins,
    LayoutDashboard,
    LogOut,
    Menu,
    X,
    Code2,
    Compass,
    Loader2
} from "lucide-react";

const Navbar = ({ dbUser, notifications = [] }) => {
    // Better Auth সেশন
    const { data: session, isPending } = authClient.useSession();
    const activeUser = session?.user || null;

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    const CLIENT_GITHUB_REPO = "https://github.com/nathbiswa/FundPulse";

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsNotificationOpen(false);
    }, [pathname]);

    // ইউজারের নাম ও প্রথম অক্ষর (Circle-এর জন্য)
    const userName = activeUser?.name || dbUser?.name || "User";
    const userInitial = userName ? userName.charAt(0).toUpperCase() : "U";
    const userCredits = dbUser?.credits ?? activeUser?.credits ?? 0;

    // লগআউট ফংশন
    const handleLogout = async () => {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        setIsMobileMenuOpen(false);
                        router.push("/login");
                        router.refresh();
                    },
                },
            });
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const getLinkClass = (path) =>
        `px-3 py-2 rounded-xl text-sm font-semibold transition-all ${pathname === path
            ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/30"
            : "text-slate-700 hover:bg-slate-100 hover:text-emerald-600 dark:text-slate-200 dark:hover:bg-slate-800"
        }`;

    return (
        <nav className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors">
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

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-2">
                        <Link href="/explore-campaigns" className={getLinkClass("/explore-campaigns")}>
                            <span className="flex items-center gap-1.5">
                                <Compass className="w-4 h-4" />
                                Explore Campaigns
                            </span>
                        </Link>

                        {activeUser && (
                            <Link href="/dashboard" className={getLinkClass("/dashboard")}>
                                <span className="flex items-center gap-1.5">
                                    <LayoutDashboard className="w-4 h-4" />
                                    Dashboard
                                </span>
                            </Link>
                        )}
                    </div>

                    {/* Right Side Tools */}
                    <div className="hidden md:flex items-center gap-3">

                        {/* Developer Link */}
                        <a
                            href={CLIENT_GITHUB_REPO}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 mr-1"
                        >
                            <Code2 className="w-4 h-4" />
                            Join as Developer
                        </a>

                        {isPending ? (
                            <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
                        ) : activeUser ? (
                            /* --- LOGGED-IN VIEW (Circle Avatar + Name + Logout) --- */
                            <div className="flex items-center gap-3">

                                {/* Available Credits */}
                                <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1.5 rounded-full text-xs font-bold dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800">
                                    <Coins className="w-4 h-4 text-amber-500 animate-pulse" />
                                    <span>{userCredits} Credits</span>
                                </div>

                                {/* Notifications Bell */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                                        className="relative p-2 text-slate-600 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors dark:text-slate-300"
                                    >
                                        <Bell className="w-5 h-5" />
                                        {notifications?.length > 0 && (
                                            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
                                        )}
                                    </button>

                                    {isNotificationOpen && (
                                        <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-50">
                                            <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                                                <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Notifications</h4>
                                                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                                                    {notifications.length} New
                                                </span>
                                            </div>
                                            <div className="max-h-60 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-700">
                                                {notifications?.length > 0 ? (
                                                    notifications.map((item, index) => (
                                                        <Link
                                                            key={index}
                                                            href={item.actionRoute || "/dashboard"}
                                                            onClick={() => setIsNotificationOpen(false)}
                                                            className="block p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-xs text-slate-700 dark:text-slate-200"
                                                        >
                                                            {item.message}
                                                        </Link>
                                                    ))
                                                ) : (
                                                    <div className="py-6 text-center text-slate-400 text-xs">No notifications</div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* User Circle Avatar + Name (Dashboard Link) */}
                                <Link
                                    href="/dashboard"
                                    className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                                    title="Go to Dashboard"
                                >
                                    {/* Circle Avatar with Name Initial */}
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-emerald-500/30">
                                        {userInitial}
                                    </div>

                                    {/* User Name */}
                                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100 max-w-[120px] truncate">
                                        {userName}
                                    </span>
                                </Link>

                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/60 dark:text-red-300 border border-red-200 dark:border-red-900/50 rounded-xl transition-all shadow-sm"
                                    title="Logout Account"
                                >
                                    <LogOut className="w-3.5 h-3.5" />
                                    <span>Logout</span>
                                </button>

                            </div>
                        ) : (
                            /* --- LOGGED-OUT VIEW --- */
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/login"
                                    className={getLinkClass("/login")}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${pathname === "/register"
                                            ? "bg-emerald-700 text-white shadow-md"
                                            : "text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm"
                                        }`}
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="flex items-center md:hidden gap-2">
                        {activeUser && (
                            <Link href="/dashboard">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-emerald-500/30">
                                    {userInitial}
                                </div>
                            </Link>
                        )}

                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Drawer Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3">
                    <Link
                        href="/explore-campaigns"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium ${pathname === "/explore-campaigns"
                                ? "bg-emerald-600 text-white font-semibold"
                                : "text-slate-700 hover:bg-slate-100 dark:text-slate-200"
                            }`}
                    >
                        <Compass className="w-4 h-4 text-emerald-500" />
                        Explore Campaigns
                    </Link>

                    {activeUser && (
                        <Link
                            href="/dashboard"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium ${pathname === "/dashboard"
                                    ? "bg-emerald-600 text-white font-semibold"
                                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-200"
                                }`}
                        >
                            <LayoutDashboard className="w-4 h-4 text-emerald-500" />
                            Dashboard
                        </Link>
                    )}

                    <a
                        href={CLIENT_GITHUB_REPO}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300"
                    >
                        <Code2 className="w-4 h-4" />
                        Join as Developer
                    </a>

                    {activeUser ? (
                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                            <div className="flex items-center gap-3 px-2">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-base ring-2 ring-emerald-500/30">
                                    {userInitial}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                                        {userName}
                                    </p>
                                    <p className="text-xs text-slate-500">{activeUser?.email}</p>
                                </div>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-2 pt-2">
                            <Link
                                href="/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`text-center py-2.5 text-sm font-semibold border rounded-xl ${pathname === "/login"
                                        ? "bg-emerald-600 text-white border-emerald-600"
                                        : "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                                    }`}
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`text-center py-2.5 text-sm font-semibold text-white rounded-xl ${pathname === "/register"
                                        ? "bg-emerald-700"
                                        : "bg-emerald-600 hover:bg-emerald-700"
                                    }`}
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;