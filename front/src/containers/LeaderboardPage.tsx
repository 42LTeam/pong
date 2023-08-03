import React from 'react';

import "../css/leaderboard.css"
import LeaderboardTabs from './LeaderboardTabs';
import LeaderboardPlaceBubble from '../components/LeaderBoardPlaceBubble';


export default function LeaderboardPage({user}){

    return (
        <div className='leaderboard-body'>
            <div className='leaderboard-main-frame'>
                <div className="leaderboard-places"> Leaderboard </div> {/*a changer en titre h1 ?*/}

                <LeaderboardTabs user={user}/>
                
                <div className='horizontal-separator'></div>
                
                <div className='leaderboard-content'>
                <LeaderboardPlaceBubble user={user} kind={"Total victories"}/>
                <LeaderboardPlaceBubble user={user} kind={"Victories / defeat ratio"}/>
                <LeaderboardPlaceBubble user={user} kind={"Average points per match"}/>     {/* a voir comment faire pour changer selon state et si on peut get le state de tabs */}
                </div>

            </div>
        </div>
    )
}