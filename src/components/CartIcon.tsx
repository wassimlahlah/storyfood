// components/CartIcon.tsx
"use client";

import { useCartStore } from "@/utils/store";
import Image from "next/image";

const CartIcon = () => {
  const { totalItems } = useCartStore();

  return (
    <div className="relative flex items-center">
      <Image src="/cart.png" alt="cart" width={30} height={30} />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {totalItems}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
