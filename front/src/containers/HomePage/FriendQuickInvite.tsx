import "../../css/homepage.css"

import React from "react";
import TextInput from "../../components/utils/TextInput";
import {useContext, useState} from "react";
import {getAllUsers, searchUser} from "../../api";
import {AuthContext} from "../Auth";
import FriendQuickInviteBubble from "./FriendQuickInviteBubble";

export default function FriendQuickInvite() {
    const user = useContext(AuthContext);
    const [suggestions, setSuggestions] = useState([]);

    const mapData =  (current) => {
        return (
            <FriendQuickInviteBubble user={current} /> 
        )
    }

    const handlePopupSearch = async (event) => {
        const search = event.target.value || '';
        const {data} = await searchUser(search, {friendOnly: true});
        setSuggestions(data);
    }

    const handleClick = async () => {
        // un bouton pour clear la recherche ?
    };

    if (!suggestions.length)
        getAllUsers().then(response => setSuggestions(response.data.filter(current => current.id != user.id)));

    return (
    <>
    <h1>Quick Invite</h1>
    <TextInput
        key={"quick-invite-input"}
        text="Trouve taon ami.e tape sa on nom..."
        bgColor="#FFF"
        color="#7F8C8D"
        onChange={handlePopupSearch}
    >
    </TextInput>
    <div className="quick-invite-suggestions">
        {suggestions?.map(mapData)}
    </div>
    </>
    )
}