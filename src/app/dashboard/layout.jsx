"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
    Home,
    Compass,
    Coins,
    PlusCircle,
    FolderKanban,
    Wallet,
    History,
    Users,
    CheckSquare,
    AlertTriangle,
    LayoutDashboard,
    LogOut,
    Menu,
    X,
    Bell,
    ShieldCheck,
    CreditCard,
    FileSpreadsheet
} from "lucide-react";

export default function DashboardLayout({ children }) {
    const { data: session, isPending } = authClient.useSession();
    const activeUser = session?.user || null;

    const [dbUser, setDbUser] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const pathname = usePathname();
    const router = useRouter();

    // ব্যাকএন্ড থেকে ইউজারের ডাইনামিক রোল ও ক্রেডিট আনা
    useEffect(() => {
        if (activeUser?.email) {
            fetch(`http://localhost:5000/api/users/${activeUser.email}`)
                .then((res) => res.json())
                .then((data) => setDbUser(data))
                .catch((err) => console.error("Error fetching db user:", err));
        }
    }, [activeUser?.email]);

    const role = dbUser?.role || "Supporter";
    const credits = dbUser?.credits ?? 0;

    // লগআউট ফংশন
    const handleLogout = async () => {
        await authClient.signOut();
        router.push("/login");
    };

    // রোল অনুযায়ী সাইডবার লিংক ডিফাইন করা
    const getNavItems = () => {
        switch (role) {
            case "Admin":
                return [
                    { name: "Admin Home", href: "/dashboard/admin-home", icon: LayoutDashboard },
                    { name: "Manage Users", href: "/dashboard/manage-users", icon: Users },
                    { name: "Manage Campaigns", href: "/dashboard/manage-campaigns", icon: FolderKanban },
                    { name: "Campaign Approvals", href: "/dashboard/campaign-approvals", icon: CheckSquare },
                    { name: "Withdrawal Requests", href: "/dashboard/withdrawal-requests", icon: Wallet },
                    { name: "Reports", href: "/dashboard/reports", icon: AlertTriangle },
                ];
            case "Creator":
                return [
                    { name: "Creator Home", href: "/dashboard/creator-home", icon: LayoutDashboard },
                    { name: "Add New Campaign", href: "/dashboard/add-campaign", icon: PlusCircle },
                    { name: "My Campaigns", href: "/dashboard/my-campaigns", icon: FolderKanban },
                    { name: "Withdrawals", href: "/dashboard/withdrawals", icon: Wallet },
                    { name: "Payment History", href: "/dashboard/payment-history", icon: History },
                ];
            case "Supporter":
            default:
                return [
                    { name: "Supporter Home", href: "/dashboard/supporter-home", icon: LayoutDashboard },
                    { name: "Explore Campaigns", href: "/explore-campaigns", icon: Compass },
                    { name: "My Contributions", href: "/dashboard/my-contributions", icon: FileSpreadsheet },
                    { name: "Purchase Credit", href: "/dashboard/purchase-credit", icon: CreditCard },
                    { name: "Payment History", href: "/dashboard/payment-history", icon: History },
                ];
        }
    };

    const navItems = getNavItems();

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col md:flex-row">

            {/* ---------------- 1. SIDEBAR ---------------- */}
            <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-slate-900 text-slate-200 flex flex-col justify-between p-4 transition-transform duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                }`}>
                <div>
                    {/* Logo & Platform Name */}
                    <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg">
                                🌱
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                FundPulse
                            </span>
                        </Link>
                        <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* User Role Badge Info */}
                    <div className="my-4 p-3 bg-slate-800/80 rounded-2xl border border-slate-700/60">
                        <p className="text-xs font-bold text-slate-100 truncate">{activeUser?.name || "User"}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-400">
                                {role} Account
                            </span>
                        </div>
                    </div>

                    {/* Dynamic Navigation Links */}
                    <nav className="space-y-1.5 mt-4">
                        {/* Redirect Back To Home Link */}
                        <Link
                            href="/"
                            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                        >
                            <Home className="w-4 h-4 text-emerald-500" />
                            <span>Back to Home</span>
                        </Link>

                        <div className="my-2 border-t border-slate-800" />

                        {navItems.map((item, index) => {
                            const IconComp = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={index}
                                    href={item.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${isActive
                                            ? "bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/30"
                                            : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                        }`}
                                >
                                    <IconComp className={`w-4 h-4 ${isActive ? "text-white" : "text-emerald-400"}`} />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Logout Button */}
                <div className="pt-4 border-t border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold text-red-400 hover:bg-red-950/40 rounded-xl transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* ---------------- 2. MAIN CONTENT AREA ---------------- */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Header Bar */}
                <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="md:hidden p-2 text-slate-600 dark:text-slate-300 rounded-lg"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
                            {role} Dashboard
                        </h2>
                    </div>

                    {/* Credits Badge & User Profile */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300 px-3 py-1.5 rounded-full text-xs font-bold">
                            <Coins className="w-4 h-4 text-amber-500 animate-pulse" />
                            <span>{credits} Credits</span>
                        </div>

                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-emerald-500/30">
                            {activeUser?.name ? activeUser.name.charAt(0).toUpperCase() : "U"}
                        </div>
                    </div>
                </header>

                {/* Dynamic Children Content (Dashboard Route Views) */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>

            </div>

        </div>
    );
}