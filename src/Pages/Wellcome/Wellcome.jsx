import React from "react";
import { useHistory } from "react-router-dom";
import chatlogo from "../../assets/undraw_chatting_re_j55r.svg"
const Wellcome = () => {
  
const history = useHistory();

  function startLogin(){
    history.push('/authenticate');
  }
  return (
     <div className="h-screen w-full bg-slate-300">
        <div className="flex justify-center items-center px-5 py-3 bg-slate-200 rounded-b-[25px] shadow shadow-slate-400 transition-[1s]">
        <h1 className="text-xl text-black font-bold transition-[0.5s]">
         Welcome</h1>
        </div>
         <div
            className={`w-full transition-[1s] mt-24`}
          >
            <h1 className="text-slate-600 text-center text-xl font-bold py-6 ">
              Welcome To ChitChat
            </h1>
            <img src={chatlogo} alt="chat" className="h-48 mx-auto mt-8" />
            <div className="flex justify-center items-center mt-12">
            <button onClick={startLogin} className="items-center text-md font-bold bg-slate-200 w-full max-w-[250px] py-[15px] rounded-full shadow-md hover:bg-slate-400 transition-[.3s]">Login or Signup</button>
            </div>
          </div>
        </div>
  );
};

export default Wellcome;