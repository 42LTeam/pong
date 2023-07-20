import "../css/header.css";
import ChatButton from "../components/ChatButton";
import PlayButton from "../components/PlayButton";
import SettingsButton from "../components/SettingsButton";


const NavigationBubble = () => {
    return (
        <div className="navigation bubble">
            <ChatButton />
            <PlayButton />
            <SettingsButton />
        </div>
    );
};

export default NavigationBubble;