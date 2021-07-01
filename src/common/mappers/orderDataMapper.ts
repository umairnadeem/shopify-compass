import {
  ShopifyBulkOrderListGQL,
  ShopifyFulfillmentOrderGQL,
  ShopifyOrder,
  ShopifyOrderGQL,
} from "../models/ShopifyOrder";
import { groupBy, last } from "lodash";

export const mapOrderData = (
  orderData: ShopifyBulkOrderListGQL
): ShopifyOrder[] => {
  const groupedOrders = groupBy(orderData, "__parentId");
  const rootOrders = groupedOrders["undefined"] as ShopifyOrderGQL[];
  const nestedOrders = rootOrders.map((order) => ({
    id: Number(last(String(order.id).split("/"))),
    name: order.name,
    customer: order.customer?.displayName,
    createdAt: order.createdAt,
    fulfillment: order.displayFulfillmentStatus,
    locations: (groupedOrders[order.id] as ShopifyFulfillmentOrderGQL[]).map(
      (fulfillmentOrder) => fulfillmentOrder.assignedLocation?.name
    ),
  }));
  return nestedOrders;
};
