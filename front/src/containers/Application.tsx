import Header from "./header/Header";
import {BrowserRouter, Route, Routes, useLocation, useParams} from "react-router-dom";
import SocialBody from "./social/SocialBody";
import {createContext, useContext, useEffect, useState} from "react";
import {AuthContext, User} from "./Auth";

import "../css/notification.css"
import Setting from "./settingspage/Settings";
import ProfilePage from "./profilepage/ProfilePage";
import LeaderboardPage from "./leaderboardpage/LeaderboardPage";
import HomePage from "./HomePage/HomePage";
import Notification from "../components/utils/Notification";
import {socket} from "../api";

type ApplicationEngine = {
    sendNotification: (title: string, content: string, image?: string) => void,
    social: {
        newMessages: any[],
        newConversations: any[]
    }
}

export const ApplicationContext = createContext<ApplicationEngine | undefined>(undefined);


const PATHS = {
    home: '/',
    social: '/social',
    settings: 'settings',
    profile: 'profile',
    leaderboard: 'leaderboard'
};

const Application = function (){
    const user = useContext(AuthContext);
    const [notifications, setNotifications] = useState<any[]>([]);

    const sendNotification = (title: string, content: string, image?: string) => {
        setNotifications([...notifications, {title, content, image}]);
    }

    const [application, setApplication] = useState<ApplicationEngine>({
        sendNotification,
        social: {
            newMessages: [],
            newConversations: [],
        }
    });

    const addMessage = (args) => {
        setApplication(
            {
                ...application,
                social:{
                    newConversations: (application.social.newConversations),
                    newMessages: [...(application.social.newMessages), JSON.parse(args)],
                }
            }
        )
    }

    useEffect(() => {
        const onNewMessage = (args) => {
            addMessage(args);
            if (window.location.pathname != "/social")
                sendNotification(args.message.userId, args.message.content);
        }

        socket.on('new-message', onNewMessage);

        return () => {
            socket.off('new-message', onNewMessage);
        };

    }, []);

    if (!user)
        return (
            <div>
                Ah ouais chaud t'es pas log
            </div>
        );





    if (!application)
        setApplication({
            sendNotification,
            social: {
                newMessages: [],
                newConversations: [],
            }
        })

    return (
        <>
            <BrowserRouter>
                <ApplicationContext.Provider value={application}>
                    <Header></Header>
                    <Routes>
                        <Route index path={PATHS.home} element={<HomePage user={user}/>} />
                        <Route path={PATHS.social} element={<SocialBody key="chatbody"/>} />
                        <Route path={PATHS.settings} element={<Setting />} />
                        <Route path={`${PATHS.profile}/:userID`} element={<ProfilePage />} />
                        <Route path={PATHS.leaderboard} element={<LeaderboardPage />} />
                    </Routes>
                    <div className="notifications">
                        {notifications.map(current => {
                            return (
                                <Notification {...current}></Notification>
                            )
                        })}
                    </div>
                </ApplicationContext.Provider>

            </BrowserRouter>
        </>
    )

}
export default Application;