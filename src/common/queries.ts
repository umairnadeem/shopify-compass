import { gql } from "apollo-boost";

export const GET_ORDERS = gql`
  query {
    orders(first:250) {
      edges {
        cursor
        node {
          id
          name
          createdAt
          customer {
            displayName
          }
          displayFulfillmentStatus
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;