import { useMutation, useQuery } from "react-apollo";
import { BulkOperationRunQuery } from "../models/BulkOperationRunQuery";
import { bulkOperationRunQuery } from "../queries/bulkOperationRunQuery";
import { useEffect, useState } from "react";
import { BulkOperationPollQuery } from "../models/BulkOperationPollQuery";
import { bulkOperationPollQuery } from "../queries/bulkOperationPollQuery";
import { print } from "graphql/language/printer";
import { DocumentNode } from "graphql";
import { ApolloError } from "apollo-boost";
import { jsonlToJson } from "../util/jsonlUtils";

export const useBulkQuery = <T>(
  query: DocumentNode,
  controller: AbortController,
  totalObjects: number
): {
  data: T;
  loading: boolean;
  progress: number;
  error: ApolloError;
} => {
  const [
    runBulkQuery,
    { loading: runLoading, data: runData, error: runError },
  ] = useMutation<BulkOperationRunQuery>(bulkOperationRunQuery, {
    variables: { query: print(query) },
    context: { fetchOptions: { signal: controller?.signal } },
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
    context: { fetchOptions: { signal: controller?.signal } },
  });
  const [jsonData, setJsonData] = useState(undefined);
  const [jsonLoading, setJsonLoading] = useState(true);
  const extractJson = async (data) => {
    const extractedData = await jsonlToJson(data?.node?.url);
    setJsonData(extractedData);
    setJsonLoading(false);
    console.log("got poll data", extractedData);
  };
  const progress =
    pollData?.node?.status === "COMPLETED" && !jsonLoading
      ? 100
      : Math.ceil(
          Number(Boolean(id)) * 30 + parseInt(pollData?.node?.objectCount) ??
            0 / (totalObjects ?? 1)
        );
  const loading = pollLoading || runLoading || jsonLoading;

  useEffect(() => {
    stopPolling();
    setJsonData(undefined);
    setJsonLoading(true); // TODO create new loader
    console.log("running query", print(query));
    runBulkQuery();
  }, [query, runBulkQuery, stopPolling]);

  useEffect(() => {
    if (id) {
      startPolling(1000);
      console.log("started polling", id, pollLoading, runLoading, jsonLoading);
    }
    if (pollData?.node?.status === "COMPLETED") {
      stopPolling();
      extractJson(pollData);
    }
    return () => stopPolling();
  }, [
    startPolling,
    stopPolling,
    runBulkQuery,
    id,
    pollData,
    pollLoading,
    runLoading,
    jsonLoading,
  ]);
  return {
    data: jsonData,
    loading,
    progress,
    error: {
      ...runError,
      ...pollError,
    },
  };
};
