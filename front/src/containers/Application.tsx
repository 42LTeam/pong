import React from "react";
import Header from "./header/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SocialBody from "./social/SocialBody";
import SettingsBody from "./settings/SettingsBody";
import {useContext} from "react";
import {ApplicationContext} from "./Auth";
import React from "react";
import ChatBody from "./ChatBody";
import HomePage from "./HomePage"
import ProfilePage from "./ProfilePage";
// @ts-ignore


const PATHS = {
    chat: 'chat',
    home: '/',
    settings: 'settings',
    profile: 'profile'
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
            <Header user={user}></Header>
                <Routes>
                    <Route path={PATHS.chat} element={<ChatBody user={user}/>} />
                    <Route path={PATHS.home} element={<HomePage user={user}/>} />
                    <Route path={PATHS.settings} element={"settings"} />
                    <Route path={PATHS.profile} element={<ProfilePage user={user}/>} />
                    <Route path={PATHS.chat} element={<SocialBody key="chatbody"/>} />
                </Routes>
            </BrowserRouter>
        </>
    )

}
export default Application;