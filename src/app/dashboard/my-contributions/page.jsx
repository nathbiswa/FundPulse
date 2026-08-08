"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import {
    ChevronLeft,
    ChevronRight,
    Loader2,
    FileText,
    CheckCircle2,
    Clock,
    XCircle
} from "lucide-react";

export default function MyContributionsPage() {
    const { data: session } = authClient.useSession();
    const activeUser = session?.user || null;

    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5; // প্রতি পেজে ৫টি ডাটা

    useEffect(() => {
        if (activeUser?.email) {
            setLoading(true);
            fetch(`http://localhost:5000/api/contributions/supporter/${activeUser.email}?page=${currentPage}&limit=${limit}`)
                .then((res) => res.json())
                .then((data) => {
                    setContributions(data.contributions || []);
                    setTotalPages(data.totalPages || 1);
                })
                .catch((err) => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [activeUser?.email, currentPage]);

    const getStatusBadge = (status) => {
        switch (status) {
            case "approved":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        <CheckCircle2 className="w-3 h-3" /> Approved
                    </span>
                );
            case "rejected":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
                        <XCircle className="w-3 h-3" /> Rejected (Refunded)
                    </span>
                );
            case "pending":
            default:
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                        <Clock className="w-3 h-3" /> Pending Review
                    </span>
                );
        }
    };

    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    My Contributions History
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                    View all your contributions and track approval or refund statuses.
                </p>
            </div>

            {/* Table Box */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mb-2" />
                        <p className="text-xs text-slate-500">Loading contribution history...</p>
                    </div>
                ) : contributions.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-xs text-slate-500">You haven't made any contributions yet.</p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 uppercase tracking-wider font-bold">
                                    <tr>
                                        <th className="p-3.5 rounded-l-xl">Campaign Title</th>
                                        <th className="p-3.5">Creator Email</th>
                                        <th className="p-3.5">Amount</th>
                                        <th className="p-3.5">Date</th>
                                        <th className="p-3.5 rounded-r-xl">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {contributions.map((item) => (
                                        <tr key={item._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                            <td className="p-3.5 font-bold text-slate-900 dark:text-white max-w-xs truncate">
                                                {item.campaign_title}
                                            </td>
                                            <td className="p-3.5 text-slate-500 dark:text-slate-400">
                                                {item.creator_email}
                                            </td>
                                            <td className="p-3.5 font-bold text-emerald-600 dark:text-emerald-400">
                                                🪙 {item.contribution_amount} Credits
                                            </td>
                                            <td className="p-3.5 text-slate-500">
                                                {new Date(item.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="p-3.5">{getStatusBadge(item.status)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex items-center justify-between pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                            <span className="text-slate-500 font-medium">
                                Page {currentPage} of {totalPages}
                            </span>

                            <div className="flex items-center gap-2">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold hover:bg-slate-50 disabled:opacity-40 flex items-center gap-1"
                                >
                                    <ChevronLeft className="w-4 h-4" /> Previous
                                </button>
                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold hover:bg-slate-50 disabled:opacity-40 flex items-center gap-1"
                                >
                                    Next <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

        </div>
    );
}