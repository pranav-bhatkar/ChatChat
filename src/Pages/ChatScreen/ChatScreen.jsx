import * as React from "react";
import { useHistory, useParams } from "react-router-dom";
import Message from "../../components/chatScreen/Message"
import { useConversations } from '../../contexts/ConversationsProviders';
import { useContacts } from '../../contexts/ContactsProvider';
import { getChat } from '../../http'
import { useSelector } from "react-redux";
import { useSocket } from '../../contexts/SocketProvider';

const ChatScreen = () => {
  const { user } = useSelector((state) => state.auth);
  const { contacts } = useContacts();
  const { id } = useParams();
  const socket = useSocket()
  const history = useHistory();
  const topNavRef = React.useRef();
  const textBoxRef = React.useRef();
  const scrollRef = React.useRef();
  const [height, setHeight] = React.useState();
  const [msg, setMsg] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [conversation, setConversation] = React.useState();
  const { sendMessage, updateMessage } = useConversations()
  const getHeight = () => {
     const newHeight = topNavRef.current.clientHeight;
     const newHeight1 = textBoxRef.current.clientHeight;
      setHeight(newHeight+newHeight1-5);
       };
       React.useEffect(() => {
    if (socket == null) return

     socket.on('receive-message', async (message) => {
       console.log("message received ")
     setMessages(oldMessage => [...oldMessage, message]);
});

    return () => socket.off('receive-message')
  }, [socket])
     React.useEffect(() => {
       const getData = async () => {
         const {data} = await getChat({chatId: id});
         setConversation(data.conversation);
         setMessages(data.chat);
       };
       getHeight();
       getData()
       }, [id]);
     React.useEffect(() => {
       if (conversation) {
       let newRecipient = conversation.recipients.filter(function(v) {
    return v._id !== user.id;
  })
  const contact = contacts.find(contact => {
    return contact.user._id === newRecipient[0]._id;
  })
  newRecipient[0].name = contact ? contact.name : newRecipient[0].phone
  let object = Object.assign({}, ...newRecipient);
  
  conversation.recipients = object;
      }
      }, [conversation, contacts, user.id]);
    const sendMsg = async() => {
      try{
      var time = Date.now();
      var type = "sended";
      var text = msg;
      var status = "sending";
      const message = await sendMessage(
      conversation,
      text, 
      type, 
      time, 
      status,
      );
      if(message){
        //console.log(message)
        setMessages((prev)=> [...prev, message.data])
        setMsg("");
      }
      }catch(err){
        console.log(err);
      }
    }
  React.useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
       <div className="h-screen w-full bg-slate-300">
    <div ref={topNavRef} className={`flex justify-between items-center px-5 py-3 mb-[5px] bg-slate-200 rounded-b-[25px] shadow shadow-slate-400 transition-[1s]`}>
      <div className="flex items-center text-2xl">
        <ion-icon name="arrow-back-outline" onClick={(e) => history.push("/") }></ion-icon>
        <img className="w-8 h-8 ml-2 rounded-full object-cover shadow shadow-slate-400" src={conversation?.recipients ? `${process.env.REACT_APP_API_URL}${conversation?.recipients.avatar}` : null} alt="avatar"/>
      </div>
      <h1 className="text-xl text-black font-bold transition-[0.5s]">{conversation?.recipients.name}</h1>
      <div className="text-xl flex invisible">
        <ion-icon name="ellipsis-vertical"></ion-icon>
      </div>
    </div>
    <div className={`w-full h-[calc(100vh-${height}px)] px-4 py-2 overflow-y-scroll`}>
    {messages.map((message)=>(
     <div ref={scrollRef} >
        <Message message={message} pubkey={conversation?.recipients.pubkey} />
     </div>
    ))}
    </div>
      <div ref={textBoxRef} className="fixed bottom-0 w-full flex justify-between items-center bg-slate-300 py-2 px-3">
    <div className="flex items-center h-12 w-10/12 rounded-full bg-slate-200 px-2 overflow-hidden">
      <div className="flex justify-between items-center h-full px-2 text-2xl">
        <ion-icon name="happy-outline"></ion-icon>
      </div>
      <input value={msg} className="h-full w-full outline-none border-none bg-slate-200" type="text" onChange={(e) => setMsg(e.target.value)} placeholder="Message..." />
    </div>
    <button onClick={(e) => msg ? sendMsg() : updateMessage(0, 5, "sending")} className="flex justify-center h-12 items-center w-12 bg-slate-200 shadow shadow-slate-400 rounded-full text-lg ">
      { msg ? <i className="fas fa-paper-plane transition-[0.5s]" ></i> : <i className="fas fa-microphone transition-[0.5s]"></i> }
    </button>
  </div>
      </div>
    </>
  );
};

export default ChatScreen;