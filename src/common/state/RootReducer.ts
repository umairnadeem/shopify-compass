import { combineReducers } from "redux";
import {
  rulesInitialState,
  rulesReducer,
  RulesState,
} from "../../components/GlobalOrderRouter/Rules/RulesReducer";
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
}

export const rootReducer = combineReducers<RootState>({
  shop: shopReducer,
  modal: modalReducer,
  rules: rulesReducer,
});

export const initialState: RootState = {
  shop: shopInitialState,
  modal: modalInitialState,
  rules: rulesInitialState,
};
