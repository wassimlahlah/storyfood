"use client";

import { useCartStore } from "@/utils/store";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Product = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};

export default function OrderConfirmPage() {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const router = useRouter();

  const { products, totalPrice, clearCart } = useCartStore() as {
    products: Product[];
    totalPrice: number;
    clearCart: () => void;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          city,
          price: totalPrice,
          products,
        }),
      });

      const data = await res.json();
      console.log(data);

      // 🧹 تفريغ السلة بعد تأكيد الطلب
      clearCart();

      // ➡️ التحويل لصفحة الطلبات
      router.push("/orders");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-lg space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Order Confirmation</h2>

        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder="Enter your name"
        />

        <input
          type="text"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder="07xxxxxxxx"
        />

        <input
          type="text"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder="Enter your city"
        />

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
}
