import React, { useState }  from "react";
import styles from "./PhoneScreen.module.css";
import Button from "../../../../components/shared/Button/Button";
import Input from "../../../../components/shared/Input/Input";
import 'react-phone-input-2/lib/material.css'
import { sendOtp } from "../../../../http";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../store/authSlice";


const inputStyle = {
   width: "50px",
   color: "#000",
   fontSize: "17px"
}
const PhoneScreen = ({onNext}) => {
const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);
// const [cCode, setcCode] = useState("+91");
const dispatch = useDispatch();

async function submit() {
  setLoading(true);
  if (!email) {
    setLoading(false);
    return
  };
  const { data } = await sendOtp({ email: email });
  dispatch(setOtp({ email: data.email, hash: data.hash }));
  console.log(data);
  setLoading(false);
  onNext();
}

  return (
    <>
     <div className="container w-100">
         <div className="mt-5 text-center aline-item-center">
         <h1 className="pt-3 text-primary text-bold fs-1">
         Enter your Email Address
         </h1>
         <p className="text-center text-black-50 mb-5">By entering your Email address <br /> w'll text you a one time password</p>
          </div>
         <div className="text-center">
         <div className="text-center d-inline-flex mb-4">
         <Input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
         />
         </div>
         <div >
         { loading ? 
         <svg
                    className={styles.spinner}
                    width="42"
                    height="42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        cx="21"
                        cy="21"
                        r="18"
                        stroke="#C4C5C5"
                        strokeWidth="4"
                    />
                    <path
                        d="M20.778 1.001A20 20 0 111.542 25.627l3.876-.922a16.016 16.016 0 1015.404-19.72l-.044-3.984z"
                        fill="#009977"
                    />
                </svg> :
         <Button onClick={submit} text="next" /> }
         </div>
         </div>
         
     </div>
    </>
  );
};

export default PhoneScreen;