import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { EncryptionProvider } from "./contexts/EncryptionProvider";
import { ContactsProvider } from "./contexts/ContactsProvider";
import { ConversationsProvider } from "./contexts/ConversationsProviders";
import { SocketProvider } from "./contexts/SocketProvider";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <EncryptionProvider>
          <SocketProvider>
            <ContactsProvider>
              <ConversationsProvider >
      <App />
       </ConversationsProvider>
            </ContactsProvider>
          </SocketProvider>
        </EncryptionProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);