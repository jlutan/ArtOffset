import React, { Component } from 'react';

class InputForm extends Component {
  state = {  }
  
  render() { 
    const { clickHandler } = this.props;
    return (
      <form for="eth_add">
        <label for="eth_add">Ethereum Address:</label>
        <input></input>
        <input type="submit" value="Submit"></input>
      </form>
    );
  }
}

export default InputForm;