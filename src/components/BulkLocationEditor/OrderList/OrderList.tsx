import { IndexTable, TextStyle, useIndexResourceState } from "@shopify/polaris";
import React, { ReactElement } from "react";
import { useQuery } from "react-apollo";
import { mapOrderList } from "../../../common/mappers/orderListMapper";
import { ShopifyOrderListGQL } from "../../../common/models/ShopifyOrder";
import { GET_ORDERS } from "../../../common/queries";
import WithLoader from "../../WithLoader/WithLoader";

const OrderList: React.FC = (): ReactElement => {
  const { loading, data } = useQuery<ShopifyOrderListGQL>(GET_ORDERS);
  console.log(data)
  const orders = data ? mapOrderList(data) : [];
  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };

  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
  } = useIndexResourceState<any>(orders);

  const promotedBulkActions = [
    {
      content: 'Edit customers',
      onAction: () => console.log('Todo: implement bulk edit'),
    },
  ];
  const bulkActions = [
    {
      content: 'Add tags',
      onAction: () => console.log('Todo: implement bulk add tags'),
    },
    {
      content: 'Remove tags',
      onAction: () => console.log('Todo: implement bulk remove tags'),
    },
    {
      content: 'Delete customers',
      onAction: () => console.log('Todo: implement bulk delete'),
    },
  ];

  const rowMarkup = orders.map(
    ({id, name, customer, fulfillment, createdAt }, index) => (
      <IndexTable.Row
        id={String(id)}
        key={id}
        selected={selectedResources.includes(String(id))}
        position={index}
      >
        <IndexTable.Cell>
          <TextStyle variation="strong">{name}</TextStyle>
        </IndexTable.Cell>
        <IndexTable.Cell>{customer ?? <TextStyle variation="subdued">No customer</TextStyle>}</IndexTable.Cell>
        <IndexTable.Cell>{createdAt}</IndexTable.Cell>
        <IndexTable.Cell>{fulfillment}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );
  
  return (
    <WithLoader loading={loading}>
      <IndexTable
        resourceName={resourceName}
        itemCount={orders.length}
        // eslint-disable-next-line shopify/jsx-no-complex-expressions
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        hasMoreItems
        bulkActions={bulkActions}
        promotedBulkActions={promotedBulkActions}
        headings={[
          {title: 'Order'},
          {title: 'Customer'},
          {title: 'Date'},
          {title: 'Fulfillment'},
        ]}
      >
        {rowMarkup}
      </IndexTable>
  </WithLoader>
  )
};

export default OrderList;