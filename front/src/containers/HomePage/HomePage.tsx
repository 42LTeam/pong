import React from 'react';

import {PlayerSkin} from "./PlayerSkin";
import {BallSkin} from "./BallSkin"
import {LaunchButton} from "./LaunchButton"
import {LaunchCustomButton} from "./LaunchCustomButton"
import SearchBar from "./SearchBar";
import FriendQuickInviteBubble from './FriendQuickInviteBubble';

import "../../css/homepage.css"

export default function HomePage({user}){

    return (
        <>
            <div className="frame">
                <div className="frame-left">
                    <div className="skin-selection">
                        <PlayerSkin />
                        <BallSkin />
                        <LaunchButton />
                        <LaunchCustomButton />
                    </div>

                </div>
                <div className="frame-right">
                    <SearchBar />
                    {Array.from({ length: 35 }, (_, index) => (
                        <FriendQuickInviteBubble key={index} userID={index} />
                    ))} {/* A voir comment on fait pour boucler avec le back */}
                </div>
            </div>
        </>
    )
}