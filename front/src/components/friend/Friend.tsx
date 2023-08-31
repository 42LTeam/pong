import {Children, useContext, useEffect, useState} from "react";
import Avatar from "../utils/Avatar";
import ContextMenu from "../utils/ContextMenu";
import {useNavigate} from "react-router-dom";
import {getConversation, removeFriendship, getUserByID, blockUser, unblockUser} from "../../api";
import {AuthContext} from "../../containers/Auth";

type Props = {
    friend: any,
    onClick?: any,
    children?: any,
    unremovable?: boolean,
    blocked?: boolean,
}

export default function Friend(props: Props){
    const user = useContext(AuthContext);
    const navigate = useNavigate();
    const [display, setDisplay] = useState(user.blockList.includes(props.friend.id) && !props.blocked ? 'none' : null);
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
        {
            text: 'Match standard',
            handleClick: () => getUserByID(props.friend.id).then((response) =>
                navigate('/game?id=' + props.friend.id + '&username=' + response.data.username + '&session=' + response.data.session + '&custom=false')),
        },
        {
            text: 'Match custom',
            handleClick: () => getUserByID(props.friend.id).then((response) =>
                navigate('/game?id=' + props.friend.id + '&username=' + response.data.username + '&session=' + response.data.session + '&custom=true')),
        },
        {separator: true},
    ];

    useEffect(() => {
        if (props.blocked) {
            buttons.push({
                text: 'Debloquer',
                handleClick: () => {
                    unblockUser(props.friend?.id);
                    user.blockList.splice(user.blockList.indexOf(props.friend?.id), 1);
                    setDisplay('none');
                }
            });
        } else if (!props.unremovable )
            buttons.push({
                text: 'Retirer l\'ami',
                handleClick: () => {
                    removeFriendship(props.friend.id).then(() => setDisplay('none'));
                },
            })

    })

    if (!props.blocked)
        buttons.push({
            text: 'Bloquer',
            handleClick: () => {
                blockUser(props.friend?.id);
                user.blockList.push(props.friend?.id);
            },
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