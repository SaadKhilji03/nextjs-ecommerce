import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminProductList from "./AdminProductList";

export default async function AdminProductsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/"); // only admin can access
  }

  return (
    <main className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-10 border-b pb-4">
        Admin Dashboard
      </h1>
      <AdminProductList />
    </main>
  );
}
