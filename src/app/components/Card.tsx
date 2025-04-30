/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { Product } from "../page";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/types";

type CardProps = {
    product: Product;
};


const Card = ({ product }: CardProps) => {
    const route = useRouter()
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.products);

    const currentItem = cartItems?.find((item: Product) => item.id === product.id);
    const qty = currentItem?.qty || 0;


    const handleClick = () => {
        route.push(`/product/${product?.id}`);
    }
    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();

        const existing = cartItems?.find((item: any) => item.id === product.id);

        let updatedCart;
        if (existing) {
            updatedCart = cartItems.map((item: any) =>
                item.id === product.id ? { ...item, qty: item.qty + 1 } : item
            );
        } else {
            updatedCart = [...cartItems, { ...product, qty: 1 }];
        }

        dispatch({
            type: "MODIFY_CART",
            products: updatedCart,
        });
    };

    const removeItemLogic = (product: Product, cartItems: Product[]) => {
        return cartItems
            .map((item: any) =>
                item.id === product.id
                    ? { ...item, qty: item.qty - 1 }
                    : item
            )
            .filter((item) => item.qty > 0); // Remove if qty is 0
    };

    const handleRemoveFromCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        const updatedCart = removeItemLogic(product, cartItems);

        dispatch({
            type: "MODIFY_CART",
            products: updatedCart,
        });
    };


    return (
        <div onClick={handleClick} className="relative w-[400px] h-[254px] bg-white rounded-lg shadow-md transition-all duration-500 ease-in-out transform hover:translate-y-[-10px] hover:shadow-lg hover:border-indigo-200 overflow-hidden" >
            <div className="absolute inset-0 bg-gradient-to-r from-white opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
            <div className="absolute inset-[-10px] bg-gradient-radial from-purple-500 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 p-4 flex flex-col gap-3">
                <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold opacity-0 hover:opacity-100 transition-opacity duration-400 ease-in-out transform scale-75 hover:scale-100">
                    NEW
                </div>

                <div className="w-full h-[100px]  to-purple-600 rounded-lg transition-transform duration-500 ease-in-out transform hover:translate-y-[-5px] hover:scale-105 flex items-center justify-center overflow-hidden">
                    <img src={product.image} className="h-full object-contain" alt="Product" />
                </div>

                <div className="flex flex-col gap-2 w-full overflow-hidden">
                    <p className="text-gray-800 font-bold text-lg transition-all duration-300 ease-in-out transform hover:text-indigo-500 hover:translate-x-1 truncate">
                        {product?.title}
                    </p>
                    <p className="text-gray-600 text-sm opacity-70 transition-all duration-300 ease-in-out hover:opacity-100 transform hover:translate-x-1 line-clamp-2">
                        {product?.description}
                    </p>
                </div>


                <div className="flex justify-between items-center mt-auto">
                    <div className="text-gray-800 font-semibold">₹ {product?.price}</div>

                    <div className="flex gap-1 items-center">
                        <button
                            onClick={handleAddToCart}
                            className="w-7 h-7 bg-purple-500 text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-300 ease-in-out"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16M4 12h16" /> {/* Plus icon */}
                            </svg>
                        </button>

                        {qty ? (
                            <>
                                <p className="text-amber-500 px-1 text-sm font-semibold">Qty: {qty}</p>
                                <button
                                    onClick={handleRemoveFromCart}
                                    className="w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-300 ease-in-out"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /> {/* Minus icon */}
                                    </svg>
                                </button>
                            </>
                        ) : null}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Card;
