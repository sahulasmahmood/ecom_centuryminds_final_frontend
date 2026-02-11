"use client";

import { useState } from "react";
import { usePOSStore } from "@/store/use-pos-store";
import { createPOSOrder } from "@/services/posService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Banknote, Smartphone, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function CheckoutDialog({
  open,
  onOpenChange,
  onSuccess,
}: CheckoutDialogProps) {
  const { cart, clearCart, orderDiscount, orderDiscountType, selectedCustomer } =
    usePOSStore();
  const { user } = useAuth();
  const { toast } = useToast();

  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | "upi">(
    "cash"
  );
  const [amountReceived, setAmountReceived] = useState<string>("");
  const [processing, setProcessing] = useState(false);

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
  const changeGiven =
    paymentMethod === "cash" && amountReceived
      ? Math.max(0, parseFloat(amountReceived) - total)
      : 0;

  const handleCheckout = async () => {
    if (paymentMethod === "cash" && (!amountReceived || parseFloat(amountReceived) < total)) {
      toast({
        title: "Invalid Amount",
        description: "Amount received must be greater than or equal to total",
        variant: "destructive",
      });
      return;
    }

    try {
      setProcessing(true);

      // Prepare order items
      const items = cart.map((item) => {
        const itemSubtotal = item.price * item.quantity;
        const itemDiscountAmount = item.discount
          ? (itemSubtotal * item.discount) / 100
          : 0;
        const itemTotal = itemSubtotal - itemDiscountAmount;
        const gstRate = item.gstPercentage || 18;

        return {
          productId: item.id,
          productName: item.name,
          productSku: item.sku,
          unitPrice: item.price,
          quantity: item.quantity,
          discount: item.discount || 0,
          gstPercentage: gstRate,
        };
      });

      const orderData = {
        customer: selectedCustomer
          ? {
              id: selectedCustomer.id,
              name: selectedCustomer.name,
              email: selectedCustomer.email,
              phone: selectedCustomer.phone,
            }
          : undefined,
        items,
        subtotal,
        tax,
        taxRate: 18, // Average GST rate
        discount: orderDiscountAmount,
        roundingOff: 0,
        total,
        paymentMethod,
        amountReceived: paymentMethod === "cash" ? parseFloat(amountReceived) : total,
        changeGiven,
        createdBy: user?.id,
      };

      const response = await createPOSOrder(orderData);

      toast({
        title: "Order Created",
        description: `Order ${response.data.orderNumber} created successfully`,
      });

      clearCart();
      onSuccess();
      onOpenChange(false);
      
      // Reset form
      setAmountReceived("");
      setPaymentMethod("cash");
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout Failed",
        description: error.response?.data?.message || "Failed to create order",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹{subtotal.toFixed(2)}</span>
            </div>
            {orderDiscountAmount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
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

          {/* Payment Method */}
          <div>
            <Label className="mb-2 block">Payment Method</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant={paymentMethod === "cash" ? "default" : "outline"}
                onClick={() => setPaymentMethod("cash")}
                className="flex flex-col h-auto py-3"
              >
                <Banknote className="h-6 w-6 mb-1" />
                <span className="text-xs">Cash</span>
              </Button>
              <Button
                type="button"
                variant={paymentMethod === "card" ? "default" : "outline"}
                onClick={() => setPaymentMethod("card")}
                className="flex flex-col h-auto py-3"
              >
                <CreditCard className="h-6 w-6 mb-1" />
                <span className="text-xs">Card</span>
              </Button>
              <Button
                type="button"
                variant={paymentMethod === "upi" ? "default" : "outline"}
                onClick={() => setPaymentMethod("upi")}
                className="flex flex-col h-auto py-3"
              >
                <Smartphone className="h-6 w-6 mb-1" />
                <span className="text-xs">UPI</span>
              </Button>
            </div>
          </div>

          {/* Cash Payment Details */}
          {paymentMethod === "cash" && (
            <div className="space-y-3">
              <div>
                <Label>Amount Received</Label>
                <Input
                  type="number"
                  value={amountReceived}
                  onChange={(e) => setAmountReceived(e.target.value)}
                  placeholder="Enter amount"
                  min={total}
                  step="0.01"
                  autoFocus
                />
              </div>
              {amountReceived && parseFloat(amountReceived) >= total && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-green-800">
                      Change to Return
                    </span>
                    <span className="text-lg font-bold text-green-600">
                      ₹{changeGiven.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={processing}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCheckout}
              className="flex-1"
              disabled={processing}
            >
              {processing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                `Pay ₹${total.toFixed(2)}`
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
