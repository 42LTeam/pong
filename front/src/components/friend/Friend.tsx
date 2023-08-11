import React from 'react';
import {Children} from "react";
import Avatar from "../utils/Avatar";

type Props = {
    friend: any,
    onClick?: any,
    children?: any,
}

export default function Friend(props: Props){


    return (
        <div onClick={() => {props.onClick ? props.onClick(props.friend) : null}} className="friend">
            <Avatar width="48px" height="48px" url={props.friend?.avatar}></Avatar>

            <div className="conversation-content">
                <div className="conversation-username">{props.friend?.username}</div>
                <div className="conversation-preview">{props.friend?.status}</div>
            </div>
            {Children.map(props.children, child => <>{child}</>)}
        </div>
    )
}