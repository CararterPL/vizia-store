'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  vin: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string, vin: string) => void;
  totalPrice: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Inicjalizacja: Pobierz z localStorage przy starcie
  useEffect(() => {
    const savedCart = localStorage.getItem('vizia_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Błąd ładowania koszyka z pamięci:", e);
      }
    }
  }, []);

  // Synchronizacja: Zapisuj do localStorage przy każdej zmianie
  useEffect(() => {
    localStorage.setItem('vizia_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === newItem.id && item.size === newItem.size && item.vin === newItem.vin
      );
      if (existingItem) return prevItems; // Unikalne VINy - nie dodajemy drugiego takiego samego
      return [...prevItems, newItem];
    });
  };

  const removeItem = (id: string, size: string, vin: string) => {
    setItems((prevItems) => 
      prevItems.filter((item) => !(item.id === id && item.size === size && item.vin === vin))
    );
  };

  const clearCart = () => setItems([]);

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, totalPrice, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};