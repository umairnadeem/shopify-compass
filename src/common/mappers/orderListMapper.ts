import { ShopifyOrder, ShopifyOrderListGQL } from "../models/ShopifyOrder";

export const mapOrderList = ({ orders }: ShopifyOrderListGQL): ShopifyOrder[] => {
  return orders.edges.map(edge => ({
    id: edge.node.id,
    name: edge.node.name,
    customer: edge.node.customer?.displayName,
    fulfillment: edge.node.displayFulfillmentStatus,
    createdAt: edge.node.createdAt
  }));
};