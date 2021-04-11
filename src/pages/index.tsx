import { Page } from "@shopify/polaris";
import React, { ReactElement } from "react";
import NavigationProvider from "./components/NavigationProvider/NavigationProvider";

const Index: React.FC = (): ReactElement => {
  return (
    <NavigationProvider>
      <Page title="Shopify Compass" />
    </NavigationProvider>
  );
};

export default Index;
