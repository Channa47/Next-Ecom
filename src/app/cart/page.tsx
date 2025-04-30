"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/types"; // Adjust path if needed
import Navbar from "../components/Navbar";

const CartPage = () => {
    const cartItems = useSelector((state: RootState) => state.cart.products);
    const dispatch = useDispatch();

    const updateQty = (id: number, type: "inc" | "dec") => {
        let updatedCart = cartItems.map((item: any) =>
            item.id === id
                ? { ...item, qty: type === "inc" ? item.qty + 1 : item.qty - 1 }
                : item
        );

        updatedCart = updatedCart.filter((item: any) => item.qty > 0); // Remove items with qty 0

        dispatch({
            type: "MODIFY_CART",
            products: updatedCart,
        });
    };


    return (
        <>
            <Navbar />
            <div className="p-6 space-y-4 max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                {cartItems.map((item: any) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between border p-4 rounded-md shadow-sm bg-white"
                    >
                        {/* Product Image */}
                        <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />

                        {/* Title */}
                        <div className="flex-1 mx-4 text-gray-800 font-medium truncate">
                            {item.title}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => updateQty(item.id, "dec")}
                                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                -
                            </button>
                            <span className="px-2">{item.qty}</span>
                            <button
                                onClick={() => updateQty(item.id, "inc")}
                                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                +
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>

    );
};

export default CartPage;
