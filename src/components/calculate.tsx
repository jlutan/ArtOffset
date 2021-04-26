import React, { FunctionComponent } from "react";

interface CProps {
  deposit_sugg: number | null;
}

const Calculate: FunctionComponent<CProps> = ({ deposit_sugg }) => {
  return deposit_sugg ? (
    <div>Deposit Suggestion: {deposit_sugg}</div>
  ) : (
    <div>Calculating...</div>
  );
};

export default Calculate;
