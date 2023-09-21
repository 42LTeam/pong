import React, { useContext, useState, useEffect } from "react";
import TextInput from "../../components/utils/TextInput";
import { searchFriend, getFriendOfUser } from "../../api";
import { AuthContext } from "../Auth";
import FriendQuickInviteBubble from "./FriendQuickInviteBubble";

export default function FriendQuickInvite() {
  const user = useContext(AuthContext);
  const [suggestions, setSuggestions] = useState([]);

  const handlePopupSearch = async (event) => {
    const search = event.target.value || "";
    const { data } = await searchFriend(search);
    setSuggestions(data);
  };

  useEffect(() => {
    if (!suggestions.length) {
      getFriendOfUser(user.id)
        .then((response) =>
          setSuggestions(
            response.data.filter((current) => current.id !== user?.id)
          )
        )
        .catch((error) => console.error("Error fetching friend data:", error));
    }
  }, [suggestions.length, user]);

  return (
    <>
      <h1>Invite tes amis à jouer</h1>
      <TextInput
        key={"quick-invite-input"}
        text="Pseudo"
        bgColor="#FFF"
        color="#7F8C8D"
        onChange={handlePopupSearch}
      />
      <div className="quick-invite-suggestions">
        {suggestions.map((current) => (
          <FriendQuickInviteBubble key={current.id} user={current} />
        ))}
        {!suggestions.length && <h2>Si t'as pas d'amis prends un curly</h2>}
      </div>
    </>
  );
}
