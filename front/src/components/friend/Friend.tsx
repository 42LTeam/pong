import {Children} from "react";
import Avatar from "../utils/Avatar";
import ContextMenu from "../utils/ContextMenu";
import {useNavigate} from "react-router-dom";

type Props = {
    friend: any,
    onClick?: any,
    children?: any,
}





export default function Friend(props: Props){

    const navigate = useNavigate();

    const buttons = [
        {
            text: 'Profile',
            handleClick: () => navigate("/profile/" + props.friend.id),
        },
        {
            text: 'Envoyer un message',
            handleClick: () => alert('TODO'),
        },
        {separator: true},
        {
            text: 'Match amical',
            handleClick: () => alert('TODO'),
        },
        {
            text: 'Retirer l\'ami',
            handleClick: () => alert('TODO'),
        },
        {
            text: 'Bloquer',
            handleClick: () => alert('TODO'),
        },
    ]

    const buttonProps = {
        buttonProps: {
            style: {
                background: 'none',
                cursor: 'pointer',
                textAlign: 'left'
            }
        },
        fill: true,
        hoverProps: {
            background: '#2C3E50'
        },
    };

    return (
        <ContextMenu  buttons={buttons} buttonProps={buttonProps}>
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