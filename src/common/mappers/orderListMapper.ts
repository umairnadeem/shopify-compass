import { ShopifyOrder, ShopifyOrderListGQL } from "../models/ShopifyOrder";

export const mapOrderList = (orderList: ShopifyOrderListGQL): ShopifyOrder[] => {
  return orderList.edges.map(edge => ({
    id: edge.node.id,
    customer: edge.node.customer?.displayName,
    fulfillment: edge.node.displayFulfillmentStatus,
    createdAt: edge.node.createdAt
  }));
};