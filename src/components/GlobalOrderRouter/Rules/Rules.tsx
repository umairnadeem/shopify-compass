import { Card } from "@shopify/polaris";
import React, { ReactElement, useEffect } from "react";
import { connect } from "react-redux";
import { Thunk } from "../../../common/state/ReduxUtils";
import { RootState } from "../../../common/state/RootReducer";
import { Rule } from "./Rule";
import { loadRules } from "./RulesActions";

interface ReduxProps {
  rules: Rule[];
}

interface DispatchProps {
  loadRules: Thunk;
}

const Rules: React.FC<ReduxProps> = ({ rules }): ReactElement => {
  useEffect(() => {
    loadRules("bruh");
  });

  return <Card.Section title="Rules">{rules}</Card.Section>;
};

export default connect<ReduxProps, DispatchProps>(
  (state: RootState) => ({
    ...state.rules,
  }),
  { loadRules }
)(Rules);
