import { Dictionary } from "lodash";
import { fromPairs, omit } from "lodash/fp";
import { AnyAction, Reducer, Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { RootState } from "./RootReducer";

export type ActionCreator = (...args: any[]) => AnyAction;

export interface Thunk {
  (...args: any[]): ThunkAction<void, RootState, void, Action>;
  <R>(...args: any[]): ThunkAction<R, RootState, void, Action>;
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
export type ReducerState<S = any, A extends Action<any> = AnyAction> = (
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
export const handleSimpleReducerUpdates = <S extends object>(
  actionTypes: string[]
) =>
  fromPairs(
    actionTypes.map((actionType) => [actionType, simpleReducerCase]) as Array<
      [string, Reducer<S>]
    >
  );
