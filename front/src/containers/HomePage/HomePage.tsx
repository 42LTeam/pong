import "../../css/homepage.css"
import {PlayerSkin} from "../../components/PlayerSkin";
import {BallSkin} from "../../components/BallSkin"
import {LaunchButton} from "../../components/LaunchButton"
import React from 'react';
import SearchBar from '../../components/SearchBar';
import FriendQuickInviteBubble from './FriendQuickInviteBubble';

export default function HomePage({user}){

    return (
        <>
            <div className="frame">
                <div className="frame-left">
                    <div className="skin-selection">
                        <PlayerSkin />
                        <BallSkin />
                        <LaunchButton />
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