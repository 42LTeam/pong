import Header from "./header/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Body from "./social/Body";
import {useContext} from "react";
import {ApplicationContext} from "./Auth";



const PATHS = {
    home: '/',
    chat: '/social',

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
                    <Route index element={"Home"} />
                    <Route path={PATHS.chat} element={<Body key="chatbody"/>} />
                </Routes>
            </BrowserRouter>
        </>
    )

}
export default Application;