import {useEffect, useState} from 'react'
// @ts-ignore
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

import './index.css'
import Leaderboard from './Leaderboard';
import SkinPage from './SkinPage';
import HomePageReal from './HomePageReal';
import Home from './ui/templates/Home';
import Auth from './Auth';
import { Paths } from './technical/paths';
import ProfilePage from './ProfilePage';
import SettingPage from './SettingPage';
import Chat from './ChatPage';


import axios from "axios";
import {socket} from "./socket";

const SomeRoutes = () => {

    const [logged, setLogged] = useState(false);


    useEffect(() => {
        var config = {
            method: 'get',
            url: 'http://localhost:3000/auth/status',
            withCredentials: true,
        };

        axios(config)
            .then(function (response) {
                setLogged(response.data == 'ok');

            })
            .catch(function () {
                window.location.replace("http://localhost:3000/auth/login");
            });
    },[logged])

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


    }, [logged]);


    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={Paths.home} element={<Home />}>
                        <Route index element={<HomePageReal />} />
                        <Route path={Paths.leaderboard} element={<Leaderboard />} />
                        <Route path={Paths.skins} element={<SkinPage />} />
                        <Route path={Paths.profile} element={<ProfilePage />} />
                        <Route path={Paths.settings} element={<SettingPage />} />
                        <Route path={Paths.chat} element={<Chat />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )

}


ReactDOM.createRoot(document.getElementById('root')).render(
    <Auth>
      <SomeRoutes />
    </Auth>
);