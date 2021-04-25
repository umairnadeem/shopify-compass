import { gql } from "apollo-boost";

export const getOrders = gql`
  query {
    orders(first: 50, reverse: true) {
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
          fulfillmentOrders(first: 2) {
            edges {
              cursor
              node {
                assignedLocation {
                  name
                  location {
                    id
                  }
                }
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;
