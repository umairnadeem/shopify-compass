import { Card } from "@shopify/polaris";
import React, { ReactElement, useEffect } from "react";
import { connect } from "react-redux";
import { Thunk } from "../../../common/state/ReduxUtils";
import { RootState } from "../../../common/state/RootReducer";
import { Rule } from "./Rule";
import { loadRules } from "./RulesActions";

interface ReduxProps {
  rules: Rule[];
  shopOrigin: string;
}

interface DispatchProps {
  loadRules: Thunk;
}

const Rules: React.FC<ReduxProps & DispatchProps> = ({
  rules,
  shopOrigin,
  loadRules,
}): ReactElement => {
  useEffect(() => {
    loadRules(shopOrigin);
  }, [loadRules, shopOrigin]);

  return (
    <Card.Section title="Rules">{rules.length && rules[2].name}</Card.Section>
  );
};

export default connect<ReduxProps, DispatchProps>(
  (state: RootState) => ({
    ...state.rules,
    ...state.shop,
  }),
  { loadRules }
)(Rules);
