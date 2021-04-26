import React, { FunctionComponent } from "react";

interface FProps {
  handleChange: (event) => void;
  handleSubmit: (event) => void;
  address: string;
}

const InputForm: FunctionComponent<FProps> = ({
  handleChange,
  handleSubmit,
  address,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>Ethereum Address: </label>
      <input type="text" value={address} onChange={handleChange} />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default InputForm;
