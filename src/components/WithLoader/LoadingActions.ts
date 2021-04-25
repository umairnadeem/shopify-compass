import { createActionCreator } from "../../common/state/ReduxUtils";

export enum LoadingActionTypes {
  ADD_LOADER = "ADD_LOADER",
  CLEAR_LOADER = "CLEAR_LOADER",
}

export const addLoader = createActionCreator<string>(
  LoadingActionTypes.ADD_LOADER,
  "name"
);
export const clearLoader = createActionCreator<string>(
  LoadingActionTypes.CLEAR_LOADER,
  "name"
);
