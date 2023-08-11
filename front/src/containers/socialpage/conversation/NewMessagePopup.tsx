import React from "react";
import {useContext, useState} from "react";

import TextInput from "../../../components/utils/TextInput";
import Button from "../../../components/utils/Button";
import PopUp from "../../../components/utils/PopUp";
import Friend from "../../../components/friend/Friend";
import {createChannel, getFriendOfUser, searchUser, sendChannelInvite} from "../../../api";
import Removable from "../../../components/utils/Removable";
import Cancel from "../../../components/svg/Cancel";
import {ApplicationContext} from "../../root/Auth";

type Props = {
    position: {left: number, top: number},
    clear: any,
}
export default function NewMessagePopup({position, clear}: Props) {
    const user = useContext(ApplicationContext);
    const [suggestions, setSuggestions] = useState([]);
    const [checked, setChecked] = useState([]);

    const mapData =  (current) => {
        return (
            <Friend key={"popupfriend-" + current.username} friend={current}>
                <div className="align-left">
                    <input
                        {...(checked.filter(c => c == current.username).length ? {checked:true}:{checked:false})} onChange={(event) => toggleCheck(current.username, event.target.checked)} type="checkbox"/>
                </div>
            </Friend>
        )
    }

    const handlePopupSearch = async (event) => {
        const search = event.target.value || '';
        const {data} = await searchUser(search, {friendOnly: true});
        setSuggestions(data);
    }

    const handleClick = async () => {
        const response  = await createChannel({
            name: [...suggestions, user].map(current => current.username).sort((a, b) => a > b ? 1 : -1).join('+'),
            creatorId: user.id,
        });
        const channel = response.data;
        sendChannelInvite({
            channelId: channel.id,
            ids: [...suggestions.filter(f => checked.includes(f.username)).map(f => f.id), user.id],
        }).then(() => {
            clear(true);
        });
    };

    const toggleCheck = (current, check) => {
        if (check)
            setChecked(c => [...c, current]);
        else
            setChecked(checked.filter(c => c != current));
    }
    if (!suggestions.length)
        getFriendOfUser(user.id).then(response => setSuggestions(response.data));

    return (
        <PopUp key={"newmessage-root"} position={position} clear={clear}>
            <h1>Sélectionne des amis</h1>
            <h3>Tu peux ajouter des amis.</h3>
            <TextInput
                key={"newmessage-input"}
                text="Trouve taon ami.e tape sa on nom..."
                bgColor="#2C3E50"
                onChange={handlePopupSearch}
            >
                {checked.map(current => <Removable  content={current} onInteract={() => {
                    toggleCheck(current, false);
                }} icon={<Cancel tiny />} key={"removable="+current}/>)}
            </TextInput>
            <div className="newmessage-suggestions">
                {suggestions?.map(mapData)}
            </div>
            <Button key={"newmessage-button"} fill handleClick={handleClick} text="Creer un MP ou un channel" clickable={checked.length != 0}></Button>
        </PopUp>
    )
}