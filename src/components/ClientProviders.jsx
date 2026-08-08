// src/components/ClientProviders.jsx
"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export default function ClientProviders({ children }) {
    const { data: session } = authClient.useSession();

    // ইউজার লগইন হওয়ার সাথে সাথে ব্যাকএন্ডে ক্রেডিট ও রোল নিশ্চিত করা
    useEffect(() => {
        if (session?.user?.email) {
            fetch("http://localhost:5000/api/users/init-credits", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: session.user.email,
                    // গুগোল লগইনে রোল না থাকলে ব্যাকএন্ড অটোম্যাটিক 'Supporter' এবং ৫০ ক্রেডিট সেট করবে
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("User credits & role synced:", data);
                })
                .catch((err) => console.error("Init credits sync error:", err));
        }
    }, [session?.user?.email]);

    return <>{children}</>;
}