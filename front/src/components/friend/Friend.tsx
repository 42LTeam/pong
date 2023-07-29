import {Children} from "react";

type Props = {
    friend: any,
    onClick?: any,
    userId?: number,
    children?: any,
}

export default function Friend(props: Props){


    return (
        <div onClick={() => {props.onClick ? props.onClick(props.friend) : null}} className="friend">
            <div className="conversation-avatar"></div>
            <div className="conversation-content">
                <div className="conversation-username">{props.friend?.username}</div>
                <div className="conversation-preview">{props.friend?.status}</div>
            </div>
            {Children.map(props.children, child => <>{child}</>)}
        </div>
    )
}