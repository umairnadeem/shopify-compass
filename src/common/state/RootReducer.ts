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

export interface RootState {
  modal: ModalState;
  rules: RulesState;
}

export const rootReducer = combineReducers<RootState>({
  modal: modalReducer,
  rules: rulesReducer,
});

export const initialState: RootState = {
  modal: modalInitialState,
  rules: rulesInitialState,
};
