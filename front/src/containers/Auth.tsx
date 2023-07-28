import {createContext, useEffect, useState} from 'react';


import axios from "axios";
import {socket} from "../api";
import Application from "./Application";
import "../css/main.css";


export interface User {
    avatar: String,
    username: String,
    id: number,
}

export const ApplicationContext = createContext<User | undefined>(undefined);

function Auth() {
    const [wsConnected, setConnected] = useState(false);

    const [user, setUser] = useState<User>(null);

    useEffect(() => {
        var config = {
            method: 'get',
            url: 'http://localhost:3000/auth/status',
            withCredentials: true,
        };
        if (!user)
        axios(config)
            .then(function (response) {
                setUser(response.data)

            })
            .catch(function () {
                window.location.replace("http://localhost:3000/auth/login");
            });
    },[user])

    useEffect(() => {


        function onDisconnect() {
            alert('deco mon reuf')
        }
        function onConnect() {
            setConnected(true);
        }

        socket.on('disconnect', onDisconnect);
        socket.on('connect', onConnect);

        return () => {
            socket.off('disconnect', onDisconnect);
            socket.off('connect', onConnect);
        };

    }, [wsConnected]);
    const config = {
        method: 'get',
        url: 'http://localhost:3000/auth/socketId',
        withCredentials: true,
        headers: {
            clientsocketid: socket.id,
        }
    };
    if (user && wsConnected)
        axios(config).then((response) => {
            socket.emit('register', {target: response.data});
        });


    return (
        <ApplicationContext.Provider value={user}>
            <Application></Application>
        </ApplicationContext.Provider>
    );
}

export default Auth