"use client";

import { usePOSStore } from "@/store/use-pos-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Trash2, RotateCcw, Clock, ShoppingCart } from "lucide-react";
import { format } from "date-fns";

interface HeldOrdersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HeldOrdersDialog({
  open,
  onOpenChange,
}: HeldOrdersDialogProps) {
  const { heldOrders, resumeOrder, deleteHeldOrder } = usePOSStore();

  const handleResumeOrder = (orderId: string) => {
    resumeOrder(orderId);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Held Orders ({heldOrders.length})
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[500px] pr-4">
          {heldOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Clock className="h-16 w-16 mb-4" />
              <p className="text-lg font-medium">No held orders</p>
              <p className="text-sm">Orders on hold will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {heldOrders.map((order) => {
                const total = order.items.reduce((sum, item) => {
                  const itemSubtotal = item.price * item.quantity;
                  const itemDiscount = item.discount
                    ? (itemSubtotal * item.discount) / 100
                    : 0;
                  return sum + (itemSubtotal - itemDiscount);
                }, 0);

                const orderDiscountAmount =
                  order.orderDiscountType === "percentage"
                    ? (total * (order.orderDiscount || 0)) / 100
                    : order.orderDiscount || 0;

                const finalTotal = total - orderDiscountAmount;

                return (
                  <Card key={order.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{order.customerName}</h3>
                        <p className="text-sm text-gray-500">
                          {format(new Date(order.timestamp), "MMM dd, yyyy HH:mm")}
                        </p>
                        {order.note && (
                          <p className="text-sm text-gray-600 mt-1">
                            Note: {order.note}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">
                          ₹{finalTotal.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.items.length} item(s)
                        </p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-2 mb-3">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between text-sm bg-gray-50 rounded p-2"
                        >
                          <div className="flex items-center gap-2">
                            <ShoppingCart className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-gray-600">
                              ×{item.quantity}
                            </span>
                            <span className="font-medium">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleResumeOrder(order.id)}
                        className="flex-1"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Resume
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => deleteHeldOrder(order.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
