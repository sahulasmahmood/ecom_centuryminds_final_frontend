"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { usePOSStore } from "@/store/use-pos-store";
import { posOrderService } from "@/services/posOrderService";
import { createPOSOrder } from "@/services/posService";
import { toast } from "sonner";
import {
  BanknotesIcon,
  CreditCardIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";

interface POSPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  subtotal: number;
  total: number;
  roundingOff: number;
  onSuccess?: (invoiceNumber: string) => void;
}

type PaymentMethod = "Cash" | "Card" | "UPI";

export function POSPaymentModal({
  isOpen,
  onClose,
  subtotal,
  total,
  roundingOff,
  onSuccess,
}: POSPaymentModalProps) {
  const [method, setMethod] = useState<PaymentMethod>("Cash");
  const [amountReceived, setAmountReceived] = useState<string>("");
  const {
    clearCart,
    cart,
    addOfflineOrder,
    selectedCustomer,
    orderDiscount,
    orderDiscountType,
  } = usePOSStore();
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculations
  const received = parseFloat(amountReceived) || 0;
  const change = received - total;
  const isValid = method === "Cash" ? received >= total : true;

  const handleProcessPayment = async () => {
    if (!isValid) {
      toast.error("Invalid payment amount");
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare offline data (Store expects CartItem[])
      const offlineOrderData = {
        customer: selectedCustomer || undefined,
        items: cart,
        subtotal,
        tax: 0,
        taxRate: 0,
        discount: orderDiscount,
        roundingOff,
        total,
        paymentMethod: method,
        amountReceived: method === "Cash" ? received : total,
        changeGiven: method === "Cash" ? change : 0,
      };

      // Prepare API data (Service expects mapped items)
      const apiOrderData = {
        ...offlineOrderData,
        items: cart.map((item) => ({
          productId: item.id,
          productName: item.name,
          productSku: item.sku,
          unitPrice: item.price,
          quantity: item.quantity,
          discount: item.discount || 0,
          gstPercentage: item.gstPercentage || 0,
        })),
      };

      // Check if online
      if (!navigator.onLine) {
        // Save to offline queue
        addOfflineOrder(offlineOrderData);

        toast.success("Order saved offline", {
          description: "Will sync when connection is restored",
        });

        clearCart();
        setIsProcessing(false);
        onClose();
        return;
      }

      // Process online
      const order = await createPOSOrder(apiOrderData); // Changed service call

      toast.success("Payment successful!", {
        description: `Invoice: ${order.invoiceNumber || order.orderNumber}`,
      });

      if (onSuccess && order.invoiceNumber) {
        onSuccess(order.invoiceNumber);
      }

      clearCart();
      onClose();
    } catch (error) {
      console.error("Payment error:", error);

      // If API fails, save to offline queue
      const offlineOrderData = {
        customer: selectedCustomer || undefined,
        items: cart,
        subtotal,
        tax: 0,
        taxRate: 0,
        discount: orderDiscount,
        roundingOff,
        total,
        paymentMethod: method,
        amountReceived: method === "Cash" ? received : total,
        changeGiven: method === "Cash" ? change : 0,
      };

      addOfflineOrder(offlineOrderData);

      toast.warning("Saved to offline queue", {
        description: "Order will sync when connection is restored",
      });

      clearCart();
      onClose();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Total Display */}
          <div className="bg-gray-50 p-4 rounded-lg text-center border">
            <p className="text-sm text-gray-500 mb-1">Total Amount Payable</p>
            <p className="text-3xl font-bold text-gray-900">
              ₹{total.toFixed(2)}
            </p>
            {roundingOff !== 0 && (
              <p className="text-xs text-gray-400 mt-1">
                (Rounding: {roundingOff > 0 ? "+" : ""}₹{roundingOff.toFixed(2)}
                )
              </p>
            )}
          </div>

          {/* Payment Methods */}
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant={method === "Cash" ? "default" : "outline"}
              className={`flex flex-col h-20 gap-2 ${method === "Cash" ? "bg-green-600 hover:bg-green-700" : ""}`}
              onClick={() => setMethod("Cash")}
            >
              <BanknotesIcon className="h-6 w-6" />
              Cash
            </Button>
            <Button
              variant={method === "Card" ? "default" : "outline"}
              className="flex flex-col h-20 gap-2"
              onClick={() => setMethod("Card")}
            >
              <CreditCardIcon className="h-6 w-6" />
              Card
            </Button>
            <Button
              variant={method === "UPI" ? "default" : "outline"}
              className="flex flex-col h-20 gap-2"
              onClick={() => setMethod("UPI")}
            >
              <QrCodeIcon className="h-6 w-6" />
              UPI
            </Button>
          </div>

          {/* Input Fields based on Method */}
          {method === "Cash" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="grid gap-2">
                <Label htmlFor="received">Amount Received</Label>
                <Input
                  id="received"
                  type="number"
                  placeholder="Enter amount..."
                  value={amountReceived}
                  onChange={(e) => setAmountReceived(e.target.value)}
                  className="text-lg"
                  autoFocus
                />
              </div>

              <div
                className={`p-4 rounded-lg flex justify-between items-center ${change >= 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
              >
                <span className="font-medium">Change to Return:</span>
                <span className="text-xl font-bold">
                  ₹{change >= 0 ? change.toFixed(2) : "0.00"}
                </span>
              </div>
            </div>
          )}

          {method === "UPI" && (
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg animate-in fade-in zoom-in duration-300">
              <div className="w-48 h-48 bg-white p-2 rounded shadow-sm flex items-center justify-center">
                <QrCodeIcon className="h-32 w-32 text-gray-800" />
                {/* Real QR Code would go here */}
              </div>
              <p className="mt-4 text-sm text-gray-500">Scan to Pay via UPI</p>
            </div>
          )}

          {method === "Card" && (
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
              <CreditCardIcon className="h-24 w-24 text-gray-400 mb-4" />
              <p className="text-sm text-gray-500">Swipe or insert card</p>
              <p className="text-xs text-gray-400 mt-2">
                Waiting for card reader...
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>
          <Button
            onClick={handleProcessPayment}
            disabled={!isValid || isProcessing}
            className="bg-primary min-w-[120px]"
          >
            {isProcessing ? "Processing..." : `Charge ₹${total.toFixed(2)}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
