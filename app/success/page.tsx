"use client";

import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart(); // ✅ Clears cart on successful payment
  }, [clearCart]); // ✅ Include in dependency array

  return (
    <main className="max-w-2xl mx-auto text-center p-10">
      <h1 className="text-3xl font-bold mb-4 text-green-600">✅ Payment Successful!</h1>
      <p className="text-lg text-gray-400 mb-6">
        Thank you for your purchase. Your order has been placed successfully.
      </p>
      <Link href="/products" className="text-blue-500 underline text-lg">
        Continue Shopping
      </Link>
    </main>
  );
}
