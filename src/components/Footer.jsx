import React from "react";
import Link from "next/link";
import { Heart, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 my-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

                    {/* Brand Column */}
                    <div className="space-y-4 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
                                🌱
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                FundPulse
                            </span>
                        </Link>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Empowering creators and supporters worldwide. Fund innovative projects, community causes, and groundbreaking ideas with platform credits.
                        </p>

                        {/* Social Links (Inline Brand SVGs) */}
                        <div className="flex items-center gap-3 pt-2">
                            {/* GitHub */}
                            <a
                                href="https://github.com/nathbiswa"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-600 transition-all"
                                title="GitHub"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                            </a>

                            {/* LinkedIn */}
                            <a
                                href="https://linkedin.com/in/nathbiswa"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-600 transition-all"
                                title="LinkedIn"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>

                            {/* Facebook */}
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-600 transition-all"
                                title="Facebook"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                            Explore
                        </h4>
                        <ul className="space-y-2.5 text-xs font-medium">
                            <li>
                                <Link href="/explore-campaigns" className="hover:text-emerald-400 transition-colors">
                                    Top Campaigns
                                </Link>
                            </li>
                            <li>
                                <Link href="/explore-campaigns?cat=Technology" className="hover:text-emerald-400 transition-colors">
                                    Tech Projects
                                </Link>
                            </li>
                            <li>
                                <Link href="/explore-campaigns?cat=Community" className="hover:text-emerald-400 transition-colors">
                                    Community Causes
                                </Link>
                            </li>
                            <li>
                                <Link href="/explore-campaigns?cat=Creative" className="hover:text-emerald-400 transition-colors">
                                    Creative Arts
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Roles & Info */}
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                            Get Involved
                        </h4>
                        <ul className="space-y-2.5 text-xs font-medium">
                            <li>
                                <Link href="/register" className="hover:text-emerald-400 transition-colors">
                                    Start a Campaign
                                </Link>
                            </li>
                            <li>
                                <Link href="/register" className="hover:text-emerald-400 transition-colors">
                                    Become a Supporter
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">
                                    User Dashboard
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/nathbiswa/FundPulse"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-emerald-400 transition-colors"
                                >
                                    Join as Developer
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                            Stay Connected
                        </h4>
                        <p className="text-xs text-slate-400 mb-3">
                            Subscribe to receive weekly updates on trending campaigns.
                        </p>
                        <div className="flex items-center bg-slate-800 rounded-xl p-1.5 border border-slate-700">
                            <Mail className="w-4 h-4 text-slate-400 ml-2" />
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full bg-transparent px-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                            />
                            <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors">
                                Join
                            </button>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
                    <p>© {new Date().getFullYear()} FundPulse Crowdfunding Platform. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for MERN Developers
                    </p>
                </div>
            </div>
        </footer>
    );
}