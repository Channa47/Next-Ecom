"use client";

import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            try {
                await signOut(auth);
                alert("Logged out successfully!");
                router.push("/login");
            } catch (error: any) {
                alert(error.message);
            }
        };

        logout();
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-80">
                <h1 className="text-2xl font-bold mb-6 text-center">Logging out...</h1>
            </div>
        </div>
    );
}
