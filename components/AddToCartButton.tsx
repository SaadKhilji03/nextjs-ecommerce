"use client";

import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const handleAdd = () => {
    if (!session) {
      router.push("/login");
      return;
    }
    addToCart(product);
    toast.success("Added to cart", {
    description: `${product.name} ×1`,
  });
  };

  return (
    <Button onClick={handleAdd} className="mt-4 w-full sm:w-auto">
      Add to Cart
    </Button>
  );
}
