import ProductCard from "@/components/ProductCard";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default async function ProductsPage() {
  let products: Product[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch products");

    products = await res.json();
  } catch (err) {
    console.error("Error loading products:", err);
    // You could render a proper error UI here
  }

  return (
    <section className="px-4 md:px-8 py-8">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-foreground">
        Browse Our Products
      </h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm mt-8">No products found.</p>
      )}
    </section>
  );
}
