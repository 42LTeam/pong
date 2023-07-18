import Header from "./Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ChatBody from "./ChatBody";
// @ts-ignore


const PATHS = {
    chat: 'chat',

};

const Application = function ({user}){



    return (
        <>
            <Header user={user}></Header>
            <BrowserRouter>
                <Routes>
                    <Route index element={"home"} />
                    <Route path={PATHS.chat} element={<ChatBody />} />
                </Routes>
            </BrowserRouter>
        </>
    )

}
export default Application;