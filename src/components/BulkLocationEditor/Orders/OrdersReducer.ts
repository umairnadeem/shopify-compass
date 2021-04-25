import { ShopifyOrder } from "../../../common/models/ShopifyOrder";
import {
  createReducer,
  handleSimpleReducerUpdates,
  ReducerDictionary,
} from "../../../common/state/ReduxUtils";
import { OrdersActionTypes } from "./OrdersActions";

export interface OrdersState {
  orders: ShopifyOrder[];
}

export const ordersInitialState = {
  orders: [],
};

const reducers: ReducerDictionary<OrdersState> = {
  ...handleSimpleReducerUpdates([
    OrdersActionTypes.LOAD_ORDERS_SUCCESS,
    OrdersActionTypes.LOAD_ORDERS_FAILURE,
    OrdersActionTypes.LOAD_ORDERS_START,
  ]),
};

export const ordersReducer = createReducer<OrdersState>(
  ordersInitialState,
  reducers
);
