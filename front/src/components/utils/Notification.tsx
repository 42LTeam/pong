import "../../css/notification.css"
import Cross from "../svg/Cross";


export default function Notification (props) {
    return (
        <div className="bubble notification">
            {props.image ?
                (<img className="notification-image" src={props.image}/>)
            :
            null}
            <div className="column align-start grow notification-content">
                <div className="row grow">
                    <h1>{props.title}</h1>
                    <Cross ></Cross>
                </div>
                <h3 className="notification-content">{props.content}</h3>

            </div>
        </div>
    );
}