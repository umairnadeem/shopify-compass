import { DocumentNode, gql } from "apollo-boost";
import esc from "js-string-escape";

export const getOrders = (query: string): DocumentNode => gql`
  query {
    orders(first: 50, reverse: true, query: ${
      query ? `"${esc(query)}"` : null
    }) {
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
