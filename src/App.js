import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Wellcome from "./Pages/Wellcome/Wellcome";
import Authenticate from "./Pages/AuthSteps/Authenticate/Authenticate";
import ProfileSetup from "./Pages/AuthSteps/Activate/ProfileSetup/ProfileSetup";
import Home from "./Pages/Home/Home";
import ChatScreen from "./Pages/ChatScreen/ChatScreen";
import NewChat from "./Pages/NewChat/NewChat";
import Status from "./Pages/Status/Status";
import Profile from "./Pages/Profile/Profile";
import ProfileEdit from "./Pages/Edit/ProfileEdit";
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
import Loader from "./components/shared/Loader/Loader";
import { useConversations } from './contexts/ConversationsProviders';
import { useContacts } from './contexts/ContactsProvider';
import { getConversations, getContacts } from "./http";

import {
  // useDispatch,
  useSelector,
} from "react-redux";

function App() {
  
  //const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading } = useLoadingWithRefresh();
  const { setConversations } = useConversations()
  const { setContacts } = useContacts()
  
    useEffect(() => {
  const fetchContacts = async () => {
            const owner = user.id;
            const { data } = await getContacts({owner});
            setContacts(data);
        };
  const fetchConversations = async () => {
            const owner = user.id;
            const { data } = await getConversations({owner});
            await setConversations(data);
        };
      if(user){
        fetchContacts() 
        fetchConversations()
      }
      }, [user, setConversations, setContacts]);
  return loading ? (
    <Loader message="Loading, please wait.." />
  ) : (
    <BrowserRouter>
      <Switch>
        <GuestRoute path="/" exact>
          <Wellcome />
        </GuestRoute>
        <GuestRoute path="/authenticate">
          <Authenticate />
        </GuestRoute>
                <SemiProtectedRoute path="/activate">
                  <ProfileSetup />
                </SemiProtectedRoute>
                <ProtectedRoute path="/Home">
                  <Home />
                </ProtectedRoute>
                <ProtectedRoute path="/Chat/:id">
                  <ChatScreen />
                </ProtectedRoute>  
                <ProtectedRoute path="/newChat">
                  <NewChat />
                </ProtectedRoute>
                <ProtectedRoute path="/status/:id">
                  <Status />
                </ProtectedRoute>
                <ProtectedRoute path="/profile/:id">
                  <Profile />
                </ProtectedRoute>
                <ProtectedRoute path="/edit/profile">
                  <ProfileEdit />
                </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

const GuestRoute = ({ children, ...rest }) => {
  const { isAuth } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isAuth ? (
          <Redirect
            to={{
              pathname: "/Home",
              state: { from: location },
            }}
          />
        ) : (
          children
        );
      }}
    ></Route>
  );
};
const SemiProtectedRoute = ({ children, ...rest }) => {
  const { isAuth, user } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return !isAuth ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        ) : isAuth && !user.activated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/Home",
              state: { from: location },
            }}
          />
        );
      }}
    ></Route>
  );
};
const ProtectedRoute = ({ children, ...rest }) => {
  const { isAuth, user } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return !isAuth ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        ) : isAuth && !user.activated ? (
          <Redirect
            to={{
              pathname: "/activate",
              state: { from: location },
            }}
          />
        ) : (
          children
        );
      }}
    ></Route>
  );
};

export default App;
