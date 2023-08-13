import {Children} from "react";
import Avatar from "../utils/Avatar";
import ContextMenu from "../utils/ContextMenu";

type Props = {
    friend: any,
    onClick?: any,
    children?: any,
}

export default function Friend(props: Props){



    return (
        <ContextMenu>
            <div onClick={() => {props.onClick ? props.onClick(props.friend) : null}} className="friend">
                <Avatar width="48px" height="48px" url={props.friend?.avatar}></Avatar>

                <div className="conversation-content">
                    <div className="conversation-username">{props.friend?.username}</div>
                    <div className="conversation-preview">{props.friend?.status}</div>
                </div>
                {Children.map(props.children, child => <>{child}</>)}

            </div>
        </ContextMenu>

    )
}