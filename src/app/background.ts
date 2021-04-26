const dotenv = require("dotenv");
import * as ejsutils from "ethereumjs-util";

const API_KEY: string = "46e7c7cc369140f3a4a976b5b40b67c7";

let socket: WebSocket = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.address) {
    console.log("Ethereum address entered:", message.address);
    createSocket(message.address);
    sendResponse({ success: true });
  } else if (message === "close_socket" && socket.readyState === socket.OPEN) {
    socket.close();
  }
});

const createSocket = (address: string) => {
  socket = new WebSocket(`wss://mainnet.infura.io/ws/v3/${API_KEY}`);

  socket.addEventListener("open", (event) => {
    console.log("Connection opened -", event);
    socket.send(`{
      "jsonrpc": "2.0",
      "id": "get_transaction",
      "method": "eth_subscribe",
      "params": ["transaction"]
    }`);
  });

  socket.addEventListener("message", (event) => {
    console.log("socket received a message event", event);
    if (event.lastEventId === "get_transaction") {
      const data: any = JSON.parse(
        event.data
      );
      console.log("New Transaction,", data.id, data);
      // chrome.runtime.sendMessage("found_valid_transaction");
      // // calculate deposit amount...
      // let deposit_sugg = 0; // PLACEHOLDER
      // chrome.runtime.sendMessage(deposit_sugg);
    }
  });

  socket.addEventListener("close", (event) => {
    console.log("Connection closed -", event);
    chrome.runtime.sendMessage("socket_closed");
  });

  socket.addEventListener("error", (event) => {
    console.error("Connection hit an error -", event);
  });
};
