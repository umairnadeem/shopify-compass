import { Page, Card, Tabs, Frame } from "@shopify/polaris";
import React, { ReactElement, useCallback, useState } from "react";
import { Orders } from "../components/BulkLocationEditor/Orders/Orders";

const tabs = [
  {
    id: "all",
    content: "All",
    accessibilityLabel: "All",
    panelID: "all",
  },
];

const tabComponents = [<Orders key={0} />];

const BulkLocationEditor: React.FC = (): ReactElement => {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  return (
    <Page narrowWidth title="Orders">
      <Frame>
        <Card>
          <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} />
          {tabComponents[selected]}
        </Card>
      </Frame>
    </Page>
  );
};

export default BulkLocationEditor;
