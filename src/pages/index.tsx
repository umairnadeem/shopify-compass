import { Page } from "@shopify/polaris";
import React from "react";
import NavigationProvider from "./components/NavigationProvider/NavigationProvider";

const Index = () => {
  return (
    <NavigationProvider>
      <Page title="Shopify Compass"></Page>
    </NavigationProvider>
  );
};

export default Index;
