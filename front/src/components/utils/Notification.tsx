import "../../css/notification.css"
import Cross from "../svg/Cross";
import {useNavigate} from "react-router-dom";


export default function Notification (props) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(props.url);
        props.close(props.url);
    }

    return (
        <div className="bubble notification" onClick={handleClick}>
                {props.image ?
                    (<img alt="notification image" className="notification-image" src={props.image}/>)
                    :
                    null}
                <div className="column align-start grow notification-content">
                    <div className="row grow">
                        <h1>{props.title}</h1>
                        <Cross handleClick={(event) => {
                            event.stopPropagation();
                            props.close(props.url);
                        }}></Cross>
                    </div>
                    <h3 className="notification-content">{props.content}</h3>
                </div>
        </div>

    );
}