import React, { useState, useEffect } from "react";
import { verifyOtp, sendOtp } from "../../../../http";
import { useSelector } from "react-redux";
import { setAuth, setOtp } from "../../../../store/authSlice";
import { useDispatch } from "react-redux";

// Number of input fields that make up SSN

const OtpScreen = ({ onNext }) => {
  const [otp, setotp] = useState("");
  const [o1, seto1] = useState("");
  const [o2, seto2] = useState("");
  const [o3, seto3] = useState("");
  const [o4, seto4] = useState("");
  const [o5, seto5] = useState("");
  const [o6, seto6] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: "", type: ""});
  const [counter, setCounter] = React.useState(59);
    useEffect(() => {
        const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);
const handleChange = e => {
  setError({ message: "", type: ""})
  const { maxLength, value, name } = e.target;
  const [, fieldIndex] = name.split("-");
  // Check if they hit the max character length
  if (value.length >= maxLength) {
    // Check if it's not the last input field
    if (parseInt(fieldIndex, 10) < 6) {
      // Get the next input field
      const nextSibling = document.querySelector(
        `input[name=input-${parseInt(fieldIndex, 10) + 1}]`
      );
      // If found, focus the next field
      if (nextSibling !== null) {
        nextSibling.focus();
      }
    }
  }
  if (value.length === 0) {
    // Check if it's not the last input field
   // if (parseInt(fieldIndex, 10) === 1) {
      // Get the next input field
      const previousSibling = document.querySelector(
        `input[name=input-${parseInt(fieldIndex, 10) - 1}]`
      );
      // If found, focus the next field
      if (previousSibling !== null) {
        previousSibling.focus();
      }
   // }
  }
}
  function Funotp() {
    setotp(o1 + o2 + o3 + o4 + o5 + o6);
  }
  
  const dispatch = useDispatch();
const { email, hash } = useSelector((state) => state.auth.otp);

async function submit() {
  setLoading(true);
  Funotp();
  if (!otp) {
    setError({ message: "Enter 6 Digit OTP", type: "warning"})
    setLoading(false);
    return;
  }
  try {
    const { data } = await verifyOtp({ otp, email, hash });
    setLoading(false)
    if (data) {
      dispatch(setAuth(data));
    } else {
      setLoading(false)
      console.log(data.message)
      setError({message : "something went wrong please try again later!", type: "err"})
    }
  } catch (e) {
    setLoading(false)
    const message = e.response ? e.response.data.message : e.message;
    setError({message: message, type: "err"})
    console.log(e.message);
  }
}
async function resendOTP() {
  try {
    const { data } = await sendOtp({ email: email });
    dispatch(setOtp({ email: data.email, hash: data.hash }));
    console.log(data);
    setError({message: `OTP Sent to ${data.email}`, type: "success"})
    setCounter(60);
  } catch (e) {
    const message = e.response ? e.response.data.message : e.message;
    setError({message: message, type: "err"})
    console.log(e);
  }
  
}

  return (
    <>
        <div className="h-screen w-full bg-slate-300">
        <div className="flex justify-center items-center px-5 py-3 bg-slate-200 rounded-b-[25px] shadow shadow-slate-400 transition-[1s]">
        <h1 className="text-xl text-black font-bold transition-[0.5s]">
         Verify Otp</h1>
        </div>
            <div className="pt-5 text-center mt-24">
      <div className="text-gray-700 text-2xl my-3">🔒 Enter your OTP</div>
      <div className="text-gray-500 text-sm my-3">
        Enter OTP that we sent on your Email
      </div>
    </div>
          <div className="flex justify-center items-center">
          <form>
               { error.message ? (
      <p className={`ml-2 mt-1 ${error.type === "err" ? 'text-red-500' : error.type === "success" ? 'text-green-400' : error.type === "warning" ? "text-orange-500" : null} text-md`} >{error.message}</p>
       ) : null }
          <div className="text-center w-60 rounded-md mt-1 inline-flex justify-center border border-transparent">
            <input
              type="number"
              className="py-2 px-1 bg-white mx-1 w-8 text-center rounded-md focus:outline-none focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent"
              value={o1}
              onChange={(e) => seto1(e.target.value) + setotp(e.target.value) + handleChange(e) }
              placeholder="-"
              name="input-1"
              maxLength={1}
            />
            <input
              type="number"
              className="py-2 px-1 bg-white mx-1 w-8 text-center rounded-md focus:outline-none focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent"
              value={o2}
              onChange={(e) =>
                seto2(e.target.value) + setotp(o1 + e.target.value) + handleChange(e)
              }
              placeholder="-"
              name="input-2"
              maxLength={1}
            />
            <input
              type="number"
              className="py-2 px-1 mx-1 bg-white w-8 text-center rounded-md focus:outline-none focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent"
              value={o3}
              onChange={(e) =>
                seto3(e.target.value) + setotp(o1 + o2 + e.target.value) + handleChange(e)
              }
              placeholder="-"
              name="input-3"
              maxLength={1}
            />
            <input
              type="number"
              className="py-2 px-1 mx-1 bg-white w-8 text-center rounded-md focus:outline-none focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent"
              value={o4}
              onChange={(e) =>
                seto4(e.target.value) +
                setotp(o1 + o2 + o3 + e.target.value) + handleChange(e)
              }
              placeholder="-"
              name="input-4"
              maxLength={1}
            />
            <input
              type="number"
              className="py-2 px-1 mx-1 bg-white w-8 text-center rounded-md focus:outline-none focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent"
              value={o5}
              onChange={(e) =>
                seto5(e.target.value) +
                setotp(o1 + o2 + o3 + o4 + e.target.value) + handleChange(e)
              }
              placeholder="-"
              name="input-5"
              maxLength={1}
            />
            <input
              type="number"
              className="py-2 px-1 mx-1 bg-white w-8 text-center rounded-md focus:outline-none focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent"
              value={o6}
              onChange={(e) =>
                seto6(e.target.value) +
                setotp(o1 + o2 + o3 + o4 + o5 + e.target.value) + handleChange(e)
              }
              placeholder="-"
              name="input-6"
              maxLength={1}
            />
          </div>
            </form>
          </div>
          <p>{otp}</p>
          
          <div className="text-center w-full mt-5">
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
          <div className="text-center w-full mt-5">
          <button onClick={resendOTP} className='text-center' disabled={counter !== 0}>Resend OTP { counter !== 0 ?  `in ${counter}` : null }</button>
          </div>
      </div>
    </>
  );
};

export default OtpScreen;