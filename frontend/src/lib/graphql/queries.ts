import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query getProducts($search: String, $limit: Int!, $offset: Int) {
    getProducts(search: $search, limit: $limit, offset: $offset) {
      id
      name
      price
      description
      image
    }
  }
`;
