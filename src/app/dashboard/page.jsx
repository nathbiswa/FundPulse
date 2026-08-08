"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

export default function DashboardIndexPage() {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    useEffect(() => {
        if (!isPending) {
            if (!session?.user?.email) {
                router.push("/login");
                return;
            }

            // ইউজারের রোল অনুযায়ী সঠিক ড্যাশবোর্ডে রিডাইরেক্ট
            fetch(`http://localhost:5000/api/users/${session.user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.role === "Admin") router.push("/dashboard/admin-home");
                    else if (data.role === "Creator") router.push("/dashboard/creator-home");
                    else router.push("/dashboard/supporter-home");
                })
                .catch(() => router.push("/dashboard/supporter-home"));
        }
    }, [session, isPending, router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mb-2" />
            <p className="text-xs font-semibold text-slate-500">Redirecting to your dashboard...</p>
        </div>
    );
}