import React, { Children, useContext, useState} from "react";
import Avatar from "../utils/Avatar";
import ContextMenu from "../utils/ContextMenu";
import {useNavigate} from "react-router-dom";
import { getConversation, removeFriendship, removeUserFromChannel, muteUserFromChannel, banUserFromChannel, removeUserAdminFromChannel } from "../../api";
import { AuthContext } from "../../containers/Auth";

type Props = {
    channelId: number;
    // eslint-disable-next-line
    children?: any,
    // eslint-disable-next-line
    friend: any,
    isAdmin: boolean,
    // eslint-disable-next-line
    onClick?: any,
    unmovable?: boolean,
}

export default function Friend(props: Props){

    const navigate = useNavigate();
    const [display, setDisplay] = useState(null);
    const user = useContext(AuthContext);
    const buttons = [
      // User basics option everywhere
        {
            text: 'Profile',
            handleClick: () => navigate("/profile/" + props.friend.userId),
        },
        {
            text: 'Envoyer un message',
            handleClick: () => getConversation(props.friend.userId).then((response) => navigate('/social/' + response.data.id)),

        },
        {separator: true},

    ];

    // Admin rights

    console.log(props.isAdmin)

    if(props.friend.isAdmin === false) {
        buttons.push({
            text: 'Mute',
            handleClick: () => muteUserFromChannel(props.channelId, props.friend.userId).then(() => console.log("Mute")),
        })
        buttons.push({
            text: 'Kick',
            handleClick: () => removeUserAdminFromChannel(props.channelId, props.friend.userId).then(() => navigate('/social/' + props.channelId)),
        })
        buttons.push({
            text: 'Ban',
            handleClick: () => banUserFromChannel(props.channelId, props.friend.userId).then(() => navigate('/social/' + props.channelId)),
        })
    }

    // User option in Channel Member List
    if(props.friend.id === user.id) {
        
        buttons.push({
            text: 'Leave',
            handleClick: () => removeUserFromChannel(props.channelId, props.friend.userId).then(() => navigate('/social/')),
        })
    }

    // User option in SocialBody
    if (!props.unmovable)
        buttons.push({
            text: 'Retirer l\'ami',
            handleClick: () => {
                removeFriendship(props.friend.userId).then(() => setDisplay('none'));
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
        const response = await getConversation(friend.userId);
        navigate('/social/' + response.data.id);
    }
    console.log("props.friend Friends : " + props.friend.user.avatar)
    return (
        <ContextMenu  buttons={buttons} buttonProps={buttonProps}>
            <div onClick={() => {props.onClick ? props.onClick(props.friend.user) : navigateToConversation(props.friend.user)}} className="friend" style={display ? {display: 'none'} : null}>
                <Avatar width="48px" height="48px" url={props.friend.user?.avatar}></Avatar>

                <div className="conversation-content">
                    <div className="conversation-username">{props.friend.user?.username}</div>
                    <div className="conversation-preview">{props.friend.user?.status}</div>
                </div>
                {Children.map(props.children, child => <>{child}</>)}

            </div>
        </ContextMenu>
    )
}