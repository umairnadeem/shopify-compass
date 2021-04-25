import { useMutation, useQuery } from "react-apollo";
import { BulkOperationRunQuery } from "../models/BulkOperationRunQuery";
import { bulkOperationRunQuery } from "../queries/bulkOperationRunQuery";
import { useEffect } from "react";
import { BulkOperationPollQuery } from "../models/BulkOperationPollQuery";
import { bulkOperationPollQuery } from "../queries/bulkOperationPollQuery";
import { print } from "graphql/language/printer";
import { DocumentNode } from "graphql";
import { ApolloError } from "apollo-boost";

export const useBulkQuery = (
  query: DocumentNode,
  totalObjects: number
): {
  data: BulkOperationPollQuery;
  loading: boolean;
  progress: number;
  error: ApolloError;
} => {
  const [runBulkQuery, {
    loading: runLoading,
    data: runData,
    error: runError,
    called
  }] = useMutation<BulkOperationRunQuery>(bulkOperationRunQuery, {
    variables: { query: print(query) },
  });

  const id = runData?.bulkOperationRunQuery?.bulkOperation?.id;
  console.log("got id", id);
  const {
    loading: pollLoading,
    data: pollData,
    error: pollError,
    startPolling,
    stopPolling,
  } = useQuery<BulkOperationPollQuery>(bulkOperationPollQuery, {
    skip: !id,
    variables: { id },
  });
  console.log("pollData", pollData);

  const progress = pollData?.node?.status === "COMPLETED"
  ? 100 : Math.ceil( Number(Boolean(id))*30 +
    parseInt(pollData?.node?.objectCount) ?? 0 / (totalObjects ?? 1)
  );
  console.log("progress", progress); // TODO del
  console.log("runData", runData); // TODO del
  const loading = pollLoading || runLoading;

  useEffect(() => {
    if (!called) {
      runBulkQuery();
      console.log("ran bulk query")
    }
    if (id) {
      startPolling(1000);
      console.log("Start polling"); // TODO del
    }
    if (pollData?.node?.status === "COMPLETED") {
      stopPolling();
      console.log("stopped polling", pollData); // TODO del
    }
    return () => stopPolling();
  }, [startPolling, stopPolling, runBulkQuery, id, pollData, called]);

  return {
    data: pollData,
    loading,
    progress,
    error: {
      ...runError,
      ...pollError,
    },
  };
};
