import Header from "./header/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ChatBody from "./chat/ChatBody";
// @ts-ignore


const PATHS = {
    home: '/',
    chat: '/chat',

};

const Application = function ({user}){

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
                    <Route index element={"home"} />
                    <Route path={PATHS.chat} element={<ChatBody key="chatbody" user={user}/>} />
                </Routes>
            </BrowserRouter>
        </>
    )

}
export default Application;