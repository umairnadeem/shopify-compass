import {
  IndexTable,
  TextStyle,
  useIndexResourceState,
  SkeletonPage,
  Layout,
  Card,
  SkeletonBodyText,
  SkeletonDisplayText,
  TextContainer,
} from "@shopify/polaris";
import React, { ReactElement } from "react";
import { useBulkQuery } from "../../../common/hooks/useBulkQuery";
import { mapOrderData } from "../../../common/mappers/orderDataMapper";
import { ShopifyBulkOrderListGQL } from "../../../common/models/ShopifyOrder";
import { getOrders } from "../../../common/queries/getOrders";
import WithLoader from "../../WithLoader/WithLoader";

const skeleton = ( // TODO fix
  <SkeletonPage primaryAction secondaryActions={2}>
    <Layout>
      <Layout.Section>
        <Card sectioned>
          <SkeletonBodyText />
        </Card>
        <Card sectioned>
          <TextContainer>
            <SkeletonDisplayText size="small" />
            <SkeletonBodyText />
          </TextContainer>
        </Card>
        <Card sectioned>
          <TextContainer>
            <SkeletonDisplayText size="small" />
            <SkeletonBodyText />
          </TextContainer>
        </Card>
      </Layout.Section>
      <Layout.Section secondary>
        <Card>
          <Card.Section>
            <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={2} />
            </TextContainer>
          </Card.Section>
          <Card.Section>
            <SkeletonBodyText lines={1} />
          </Card.Section>
        </Card>
        <Card subdued>
          <Card.Section>
            <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={2} />
            </TextContainer>
          </Card.Section>
          <Card.Section>
            <SkeletonBodyText lines={2} />
          </Card.Section>
        </Card>
      </Layout.Section>
    </Layout>
  </SkeletonPage>
);

interface OwnProps {
  query: string;
  abortController: AbortController;
}

const OrderList: React.FC<OwnProps> = ({
  query,
  abortController,
}): ReactElement => {
  const { loading, data } = useBulkQuery<ShopifyBulkOrderListGQL>(
    getOrders(query),
    abortController,
    50
  );
  const orders = data ? mapOrderData(data) : [];
  const resourceName = {
    singular: "order",
    plural: "orders",
  };

  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
  } = useIndexResourceState<any>(orders);

  const promotedBulkActions = [
    {
      content: "Edit customers",
      onAction: () => console.log("Todo: implement bulk edit"),
    },
  ];
  const bulkActions = [
    {
      content: "Add tags",
      onAction: () => console.log("Todo: implement bulk add tags"),
    },
    {
      content: "Remove tags",
      onAction: () => console.log("Todo: implement bulk remove tags"),
    },
    {
      content: "Delete customers",
      onAction: () => console.log("Todo: implement bulk delete"),
    },
  ];

  const rowMarkup = orders.map(
    ({ id, name, customer, fulfillment, createdAt, locations }, index) => (
      <IndexTable.Row
        id={String(id)}
        key={id}
        selected={selectedResources.includes(String(id))}
        position={index}
      >
        <IndexTable.Cell>
          <TextStyle variation="strong">{name}</TextStyle>
        </IndexTable.Cell>
        <IndexTable.Cell>
          {customer ?? <TextStyle variation="subdued">No customer</TextStyle>}
        </IndexTable.Cell>
        <IndexTable.Cell>{createdAt}</IndexTable.Cell>
        <IndexTable.Cell>{fulfillment}</IndexTable.Cell>
        <IndexTable.Cell>{locations.join(", ")}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  return (
    <WithLoader loading={loading} skeleton={skeleton}>
      <IndexTable
        resourceName={resourceName}
        itemCount={orders.length}
        // eslint-disable-next-line shopify/jsx-no-complex-expressions
        selectedItemsCount={
          allResourcesSelected ? "All" : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        hasMoreItems
        bulkActions={bulkActions}
        promotedBulkActions={promotedBulkActions}
        headings={[
          { title: "Order" },
          { title: "Customer" },
          { title: "Date" },
          { title: "Fulfillment" },
          { title: "Location(s)" },
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </WithLoader>
  );
};

export default OrderList;
