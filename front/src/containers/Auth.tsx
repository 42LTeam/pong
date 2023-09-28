import { createContext, useContext, useEffect, useState } from "react";

import { authSocketId, getStatus, socket } from "../api";
import Application from "./Application";
import "../css/main.css";
import DoubleAuth from "./DoubleAuth";
import PopOver from "../components/utils/PopOver";
import Button from "../components/utils/Button";
import React from "react";

export interface User {
  avatar: string;
  username: String;
  status: String;
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
const RerenderContext = createContext(undefined);

export function useRerender() {
  return useContext(RerenderContext);
};



function Auth() {
  const [wsConnected, setConnected] = useState(false);
  const [destination, setDestination] = useState(null);
  const [user, setUser] = useState<User>(null);
  const [rerender, setRerender] = useState(false);
  const URL = "/api";

  const forceRerender = () => {
    setRerender(!rerender);

  };

  useEffect(() => {
    if (!user)
      getStatus()
        .then(function (response) {
          socket.connect();
          setUser(response.data.user);
          setDestination(response.data.destination);
        })
        .catch(function () {
          window.location.replace(URL + "/auth/login");
        });
  }, []);


  useEffect(() => {
    function onDisconnect() {
      setConnected(false);
    }
    function onConnect() {
      setConnected(true);

      authSocketId(socket.id).catch(err => {return;}).then((response) => {
        socket.emit("register", { target: response.data });

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
      <RerenderContext.Provider value={forceRerender}>
        <Application>
          {destination == "2fa" ? (
            <DoubleAuth setDestination={setDestination}></DoubleAuth>
          ) : null}
        </Application>
        {!wsConnected && Boolean(user) ? (
          <PopOver clear={null}>
            <h1>Deconnecter</h1>
            <h3>Vous ne pouvez avoir qu'un seul onglet a la fois.</h3>
            <Button
              handleClick={() => window.location.reload()}
              text="Reprendre le controle"
              clickable
            ></Button>
          </PopOver>
        ) : null}
      </RerenderContext.Provider>
    </AuthContext.Provider>
  );
}

export default Auth;
