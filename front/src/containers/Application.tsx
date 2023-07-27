import React from "react";
import Header from "./Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
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


const Application = function ({user}){



    return (
        <>

            <BrowserRouter>
            <Header user={user}></Header>
                <Routes>
                    <Route path={PATHS.chat} element={<ChatBody user={user}/>} />
                    <Route path={PATHS.home} element={<HomePage user={user}/>} />
                    <Route path={PATHS.settings} element={"settings"} />
                    <Route path={PATHS.profile} element={<ProfilePage user={user}/>} />
                </Routes>
            </BrowserRouter>
        </>
    )

}
export default Application;