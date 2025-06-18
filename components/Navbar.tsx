"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Menu } from "lucide-react"; // Hamburger icon

export default function Navbar() {
  const { cart } = useCart();
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinkStyle = (href: string) =>
    `relative transition-colors hover:text-primary ${
      pathname === href ? "text-primary font-semibold" : "text-muted-foreground"
    }`;

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-border bg-background sticky top-0 z-50">
      <Link href="/" className="text-2xl font-bold text-foreground">
        🛍️ NextShop
      </Link>

      <div className="flex gap-6 items-center text-sm sm:text-base">
        {/* Nav Links */}
        <Link href="/products" className={navLinkStyle("/products")}>
          Products
        </Link>

        <Link href="/cart" className={navLinkStyle("/cart")}>
          <span className="relative">
            Cart
            {totalItems > 0 && (
              <Badge
                className="absolute -top-2 -right-6.5 px-1.5 py-0.5 text-xs"
                variant="secondary"
              >
                {totalItems}
              </Badge>
            )}
          </span>
        </Link>

        {/* Spacer + Username */}
        {session && (
          <span className="text-muted-foreground font-medium ml-4">
            Welcome, <span className="text-foreground">{session.user.username || session.user.email}</span>!
          </span>
        )}

        {/* Hamburger Menu */}
        {status === "loading" ? (
          <span>Loading...</span>
        ) : session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Menu className="w-5 h-5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {session.user.role === "admin" && (
                <DropdownMenuItem asChild>
                  <Link href="/admin">Admin Panel</Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => signOut()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link href="/login">
              <Button variant="default">Login</Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline">Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
