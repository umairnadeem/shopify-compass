import { globalOrderRouterClient } from "../../../common/clients";
import { createActionCreator, Thunk } from "../../../common/state/ReduxUtils";
import { addLoader, clearLoader } from "../../WithLoader/LoadingActions";

export enum OrdersActionTypes {
  LOAD_ORDERS_START = "LOAD_ORDERS_START",
  LOAD_ORDERS_SUCCESS = "LOAD_ORDERS_SUCCESS",
  LOAD_ORDERS_FAILURE = "LOAD_ORDERS_FAILURE"
}

export const ordersLoaderId = "orders";

export const loadOrders: Thunk = (storeName: string) => async (dispatch) => {
  dispatch(addLoader(ordersLoaderId));
  dispatch({ type: OrdersActionTypes.LOAD_ORDERS_START });

  const rules = await globalOrderRouterClient.getRules(storeName);
  
  dispatch({ type: OrdersActionTypes.LOAD_ORDERS_SUCCESS, rules });
  dispatch(clearLoader(ordersLoaderId));
};