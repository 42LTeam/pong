import {Children, useState} from "react";
import Avatar from "../utils/Avatar";
import ContextMenu from "../utils/ContextMenu";
import {useNavigate} from "react-router-dom";
import {getConversation, removeFriendship, getUserByID} from "../../api";

type Props = {
    friend: any,
    onClick?: any,
    children?: any,
    unremovable?: boolean,
}

export default function Friend(props: Props){

    const navigate = useNavigate();
    const [display, setDisplay] = useState(null);
    const buttons = [
        {
            text: 'Profile',
            handleClick: () => navigate("/profile/" + props.friend.id),
        },
        {
            text: 'Envoyer un message',
            handleClick: () => getConversation(props.friend.id).then((response) => navigate('/social/' + response.data.id)),
        },
        {separator: true},
      // si c'est moi et que c'est channel
        {
            text: 'Quitter le channel',
            handleClick: () => getConversation(props.friend.id).then((response) => navigate('/social/' + response.data.id)),
        },
      // si c'est pas moi et que je suis admin et que c'est channel
        {
            text: 'Kick',
            // kick l'user selectionné
        },
        {
            text: 'Ban',
            // ban l'user selectionné
        },
        {
            text: 'Mute',
            // Mute l'user selectionné
        },
        {separator: true},
        {
            text: 'Match amical',
            handleClick: () => getUserByID(props.friend.id).then((response) =>
                navigate('/game?id=' + props.friend.id + '&username=' + response.data.username + '&session=' + response.data.session)),
        },


    ];
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