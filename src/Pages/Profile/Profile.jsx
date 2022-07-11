import * as React from "react";
import { useHistory, useParams } from "react-router-dom";
import { getUser, logout } from "../../http";
import { useDispatch } from "react-redux";
import Loader from "../../components/shared/Loader/Loader";
import { setAuth } from '../../store/authSlice';

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [profile, setProfile] = React.useState([]);
  React.useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await getUser({ id });
      setProfile(data);
    };
    fetchProfile();
  }, [id]);
  const history = useHistory();
  async function logoutUser() {
        try {
            const { data } = await logout();
            dispatch(setAuth(data));
        } catch (err) {
            console.log(err);
        }
    }
  if(profile.length === 0){
    return <Loader message="Fetching Profile Data" />
  }else{
  return (
    <>
      <div class="h-screen w-full bg-slate-300">
        <div class="flex justify-between items-center px-5 py-3 bg-slate-200 rounded-b-[25px]">
          <ion-icon
            onClick={(e) => history.push("/")}
            class="text-2xl cursor-pointer"
            name="arrow-back-outline"
          ></ion-icon>
          <h1 class="text-xl text-black font-bold">Profile</h1>
          <ion-icon
            onClick={logoutUser}
            class="text-2xl text-red-500 cursor-pointer"
            name="log-out-outline"
          ></ion-icon>
        </div>
        <div class="main py-5">
          <div class="flex-col justify-center text-center w-[90%] mx-auto max-w-[400px] min-w-[300px] min-h-[300px] bg-slate-200 rounded-2xl shadow-xl p-4">
            <div class="flex justify-center items-center text-center">
             {/*<div className={`w-[100px] h-[100px] border-[3px] p-[2px] border`}></div>*/}
              <img
                class="w-[100px] h-[100px] border-[3px] p-[2px] border-blue-500 rounded-full shadow-xl shadow-slate-400 object-cover"
                src={
                  profile.user
                    ? `${process.env.REACT_APP_API_URL}/api/avatar?id=${profile.user.id}`
                    : null
                }
                alt=""
              /> 
            </div>
            <div class="flex justify-center items-center text-md pt-4">
              <h1 class="mr-2 text-md">
                {profile.user ? profile.user.name : null}
              </h1>
              <ion-icon
                onClick={(e) => history.push("/edit/profile")}
                class="text-orange-500 cursor-pointer"
                name="create-outline"
              ></ion-icon>
            </div>
            <p class="text-slate-600 text-sm mt-1">
              {profile.user ? profile.user.email : null}
            </p>
            <h1 class="font-bold text-md text-blue-500 mt-2">About</h1>
            <p class="text-sm text-slate-500">
              I am noobla programmer and i love programing, and i am a idiot.
            </p>
          </div>
          <div class="flex justify-between items-center text-center w-[90%] mx-auto max-w-[400px] min-w-[300px] min-h-[75px] bg-slate-200 rounded-2xl shadow-xl mt-4 px-6 py-4">
            <div class="flex-col justify-start items-center">
              <h1 class="text-xl w-max font-bold">Share your profile</h1>
              <p class="text-xs text-slate-600">
                Whatsapp, Facebook, Instagram
              </p>
            </div>
            <div class="flex justify-center items-center pr-3">
              <ion-icon
                class="text-3xl text-yellow-500 font-bold cursor-pointer"
                name="share-social-outline"
              ></ion-icon>
            </div>
          </div>
          <div class="flex justify-between items-center text-center w-[90%] mx-auto max-w-[400px] min-w-[300px] min-h-[75px] bg-slate-200 rounded-2xl shadow-xl mt-4 px-6 py-4">
            <div class="flex-col justify-start items-center">
              <h1 class="text-xl w-max font-bold">Invite Friend!</h1>
              <p class="text-xs text-slate-600">
                Whatsapp, Facebook, Instagram
              </p>
            </div>
            <div class="flex justify-center items-center pr-3">
              <ion-icon
                class="text-3xl text-orange-500 font-bold cursor-pointer"
                name="person-add"
              ></ion-icon>
            </div>
          </div>
          <div class="flex-col justify-center items-center text-center w-[90%] mx-auto max-w-[400px] min-w-[300px] min-h-[75px] bg-slate-200 rounded-2xl shadow-xl mt-4 px-6 py-4">
            <div class="flex justify-center items-center text-center">
              <img
                class="w-[50px] h-[50px] border-[3px] p-[2px] border-blue-500 rounded-full shadow-xl shadow-slate-400 object-cover"
                src={`${process.env.REACT_APP_API_URL}/storage/1640494556060-25334830.png`}
                alt=""
              />
            </div>
            <div class="flex-col justify-center items-center">
              <h1 class="text-sm font-bold text-black mt-2">
                Creator & Founder
              </h1>
              <h1 class="text-md font-bold text-black cursor-pointer">
                Pranav Bhatkar
              </h1>
              <p class="text-sm text-slate-500 mt-1">
                This app is created with ❤️
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  }
};

export default Profile;
