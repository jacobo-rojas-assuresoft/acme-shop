import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query getProducts($search: String, $limit: Int!, $offset: Int) {
    getProducts(search: $search, limit: $limit, offset: $offset) {
      id
      name
      price
      description
      image
      stock
    }
  }
`;

export const GET_ORDER_DETAILS = gql`
  query GetOrderDetails($id: ID!) {
    order(id: $id) {
      id
      total
      status
      createdAt
      items {
        product {
          id
          name
          price
          image
        }
        quantity
      }
      customer {
        name
        email
        address
      }
    }
  }
`;
