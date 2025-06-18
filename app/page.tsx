import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Welcome to Next.js E-Commerce</h1>
      <p className="mt-2 text-gray-600">Start shopping now!</p>
      <Link
        href="/products"
        className="inline-block mt-4 px-4 py-2 bg-black text-white rounded"
      >
        Browse Products
      </Link>
    </main>
  );
}
