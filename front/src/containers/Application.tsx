import React from "react";
import Header from "./header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SocialBody from "./social/SocialBody";
import SettingsBody from "./settings/SettingsBody";
import { useContext } from "react";
import { ApplicationContext } from "./Auth";
import HomePage from "./HomePage"
import ProfilePage from "./ProfilePage";
import LeaderboardPage from "./LeaderboardPage";
import ChatBody from "./ChatBody"
// @ts-ignore



const PATHS = {
    social: '/social',
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
                    <Route path={PATHS.settings} element={"settings"} />
                    <Route path={PATHS.profile} element={<ProfilePage user={user}/>} />
                    <Route path={PATHS.leaderboard} element={<LeaderboardPage user={user}/>} />
                </Routes>
            </BrowserRouter>
        </>
    )

}
export default Application;