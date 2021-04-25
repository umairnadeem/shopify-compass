import { gql } from "apollo-boost";

export const bulkOperationPollQuery = gql`
  query BulkOperationPollQuery($id: ID!) {
    node(id: $id) {
      ... on BulkOperation {
        id
        status
        errorCode
        createdAt
        completedAt
        objectCount
        fileSize
        url
        partialDataUrl
      }
    }
  }
`;
