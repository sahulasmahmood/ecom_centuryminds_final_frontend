'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, WeightVariant } from '@/MockData/ProductData';

export interface CartItem {
  product: Product;
  variant: WeightVariant;
  variantIndex: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, variantIndex: number) => void;
  removeFromCart: (productId: number, variantIndex: number) => void;
  updateQuantity: (productId: number, variantIndex: number, quantity: number) => void;
  getItemQuantity: (productId: number, variantIndex: number) => number;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  totalSavings: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('leats-cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart:', e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('leats-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, variantIndex: number) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.variantIndex === variantIndex
      );
      
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      
      return [...prev, {
        product,
        variant: product.variants[variantIndex],
        variantIndex,
        quantity: 1
      }];
    });
  };


  const removeFromCart = (productId: number, variantIndex: number) => {
    setItems(prev => prev.filter(
      item => !(item.product.id === productId && item.variantIndex === variantIndex)
    ));
  };

  const updateQuantity = (productId: number, variantIndex: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantIndex);
      return;
    }
    
    setItems(prev => prev.map(item => {
      if (item.product.id === productId && item.variantIndex === variantIndex) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const getItemQuantity = (productId: number, variantIndex: number): number => {
    const item = items.find(
      item => item.product.id === productId && item.variantIndex === variantIndex
    );
    return item?.quantity || 0;
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = items.reduce(
    (sum, item) => sum + (item.variant.price * item.quantity), 
    0
  );
  
  const totalSavings = items.reduce(
    (sum, item) => sum + ((item.variant.mrp - item.variant.price) * item.quantity), 
    0
  );

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      getItemQuantity,
      clearCart,
      totalItems,
      totalPrice,
      totalSavings
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
