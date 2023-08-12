import {createContext, useEffect, useState} from 'react';


import {authSocketId, getStatus, socket} from "../api";
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
    const localhostback = process.env.LOCALHOST ? process.env.LOCALHOST + ':3000/auth/login' : 'http://localhost:3000/auth/login';
    useEffect(() => {
        if (!user)
        getStatus()
            .then(function (response) {
                setUser(response.data)

            })
            .catch(function () {
                window.location.replace(localhostback);
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

    if (user && wsConnected)
        authSocketId(socket.id).then((response) => {
            socket.emit('register', {target: response.data});
        });


    return (
        <ApplicationContext.Provider value={user}>
            <Application></Application>
        </ApplicationContext.Provider>
    );
}

export default Auth