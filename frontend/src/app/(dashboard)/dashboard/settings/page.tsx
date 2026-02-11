"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

export default function SettingsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    storeName: "SkySpark Fireworks Store",
    storeEmail: "admin@fireworks.com",
    storePhone: "+91 98765 43210",
    storeAddress: "123 Fireworks Street, Sivakasi, Tamil Nadu",
    gstNumber: "33AAAAA0000A1Z5",
    currency: "INR",
    taxRate: "18",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Here you would typically send the data to your backend API
      console.log("Settings data to submit:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Settings updated successfully!");
    } catch (error) {
      console.error("Error updating settings:", error);
      alert("Failed to update settings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen p-6 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your store settings and configuration
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Store Information */}
          <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="storeName">Store Name</Label>
                <Input
                  id="storeName"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleInputChange}
                  className="bg-white text-gray-900 border-gray-300"
                />
              </div>

              <div>
                <Label htmlFor="storeEmail">Store Email</Label>
                <Input
                  id="storeEmail"
                  name="storeEmail"
                  type="email"
                  value={formData.storeEmail}
                  onChange={handleInputChange}
                  className="bg-white text-gray-900 border-gray-300"
                />
              </div>

              <div>
                <Label htmlFor="storePhone">Store Phone</Label>
                <Input
                  id="storePhone"
                  name="storePhone"
                  value={formData.storePhone}
                  onChange={handleInputChange}
                  className="bg-white text-gray-900 border-gray-300"
                />
              </div>

              <div>
                <Label htmlFor="storeAddress">Store Address</Label>
                <Input
                  id="storeAddress"
                  name="storeAddress"
                  value={formData.storeAddress}
                  onChange={handleInputChange}
                  className="bg-white text-gray-900 border-gray-300"
                />
              </div>
            </CardContent>
          </Card>

          {/* Business Settings */}
          <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle>Business Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="gstNumber">GST Number</Label>
                <Input
                  id="gstNumber"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleInputChange}
                  className="bg-white text-gray-900 border-gray-300"
                />
              </div>

              <div>
                <Label htmlFor="currency">Currency</Label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      currency: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900"
                >
                  <option value="INR">Indian Rupee (₹)</option>
                  <option value="USD">US Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                </select>
              </div>

              <div>
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                <Input
                  id="taxRate"
                  name="taxRate"
                  type="number"
                  value={formData.taxRate}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  step="0.01"
                  className="bg-white text-gray-900 border-gray-300"
                />
              </div>
            </CardContent>
          </Card>

          {/* Admin Profile */}
          <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle>Admin Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={user?.name || ""}
                  disabled
                  className="bg-white text-gray-900 border-gray-300"
                />
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  value={user?.email || ""}
                  disabled
                  className="bg-white text-gray-900 border-gray-300"
                />
              </div>

              <div>
                <Label>Role</Label>
                <Input
                  value={user?.role || ""}
                  disabled
                  className="bg-white text-gray-900 border-gray-300"
                />
              </div>

              <Button type="button" variant="outline" className="w-full">
                Change Password
              </Button>
            </CardContent>
          </Card>

          {/* Safety & Compliance */}
          <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle>Safety & Compliance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Fireworks License</Label>
                <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm text-green-800">✓ Valid License</p>
                  <p className="text-xs text-green-600">
                    Expires: Dec 31, 2024
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Safety Compliance</Label>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-800">
                    All products meet safety standards
                  </p>
                  <p className="text-xs text-blue-600">
                    Last updated: Jan 15, 2024
                  </p>
                </div>
              </div>

              <Button type="button" variant="outline" className="w-full">
                Upload License Documents
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" disabled={loading} className="min-w-[120px]">
            {loading ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}
