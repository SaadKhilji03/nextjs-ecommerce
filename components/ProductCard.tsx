"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { data: session } = useSession();

  const handleAddToCart = () => {
    if (!session) {
      toast.error("Please log in to add items to your cart.");
      return;
    }
    addToCart(product);
    toast.success("Added to cart", {
      description: `${product.name} ×1`,
    });
  };

  return (
    <Card className="w-full max-w-sm bg-card border-border shadow-md hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.id}`}>
        <CardHeader className="p-0 overflow-hidden">
          <div className="relative w-full h-48">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </CardHeader>

        <CardContent className="p-4 space-y-1">
          <h2 className="text-lg font-semibold text-foreground truncate">
            {product.name}
          </h2>
          <p className="text-muted-foreground font-medium">${product.price.toFixed(2)}</p>
        </CardContent>
      </Link>

      <CardFooter className="px-4 pb-4 pt-2">
        <Button onClick={handleAddToCart} className="w-full" variant="default">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
