import { combineReducers } from "redux";
import { ordersInitialState, ordersReducer, OrdersState } from "../../components/BulkLocationEditor/Orders/OrdersReducer";
import {
  rulesInitialState,
  rulesReducer,
  RulesState,
} from "../../components/GlobalOrderRouter/Rules/RulesReducer";
import { loadingInitialState, loadingReducer, LoadingState } from "../../components/WithLoader/LoadingReducer";
import {
  modalInitialState,
  modalReducer,
  ModalState,
} from "../Modal/ModalReducer";
import { ShopState, shopReducer, shopInitialState } from "../shop/ShopReducer";

export interface RootState {
  shop: ShopState;
  modal: ModalState;
  rules: RulesState;
  loading: LoadingState;
  orders: OrdersState;
}

export const rootReducer = combineReducers<RootState>({
  shop: shopReducer,
  modal: modalReducer,
  rules: rulesReducer,
  loading: loadingReducer,
  orders: ordersReducer,
});

export const initialState: RootState = {
  shop: shopInitialState,
  modal: modalInitialState,
  rules: rulesInitialState,
  loading: loadingInitialState,
  orders: ordersInitialState
};
