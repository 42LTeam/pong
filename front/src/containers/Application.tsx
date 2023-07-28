import Header from "./header/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ChatBody from "./chat/ChatBody";
import {useContext} from "react";
import {ApplicationContext} from "./Auth";
// @ts-ignore


const PATHS = {
    home: '/',
    chat: '/chat',

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
                    <Route index element={"home"} />
                    <Route path={PATHS.chat} element={<ChatBody key="chatbody"/>} />
                </Routes>
            </BrowserRouter>
        </>
    )

}
export default Application;