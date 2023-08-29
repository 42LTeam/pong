import React from 'react';

import {PlayerSkin} from "./PlayerSkin";
import {BallSkin} from "./BallSkin"
import {LaunchButton} from "./LaunchButton"

import "../../css/homepage.css"
import FriendQuickInvite from './FriendQuickInvite';

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

                <FriendQuickInvite />

                </div>
            </div>
        </>
    )
}