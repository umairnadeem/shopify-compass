import { ModalActionTypes } from "./ModalActions";
import { createReducer, ReducerDictionary, ReducerState } from "../../state/ReduxUtils";

export interface ModalState {
  modals: { [modalId: string]: boolean };
}

export const modalInitialState: ModalState = { modals: {} };

const modalReducerFunc: ReducerState<ModalState> = (state, action) => ({
  ...state,
  modals: {
    ...state.modals,
    [action.id]: action.type === ModalActionTypes.SHOW_MODAL,
  },
});

const reducers: ReducerDictionary<ModalState> = {
  [ModalActionTypes.SHOW_MODAL]: modalReducerFunc,
  [ModalActionTypes.HIDE_MODAL]: modalReducerFunc,
};

export const modalReducer = createReducer<ModalState>(modalInitialState, reducers);
