import {
  ReducerDictionary,
  createReducer,
} from "../../common/state/ReduxUtils";
import { LoadingActionTypes } from "./LoadingActions";

export interface LoadingState {
  loaders: string[];
}

export const loadingInitialState: LoadingState = {
  loaders: [],
};

const reducers: ReducerDictionary<LoadingState> = {
  [LoadingActionTypes.ADD_LOADER]: (state, action) => ({
    ...state,
    loaders: [...state.loaders, action.name],
  }),
  [LoadingActionTypes.CLEAR_LOADER]: (state, action) => ({
    ...state,
    loaders: state.loaders.filter((loader) => loader !== action.name),
  }),
};

export const loadingReducer = createReducer<LoadingState>(
  loadingInitialState,
  reducers
);
