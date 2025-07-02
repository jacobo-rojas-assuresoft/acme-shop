import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/currency';
import { useState } from 'react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 bg-blue-500 text-white p-2 rounded-lg"
      >
        🛒 ({cart.items.reduce((sum, item) => sum + item.quantity, 0)})
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="absolute top-0 right-0 w-96 h-full bg-white p-4 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Cart</h2>
              <button onClick={() => setIsOpen(false)}>✕</button>
            </div>

            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={item.id} className="border-b pb-4">
                  <div className="flex justify-between">
                    <h3>{item.name}</h3>
                    <button onClick={() => removeFromCart(item.id)}>🗑️</button>
                  </div>
                  <div className="flex justify-between mt-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="w-16 border p-1"
                    />
                    <p>{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 font-bold text-lg">Total: {formatPrice(cart.total)}</div>

            <button className="mt-4 w-full bg-green-500 text-white py-2 rounded">Checkout</button>
          </div>
        </div>
      )}
    </>
  );
}
