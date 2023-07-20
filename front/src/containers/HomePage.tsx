import React, {useState} from "react";
import '../css/homepage.css'
import {PlayerSkin} from "../components/PlayerSkin";
import {BallSkin} from "../components/BallSkin"
import {LauchButton} from "../components/LauchButton"

export default function HomePage({user}){

    return (
        <>
            <div className="frame">
                <div className="frame-left">
                    <div className="skin-selection">
                        <PlayerSkin />
                        <BallSkin />
                        <LauchButton />
                    </div>

                </div>
                <div className="frame-right">
                    <SearchFriend />
                    {/*<friendTabs />*/}
                </div>
            </div>
        </>
    )
}