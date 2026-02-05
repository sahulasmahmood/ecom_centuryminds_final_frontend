"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

// Mock data for cracker categories
const mockCategories = [
  {
    id: "1",
    name: "Ground Crackers",
    description:
      "Flower pots, ground spinners, and other ground-based fireworks",
    productCount: 25,
    status: "active",
    image: "/assets/images/flower_pots.png",
  },
  {
    id: "2",
    name: "Aerial Crackers",
    description: "Rockets, aerial shots, and sky-bound fireworks",
    productCount: 18,
    status: "active",
    image: "/assets/images/1.5 twin star.jpg",
  },
  {
    id: "3",
    name: "Sparklers",
    description: "Hand sparklers, electric sparklers, and sparkler varieties",
    productCount: 12,
    status: "active",
    image: "/assets/images/sparklers_box.png",
  },
  {
    id: "4",
    name: "Sound Crackers",
    description: "Atom bombs, crackling sounds, and noise-making fireworks",
    productCount: 15,
    status: "active",
    image: "/assets/images/Crackling-Soda-Crackers.jpg",
  },
  {
    id: "5",
    name: "Fancy Crackers",
    description: "Multi-color effects, special patterns, and premium fireworks",
    productCount: 8,
    status: "active",
    image: "/assets/images/98-600x600.jpg",
  },
  {
    id: "6",
    name: "Gift Boxes",
    description: "Assorted crackers in attractive gift packaging",
    productCount: 5,
    status: "inactive",
    image: "/assets/images/MumbaiBeauty_SivakasiQueen-crackers83.jpg",
  },
];

export default function CategoriesPage() {
  const [categories] = useState(mockCategories);
  const router = useRouter();

  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return <Badge className="bg-green-100 text-green-800">Active</Badge>;
    } else {
      return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
    }
  };

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen p-6 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Manage your cracker categories and organization
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <PlusIcon className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Category Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {categories.filter((c) => c.status === "active").length}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {categories.reduce((sum, c) => sum + c.productCount, 0)}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Products/Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                categories.reduce((sum, c) => sum + c.productCount, 0) /
                  categories.length,
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle>Category List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
                        <span className="text-xs font-medium">IMG</span>
                      </div>
                      <div>
                        <div className="font-medium">{category.name}</div>
                        <div className="text-sm text-gray-500">
                          ID: {category.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {category.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {category.productCount} products
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(category.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
