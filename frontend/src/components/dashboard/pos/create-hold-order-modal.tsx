"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { usePOSStore } from "@/store/use-pos-store";
import { toast } from "sonner";

interface CreateHoldOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateHoldOrderModal({
  isOpen,
  onClose,
}: CreateHoldOrderModalProps) {
  const { holdOrder, cart } = usePOSStore();
  const [customerName, setCustomerName] = useState("");
  const [note, setNote] = useState("");

  const handleHold = () => {
    if (!customerName.trim()) {
      toast.error("Please enter a customer name");
      return;
    }

    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    holdOrder(customerName, note || undefined);
    toast.success(`Order held for ${customerName}`);

    // Reset and close
    setCustomerName("");
    setNote("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Hold Current Order</DialogTitle>
          <DialogDescription>
            Save this order to resume later. The cart will be cleared.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="customerName">Customer Name *</Label>
            <Input
              id="customerName"
              placeholder="Enter customer name..."
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              autoFocus
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="note">Note (Optional)</Label>
            <Textarea
              id="note"
              placeholder="Add any notes about this order..."
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="bg-gray-50 p-3 rounded-lg border">
            <p className="text-sm text-gray-600">
              <span className="font-medium">{cart.length}</span> item(s) in cart
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleHold}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Hold Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
