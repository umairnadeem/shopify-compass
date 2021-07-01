export enum FulfillmentStatus {
  UNFULFILLED = "UNFULFILLED",
  PARTIALLY_FULFILLED = "PARTIALLY_FULFILLED",
  FULFILLED = "FULFILLED",
  RESTOCKED = "RESTOCKED",
  PENDING_FULFILLMENT = "PENDING_FULFILLMENT",
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  SCHEDULED = "SCHEDULED",
}

export interface ListGQL<TNode> {
  edges: {
    cursor: string;
    node: TNode;
  }[];
  pageInfo?: {
    hasNextPage?: boolean;
  };
}

export interface ShopifyOrderGQL {
  id: number;
  name: string;
  createdAt: string;
  customer: {
    displayName: string;
  };
  displayFulfillmentStatus: FulfillmentStatus;
  fulfillmentOrders: ListGQL<ShopifyFulfillmentOrderGQL>;
}

export interface ShopifyFulfillmentOrderGQL {
  assignedLocation: {
    name: string;
    location: {
      id: number;
    };
  };
}

export type ShopifyOrderListGQL = { orders: ListGQL<ShopifyOrderGQL> };

export interface ShopifyOrder {
  id: number;
  name: string;
  createdAt: string;
  customer: string;
  fulfillment: FulfillmentStatus;
  locations: string[];
}

export type ShopifyBulkOrderListGQL = (
  | ShopifyOrderGQL
  | ShopifyFulfillmentOrderGQL
)[];
