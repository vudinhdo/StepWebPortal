import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { ServerEquipment } from '@shared/schema';

export interface CartItem {
  equipment: ServerEquipment;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (equipment: ServerEquipment, quantity?: number) => void;
  removeFromCart: (equipmentId: number) => void;
  updateQuantity: (equipmentId: number, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'step_equipment_cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (equipment: ServerEquipment, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.equipment.id === equipment.id);
      if (existing) {
        return prev.map(item =>
          item.equipment.id === equipment.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { equipment, quantity }];
    });
  };

  const removeFromCart = (equipmentId: number) => {
    setItems(prev => prev.filter(item => item.equipment.id !== equipmentId));
  };

  const updateQuantity = (equipmentId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(equipmentId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.equipment.id === equipmentId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemCount = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotal = () => {
    return items.reduce((sum, item) => {
      const price = item.equipment.priceDealer || item.equipment.priceEndUser || 0;
      return sum + price * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getItemCount,
      getTotal
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
