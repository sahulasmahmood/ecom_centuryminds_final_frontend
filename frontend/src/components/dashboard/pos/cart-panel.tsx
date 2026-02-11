"use client";

import { usePOSStore } from "@/store/use-pos-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, ShoppingCart, Clock } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface CartPanelProps {
  onCheckout: () => void;
}

export function CartPanel({ onCheckout }: CartPanelProps) {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    updateItemDiscount,
    clearCart,
    orderDiscount,
    orderDiscountType,
    setOrderDiscount,
    holdOrder,
  } = usePOSStore();

  const [holdDialogOpen, setHoldDialogOpen] = useState(false);
  const [holdCustomerName, setHoldCustomerName] = useState("");
  const [holdNote, setHoldNote] = useState("");

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => {
    const itemSubtotal = item.price * item.quantity;
    const itemDiscount = item.discount ? (itemSubtotal * item.discount) / 100 : 0;
    return sum + (itemSubtotal - itemDiscount);
  }, 0);

  const orderDiscountAmount =
    orderDiscountType === "percentage"
      ? (subtotal * orderDiscount) / 100
      : orderDiscount;

  const subtotalAfterDiscount = subtotal - orderDiscountAmount;

  const tax = cart.reduce((sum, item) => {
    const itemSubtotal = item.price * item.quantity;
    const itemDiscount = item.discount ? (itemSubtotal * item.discount) / 100 : 0;
    const itemTotal = itemSubtotal - itemDiscount;
    const gstRate = item.gstPercentage || 18;
    const priceBeforeGst = itemTotal / (1 + gstRate / 100);
    const gstAmount = itemTotal - priceBeforeGst;
    return sum + gstAmount;
  }, 0);

  const total = subtotalAfterDiscount;

  const handleHoldOrder = () => {
    if (cart.length === 0) return;
    holdOrder(holdCustomerName || "Walk-in Customer", holdNote);
    setHoldDialogOpen(false);
    setHoldCustomerName("");
    setHoldNote("");
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Cart ({cart.length})
          </h2>
          {cart.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Cart Items */}
      <ScrollArea className="flex-1">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
            <ShoppingCart className="h-16 w-16 mb-4" />
            <p className="text-center">Cart is empty</p>
            <p className="text-sm text-center">Add products to get started</p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {cart.map((item) => {
              const itemSubtotal = item.price * item.quantity;
              const itemDiscountAmount = item.discount
                ? (itemSubtotal * item.discount) / 100
                : 0;
              const itemTotal = itemSubtotal - itemDiscountAmount;

              return (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-lg p-3 space-y-2"
                >
                  <div className="flex gap-3">
                    <div className="w-16 h-16 bg-white rounded flex-shrink-0 overflow-hidden relative">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <ShoppingCart className="h-6 w-6 text-gray-300" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        ₹{item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-12 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">₹{itemTotal.toFixed(2)}</p>
                      {item.discount && item.discount > 0 && (
                        <p className="text-xs text-green-600">
                          {item.discount}% off
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Item Discount */}
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Discount %"
                      value={item.discount || ""}
                      onChange={(e) =>
                        updateItemDiscount(
                          item.id,
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="h-8 text-sm"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </ScrollArea>

      {/* Summary */}
      {cart.length > 0 && (
        <div className="border-t p-4 space-y-3">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹{subtotal.toFixed(2)}</span>
            </div>

            {/* Order Discount */}
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Order discount"
                value={orderDiscount || ""}
                onChange={(e) =>
                  setOrderDiscount(
                    parseFloat(e.target.value) || 0,
                    orderDiscountType
                  )
                }
                className="h-8 text-sm flex-1"
                min="0"
              />
              <Button
                variant={orderDiscountType === "percentage" ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  setOrderDiscount(orderDiscount, "percentage")
                }
                className="h-8 px-3"
              >
                %
              </Button>
              <Button
                variant={orderDiscountType === "flat" ? "default" : "outline"}
                size="sm"
                onClick={() => setOrderDiscount(orderDiscount, "flat")}
                className="h-8 px-3"
              >
                ₹
              </Button>
            </div>

            {orderDiscountAmount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Order Discount</span>
                <span>-₹{orderDiscountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-gray-600">Tax (GST)</span>
              <span className="font-medium">₹{tax.toFixed(2)}</span>
            </div>

            <Separator />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-green-600">₹{total.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Button
              onClick={onCheckout}
              className="w-full"
              size="lg"
              disabled={cart.length === 0}
            >
              Checkout
            </Button>
            <Button
              onClick={() => setHoldDialogOpen(true)}
              variant="outline"
              className="w-full"
              disabled={cart.length === 0}
            >
              <Clock className="h-4 w-4 mr-2" />
              Hold Order
            </Button>
          </div>
        </div>
      )}

      {/* Hold Order Dialog */}
      <Dialog open={holdDialogOpen} onOpenChange={setHoldDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hold Order</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Customer Name (Optional)</Label>
              <Input
                value={holdCustomerName}
                onChange={(e) => setHoldCustomerName(e.target.value)}
                placeholder="Enter customer name"
              />
            </div>
            <div>
              <Label>Note (Optional)</Label>
              <Input
                value={holdNote}
                onChange={(e) => setHoldNote(e.target.value)}
                placeholder="Add a note"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setHoldDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleHoldOrder}>Hold Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
