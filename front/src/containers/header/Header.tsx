import "../../css/header.css"
import UserBubble from "./UserBubble";
import {useLocation} from "react-router-dom";
import Chat from "../../components/svg/Chat";
import Play from "../../components/svg/Play";
import Settings from "../../components/svg/Settings";

// @ts-ignore

const Header = function({user}) {
    const location = useLocation();

    const { hash, pathname, search } = location;

    return (
        <div className="header">
            <div className="header-title">Transendance</div>
            <div className="bubble header-tabs">
                <Chat url="/chat" color="#7F8C8D"></Chat>
                <Play url="/" color="#7F8C8D"></Play>
                <Settings color="#7F8C8D"></Settings>
            </div>
            <UserBubble user={user}></UserBubble>

        </div>
    )
}



export default Header;