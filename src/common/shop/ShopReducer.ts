import {
  ReducerDictionary,
  handleSimpleReducerUpdates,
  createReducer,
} from "../state/ReduxUtils";
import { ShopActionTypes } from "./ShopActions";

export interface ShopState {
  shopOrigin: string;
}

export const shopInitialState: ShopState = { shopOrigin: undefined };

const reducers: ReducerDictionary<ShopState> = {
  ...handleSimpleReducerUpdates([ShopActionTypes.SHOP_LOAD]),
};

export const shopReducer = createReducer<ShopState>(shopInitialState, reducers);
