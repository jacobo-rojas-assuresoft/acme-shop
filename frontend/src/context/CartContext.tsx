import { Product } from '@/types';
import { createContext, ReactNode, useContext, useReducer } from 'react';

type CartItem = Product & { quantity: number };

type CartState = {
  items: CartItem[];
  total: number;
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  cart: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      return {
        items: existingItem
          ? state.items.map((item) =>
              item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          : [...state.items, { ...action.payload, quantity: 1 }],
        total: state.total + action.payload.price,
      };
    case 'REMOVE_ITEM':
      const itemToRemove = state.items.find((item) => item.id === action.payload);
      return {
        items: state.items.filter((item) => item.id !== action.payload),
        total: state.total - (itemToRemove ? itemToRemove.price * itemToRemove.quantity : 0),
      };
    case 'UPDATE_QUANTITY':
      return {
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
        total: state.items.reduce(
          (sum, item) =>
            sum +
            (item.id === action.payload.id
              ? action.payload.quantity * item.price
              : item.quantity * item.price),
          0
        ),
      };
    case 'CLEAR_CART':
      return { items: [], total: 0 };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  const addToCart = (product: Product) => dispatch({ type: 'ADD_ITEM', payload: product });
  const removeFromCart = (id: number) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const updateQuantity = (id: number, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
