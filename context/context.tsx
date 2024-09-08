import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the MenuItem type
interface MenuItem {
  id: number;
  title: string;
  price: number;
  image: string;
  
  quantity: number; // Added quantity field
}

// Define the context type
interface CartContextType {
  cart: MenuItem[];
  addItemToCart: (item: MenuItem) => void;
  removeItemFromCart: (id: number) => void;
  clearAddedItem: (id: number) => void;
  updateItemQuantity: (id: number, quantity: number) => void; // Add updateItemQuantity
  clearCart: () => void;
  totalAmount: number;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Cart Provider component
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<MenuItem[]>([]);

  // Add item to cart
  const addItemToCart = (item: MenuItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      // If item is already in the cart, update its quantity
      setCart(prevCart =>
        prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      // Add the item to the cart with a quantity of 1
      setCart(prevCart => [...prevCart, { ...item, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeItemFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearAddedItem = (id: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: 1 } : item
      )
    );
  };

  // Update item quantity
  const updateItemQuantity = (id: number, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculate total price
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0); // Multiply price by quantity

  return (
    <CartContext.Provider value={{ cart, addItemToCart, clearAddedItem, removeItemFromCart, updateItemQuantity, clearCart ,totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};
