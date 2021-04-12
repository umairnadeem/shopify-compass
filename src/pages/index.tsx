import { Page, Card, Tabs } from "@shopify/polaris";
import React, { ReactElement, useCallback, useState } from "react";
import Rules from "../components/GlobalOrderRouter/Rules/Rules";

const tabs = [
  {
    id: "rules",
    content: "Rules",
    accessibilityLabel: "Rules",
    panelID: "rules",
  },
  {
    id: "settings",
    content: "Settings",
    accessibilityLabel: "Settings",
    panelID: "settings",
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
    <Page narrowWidth title="Global Order Router">
      <Card>
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} />
        {tabComponents[selected]}
      </Card>
    </Page>
  );
};

export default GlobalOrderRouter;
