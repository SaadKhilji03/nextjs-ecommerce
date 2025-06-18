"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Image from "next/image";

type Product = {
  id?: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

export function ProductForm({
  product,
  onSuccess,
}: {
  product?: Product | null;
  onSuccess: () => void;
}) {
  const [form, setForm] = useState<Product>(
    product || { name: "", price: 0, image: "", description: "" }
  );

  useEffect(() => {
    if (product) setForm(product);
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "price" ? (value === "" ? 0 : parseFloat(value)) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = product?.id ? "PUT" : "POST";
    const url = product?.id ? `/api/products/${product.id}` : "/api/products";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const error = await res.json();
      toast.error("Failed: " + (error.message || res.status));
      return;
    }

    toast.success(`Product ${product?.id ? "updated" : "created"}`);
    setForm({ name: "", price: 0, image: "", description: "" });
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg border shadow"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          name="image"
          value={form.image}
          onChange={handleChange}
          required
        />
        {form.image && (
          <div className="relative w-32 h-32 mt-2 border rounded overflow-hidden">
            <Image
              src={form.image}
              alt="Preview"
              fill
              className="object-cover rounded"
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit">
        {product?.id ? "Update Product" : "Create Product"}
      </Button>
    </form>
  );
}
