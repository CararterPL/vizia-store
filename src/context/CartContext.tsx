"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definicja produktu w koszyku z uwzględnieniem VIN
export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  vin: string; // Unikalny identyfikator egzemplarza
  image?: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string, vin: string) => void;
  updateQuantity: (id: string, size: string, vin: string, delta: number) => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Dodawanie produktu (uwzględnia unikalność kombinacji ID + Rozmiar + VIN)
  const addItem = (newItem: CartItem) => {
    setItems(prev => {
      const existingItem = prev.find(
        item => item.id === newItem.id && item.size === newItem.size && item.vin === newItem.vin
      );
      
      if (existingItem) {
        return prev.map(item => 
          item.id === newItem.id && item.size === newItem.size && item.vin === newItem.vin
          ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...newItem, quantity: newItem.quantity || 1 }];
    });
  };

  // Usuwanie konkretnej jednostki
  const removeItem = (id: string, size: string, vin: string) => {
    setItems(prev => prev.filter(
      item => !(item.id === id && item.size === size && item.vin === vin)
    ));
  };

  // Zmiana ilości (+1 / -1)
  const updateQuantity = (id: string, size: string, vin: string, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id && item.size === size && item.vin === vin) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};