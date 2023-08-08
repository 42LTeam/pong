import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";

import { ApplicationContext } from "./Auth";
import Header from "../header/Header";
import HomePage from "../homepage/HomePage";
import ProfilePage from "../profilepage/ProfilePage";
import LeaderboardPage from "../leaderboardpage/LeaderboardPage";
import ChatBody from "../socialpage/ChatBody";
import Setting from "../settingspage/Settings";
// @ts-ignore

const PATHS = {
    social: 'social',
    home: '/',
    settings: 'settings',
    profile: 'profile',
    leaderboard: 'leaderboard'
};

const Application = function () {
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
                    <Route path={PATHS.social} element={<ChatBody user={user}/>} />
                    <Route path={PATHS.home} element={<HomePage user={user}/>} />
                    <Route path={PATHS.settings} element={<Setting />} />
                    <Route path={PATHS.profile} element={<ProfilePage user={user}/>} />
                    <Route path={PATHS.leaderboard} element={<LeaderboardPage user={user}/>} />
                </Routes>
            </BrowserRouter>
        </>
    )

}
export default Application;