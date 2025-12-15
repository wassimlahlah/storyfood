"use client";
import { ProductType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";


const Featured = () => {
  const [featuredProducts, setFeaturedProducts] = useState<ProductType[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data: ProductType[] = await res.json();

        // خلي img كما هي، وبدل أي img فارغ بالـ placeholder
        const fixed = data.map(item => ({
          ...item,
          img: item.img || "/placeholder.png",
        }));

        setFeaturedProducts(fixed);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Unknown error occurred");
      }
    };
    getData();
  }, []);
    

  if (error) return <p className="text-red-500 text-center mt-5">{error}</p>;
  if (featuredProducts.length === 0)
    return <p className="text-center mt-10">Loading featured products...</p>;

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-6 p-4">
        {featuredProducts.map(item => (
          <Link
            href={`/product/${item.id}`} key={item.id}
            className="flex-shrink-0 w-[75vw] md:w-[35vw] xl:w-[25vw] h-[45vh] md:h-[50vh] bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <div className="relative w-full h-[50%]">
              <Image
                 src={item.img || "/placeholder.png"} // ← هنا fallback
                 alt={item.title || "product image"}
                 fill
                 className="object-contain"
               />

            </div>

            <div className="flex flex-col items-center justify-center text-center p-4 gap-2 h-[40%]">
              <h2 className="text-lg md:text-xl font-bold uppercase">{item.title}</h2>
              <p className="text-gray-600 text-sm md:text-base">{item.desc}</p>
              <span className="text-red-500 font-bold text-lg md:text-xl">
                {item.price} DA
              </span>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-red-600 transition"
                >
                Add to Cart
              </button>
              
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Featured;
