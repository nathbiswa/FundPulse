"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import {
    Coins,
    Clock,
    CheckCircle2,
    TrendingUp,
    Loader2,
    HeartHandshake,
    Check
} from "lucide-react";

export default function SupporterHomePage() {
    const { data: session } = authClient.useSession();
    const activeUser = session?.user || null;

    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (activeUser?.email) {
            fetch(`http://localhost:5000/api/contributions/supporter/${activeUser.email}?limit=100`)
                .then((res) => res.json())
                .then((data) => {
                    setContributions(data.contributions || []);
                })
                .catch((err) => console.error("Error fetching contributions:", err))
                .finally(() => setLoading(false));
        }
    }, [activeUser?.email]);

    // Stats Calculations
    const totalCount = contributions.length;
    const pendingCount = contributions.filter((c) => c.status === "pending").length;
    const approvedTotalCredits = contributions
        .filter((c) => c.status === "approved")
        .reduce((sum, c) => sum + Number(c.contribution_amount || 0), 0);

    const approvedList = contributions.filter((c) => c.status === "approved");

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mb-2" />
                <p className="text-xs text-slate-500 font-semibold">Loading Supporter Overview...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    Welcome back, {activeUser?.name || "Supporter"} 👋
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                    Track your contributions, approved credits, and campaign impact here.
                </p>
            </div>

            {/* 3 Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

                {/* Total Contributions */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 flex items-center justify-center mb-3">
                        <HeartHandshake className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Contributions</p>
                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{totalCount}</h3>
                </div>

                {/* Pending Contributions */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900 flex items-center justify-center mb-3">
                        <Clock className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Pending</p>
                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{pendingCount}</h3>
                </div>

                {/* Total Amount Contributed */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 flex items-center justify-center mb-3">
                        <Coins className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contributed Credits (Approved)</p>
                    <h3 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{approvedTotalCredits} Credits</h3>
                </div>

            </div>

            {/* Approved Contributions Table */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                    Approved Contributions
                </h3>

                {approvedList.length === 0 ? (
                    <p className="text-xs text-slate-500 py-6 text-center">No approved contributions found yet.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 uppercase tracking-wider font-bold">
                                <tr>
                                    <th className="p-3.5 rounded-l-xl">Campaign Title</th>
                                    <th className="p-3.5">Creator Name</th>
                                    <th className="p-3.5">Credits Contributed</th>
                                    <th className="p-3.5 rounded-r-xl">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {approvedList.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                        <td className="p-3.5 font-bold text-slate-900 dark:text-white max-w-xs truncate">
                                            {item.campaign_title}
                                        </td>
                                        <td className="p-3.5 font-medium text-slate-600 dark:text-slate-300">
                                            {item.creator_name || "Creator"}
                                        </td>
                                        <td className="p-3.5 font-bold text-emerald-600 dark:text-emerald-400">
                                            🪙 {item.contribution_amount} Credits
                                        </td>
                                        <td className="p-3.5">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                                <Check className="w-3 h-3" /> Approved
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    );
}