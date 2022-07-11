import React, { useState }  from "react";
import { sendOtp } from "../../../../http";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../store/authSlice";

const PhoneScreen = ({onNext}) => {
const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState();
const dispatch = useDispatch();

async function submit() {
  setLoading(true);
  if (!email) {
    setLoading(false);
    setError("Email is required!")
    return
  };
  try {
    const { data } = await sendOtp({ email: email });
  dispatch(setOtp({ email: data.email, hash: data.hash }));
  console.log(data);
  } catch (e) {
    setLoading(false)
    setError(e.message)
    console.log(e);
  }
  setLoading(false);
  onNext();
}

  return (
    <>
          <div className="h-screen w-full bg-slate-300">
        <div className="flex justify-center items-center px-5 py-3 bg-slate-200 rounded-b-[25px] shadow shadow-slate-400 transition-[1s]">
        <h1 className="text-xl text-black font-bold transition-[0.5s]">
         Login</h1>
        </div>
      <div className="text-center text-2xl my-3 mt-24">Enter your email address</div>
      <div className="text-gray-600 text-center text-sm mt-3">
        By entering your Email address w'll text you <br /> a one time password
      </div>
    <div className="flex justify-center items-center transition-all mt-8">
     <div className="w-full max-w-[240px]">
     { error ? (
      <p className="ml-2 mt-1 text-red-500 text-md" >{error}</p>
       ) : null }
      <input 
      className="py-3 w-full max-w-[240px] pl-4 outline-gray-400 rounded-md"
      placeholder="Email" 
      onChange={(e) => setEmail(e.target.value)} 
      type="email"/>
    </div>
    </div>
    <div className="text-center flex justify-center w-full mt-5">
    { loading ? 
         <svg className="mx-auto" width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
            <stop stop-color="#fff" stop-opacity="0" offset="0%"/>
            <stop stop-color="#fff" stop-opacity=".631" offset="63.146%"/>
            <stop stop-color="#fff" offset="100%"/>
        </linearGradient>
    </defs>
    <g fill="none" fill-rule="evenodd">
        <g transform="translate(1 1)">
            <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="0.9s"
                    repeatCount="indefinite" />
            </path>
            <circle fill="#fff" cx="36" cy="18" r="1">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="0.9s"
                    repeatCount="indefinite" />
            </circle>
        </g>
    </g>
</svg> :
     <button onClick={submit} className="items-center text-md text-white font-bold bg-slate-600 px-[50px] py-[13px] rounded-full shadow-md hover:bg-slate-800 transition-[.3s]">Next</button>
           
    }
    </div>
    </div>
    </>
  );
};

export default PhoneScreen;