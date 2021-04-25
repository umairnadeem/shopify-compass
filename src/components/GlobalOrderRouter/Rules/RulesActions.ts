import { globalOrderRouterClient } from "../../../common/clients";
import { Thunk } from "../../../common/state/ReduxUtils";
import { addLoader, clearLoader } from "../../WithLoader/LoadingActions";

export enum RulesActionTypes {
  LOAD_RULES_START = "LOAD_RULES_START",
  LOAD_RULES_SUCCESS = "LOAD_RULES_SUCCESS",
  LOAD_RULES_FAILURE = "LOAD_RULES_FAILURE",
}

export const rulesLoaderId = "rules";

export const loadRules: Thunk = (storeName: string) => async (dispatch) => {
  dispatch(addLoader(rulesLoaderId));
  dispatch({ type: RulesActionTypes.LOAD_RULES_START });

  const rules = await globalOrderRouterClient.getRules(storeName);
  
  dispatch({ type: RulesActionTypes.LOAD_RULES_SUCCESS, rules });
  dispatch(clearLoader(rulesLoaderId));
};
