import { Product } from '../types';
import { formatPrice } from '../utils/currency';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <img
        src={product.image || '/placeholder-product.jpg'}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg">{product.name}</h3>
        <p className="text-gray-600">{product.description || '. '}</p>
        <p className="text-blue-600 font-semibold mt-2">${formatPrice(product.price)}</p>
        <button
          className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={() => alert(`Producto ${product.name} añadido (simulado)`)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
