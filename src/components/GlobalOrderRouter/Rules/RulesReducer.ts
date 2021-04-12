import { RulesActionTypes } from "./RulesActions";
import {
  createReducer,
  handleSimpleReducerUpdates,
  ReducerDictionary,
} from "../../../common/state/ReduxUtils";
import { Rule } from "./Rule";

export interface RulesState {
  rules: Rule[];
}

export const rulesInitialState: RulesState = { rules: [] };

const reducers: ReducerDictionary<RulesState> = {
  ...handleSimpleReducerUpdates([RulesActionTypes.LOAD_RULES_SUCCESS]),
};

export const rulesReducer = createReducer<RulesState>(
  rulesInitialState,
  reducers
);
