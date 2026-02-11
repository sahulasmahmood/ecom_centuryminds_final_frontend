"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePOSStore } from "@/store/use-pos-store";
import {
  PlayIcon,
  TrashIcon,
  ClockIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

interface POSHoldOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function POSHoldOrderModal({ isOpen, onClose }: POSHoldOrderModalProps) {
  const { heldOrders, resumeOrder, deleteHeldOrder, cart } = usePOSStore();
  const [resumeOrderId, setResumeOrderId] = useState<string | null>(null);
  const [deleteOrderId, setDeleteOrderId] = useState<string | null>(null);

  const handleResumeConfirm = () => {
    if (resumeOrderId) {
      resumeOrder(resumeOrderId);
      toast.success("Order resumed successfully");
      setResumeOrderId(null);
      onClose();
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteOrderId) {
      deleteHeldOrder(deleteOrderId);
      toast.success("Held order deleted");
      setDeleteOrderId(null);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Held Orders</DialogTitle>
            <DialogDescription>
              {heldOrders.length > 0
                ? `You have ${heldOrders.length} order${heldOrders.length > 1 ? "s" : ""} on hold`
                : "No orders are currently on hold"}
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="h-[450px] pr-4">
            {heldOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
                <ClockIcon className="h-20 w-20 mb-4 opacity-20" />
                <p className="text-lg font-medium">No held orders</p>
                <p className="text-sm mt-2">Held orders will appear here</p>
              </div>
            ) : (
              <div className="space-y-3">
                {heldOrders.map((order) => {
                  const orderTotal = order.items.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0,
                  );

                  return (
                    <div
                      key={order.id}
                      className="bg-white border-2 rounded-lg p-4 hover:border-orange-300 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        {/* Left Side - Order Details */}
                        <div className="flex-1 space-y-3">
                          {/* Customer Info */}
                          <div className="flex items-center gap-2">
                            <UserIcon className="h-5 w-5 text-gray-400" />
                            <span className="font-bold text-lg text-gray-900">
                              {order.customerName}
                            </span>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1">
                              <ClockIcon className="h-3 w-3" />
                              {formatDistanceToNow(order.timestamp, {
                                addSuffix: true,
                              })}
                            </span>
                          </div>

                          {/* Items Summary */}
                          <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Items:</span>
                              <span className="font-medium">
                                {order.items.length}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 text-sm">
                                Total:
                              </span>
                              <span className="font-bold text-lg text-green-700">
                                ₹{orderTotal.toFixed(2)}
                              </span>
                            </div>
                            {order.orderDiscount && order.orderDiscount > 0 && (
                              <div className="flex justify-between text-xs">
                                <span className="text-orange-600">
                                  Discount:
                                </span>
                                <span className="text-orange-600">
                                  {order.orderDiscountType === "percentage"
                                    ? `${order.orderDiscount}%`
                                    : `₹${order.orderDiscount}`}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Customer Details if available */}
                          {order.customer && (
                            <div className="text-xs text-gray-500 space-y-1">
                              {order.customer.phone && (
                                <div>📞 {order.customer.phone}</div>
                              )}
                              {order.customer.email && (
                                <div>📧 {order.customer.email}</div>
                              )}
                            </div>
                          )}

                          {/* Note */}
                          {order.note && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
                              <p className="text-xs text-yellow-800 italic">
                                <span className="font-medium">Note:</span>{" "}
                                {order.note}
                              </p>
                            </div>
                          )}

                          {/* Items Preview */}
                          <details className="text-xs text-gray-600">
                            <summary className="cursor-pointer hover:text-gray-900 font-medium">
                              View Items ({order.items.length})
                            </summary>
                            <ul className="mt-2 space-y-1 pl-4">
                              {order.items.map((item, idx) => (
                                <li key={idx} className="flex justify-between">
                                  <span>
                                    {item.quantity}x {item.name}
                                  </span>
                                  <span className="font-medium">
                                    ₹{(item.price * item.quantity).toFixed(2)}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </details>
                        </div>

                        {/* Right Side - Action Buttons */}
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            onClick={() => setResumeOrderId(order.id)}
                            className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap"
                          >
                            <PlayIcon className="h-4 w-4 mr-2" />
                            Resume
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDeleteOrderId(order.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200 whitespace-nowrap"
                          >
                            <TrashIcon className="h-4 w-4 mr-2" />
                            Discard
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Resume Confirmation Dialog */}
      <AlertDialog
        open={!!resumeOrderId}
        onOpenChange={() => setResumeOrderId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Resume this order?</AlertDialogTitle>
            <AlertDialogDescription>
              {cart.length > 0 ? (
                <span className="text-orange-600 font-medium">
                  Warning: Your current cart has {cart.length} item(s). Resuming
                  this order will replace your current cart.
                </span>
              ) : (
                "This order will be loaded into your cart."
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleResumeConfirm}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Resume Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteOrderId}
        onOpenChange={() => setDeleteOrderId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this held order?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The order will be permanently
              removed from held orders.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
