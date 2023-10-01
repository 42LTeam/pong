import "../../../css/friend.css";
import FriendTabs from "./FriendTabs";
import { useContext, useState } from "react";
import AddFriend from "./AddFriend";
import Friendlist from "./FriendList";
import { AuthContext } from "../../Auth";
import { getPath } from "../../../api";
import PublicChannelsList from "../publicChannelsList/publicChannelsList";
import React from "react";

const states = [
  "En ligne",
  "Tous",
  "En attente",
  "Bloqué",
  "Ajouter",
  "Salons publiques",
];
const paths = [
  "/users/friend/online",
  "/users/friend",
  "/users/friend-request/pending",
  "/block/blocked",
  "/channels",
];

export default function Friends() {
  const user = useContext(AuthContext);
  const [state, setState] = useState("En ligne");

  const handleClick = (text) => {
    setState(text);
    setFriends(null);
  };

  const [friends, setFriends] = useState(null);

  if (
    !friends &&
    states.indexOf(state) != 4 &&
    states.indexOf(state) !== states.length - 1
  ) {
    getPath(paths[states.indexOf(state)]).then(function (response) {
      setFriends(response.data);
    });
  }

  const resetFriend = function () {
    setFriends(null);
  };

  return (
    <div className="friends">
      <FriendTabs
        key="friendtabs"
        states={states}
        handleClick={handleClick}
        state={state}
      />
      <div className="horizontal-separator"></div>
      {state === "Ajouter" ? (
        <AddFriend />
      ) : state === "Salons publiques" ? (
        <PublicChannelsList />
      ) : (
        <Friendlist
          reset={resetFriend}
          friends={friends}
          pending={state === states[2]}
        />
      )}
    </div>
  );
}
