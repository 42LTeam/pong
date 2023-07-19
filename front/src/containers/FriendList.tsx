import "../css/friend.css"
import FriendTabs from "./FriendTabs";
import Friend from "../components/Friend";
import AddFriendInvite from "../components/AddFriendInvite";
import React from "react";
export default function FriendList(){
    return (
        <div className="friends">
            <FriendTabs></FriendTabs>
            <div className="horizontal-separator"></div>
            {/* <Friend username="shalimi" victoires={3} defaites={4}></Friend>
            <Friend username="shalimi" victoires={3} defaites={4}></Friend>
            <Friend username="shalimi" victoires={3} defaites={4}></Friend>
            <Friend username="shalimi" victoires={3} defaites={4}></Friend>
            <Friend username="shalimi" victoires={3} defaites={4}></Friend>
            <Friend username="shalimi" victoires={3} defaites={4}></Friend>
            <Friend username="shalimi" victoires={3} defaites={4}></Friend> */}
            <AddFriendInvite></AddFriendInvite>
        </div>
    );
}

//a checker : voir comment linker le state avec ce qu'on affiche