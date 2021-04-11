import { combineReducers } from "redux";
import {
  modalInitialState,
  modalReducer,
  ModalState,
} from "../components/Modal/ModalReducer";

export interface RootState {
  modal: ModalState;
}

export const rootReducer = combineReducers<RootState>({
  modal: modalReducer,
});

export const initialState: RootState = {
  modal: modalInitialState,
};
