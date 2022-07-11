import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion"

import Model from "../../components/shared/Model/Model";
import Input from "../../components/shared/Input/Input"
import Button from "../../components/shared/Button/Button"
//import ListItemStyled from '../../components/chatstab/ListItem';
import { useContacts } from "../../contexts/ContactsProvider";
import { useConversations } from '../../contexts/ConversationsProviders';
import { checkUser } from "../../http";
import {
  // useDispatch,
  useSelector,
} from "react-redux";

const NewChat = () => {
  const { user } = useSelector((state) => state.auth);
  const { createConversation } = useConversations();
  const { createContactFunc, contacts } = useContacts();
  const history = useHistory();
  const [showModel, setShowModel] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+91");
  
  const handleSubmit = async () => {
    let recipient;
    try {
      const { user } = await userCheck(phone);
      recipient = user;
    } catch (e) {
      console.log(e)
    }
   
    if(recipient===null){
      alert("locks like your friend is not on chitchat invite your friends!"); 
      return;
    }
     if(name && phone && recipient){
     const contact = await createContactFunc(recipient.id, phone, name, user.id);
     if(contact){
     setShowModel(false);
     }
     }else{
       alert("everything is required..!")
    }
  }
  const handleSubmit2 = async (id) => {
    const recipients = [id, user.id];
    const conversationType = "single"
    try {
      const data = await createConversation(recipients, conversationType);
      if (data) {
        history.push(`/chat/${data.data.conversation?._id}`)
      }
    } catch (e) {
      console.log(e);
    }
    
   
  }
  const userCheck = async (phone) => {
    const { data } = await checkUser({ phone });
    return data;
  }
  
  
  return (
    <>
    <Model showModel={showModel} setShowModel={setShowModel} title="Add Contact">
      {name }
      { phone}
      <Input placeholder="Name" labeltxt="Name" type="text" Value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Phone" labeltxt="Phone" type="tel" Value={phone} onChange={(e) => setPhone(e.target.value)} />
      <Button onClick={handleSubmit} text="Add Contact"  />
    </Model>
       <div class="h-screen w-full bg-slate-300">
    <div class="flex justify-between items-center px-5 py-3 bg-slate-200 rounded-b-[25px]">
      <ion-icon onClick={(e) => history.push("/") } class="text-2xl cursor-pointer" name="arrow-back-outline"></ion-icon>
      <h1 class="text-xl text-black font-bold">Contacts</h1>
      <ion-icon onClick={(e) => setShowModel(true) } class="text-2xl text-blue-500 cursor-pointer" name="person-add"></ion-icon>
    </div>
    <div class="main h-[90vh] py-5 overflow-y-scroll">

     {contacts.map((contact) => (
        <motion.div 
        onClick={(e) => handleSubmit2(contact.user._id)} 
        className="w-full h-[75px] px-5 py-3 flex justify-between">
          <motion.div className="flex">
            <motion.div className="">
              <img onClick={(e) => history.push(`/profile/${contact.user.id}`) } className="w-14 h-14 overflow-hidden rounded-full object-cover" src={`${process.env.REACT_APP_API_URL}${contact.user.avatar}`} alt="avtar" />
            </motion.div>
            <motion.div className={`ml-4 ${contact.lastmessage ? null : 'flex items-center justify-center font-bold' }`}>
              <motion.h4 className="text-slate-700 text-lg">{contact.name}</motion.h4>
            </motion.div>
          </motion.div>
        </motion.div>
     ))}
    </div>
  </div>
    </>
  );
};

export default NewChat;