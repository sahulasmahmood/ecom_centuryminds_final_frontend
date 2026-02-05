"use client";

import React from "react";
import { CartItem } from "./pos-interface";
import { Button } from "@/components/ui/button";
import {
  TrashIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

interface Props {
  cartItems: CartItem[];
  totals: { subtotal: number; tax: number; total: number };
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onCheckout: () => void;
}

export const CartPanel: React.FC<Props> = ({
  cartItems,
  totals,
  onUpdateQuantity,
  onRemove,
  onClear,
  onCheckout,
}) => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between bg-white">
        <h2 className="font-bold flex items-center gap-2">
          <ShoppingCartIcon className="h-5 w-5" /> Current Order
        </h2>
        {cartItems.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            Clear
          </Button>
        )}
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/30">
        {cartItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-2">
            <ShoppingCartIcon className="h-12 w-12 opacity-20" />
            <p>Cart is Empty</p>
          </div>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-3 rounded-lg border shadow-sm flex flex-col gap-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    ₹{item.price} x {item.quantity}
                  </p>
                </div>
                <p className="font-bold text-gray-900">
                  ₹{item.price * item.quantity}
                </p>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="h-6 w-6 rounded border flex items-center justify-center hover:bg-gray-100"
                  >
                    <MinusIcon className="h-3 w-3" />
                  </button>
                  <span className="text-sm font-medium w-4 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="h-6 w-6 rounded border flex items-center justify-center hover:bg-gray-100"
                  >
                    <PlusIcon className="h-3 w-3" />
                  </button>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer / Calculation */}
      <div className="bg-white border-t p-4 space-y-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="space-y-1 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>₹{totals.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>GST (Incl. Approx)</span>
            <span>₹{totals.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t">
            <span>Total</span>
            <span>₹{totals.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <Button variant="outline" className="w-full">
            Hold
          </Button>
          <Button
            onClick={onCheckout}
            disabled={cartItems.length === 0}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};
