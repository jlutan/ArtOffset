import React, { FunctionComponent } from 'react';

interface Props {
  clickHandler: () => void;
}
 
export const InputForm: FunctionComponent<Props> = ({ clickHandler }) => {
  return (
    <form>
      <label htmlFor="eth_add">Ethereum Address:</label>
      <input type="text" id="eth_add" value="Unique hash value"/>
      <input type="submit" value="Submit" onClick={clickHandler}></input>
    </form>
  );
}