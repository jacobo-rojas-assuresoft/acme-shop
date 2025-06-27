import { Product } from '@/types';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { GET_PRODUCTS } from '../lib/graphql/queries';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const limit = 6;

  useEffect(() => {
    if (searchTerm !== '') {
      setPage(1);
    }
  }, [searchTerm]);

  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: {
      search: searchTerm,
      limit: 6,
      offset: (page - 1) * 6,
    },
    fetchPolicy: 'network-only',
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <SearchBar onSearch={setSearchTerm} />

      {loading && (
        <div className="text-center py-4">
          <p>Cargando...</p>
        </div>
      )}
      {error && <div className="text-red-500 py-4">Error: {error.message}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.getProducts.map((product: Product) => (
          <ProductCard key={`${product.id}-${searchTerm}-${page}`} product={product} />
        ))}
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={data?.getProducts.length < limit}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
