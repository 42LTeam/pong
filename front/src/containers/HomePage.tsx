import '../css/homepage.css'
import {PlayerSkin} from "../components/PlayerSkin";
import {BallSkin} from "../components/BallSkin"
import {LaunchButton} from "../components/LaunchButton"
import React from 'react';
import SearchBar from '../components/SearchBar';

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
                    {/*<friendTabs />*/}
                </div>
            </div>
        </>
    )
}