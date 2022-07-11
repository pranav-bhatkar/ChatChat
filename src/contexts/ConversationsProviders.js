import React, { useContext, useState } from 'react'
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider';
import { useEncryption } from './EncryptionProvider';
import { httpCreateConversation, sendMsg } from "../http";
import { useSelector } from "react-redux";

const ConversationsContext = React.createContext()

export function useConversations() {
  return useContext(ConversationsContext)
}

export function ConversationsProvider({children }) {
  const [conversations, setConversations] = useState([])
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const { contacts } = useContacts();
  const { encryptMessage } = useEncryption();
  const socket = useSocket()
  const { user } = useSelector((state) => state.auth);
  
  
  function createConversation(recipients, conversationType) {
    let data;
    try {
    data = httpCreateConversation({recipients, conversationType});
    } catch (e) {
      console.log(e)
    }
    return data;
  }
//   useEffect(() => {
//     if (socket == null) return

//     socket.on('receive-message', async (message) => {
//       console.log(message)
//       //addMessageToConversation({ recipient, text, type, time, status })
// });

//     return () => socket.off('receive-message')
//   }, [socket])
  
  async function sendMessage(chat, text, type, time, status) {
    const pubkey = chat.recipients.pubkey;
    console.log(chat.recipient)
    const payload = await encryptMessage(user.id, text, pubkey);
    
    socket.emit('send-message', { chatId: chat._id, recipient: chat.recipients, payload, type, time, status })
    const message = await sendMsg({chatId: chat._id, recipient: chat.recipients._id, payload, type, time, status})
    return message;
    //addMessageToConversation({ recipient, text, type, time, status })
  }
  async function updateMessage(chatIndex, msgIndex, status){
    let message = conversations[chatIndex].messages[msgIndex];
    await console.log(message);
    message.status = status;
  }
  
  const formattedConversations = conversations.map((conversation) => {
      let newRecipient = conversation.recipients.filter(function(v) {
    return v._id !== user.id;
  })
  
  const contact = contacts.find(contact => {
    return contact.user._id === newRecipient[0]._id;
  })
  console.log(contact)
  
  const name = (contact && contact.name)
  newRecipient[0].name = contact ? name : newRecipient[0].phone
  let object = Object.assign({}, ...newRecipient);
  
  return { ...conversation, recipients: object }
  })
  
  const value = {
    conversations,
    formattedConversations,
    setConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
    updateMessage,
    selectConversationIndex: setSelectedConversationIndex,
    createConversation
  }

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}