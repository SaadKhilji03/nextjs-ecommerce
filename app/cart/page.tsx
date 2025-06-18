"use client";

import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { toast } from "sonner";

export default function CartPage() {
  const { data: session, status } = useSession();
  const { cart, addToCart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItems: cart }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      console.error("Checkout error:", data);
    }
  };

  const handleAdd = (item: any) => {
    addToCart(item);
    toast.success("Added to cart", {
      description: `${item.name} ×1`,
    });
  };

  const handleRemove = (id: string) => {
    removeFromCart(id);
    toast("Removed from cart");
  };

  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!session) {
    return (
      <main className="max-w-xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">
          Please log in to view your cart
        </h1>
        <Link href="/login">
          <Button>Go to Login</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">
          Your cart is empty.{" "}
          <Link href="/products" className="text-blue-600 underline">
            Browse products
          </Link>
        </p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <Card key={item.id}>
              <CardHeader className="pb-2">
                <h2 className="text-lg font-semibold">{item.name}</h2>
              </CardHeader>

              <CardContent>
                <p className="text-gray-700">
                  ${item.price.toFixed(2)} × {item.quantity}
                </p>
              </CardContent>

              <CardFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemove(item.id)}
                  >
                    −
                  </Button>
                  <Button size="sm" onClick={() => handleAdd(item)}>
                    +
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}

          <div className="flex justify-between pt-6 border-t font-bold text-xl">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <Button
            onClick={handleCheckout}
            className="w-full mt-4 text-lg"
            size="lg"
          >
            Proceed to Checkout
          </Button>
        </div>
      )}
    </main>
  );
}
