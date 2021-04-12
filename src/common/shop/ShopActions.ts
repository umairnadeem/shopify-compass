import { Thunk } from "../state/ReduxUtils";

export enum ShopActionTypes {
  SHOP_LOAD = "SHOP_LOAD",
}

export const loadShop: Thunk = (shopOrigin: string) => (dispatch) =>
  dispatch({ type: ShopActionTypes.SHOP_LOAD, shopOrigin });
