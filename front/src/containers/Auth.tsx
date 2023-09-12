import { createContext, useEffect, useState } from "react";

import { authSocketId, getStatus, socket } from "../api";
import Application from "./Application";
import "../css/main.css";
import DoubleAuth from "./DoubleAuth";
import PopOver from "../components/utils/PopOver";
import Button from "../components/utils/Button";

export interface User {
  avatar: String;
  username: String;
  status: String,
  id: number;
  xp: number;
  pointAverage: number;
  ratio: number;
  playedMatch: boolean;
  leaderboard: boolean;
  secretO2FA: boolean;
  colorball: string;
  blockList?: number[];
  friendList?: number[];
}

export const AuthContext = createContext<User | undefined>(undefined);

function Auth() {
  const [wsConnected, setConnected] = useState(false);
  const [destination, setDestination] = useState(null);
  const [user, setUser] = useState<User>(null);
  const URL = (import.meta.env.VITE_API_URL || 'http://localhost') + ':3000';

  useEffect(() => {
    if (!user)
      getStatus()
        .then(function (response) {
          setUser(response.data.user);
          setDestination(response.data.destination);
        })
        .catch(function () {
          window.location.replace(URL + '/auth/login');
        });
  }, []);


  console.log('auth',import.meta.env.BASE_URL);
  useEffect(() => {
    function onDisconnect() {
      setConnected(false)
    }
    function onConnect() {
      setConnected(true);
        authSocketId(socket.id).then((response) => {
          socket.emit("register", { target: response.data });
          console.log('register');
        });
    }

    socket.on("disconnect", onDisconnect);
    socket.on("connect", onConnect);




    return () => {
      socket.off("disconnect", onDisconnect);
      socket.off("connect", onConnect);
    };
  }, [user]);


  if (!user) return null;

  return (
    <AuthContext.Provider value={user}>
      <Application>
        {destination == "2fa" ? (
          <DoubleAuth setDestination={setDestination}></DoubleAuth>
        ) : null}
      </Application>
      {!wsConnected && Boolean(user) ?
          <PopOver clear={null}>
            <h1>Deconnecter</h1>
            <h3>Vous ne pouvez avoir qu'un seul onglet a la fois.</h3>
            <Button handleClick={() => window.location.reload()} text="Reprendre le controle" clickable></Button>
          </PopOver>
          :
          null
      }
    </AuthContext.Provider>
  );
}

export default Auth;
