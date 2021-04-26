import React, { Component } from "react";
import ReactDOM from "react-dom";

import "../styles/popup.css";
import InputForm from "../components/inputform";
import Calculate from "../components/calculate";
import Idle from "../components/idle";

class Popup extends Component {
  state = {
    hasConnection: false,
    address: "",
    calculating: false,
    deposit_sugg: null,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    chrome.runtime.onMessage.addListener(
      (
        message: string | number | { result: string; error: any },
        sender,
        sendResponse
      ) => {
        if (message === "socket_closed") {
          this.setState({ hasConnection: false });
        } else if (message === "found_valid_transaction") {
          this.setState({ calculating: true });
        } else if (typeof message === "object") {
          // listen for transaction processing results
          if (message.result && typeof message.result === "number") {
            // successful transaction read and calculation
            this.setState({
              calculating: false,
              deposit_sugg: message.result,
            });
          } else if (message.error) {
            // error occurred during the process
            console.error(message.error);
            this.setState({
              calculating: false,
              deposit_sugg: null,
            });
          }
        }
      }
    );
  }

  // code to run when 'Chande address' button is clicked
  addressChange = () => {
    this.setState({ hasConnection: false, address: "" });
    chrome.runtime.sendMessage("close_socket");
  };

  // handles changes to the input text field
  handleChange = (event) => {
    this.setState({ address: event.target.value });
  };

  // handles submit button clicks
  handleSubmit = (event) => {
    if (!this.state.hasConnection) {
      chrome.runtime.sendMessage(
        { address: this.state.address },
        (response) => {
          if (response.success) {
            this.setState({ hasConnection: true });
          }
        }
      );
    }
    event.preventDefault();
  };

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
        jsx = <Calculate deposit_sugg={deposit_sugg} />;
      } else {
        jsx = <Idle addressChange={this.addressChange} />;
      }
    }
    return jsx;
  }
}

// --------------

// render Popup component to the React DOM
ReactDOM.render(<Popup />, document.getElementById("root"));
