import "../css/header.css"
import UserBubble from "../components/UserBubble";
export default function Header(props) {
    return (
        <div className="header">
            <div className="header-title">Transendance</div>
            <UserBubble username={props.user?.username}></UserBubble>
        </div>
    )
}