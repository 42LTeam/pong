import Header from "./header/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SocialBody from "./social/SocialBody";
import {createContext, useContext, useEffect, useState} from "react";
import {AuthContext} from "./Auth";

import "../css/notification.css"
import Setting from "./settingspage/Settings";
import ProfilePage from "./profilepage/ProfilePage";
import LeaderboardPage from "./leaderboardpage/LeaderboardPage";
import HomePage from "./HomePage/HomePage";
import Notification from "../components/utils/Notification";
import GamePage from "./gamepage/GamePage"
import {socket} from "../api";

type ApplicationEngine = {
    sendNotification: (key: number, title: string, content: string, image?: string, url?: string) => void,
    clearMessage: (toClear: any[]) => void,
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
    leaderboard: 'leaderboard',
    game: '/game'
};

const Application = function (){
    const user = useContext(AuthContext);
    const [notifications, setNotifications] = useState<any[]>([]);

    const sendNotification = (key: any, title: string, content: string, image?: string, url?: string) => {
        setNotifications([...notifications, {key, title, content, image, url}]);
    }

    const clearMessage = (toAdd) => {
        setApplication({
            ...application,
            social: {
                ...application.social,
                newMessages: application.social.newMessages.filter(c => !toAdd.includes(c)),
            }
        })
    };

    const [application, setApplication] = useState<ApplicationEngine>({
        sendNotification,
        clearMessage,
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
                    newMessages: [...(application.social.newMessages), (args)],
                }
            }
        )
    }

    const addChannel = (args) => {
        setApplication(
            {
                ...application,
                social:{
                    newMessages: (application.social.newConversations),
                    newConversations: [...(application.social.newMessages), (args)],
                }
            }
        )
    }


    useEffect(() => {
        const onNewMessage = (args) => {
            addMessage(args);
            if (!window.location.pathname.includes("/social"))
                sendNotification(args.id+'message', args.user.username, args.content, args.user.avatar, "/social/" + args.channelId);
        }

        const onNewChannel = (args) => {
            addChannel(args);
            if (!window.location.pathname.includes("/social"))
                sendNotification(args.channelId+'channel', args.creator.username + ' vous a ajouter a un channel', args.users.map(u => u.username).join(', '), args.creator.avatar, "/social/" + args.channelId);
        }

        const onInviteGame = (args) => {
            console.log(args[1].id, args[0].username + " invite " + args[1].username, "to play a Pong game", args[0].avatar, "/game");
            if (!window.location.pathname.includes("/game"))
                sendNotification(args[1].id, args[0].username + " invite " + args[1].username, "to play a Pong game", args[0].avatar, "/game");
        }

        socket.on('new-message', onNewMessage);
        socket.on('new-channel', onNewChannel);
        socket.on('invite-game', onInviteGame);

        return () => {
            socket.off('new-channel', onNewChannel);
            socket.off('new-message', onNewMessage);
            socket.off('invite-game', onInviteGame);
        };

    }, [notifications]);


    const handleNotificationClick = (url) => {
        setNotifications([...notifications.filter(current => current.url != url)]);
    }

    if (!user)
        return (
            <div>
                Ah ouais chaud t'es pas log
            </div>
        );

    if (!application)
        setApplication({
            sendNotification,
            clearMessage,
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
                        <Route path={PATHS.social+'/:channelId?'} element={<SocialBody key="chatbody"/>} />
                        <Route path={PATHS.settings} element={<Setting />} />
                        <Route path={`${PATHS.profile}/:userID`} element={<ProfilePage />} />
                        <Route path={PATHS.leaderboard} element={<LeaderboardPage />} />
                        <Route path={PATHS.game} element={<GamePage />} />
                    </Routes>
                    <div className="notifications">
                        {notifications.reverse().map(current => {
                            return (
                                <Notification {...current} close={handleNotificationClick} ></Notification>
                            )
                        })}
                    </div>
                </ApplicationContext.Provider>

            </BrowserRouter>
        </>
    )

}
export default Application;