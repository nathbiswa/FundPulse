"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Image as ImageIcon,
    Upload,
    Coins,
    ShieldCheck,
    AlertCircle,
    Loader2,
    ArrowRight,
    CheckCircle2
} from "lucide-react";
import { toast } from "react-toastify";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        photoUrl: "",
        role: "Supporter", // Default role
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const router = useRouter();

    // Role অনুযায়ী ডিফল্ট ক্রেডিট
    const defaultCredits = formData.role === "Supporter" ? 50 : 20;

    // ImgBB API দিয়ে ছবি আপলোড করার ফংশন
    const handleImgBBUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadingImage(true);
        setError("");

        const imgFormData = new FormData();
        imgFormData.append("image", file);

        // .env.local থেকে ImgBB API Key নিবে (অথবা সরাসরি টেস্ট কি দিতে পারেন)
        const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "YOUR_IMGBB_API_KEY";

        try {
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: "POST",
                body: imgFormData,
            });

            const data = await res.json();

            if (data.success) {
                setFormData((prev) => ({ ...prev, photoUrl: data.data.url }));
            } else {
                setError("Failed to upload image to ImgBB. Please check your API key or image format.");
            }
        } catch (err) {
            console.error("ImgBB Upload Error:", err);
            setError("Image upload failed. You can also paste an image URL directly.");
        } finally {
            setUploadingImage(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError("");
    };

    // পাসওয়ার্ড স্ট্রেংথ চেক (সর্বনিম্ন ৬ অক্ষর)
    const isPasswordValid = (password) => {
        return password.length >= 6;
    };

    // Registration Submit Handler
    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        // Validations
        if (!formData.name || !formData.email || !formData.password) {
            setError("Please fill in all required fields.");
            return;
        }

        if (!isPasswordValid(formData.password)) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        console.log("Registering user with data:", formData);

        setLoading(true);

        try {
            const { data, error: authError } = await authClient.signUp.email({
                email: formData.email,
                password: formData.password,
                name: formData.name,
                image: formData.photoUrl || "https://i.ibb.co/mR40B2y/user-placeholder.png",
                role: formData.role,
                credits: defaultCredits, // ডিফল্ট ক্রেডিট পাঠানো
                // callbackURL: "/dashboard",
            });

            if (data) {
                toast.success("Registration successful. Please check your email for verification link.");
            } else {
                toast.error("Registration failed. Please try again.");
            }

            if (authError) {
                setError(authError.message || "Registration failed. Email might already exist.");
            } else {
                // সফল রেজিস্টার হলে ড্যাশবোর্ডে নিয়ে যাবে
                router.push("/dashboard");
                router.refresh();
            }
        } catch (err) {
            console.error("Registration Error:", err);
            setError("An unexpected error occurred during registration. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Google Sign-In Handler
    const handleGoogleRegister = async () => {
        setError("");
        setGoogleLoading(true);

        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/dashboard",
            });
        } catch (err) {
            console.error("Google Sign-In Error:", err);
            setError("Google registration failed. Please try again.");
            setGoogleLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-lg space-y-8 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">

                {/* Header */}
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
                            🌱
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            FundPulse
                        </span>
                    </Link>
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                        Create an Account
                    </h2>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        Join as a Supporter or Creator and get welcome bonus credits!
                    </p>
                </div>

                {/* Error Message Alert */}
                {error && (
                    <div className="flex items-center gap-3 p-4 text-sm text-red-800 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 rounded-2xl">
                        <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
                        <p>{error}</p>
                    </div>
                )}

                <form className="mt-6 space-y-4" onSubmit={handleRegister}>

                    {/* Full Name */}
                    {/* <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                            Full Name *
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <User className="w-4 h-4" />
                            </div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:text-white"
                            />
                        </div>
                    </div> */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                            Full Name *
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <User className="w-4 h-4" />
                            </div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ""}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Email Address */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-300 mb-1.5">
                            Email Address *
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <Mail className="w-4 h-4" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ""}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                required
                                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Select Role & Default Credit Banner */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-300 mb-1.5">
                                Select Role *
                            </label>
                            <div className="relative">
                                <ShieldCheck className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:text-white font-medium"
                                >
                                    <option value="Supporter">Supporter</option>
                                    <option value="Creator">Creator</option>
                                </select>
                            </div>
                        </div>

                        {/* Welcome Bonus Credits Notice */}
                        <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                            <Coins className="w-5 h-5 text-amber-500 animate-bounce flex-shrink-0" />
                            <div>
                                <span>Welcome Bonus:</span>
                                <p className="text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                                    +{defaultCredits} Credits
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Picture Upload (ImgBB API or URL) */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-300 mb-1.5">
                            Profile Picture (Upload via ImgBB or Direct URL)
                        </label>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="relative flex-1">
                                <ImageIcon className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                                <input
                                    type="url"
                                    name="photoUrl"
                                    value={formData.photoUrl}
                                    onChange={handleChange}
                                    placeholder="https://i.ibb.co/..."
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:text-white"
                                />
                            </div>

                            {/* Upload File to ImgBB */}
                            <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors">
                                {uploadingImage ? (
                                    <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                                ) : (
                                    <Upload className="w-4 h-4 text-emerald-600" />
                                )}
                                <span>Upload File</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImgBBUpload}
                                    disabled={uploadingImage}
                                    className="hidden"
                                />
                            </label>
                        </div>
                        {formData.photoUrl && (
                            <p className="mt-1 text-xs text-emerald-600 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Image attached successfully
                            </p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-300 mb-1.5">
                            Password *
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <Lock className="w-4 h-4" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password || ""}
                                onChange={handleChange}
                                placeholder="At least 6 characters"
                                required
                                className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || googleLoading || uploadingImage}
                        className="w-full mt-2 flex justify-center items-center gap-2 py-3 px-4 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Creating account...
                            </>
                        ) : (
                            <>
                                Register Account
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white dark:bg-slate-900 px-3 text-slate-500 dark:text-slate-400 font-medium">
                            Or
                        </span>
                    </div>
                </div>

                {/* Google Sign-In */}
                <button
                    type="button"
                    onClick={handleGoogleRegister}
                    disabled={loading || googleLoading}
                    className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-semibold rounded-xl transition-all disabled:opacity-50"
                >
                    {googleLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-slate-600" />
                    ) : (
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                            />
                        </svg>
                    )}
                    Continue with Google
                </button>

                {/* Link to Login */}
                <p className="text-center text-xs text-slate-600 dark:text-slate-400 pt-1">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-4"
                    >
                        Sign In
                    </Link>
                </p>

            </div>
        </div>
    );
}