import { globalOrderRouterClient } from "../../../common/clients";
import { Thunk } from "../../../common/state/ReduxUtils";

export enum RulesActionTypes {
  LOAD_RULES_START = "LOAD_RULES_START",
  LOAD_RULES_SUCCESS = "LOAD_RULES_SUCCESS",
  LOAD_RULES_FAILURE = "LOAD_RULES_FAILURE",
}

export const loadRules: Thunk = (storeName: string) => async (dispatch) => {
  dispatch({ type: RulesActionTypes.LOAD_RULES_START });
  const rules = await globalOrderRouterClient.getRules(storeName);
  dispatch({ type: RulesActionTypes.LOAD_RULES_SUCCESS, rules });
};
