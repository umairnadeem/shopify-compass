import { Dictionary } from "lodash";
import { compact, fromPairs, omit } from "lodash/fp";
import { AnyAction, Reducer, Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { RootState } from "./RootReducer";

export type ActionCreator = (...args: any[]) => AnyAction;

export interface Thunk {
  (...args: any[]): ThunkAction<void, RootState, void, Action>;
  <R>(...args: any[]): ThunkAction<R, RootState, void, Action>;
}

export function createActionCreator(type: string): () => AnyAction;
export function createActionCreator<T1>(type: string, name1?: string): (a1: T1) => AnyAction;
export function createActionCreator<T1, T2>(
  type: string,
  name1?: string,
  name2?: string
): (a1: T1, a2: T2) => AnyAction;
export function createActionCreator<T1, T2, T3>(
  type: string,
  name1?: string,
  name2?: string,
  name3?: string
): (a1: T1, a2: T2, a3: T3) => AnyAction;
export function createActionCreator<T1, T2, T3>(
  type: string,
  name1?: string,
  name2?: string,
  name3?: string
): (a1: T1, a2: T2, a3: T3) => AnyAction {
  const argNames = compact([name1, name2, name3]);
  return (...args: [T1, T2, T3]) => {
    const action = { type };
    argNames.forEach((_, i) => (action[argNames[i]] = args[i]));
    return action;
  };
}
export type ReducerState<S = any, A extends Action<any> = AnyAction> = (state: S, action: A) => S;
export type ReducerDictionary<S> = Dictionary<ReducerState<S>>;

export const createReducer = <S>(initialState: S, reducerDict: ReducerDictionary<S>): Reducer<S> => (
  state = initialState,
  action: AnyAction
) => (reducerDict[action.type] ? reducerDict[action.type](state, action) : state);

const simpleReducerCase = (state, action) => ({
  ...state,
  ...omit(["type"], action),
});
export const handleSimpleReducerUpdates = <S extends object>(actionTypes: string[]) =>
  fromPairs(actionTypes.map((actionType) => [actionType, simpleReducerCase]) as Array<[string, Reducer<S>]>);
