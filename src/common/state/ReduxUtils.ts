import { Dictionary } from "lodash";
import { fromPairs, omit } from "lodash/fp";
import { AnyAction, Reducer, Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { RootState } from "./RootReducer";

export interface Thunk {
  (...args: unknown[]): ThunkAction<void, RootState, void, Action>;
  <R>(...args: unknown[]): ThunkAction<R, RootState, void, Action>;
}

export function createActionCreator<T1>(
  type: string,
  key: string
): (a1: T1) => AnyAction {
  return (value) => {
    return {
      type,
      [key]: value,
    };
  };
}

export type ReducerState<S = unknown, A extends Action<unknown> = AnyAction> = (
  state: S,
  action: A
) => S;
export type ReducerDictionary<S> = Dictionary<ReducerState<S>>;

export const createReducer = <S>(
  initialState: S,
  reducerDict: ReducerDictionary<S>
): Reducer<S> => (state = initialState, action: AnyAction) =>
  reducerDict[action.type] ? reducerDict[action.type](state, action) : state;

const simpleReducerCase = (state, action) => ({
  ...state,
  ...omit(["type"], action),
});

export const handleSimpleReducerUpdates = <S>(
  actionTypes: string[]
): Dictionary<Reducer<S>> =>
  fromPairs(actionTypes.map((actionType) => [actionType, simpleReducerCase]));
