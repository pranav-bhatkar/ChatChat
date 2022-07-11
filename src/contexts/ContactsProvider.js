import React, { useState, useContext } from 'react'
import { createContact } from "../http";

const ContactsContext = React.createContext()

export function useContacts() {
  return useContext(ContactsContext)
}

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useState([])
  
  
  async function createContactFunc(id, phone, name, owner) {
    try {
    const contact = await createContact({ user: id, phone, name, owner });
    return contact;
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ContactsContext.Provider value={{ contacts, createContactFunc, setContacts }}>
      {children}
    </ContactsContext.Provider>
  )
}