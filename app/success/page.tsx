"use client";

import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart(); // ✅ Clears cart on successful payment
  }, []);

  return (
    <main className="max-w-2xl mx-auto text-center p-10">
      <h1 className="text-3xl font-bold mb-4 text-green-600">✅ Payment Successful!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for your purchase. Your order has been placed successfully.
      </p>
      <a href="/products" className="text-blue-600 underline text-lg">
        Continue Shopping
      </a>
    </main>
  );
}
