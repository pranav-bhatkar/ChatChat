import React, { useState } from 'react'
//import Button from '../../../../components/shared/Button/Button';
//import Styles from './ProfileScreen.module.css';
import { useSelector, useDispatch } from "react-redux";
import { setName, setStorePhone, setAvatar } from "../../../../store/activateSlice";
import { activate } from '../../../../http';
import { setAuth } from '../../../../store/authSlice';
import { useEncryption } from '../../../../contexts/EncryptionProvider';
  
const ProfileSetup = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("+91");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({message: "", type: ""});
  const [image, setImage] = useState('/images/user-avatar.png');
  const { avatar } = useSelector((state) => state.activate);
  const { generateKeys } = useEncryption();
    
    function captureImage(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
             setImage(reader.result);
             dispatch(setAvatar(reader.result));
        };
    }


   async function submitData(){
      setLoading(true);
      setError({ message: "", type: ""})
      if (fullname === "" || phone === "") {
        setLoading(false);
        setError({message: "All fields are required", type:"err"});
      return;
    }
      if (avatar === "") {
        setLoading(false);
        setError({message: "Please select a profile photo", type:"err"});
        return;
    }
    
    try {
      dispatch(setStorePhone(phone));
      dispatch(setName(fullname));
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert(err);
    }
    try {
            const pubkey = await generateKeys(user.id);
            const { data } = await activate({ fullname, avatar, phone, pubkey });
            if (data.auth) {
                setLoading(false);
                dispatch(setAuth(data));
            }
            console.log(data);
        } catch (err) {
            console.log(err);setLoading(false);
        }
      //  alert("Plaese configur that..!");
    }
    return (
      <>
                   <div className="h-screen w-full bg-slate-300">
        <div className="flex justify-center items-center px-5 py-3 bg-slate-200 rounded-b-[25px] shadow shadow-slate-400 transition-[1s]">
        <h1 className="text-xl text-black font-bold transition-[0.5s]">
         Create Profile</h1>
        </div>
    <div className="pt-5 text-center">
      <div className="text-2xl my-3">Enter your information</div>
      <div className="text-gray-500 text-sm mt-3">
        your information is fully safe here 😉
      </div>
    </div>
    <div className="flex justify-center items-center w-full pt-2">
               { error.message ? (
      <p className={`ml-2 mt-1 ${error.type === "err" ? 'text-red-500' : error.type === "success" ? 'text-green-400' : error.type === "warning" ? "text-orange-500" : null} text-md`} >{error.message}</p>
       ) : null }
    </div>
    <div className="flex justify-center items-center w-full pt-2">
      <div className="text-center text-white">
        <label htmlFor="profile">
          <img className="w-24 h-24 rounded-full border-2 border-slate-600" src={image} alt="profile"/>
        </label>
        <input type="file" onChange={captureImage} id="profile" hidden />
      </div>
    </div>
    <div className="flex justify-center items-center w-full">
      <div className="text-center w-60 rounded-md mt-5 text-gray-400 focus-within:text-black inline-flex justify-center border border-transparent focus-within:outline-none focus-within:ring-2 focus-within:ring-slate-600 focus-within:border-transparent">
        <div className="py-2 pl-2 px-1 rounded-l-md bg-white w-1/5"><i className="fa-solid fa-user"></i></div>
        <input className="py-2 pl-2 px-1 w-4/5 rounded-r-md focus:outline-none" placeholder="Elon Musk" type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} />
      </div>
    </div>
    <div className="flex justify-center items-center w-full">
      <div className="text-center w-60 rounded-md mt-5 text-gray-400 focus-within:text-black inline-flex justify-center border border-transparent focus-within:outline-none focus-within:ring-2 focus-within:ring-slate-600 focus-within:border-transparent">
        <div className="py-2 pl-2 px-1 rounded-l-md bg-white w-1/5"><i className="fa-solid fa-phone"></i></div>
        <input className="py-2 pl-2 px-1 w-4/5 rounded-r-md focus:outline-none" placeholder="+91-9876543210" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
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
     <button onClick={submitData} className="items-center text-md text-white font-bold bg-slate-600 px-[50px] py-[13px] rounded-full shadow-md hover:bg-slate-800 transition-[.3s]">Next</button>
    }
    </div>
    </div>
    </>
    )
}

export default ProfileSetup;
