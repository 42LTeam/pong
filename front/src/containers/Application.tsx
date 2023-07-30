import Header from "./header/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SocialBody from "./social/SocialBody";
import SettingsBody from "./settings/SettingsBody";
import {useContext} from "react";
import {ApplicationContext} from "./Auth";
import React from "react";
// @ts-ignore


const PATHS = {
    home: '/',
    chat: '/social',
    settings: '/settings',

};

const Application = function (){
    const user = useContext(ApplicationContext)
    if (!user)
        return (
            <div>
                Ah ouais chaud t'es pas log
            </div>
        );

    return (
        <>
            <BrowserRouter>
                <Header></Header>
                <Routes>
                    <Route index element={"home"} />
                    <Route path={PATHS.chat} element={<SocialBody key="chatbody"/>} />
                    <Route path={PATHS.settings} element={<SettingsBody key="settingsbody"/>} />
                </Routes>
            </BrowserRouter>
        </>
    )

}
export default Application;