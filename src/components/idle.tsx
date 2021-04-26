import React, { FunctionComponent } from "react";

interface IProps {
  addressChange: () => void;
}

const Idle: FunctionComponent<IProps> = ({ addressChange }) => {
  return (
    <div>
      <h1>Idle Page</h1>
      <p>
        Thank you for registering your ethereum address. You have not yet made
        any transactions. While you're here, read some facts about NFT emissions
        and this extension's goals.
      </p>
      <button onClick={addressChange}>Change ethereum address.</button>
    </div>
  );
};

export default Idle;
