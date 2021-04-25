import { Page, Card, Tabs, Frame } from "@shopify/polaris";
import React, { ReactElement, useCallback, useState } from "react";
import Rules from "../components/GlobalOrderRouter/Rules/Rules";

const tabs = [
  {
    id: "all",
    content: "All",
    accessibilityLabel: "All",
    panelID: "all",
  },
];

const tabComponents = [<Rules key={0} />];

const GlobalOrderRouter: React.FC = (): ReactElement => {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  return (
    <Page narrowWidth title="Rules">
      <Frame>
        <Card>
          <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} />
          {tabComponents[selected]}
        </Card>
      </Frame>
    </Page>
  );
};

export default GlobalOrderRouter;
