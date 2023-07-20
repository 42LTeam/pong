import Header from "./Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ChatBody from "./ChatBody";
import HomePage from "./HomePage"
import React from "react";
// @ts-ignore


const PATHS = {
    chat: 'chat',
    home: '/'

};


const Application = function ({user}){



    return (
        <>
            <Header user={user}></Header>
            <BrowserRouter>
                <Routes>
                    <Route path={PATHS.chat} element={<ChatBody user={user}/>} />
                    <Route path={PATHS.home} element={<HomePage user={user}/>} />
                </Routes>
            </BrowserRouter>
        </>
    )

}
export default Application;