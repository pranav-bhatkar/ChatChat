import * as React from "react";
import Input from "../../components/shared/Input/Input";
import { useHistory } from "react-router-dom";

const ProfileEdit = () => {
  const history = useHistory();

  return (
    <>
      <div className="h-screen w-full bg-slate-300">
        <div className="flex text-2xl justify-between items-center px-5 py-3 bg-slate-200 rounded-b-[25px]">
          <ion-icon
            onClick={(e) => history.push("/profile/is8eie8iej")}
            className="cursor-pointer"
            name="arrow-back-outline"
          ></ion-icon>
          <h1 className="text-xl text-black font-bold">Profile</h1>
          <div className="font-bold text-blue-500 cursor-pointer">
            <ion-icon
              onClick={(e) => history.push("/profile/is8eie8iej")}
              name="checkmark"
            ></ion-icon>
          </div>
        </div>
        <div className="main py-5">
          <div className="flex-col justify-center text-center w-[90%] mx-auto max-w-[400px] min-w-[300px] min-h-[300px] bg-slate-200 rounded-2xl shadow-xl p-4">
            <div className="flex justify-center items-center text-center py-2">
              <img
                className="w-[100px] h-[100px] border-[3px] p-[2px] border-blue-500 rounded-full shadow-xl shadow-slate-400 object-cover"
                src="../../images/profile-1.jpg"
                alt=""
              />
            </div>

            <Input label="Name" placeholder="Elon Musk" />
            <Input label="About" placeholder="Engineer" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
