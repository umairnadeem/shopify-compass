import { Loading, ProgressBar } from "@shopify/polaris";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../common/state/RootReducer";

interface OwnProps {
  name?: string;
  children?: React.ReactElement;
  loading?: boolean;
  progress?: number;
  skeleton?: React.ReactElement;
}

export const WithLoader: React.FC<OwnProps> = ({
  name,
  children,
  loading,
  progress,
  skeleton,
}): React.ReactElement => {
  const loaders = useSelector((state: RootState) => state.loading.loaders);
  const showLoading = loaders.includes(name) || loading;
  const showProgress =
    typeof progress !== "undefined" && progress < 100 && progress > 0;
  const showSkeleton =
    typeof skeleton !== "undefined" && (showProgress || showLoading);
  const isComplete = !(showLoading || showProgress || showSkeleton);
  return (
    <>
      {showProgress && <ProgressBar progress={progress} size="small" />}
      {showLoading && <Loading />}
      {showSkeleton && skeleton}
      {isComplete && children}
    </>
  );
};

export default WithLoader;
