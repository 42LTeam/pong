import  {useEffect, useState} from 'react';


import axios from "axios";
import {socket} from "../api";
import Application from "./Application";


function Auth() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        var config = {
            method: 'get',
            url: 'http://localhost:3000/auth/status',
            withCredentials: true,
        };

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
            const config = {
                method: 'get',
                url: 'http://localhost:3000/auth/socketId',
                withCredentials: true,
                headers: {
                    clientsocketid: socket.id,
                }
            };
            if (user)
                axios(config).then((response) => {
                    socket.emit('register', {target: response.data});
                });
        }


        socket.on('disconnect', onDisconnect);
        socket.on('connect', onConnect);

        return () => {
            socket.off('disconnect', onDisconnect);
            socket.off('connect', onConnect);
        };


    }, [user]);



    return (
        <>
            <Application user={user}></Application>
        </>
    );
}

export default Auth