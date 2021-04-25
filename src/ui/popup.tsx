import React, { Component, FunctionComponent} from "react";
import ReactDOM from "react-dom";

import "../styles/popup.css";
 
interface FProps {
  handleChange: (event) => void;
  handleSubmit: (event) => void;
  address: string;
}

interface CProps {
  deposit_sugg: number | null;
}

const InputForm: FunctionComponent<FProps> = ({ handleChange, handleSubmit, address }) => {
  return (
    <form onSubmit={handleSubmit} >
      <label>Ethereum Address:</label>
      <input type="text" value={address} onChange={handleChange} />
      <input type="submit" value="Submit" />
    </form>
  );
}

const Idle: FunctionComponent = () => {
  return (
    <div>
      <h1>Idle Page</h1>
      <p>Thank you for registering your ethereum address. You have not yet made any transactions. While you're here, read some facts about NFT emissions and this extension's goals.</p>
    </div>
  );
}

const Calculate: FunctionComponent<CProps> = ({ deposit_sugg }) => {
  return (
    deposit_sugg ?
    <div>
      Deposit Suggestion: {deposit_sugg}
    </div> :
    <div>
      Calculating...
    </div>
  );
}

class Popup extends Component {
  state = {
    hasConnection: false,
    address: '',
    calculating: false,
    deposit_sugg: null,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    chrome.runtime.onMessage.addListener((message: string | number, sender, sendResponse) => {
      if (message === "socket_closed") {
        this.setState({ hasConnection: false });
      } else if (message === "transaction_made") {
        this.setState({ calculating: true });
      } else if (typeof message === "number") {
        this.setState({ deposit_sugg: message })
      }
    });
  }

  handleChange = (event) => {
    this.setState({ address: event.target.value })
  }

  handleSubmit = (event) => {
    if (!this.state.hasConnection) {
      chrome.runtime.sendMessage({ address: this.state.address }, response => {
        if (response.success) {
          this.setState({ hasConnection: true });
        }
      });
    }
    event.preventDefault();
  }
  
  render() {
    let jsx: any;
    const { hasConnection, address, calculating, deposit_sugg } = this.state;
    if (!hasConnection) {
      jsx = (
        <InputForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          address={address}
        />
      );
    } else {
      if (calculating) {
        <Calculate
          deposit_sugg={deposit_sugg}
        />
      } else {
        <Idle />
      }
    }

    return jsx;
  }
}

// --------------

ReactDOM.render(
  <Popup />,
  document.getElementById('root')
)