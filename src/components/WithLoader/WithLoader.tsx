import { Loading } from "@shopify/polaris";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../common/state/RootReducer";

interface OwnProps {
  name?: string;
  children?: React.ReactElement;
  loading?: boolean;
}

export const WithLoader: React.FC<OwnProps> = ({ name, children, loading }): React.ReactElement => {
  const loaders = useSelector((state: RootState) => state.loading.loaders);
  return (
    loaders.includes(name) || loading
      ? <Loading />
      : children
  );
};

export default WithLoader;