import { useState, useEffect } from "react";
import moment from 'moment';
import { useEncryption } from '../../contexts/EncryptionProvider';
import { useSelector } from "react-redux";

const Message = ({ message, pubkey }) => {
  const { user } = useSelector((state) => state.auth);
  const { decryptMessage } = useEncryption();

  const [text, setText] = useState("")
  
  useEffect(()=>{
    const id = message.recipient._id === user.id ? message.recipient._id : user.id;
    const payload = message.payload;
     
    const run = async () => {
    if (message.recipient) {
    const text = await decryptMessage(id, payload, pubkey);
    setText(text)
    
    } else {
      setText(message.payload)
    }
    }
    run();
  },[message, setText, decryptMessage, pubkey, user.id])
  return (
    <>
      {message?<div className={`w-full flex justify-${message.recipient._id===user.id ? "start" : "end" }`}>
        <div className={`flex flex-col justify-${message.recipient._id===user.id ? "end" : "start" }`}>
            <div className={`flex items-center justify-${message.recipient._id===user.id ? "end" : "start"} px-2 py-1`}>
            <p className={`px-4 py-2 max-w-[250px] shadow shadow-slate-400 bg-${message.type==="sended" ? "black text-white" : message.type==="received" ? "slate-200 text-black" : ""} rounded-[14px] `} >{text}</p>
            </div>
            <div className={`flex items-center justify-${message.recipient._id===user.id ? "start" : "end"} px-2 py-1`}>
              <p className={`w-max text-[12px] text-slate-600 ${message.type==="received" ? "ml-2" : null }`}>{moment(message.updated_at).format('LT')}</p>
              {/*message.recipient._id!==user.id ? message.type==="sended" 
              ? message.status==="sending" 
              ? <div className="text-md ml-1 flex items-center text-slate-500" ><ion-icon name="time-outline"></ion-icon></div> : message.status==="sended" 
              ? <div className="text-md ml-1 flex items-center text-slate-500" ><ion-icon name="checkmark-outline"></ion-icon></div> : message.status==="delivered" 
              ? <div className="text-md ml-1 flex items-center text-slate-500" ><ion-icon name="checkmark-done-outline"></ion-icon></div> : message.status==="readed" 
              ? <div className="text-md ml-1 flex items-center font-bold text-blue-500" ><ion-icon name="checkmark-done-outline"></ion-icon></div> 
              : null : null : null */}
            </div>
        </div>
      </div>:null}
    </>
  );
};

export default Message;