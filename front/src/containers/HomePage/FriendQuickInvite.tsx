import "../../css/homepage.css"

import React from "react";
import TextInput from "../../components/utils/TextInput";
import {useContext, useState} from "react";
import {searchFriend, getFriendOfUser} from "../../api";
import {AuthContext, User} from "../Auth";
import FriendQuickInviteBubble from "./FriendQuickInviteBubble";

export default function FriendQuickInvite() {
    const user = useContext(AuthContext);
    const [suggestions, setSuggestions] = useState([]);

    const mapData =  (current: User) => {
        return (
            <FriendQuickInviteBubble user={current} /> 
        )
    }

    const handlePopupSearch = async (event) => {
        const search = event.target.value || '';
        const {data} = await searchFriend(search);
        setSuggestions(data);
    }

    if (!suggestions.length)
        getFriendOfUser(user.id).then(response => setSuggestions(response.data.filter(current => current.id != user?.id)));

    return (
    <>
    <h1>Quick Invite</h1>
    <TextInput
        key={"quick-invite-input"}
        text="Pseudo"
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