import {Children, useState} from "react";
import Avatar from "../utils/Avatar";
import ContextMenu from "../utils/ContextMenu";
import {useNavigate} from "react-router-dom";
import { getConversation, removeFriendship, getUserByID, removeUserFromChannel } from "../../api";

type Props = {
    channelId: number;
    friend: any,
    onClick?: any,
    children?: any,
    unremovable?: boolean,
}

export default function Friend(props: Props){

    const navigate = useNavigate();
    const [display, setDisplay] = useState(null);
    const buttons = [
      // ---------- Basic options
        {
            text: 'Profile',
            handleClick: () => navigate("/profile/" + props.friend.id),
        },
        {
            text: 'Envoyer un message',
            handleClick: () => getConversation(props.friend.id).then((response) => navigate('/social/' + response.data.id)),
        },
        {separator: true},

    ];
    if(props.unremovable) {
        buttons.push({
            text: 'Quitter le channel',
            handleClick: () => removeUserFromChannel(props.channelId, props.friend.id).then((response) => console.log("Click out"))
        })
        buttons.push({
            text: 'Mute',
            handleClick: () => removeUserFromChannel(props.channelId, props.friend.id).then((response) => console.log("Mute")),
        })
        buttons.push({
            text: 'Kick',
            handleClick: () => removeUserFromChannel(props.channelId, props.friend.id).then((response) => console.log("Kick")),
        })
        buttons.push({
            text: 'Ban',
            handleClick: () => removeUserFromChannel(props.channelId, props.friend.id).then((response) => console.log("Ban")),
        })
    }
    if (!props.unremovable)
        buttons.push({
            text: 'Retirer l\'ami',
            handleClick: () => {
                removeFriendship(props.friend.id).then(() => setDisplay('none'));
            },
        })
    buttons.push({
        text: 'Bloquer',
        handleClick: () => alert('TODO'),
    });

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

    const navigateToConversation = async (friend) => {
        const response = await getConversation(friend.id);
        navigate('/social/' + response.data.id);
    }

    return (
        <ContextMenu  buttons={buttons} buttonProps={buttonProps}>
            <div onClick={() => {props.onClick ? props.onClick(props.friend) : navigateToConversation(props.friend)}} className="friend" style={display ? {display: 'none'} : null}>
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