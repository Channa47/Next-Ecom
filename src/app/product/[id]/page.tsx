"use client";
import AnimatedImage from "@/app/components/AnimatedImage";
import Navbar from "@/app/components/Navbar";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Product() {
  const [product, setProduct] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data));
    }
  }, [id]);

  const renderStars = (rating: number) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${i <= rating ? "text-yellow-500" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 15l-5.293 3.118 1.01-5.873L1 6.382l5.883-.514L10 .5l2.117 5.368 5.883.514-4.717 5.863 1.01 5.873L10 15z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    return stars;
  };

  return (
    <>
      <Navbar />
      <div className="flex p-10">
        <div className="w-1/2 flex justify-center items-center">
          <div className="w-[70%]">
            <AnimatedImage src={product?.image} />
          </div>
        </div>

        <div className="w-1/2 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h1 className="text-3xl font-bold text-blue-250 hover:text-blue-500 transition-colors duration-300">
            {product?.title}
          </h1>
          <p className="text-sm text-amber-100 mt-2">{product?.description}</p>
          <div className="flex items-center mt-4 space-x-2">
            <span className="text-2xl font-semibold text-green-600">₹{product?.price}</span>
            <div className="flex">{renderStars(product?.rating?.rate)}</div>
          </div>
          <p className="text-sm mt-2 text-amber-100">Category: {product?.category}</p>
          {/* <p className="text-sm mt-2 text-amber-100">
            Rating: {product?.rating?.rate} (based on {product?.rating?.count} reviews)
          </p> */}
          <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </>

  );
}

export default Product;
