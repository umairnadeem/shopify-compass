import { createActionCreator } from "../../state/ReduxUtils";

export enum ModalActionTypes {
  SHOW_MODAL = "SHOW_MODAL",
  HIDE_MODAL = "HIDE_MODAL",
}

export const showModal = createActionCreator<string>(
  ModalActionTypes.SHOW_MODAL,
  "id"
);
export const hideModal = createActionCreator<string>(
  ModalActionTypes.HIDE_MODAL,
  "id"
);
