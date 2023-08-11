import Header from "./header/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SocialBody from "./social/SocialBody";
import {useContext} from "react";
import {ApplicationContext} from "./Auth";


import Setting from "./settingspage/Settings";
import ProfilePage from "./profilepage/ProfilePage";
import LeaderboardPage from "./leaderboardpage/LeaderboardPage";
import HomePage from "./HomePage/HomePage";


const PATHS = {
    home: '/',
    social: '/social',
    settings: 'settings',
    profile: 'profile',
    leaderboard: 'leaderboard'
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
                    <Route index path={PATHS.home} element={<HomePage user={user}/>} />
                    <Route path={PATHS.social} element={<SocialBody key="chatbody"/>} />
                    <Route path={PATHS.settings} element={<Setting />} />
                    <Route path={`${PATHS.profile}/:userID`} element={<ProfilePage />} />
                    <Route path={PATHS.leaderboard} element={<LeaderboardPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )

}
export default Application;