"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/login");
    };

    return (
        <>
            <nav className="sticky top-0 z-50 flex justify-between items-center p-4 bg-gray-800 text-white max-w-7xl mx-auto w-full">
                <div className="text-xl font-bold">
                    <Link href="/" className="cursor-pointer">E-Shop</Link>
                </div>
                <div className="flex gap-6">
                    {isLoggedIn ? (
                        <>
                            <Link href="/" className="hover:text-yellow-400 cursor-pointer">Home</Link>
                            <Link href="/cart" className="hover:text-yellow-400 cursor-pointer">Cart</Link>
                            <button onClick={handleLogout} className="hover:text-yellow-400 cursor-pointer">Logout</button>
                        </>
                    ) : (
                        <Link href="/login" className="hover:text-yellow-400 cursor-pointer">Login</Link>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
