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
    // subscribe to notifications of new pending transactions
    socket.send(`{
      "jsonrpc": "2.0",
      "id": "pending_transaction",
      "method": "eth_subscribe",
      "params": ["newPendingTransactions"]
    }`);
  });

  // listens for new pending transactions in the Ethereum blockchain
  socket.addEventListener("message", (event) => {
    const data: any = JSON.parse(
      event.data
    );
    console.log("Socket received a message, id:", data.id, data);
    // if (data.id === "pending_transaction") {
    //   socket.send(`{
    //     "jsonrpc": "2.0",
    //     "id": "transaction_data",
    //     "method": "eth_getTransactionByHash",
    //     "params": [${data.result}]
    //   }`)
    // } else if (data.id === "transaction_data") {
    //   console.log("Received transaction data", data);
    // }


    // chrome.runtime.sendMessage("found_valid_transaction");
    // // calculate deposit amount...
    // let deposit_sugg = 0; // PLACEHOLDER
    // chrome.runtime.sendMessage(deposit_sugg);
  });

  socket.addEventListener("close", (event) => {
    console.log("Connection closed -", event);
    chrome.runtime.sendMessage("socket_closed");
  });

  socket.addEventListener("error", (event) => {
    console.error("Connection hit an error -", event);
  });
};
