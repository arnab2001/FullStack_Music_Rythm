import LoginButton from "./Components/login-button";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./Components/logout-button";
import SignupButton from "./Components/signup-button";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const EndPoint = "http://localhost:5000";
var socket;

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
 

  useEffect(() => {
    socket = io(EndPoint);
    if (user) {
      socket.emit("setup", user);
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return isAuthenticated ? (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <LogoutButton />
    </div>
  ) : (
    <div className="App">
      Learn React
      <LoginButton />
      <SignupButton />
    </div>
  );
}

export default App;
