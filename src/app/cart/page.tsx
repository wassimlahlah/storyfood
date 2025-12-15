"use client";

import { useCartStore } from "@/utils/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CartPage = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const { products, totalItems, totalPrice, removeFromCart } = useCartStore();
  const router = useRouter();

  // حل مشكلة hydration
  useEffect(() => {
    const unsub = useCartStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });
    useCartStore.persist.rehydrate();
    return () => unsub();
  }, []);

  const goToOrderPage = () => {
    router.push("/order_now");
  };

  if (!isHydrated) return null;

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-9rem)] text-red-500">
      
      {/* PRODUCTS */}
      <div className="flex-1 p-4 lg:p-8 overflow-y-auto max-h-[60vh] lg:max-h-full">
        {products.length === 0 ? (
          <p className="text-center text-xl font-semibold text-gray-500">
            Your cart is empty
          </p>
        ) : (
          products.map((item) => (
            <div
              key={item.id + item.optionTitle}
              className="flex flex-col sm:flex-row items-center justify-between mb-6 p-4 bg-white rounded-xl shadow-sm border"
            >
              {item.img && (
                <Image
                  src={item.img ?? "/placeholder.png"}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="rounded-lg mb-2 sm:mb-0 sm:mr-4"
                />
              )}

              <div className="flex-1 flex flex-col gap-1">
                <h1 className="uppercase text-lg font-bold">{item.title}</h1>
                {item.optionTitle && (
                  <span className="text-sm text-gray-500">{item.optionTitle}</span>
                )}
                <span className="text-red-500 font-bold">
                  {(item.price * item.quantity).toFixed(2)} DA
                </span>
              </div>

              <span
                className="cursor-pointer text-red-600 font-bold hover:text-red-800 mt-2 sm:mt-0"
                onClick={() => removeFromCart(item)}
              >
                X
              </span>
            </div>
          ))
        )}
      </div>

      {/* SUMMARY */}
      <div className="flex-1 p-6 bg-white shadow-xl border-t lg:border-t-0 lg:border-l flex flex-col gap-6 lg:justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Summary</h2>

        {/* Subtotal */}
        <div className="flex justify-between items-center text-gray-700">
          <span className="font-medium">Subtotal ({totalItems} items)</span>
          <span className="font-semibold">{totalPrice} DA</span>
        </div>

        {/* Delivery */}
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700">Delivery Cost</span>
          <span className="text-green-600 font-bold">FREE</span>
        </div>

        <hr className="border-gray-300" />

        {/* Total */}
        <div className="flex justify-between items-center text-xl font-bold text-gray-800">
          <span>Total</span>
          <span>{totalPrice} DA</span>
        </div>

        {/* Order Button */}
        <button
          onClick={goToOrderPage}
          className="mt-4 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:brightness-110 active:scale-95 transition w-full"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default CartPage;
