import Header from "./Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ChatBody from "./ChatBody";
import React from "react";
// @ts-ignore


const PATHS = {
    chat: 'chat',
    settings: 'settings',
};

const Application = function ({user}){



    return (
        <>
        
            <BrowserRouter>
            <Header user={user}></Header>
                <Routes>
                    <Route index element={"home"} />
                    <Route path={PATHS.chat} element={<ChatBody user={user}/>} />
                    <Route path={PATHS.settings} element={"settings"} />
                </Routes>
            </BrowserRouter>
        </>
    )

}
export default Application;