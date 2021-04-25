import { ShopifyOrder, ShopifyOrderListGQL } from "../models/ShopifyOrder";

export const mapOrderList = ({
  orders,
}: ShopifyOrderListGQL): ShopifyOrder[] => {
  return orders.edges.map((order) => ({
    id: order.node.id,
    name: order.node.name,
    customer: order.node.customer?.displayName,
    fulfillment: order.node.displayFulfillmentStatus,
    createdAt: order.node.createdAt,
    locations: order.node.fulfillmentOrders.edges.map(
      (fulfillmentOrder) => fulfillmentOrder.node?.assignedLocation?.name
    ),
  }));
};
