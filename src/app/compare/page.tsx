"use client";

import Header from "@/components/Header";
import Footer01 from "@/components/Footer01";
import Footer02 from "@/components/Footer02";
import { IconX, IconShoppingCart, IconStar } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const compareProducts = [
  {
    id: 1,
    name: "Banana - Robusta",
    price: 49,
    originalPrice: 65,
    image:
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=300&h=300&fit=crop",
    rating: 4.3,
    reviews: 2847,
    brand: "Fresho",
    availability: "In Stock",
    category: "Fruits & Vegetables",
    weight: "1 kg",
  },
  {
    id: 2,
    name: "Apple - Shimla",
    price: 189,
    originalPrice: 240,
    image:
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop",
    rating: 4.2,
    reviews: 2134,
    brand: "Fresho",
    availability: "In Stock",
    category: "Fruits & Vegetables",
    weight: "1 kg",
  },
];

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground">Compare Products</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Compare Products
          </h1>
          <p className="text-gray-400">
            Compare features and prices of your selected products
          </p>
        </div>

        {compareProducts.length === 0 ? (
          <div className="bg-card rounded-lg shadow-sm p-12 text-center border border-border">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <IconShoppingCart size={48} className="text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              No Products to Compare
            </h2>
            <p className="text-muted-foreground mb-8">
              You haven&apos;t added any products to compare yet.
            </p>
            <Link
              href="/product"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-md hover:bg-primary/90 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-card rounded-lg shadow-sm overflow-hidden border border-border">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left p-6 font-semibold text-foreground w-48 border-border">
                      Product
                    </TableHead>
                    {compareProducts.map((product) => (
                      <TableHead
                        key={product.id}
                        className="p-6 w-80 border-border"
                      >
                        <div className="relative">
                          <button className="absolute top-0 right-0 p-1 text-muted-foreground hover:text-red-500">
                            <IconX size={20} />
                          </button>
                          <div className="text-center">
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={200}
                              height={200}
                              className="mx-auto mb-4 rounded-lg"
                            />
                            <h3 className="font-semibold text-foreground mb-2">
                              {product.name}
                            </h3>
                            <div className="flex items-center justify-center gap-2 mb-4">
                              <span className="text-2xl font-bold text-primary">
                                ₹{product.price}
                              </span>
                              {product.originalPrice && (
                                <span className="text-lg text-muted-foreground line-through">
                                  ₹{product.originalPrice}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="p-6 font-medium text-foreground border-border">
                      Rating
                    </TableCell>
                    {compareProducts.map((product) => (
                      <TableCell
                        key={product.id}
                        className="p-6 text-center border-border"
                      >
                        <div className="flex items-center justify-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <IconStar
                              key={i}
                              size={16}
                              className={
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-muted-foreground"
                              }
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({product.reviews} reviews)
                        </span>
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="p-6 font-medium text-foreground border-border">
                      Brand
                    </TableCell>
                    {compareProducts.map((product) => (
                      <TableCell
                        key={product.id}
                        className="p-6 text-center text-muted-foreground border-border"
                      >
                        {product.brand}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="p-6 font-medium text-foreground border-border">
                      Availability
                    </TableCell>
                    {compareProducts.map((product) => (
                      <TableCell
                        key={product.id}
                        className="p-6 text-center border-border"
                      >
                        <span className="text-green-600 font-medium">
                          {product.availability}
                        </span>
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="p-6 font-medium text-foreground border-border">
                      Category
                    </TableCell>
                    {compareProducts.map((product) => (
                      <TableCell
                        key={product.id}
                        className="p-6 text-center text-muted-foreground border-border"
                      >
                        {product.category}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="p-6 font-medium text-foreground border-border">
                      Weight
                    </TableCell>
                    {compareProducts.map((product) => (
                      <TableCell
                        key={product.id}
                        className="p-6 text-center text-muted-foreground border-border"
                      >
                        {product.weight}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="p-6 font-medium text-foreground border-border">
                      Actions
                    </TableCell>
                    {compareProducts.map((product) => (
                      <TableCell key={product.id} className="p-6 border-border">
                        <div className="flex gap-3">
                          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 flex-1">
                            <IconShoppingCart size={16} />
                            Add
                          </button>
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </main>

      <Footer01 />
      <Footer02 />
    </div>
  );
}
