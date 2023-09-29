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
  const [user, setUser] = useState<User | null>(null);  // Ensure user is initially null
  const URL = "/api";

  useEffect(() => {
    getStatus()
      .then(response => {
        socket.connect();
        setUser(response.data.user);
        setDestination(response.data.destination);
      })
      .catch(() => {
        // handle error
      });
  }, []);

  useEffect(() => {
    const onDisconnect = () => setConnected(false);
    const onConnect = () => {
      setConnected(true);
      authSocketId(socket.id)
        .then(response => {
          socket.emit("register", { target: response.data });
        })
        .catch(() => {
          // handle error
        });
    };

    socket.on("disconnect", onDisconnect);
    socket.on("connect", onConnect);

    return () => {
      socket.off("disconnect", onDisconnect);
      socket.off("connect", onConnect);
    };
  }, [user]);

  if (!user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Button
          handleClick={() => window.location.replace(URL + "/auth/login")}
          text="Login"
          clickable
        />
      </div>
    );
  }
  

  return (
    
    <AuthContext.Provider value={user}>
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
    </AuthContext.Provider>
  );
}

export default Auth;
