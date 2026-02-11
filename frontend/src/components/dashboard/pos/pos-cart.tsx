"use client";

import { usePOSStore } from "@/store/use-pos-store";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  TrashIcon,
  MinusIcon,
  PlusIcon,
  PauseIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
// We'll create these modals next
import { POSHoldOrderModal } from "./pos-hold-order-modal";
import { CreateHoldOrderModal } from "./create-hold-order-modal";
import { POSPaymentModal } from "./pos-payment-modal";

export function POSCart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = usePOSStore();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isHoldOpen, setIsHoldOpen] = useState(false);
  const [isCreateHoldOpen, setIsCreateHoldOpen] = useState(false);

  // Calculations
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.18; // Assuming 18% GST
  const beforeRounding = subtotal + tax;
  const total = Math.round(beforeRounding); // Round to nearest whole number
  const roundingOff = total - beforeRounding;

  return (
    <div className="w-96 bg-white border-l flex flex-col h-full shadow-xl z-20">
      {/* Header */}
      <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
        <h2 className="font-semibold text-lg">Current Order</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearCart}
          disabled={cart.length === 0}
          className="text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          Clear All
        </Button>
      </div>

      {/* Cart Items */}
      <ScrollArea className="flex-1 p-4">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400 space-y-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-2xl">🛒</span>
            </div>
            <p>Cart is empty</p>
            <p className="text-xs text-center px-8">
              Select products from the grid to add them to the order.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-3 group">
                {/* Item Image */}
                <div className="h-16 w-16 bg-gray-100 rounded-lg shrink-0 overflow-hidden flex items-center justify-center">
                  <span className="text-xl">🎆</span>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-sm line-clamp-1">
                      {item.name}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1 hover:bg-gray-100 border-r"
                      >
                        <MinusIcon className="h-3 w-3" />
                      </button>
                      <span className="px-2 text-xs font-mono w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 hover:bg-gray-100 border-l"
                      >
                        <PlusIcon className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="font-bold text-sm">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Footer / Totals */}
      <div className="p-4 bg-gray-50 border-t space-y-4">
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (18% GST)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          {roundingOff !== 0 && (
            <div className="flex justify-between text-xs">
              <span>Rounding</span>
              <span>
                {roundingOff > 0 ? "+" : ""}₹{roundingOff.toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t font-bold text-lg text-gray-900">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="w-full border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300"
            disabled={cart.length === 0}
            onClick={() => setIsCreateHoldOpen(true)}
          >
            <PauseIcon className="h-4 w-4 mr-2" />
            Hold
          </Button>
          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-200"
            disabled={cart.length === 0}
            onClick={() => setIsPaymentOpen(true)}
          >
            <CreditCardIcon className="h-4 w-4 mr-2" />
            Pay
          </Button>
        </div>
      </div>

      {/* Modals */}
      <POSPaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        subtotal={subtotal}
        total={total}
        roundingOff={roundingOff}
      />

      <CreateHoldOrderModal
        isOpen={isCreateHoldOpen}
        onClose={() => setIsCreateHoldOpen(false)}
      />

      <POSHoldOrderModal
        isOpen={isHoldOpen}
        onClose={() => setIsHoldOpen(false)}
      />
    </div>
  );
}
