import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
    >
      Add to cart
    </button>
  );
}
