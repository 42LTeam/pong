import React from 'react';

import {PlayerSkin} from "./PlayerSkin";
import {BallSkin} from "./BallSkin"
import {LaunchButton} from "./LaunchButton"
import SearchBar from "./SearchBar";
import FriendQuickInviteBubble from './FriendQuickInviteBubble';

import "../../css/homepage.css"
import AddFriend from '../social/friend/AddFriend';
import TextInput from '../../components/utils/TextInput';
import FriendQuickInvite from './FriendQuickInvite';

export default function HomePage({user}){

    return (
        <>
            <div className="frame">
                {/* <div className="frame-left">
                    <div className="skin-selection">
                        <PlayerSkin />
                        <BallSkin />
                        <LaunchButton />
                    </div>

                </div> */}
                <div className="frame-right">
                {/* <AddFriend /> */}
                <FriendQuickInvite />
                    {/* <SearchBar />
                    {Array.from({ length: 35 }, (_, index) => (
                        <FriendQuickInviteBubble key={index} userID={index} />
                    ))} */}
                </div>
            </div>
        </>
    )
}