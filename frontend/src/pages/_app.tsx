import Cart from '@/components/Cart';
import { CartProvider } from '@/context/CartContext';
import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import { apolloClient } from '../lib/apollo-client';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <CartProvider>
          <Component {...pageProps} />
          <Cart />
        </CartProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
