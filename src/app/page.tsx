"use client";

import { useEffect, useState } from "react";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  qty?: number
}

const filters = [
  "men's clothing",
  "jewelery",
  "electronics",
  "women's clothing"
]

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('');
  const [currentFilter, setCurrentFIlter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setAllProducts(data)
      }).catch((e) => {
        console.log({ e })
      }).finally(() => {
        setIsLoading(false)
      })
  }, []);

  useEffect(() => {
    let filtered = allProducts;
    // category filter
    if (currentFilter) {
      filtered = currentFilter === "All" ? filtered : filtered.filter((e) => e.category === currentFilter)
    }
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
    }
    // Sorting
    if (sortOrder === 'asc') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else {
      filtered = filtered
    }

    setProducts(filtered);
  }, [searchTerm, sortOrder, currentFilter]);

  if (isLoading) {
    return <div className="min-h-screen flex justify-center items-center">
      <Loader />
    </div>
  }

  return (
    <div className="min-h-screen">
      {/* Navbar imported directly into Home */}
      <Navbar />

      <div className="pt-9 p-5">
        {/* Filter, Search, Sort Section */}
        <div className="flex gap-4 mb-6">
          <input
            className="bg-[#222630] px-4 py-3 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
            placeholder="Search products..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc' | '')}
            className="p-2 border rounded"
          >
            <option value="default" className="text-black"> Price : Default</option>
            <option value="asc" className="text-black"> Low to High</option>
            <option value="desc" className="text-black"> High to Low</option>
          </select>

          <select
            onChange={(e) => setCurrentFIlter(e?.target?.value)}
            className="p-2 border rounded "
          >
            <option value="All" className="text-black">Category : All</option>
            {filters.map((e) => {
              return <option key={e} className="text-black" value={e}> {e}</option>
            })}

          </select>

          {/* You can add a filter button later for category-based filtering */}
        </div>


        {/* Grid of Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

          {products?.length > 0 &&
            (
              products.map((product) => (
                <div key={product.id} className=" border p-4 rounded-lg shadow-md flex justify-center bg-amber-100">
                  <Card product={product} />
                </div>
              ))
            )}

          {!isLoading && products?.length == 0 && (
            <div
              role="alert"
              className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-red-200 dark:hover:bg-red-800 transform hover:scale-105"
            >
              <svg
                stroke="currentColor"
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5 flex-shrink-0 mr-2 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke-width="2"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                ></path>
              </svg>
              <p className="text-xs font-semibold">Error - Item Not Found.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
