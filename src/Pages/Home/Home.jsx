import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import CameraTab from "./CameraTab/CameraTab";
import { useHistory } from "react-router-dom";
import ChatsTab from "./ChatsTab/ChatsTab";
//import StatusTab from './StatusTab/StatusTab';
//import CallsTab from './CallsTab/CallsTab';
import {
  //useDispatch,
  useSelector,
} from "react-redux";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className="bg-gray-"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function Home() {
  const history = useHistory();
  const navRef = React.useRef();
  const topNavRef = React.useRef();
  const navHeadingRef = React.useRef();
  const { user } = useSelector((state) => state.auth);
  const [value, setValue] = React.useState(1);
  const [height, setHeight] = React.useState();
  const [searchMode, setSearchMode] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [camera, setCamera] = React.useState("environment");
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const toggleSearchMode = () => {
    if (searchMode) {
      setSearchMode(false);
    } else {
      setSearchMode(true);
    }
  };
  const getListSize = () => {
    const newHeight1 = navRef.current.clientHeight;
    const newHeight2 = navHeadingRef.current.clientHeight;
    const newHeight3 = topNavRef.current.clientHeight;
    setHeight(newHeight1 + newHeight2 + newHeight3);
  };

  React.useEffect(() => {
    getListSize();
  }, []);
  return (
    <>
      <div className="h-screen w-full bg-slate-300">
        <div
          ref={topNavRef}
          className={`flex justify-between items-center px-5 py-3 bg-slate-200 rounded-b-[25px] shadow shadow-slate-400 transition-[1s] ${
            value === 0 ? "translate-y-[-100%]" : ""
          }`}
        >
          {searchMode ? (
            <div className="h-8 w-full px-3 flex justify-center items-center">
              <input
                className={`w-full py-2 px-6 rounded-full bg-slate-400/50 shadow-sm outline-none`}
                placeholder={`Search`}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          ) : (
            <>
              <img
                onClick={(e) => history.push(`/profile/${user.id}`)}
                className="w-8 h-8 rounded-full object-cover"
                src={
                  user.id
                    ? `${process.env.REACT_APP_API_URL}/api/avatar?id=${user.id}`
                    : null
                }
                alt="avatar"
              />
              <h1 className="text-xl text-black font-bold transition-[0.5s]">
                {value === 0
                  ? "Camera"
                  : value === 1
                  ? "Chats"
                  : value === 2
                  ? "Moments"
                  : value === 3
                  ? "Calls"
                  : ""}
              </h1>
            </>
          )}
          <div className="text-2xl flex">
            {searchMode ? (
              <ion-icon
                onClick={(e) => toggleSearchMode()}
                name="close"
              ></ion-icon>
            ) : (
              <ion-icon
                onClick={(e) => toggleSearchMode()}
                name="search"
              ></ion-icon>
            )}
          </div>
        </div>
        <div className="w-full">
          <div
            ref={navHeadingRef}
            className={`w-full transition-[1s] ${value === 0 ? "hidden" : ""}`}
          >
            <h1 className="text-slate-600 text-lg font-bold ml-5 py-2 ">
              {value === 0
                ? "Camera"
                : value === 1
                ? "Conversation"
                : value === 2
                ? "Moments"
                : value === 3
                ? "Call History"
                : ""}
            </h1>
          </div>
          <div
            className={`w-full h-[calc(100vh-${height}px)] overflow-y-scroll scroll-smooth`}
          >
            <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
              <TabPanel value={value} index={0}>
                {value === 0 ? <CameraTab camera={camera} /> : null}
              </TabPanel>
              <TabPanel value={value} index={1}>
                <ChatsTab searchTerm={searchTerm} />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <div className="w-full h-screen flex justify-center items-center">
                  <p className="text-xl text-slate-600 font-bold">
                    Coming Soon as possible...!
                  </p>
                </div>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <div className="w-full h-screen flex justify-center items-center">
                  <p className="text-xl text-slate-600 font-bold">
                    Coming Soon as possible...!
                  </p>
                </div>
              </TabPanel>
            </SwipeableViews>
          </div>
          {value === 1 ? (
            <div className="absolute bottom-[10%] right-5 w-[50px] h-[50px] bg-black flex justify-center items-center text-2xl text-white rounded-full">
              <ion-icon
                onClick={(e) => history.push("/newChat")}
                name="person-add-outline"
              ></ion-icon>
            </div>
          ) : null}
          <div
            ref={navRef}
            className={`fixed bottom-0 left-0 right-0 w-full h-[65px] bg-slate-200 flex justify-center rounded-t-[20px] items-center transition-[1s] translate-y-[0%] ${
              value === 0 ? "translate-y-[200%]" : ""
            }`}
          >
            <ul className="flex w-[90%]">
              <li
                onClick={(e) => setValue(0)}
                className={value === 0 ? "my-list active" : "my-list"}
              >
                <div className="relative w-full flex justify-center items-center flex-col">
                  <span className="my-icon text-2xl leading-[65px] my-active-icon">
                    <ion-icon className="" name="camera-outline"></ion-icon>
                  </span>
                  <span className="my-text ">Camera</span>
                </div>
              </li>
              <li
                onClick={(e) => setValue(1)}
                className={value === 1 ? "my-list active" : "my-list"}
              >
                <div className="relative w-full flex justify-center items-center flex-col">
                  <span className="my-icon text-2xl leading-[65px]">
                    <ion-icon className="" name="chatbubble-outline"></ion-icon>
                  </span>
                  <span className="my-text absolute text-black text-sm tracking-wider mt-1 opacity-0 translate-y-[20px] transition-[0.5s]">
                    Chats
                  </span>
                </div>
              </li>
              <li
                onClick={(e) => setValue(2)}
                className={value === 2 ? "my-list active" : "my-list"}
              >
                <div className="relative w-full flex justify-center items-center flex-col">
                  <span className="my-icon text-2xl leading-[65px]">
                    <ion-icon name="aperture-outline"></ion-icon>
                  </span>
                  <span className="my-text absolute text-black text-sm tracking-wider mt-1 opacity-0 translate-y-[20px] transition-[0.5s]">
                    Moments
                  </span>
                </div>
              </li>
              <li
                onClick={(e) => setValue(3)}
                className={value === 3 ? "my-list active" : "my-list"}
              >
                <div className="relative w-full flex justify-center items-center flex-col">
                  <span className="my-icon text-xl leading-[65px]">
                    <ion-icon className="" name="call-outline"></ion-icon>
                  </span>
                  <span className="my-text absolute text-black text-sm tracking-wider mt-1 opacity-0 translate-y-[20px] transition-[0.5s]">
                    Calls
                  </span>
                </div>
              </li>
              <div className="my-indicator"></div>
            </ul>
          </div>
          <div
            className={`fixed bottom-0 left-0 right-0 w-full h-[65px] bg-slate-200 flex justify-center rounded-t-[100%] items-center transition-[1s] translate-y-[200%] ${
              value === 0 ? "translate-y-[0]" : ""
            }`}
          >
            <div className="relative w-full h-full flex justify-center">
              <button className="group absolute w-16 h-16 bg-slate-200 top-[-50%] rounded-full flex justify-center items-center shadow shadow-slate-600 focus:bg-slate-300">
                <ion-icon
                  className="text-4xl scale-100 group-focus:scale-125 transition-[0.5s]"
                  name="camera-outline"
                ></ion-icon>
              </button>
              <button
                onClick={(e) =>
                  camera === "environment"
                    ? setCamera("user")
                    : camera === "user"
                    ? setCamera("environment")
                    : null
                }
                className="group absolute w-8 h-8 bg-slate-200 top-[0%] right-5 rounded-full flex justify-center items-center shadow shadow-slate-600 focus:bg-slate-300"
              >
                <ion-icon
                  className="text-4xl scale-100 group-focus:scale-125 transition-[0.5s]"
                  name="sync-outline"
                ></ion-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
