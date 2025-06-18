'use client';

import { useEffect, useState } from 'react';
import { ProductForm } from './ProductForm';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

const PRODUCTS_PER_PAGE = 5;

export default function AdminProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    toast.success('Product deleted');
    fetchProducts();
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  const pageCount = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Create / Edit Product</h2>
        <ProductForm
          product={editingProduct}
          onSuccess={() => {
            fetchProducts();
            setEditingProduct(null);
          }}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">All Products</h2>
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="max-w-xs"
          />
        </div>

        <div className="space-y-4">
          {paginated.map((product) => (
            <Card key={product.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardContent className="flex flex-col md:flex-row items-start gap-4 p-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded border"
                />
                <div>
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-gray-600">${product.price}</p>
                </div>
              </CardContent>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setEditingProduct(product)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {pageCount > 1 && (
          <Pagination className="mt-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => setPage((p) => Math.max(p - 1, 1))} />
              </PaginationItem>
              <PaginationItem>
                Page {page} of {pageCount}
              </PaginationItem>
              <PaginationItem>
                <PaginationNext onClick={() => setPage((p) => Math.min(p + 1, pageCount))} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
