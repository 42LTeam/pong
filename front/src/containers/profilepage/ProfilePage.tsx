import React from 'react';

import MatchHistoryBubble from './MatchHistoryBubble';
import ProfileLeaderboardPlaceBubble from './ProfileLeaderboardPlaceBubble';

import "../../css/profile.css"
//Il faudrait appeler la page avec le user correspondant (?)

export default function ProfilePage({user}){

    return (
        <div className='main-frame'>
            <div className="left-frame-profile">
                
                {user?.avatar && (
                        <div
                            className="user-profile-picture"
                            style={{ backgroundImage: `url(${user.avatar})` }}
                        />
                )}

                <div className="user-profile-title">{user?.username}</div>
                
                <div className='match-history'>
                    {Array.from({ length: 10 }, (_, index) => (
                            <MatchHistoryBubble key={index} user={user} matchID={index} />
                    ))} {/* A voir comment on fait pour boucler avec le back */}
                </div>

            </div>
            <div className='vertical-separator'></div>
            <div className='right-frame-profile'>

                <div className="leaderboard-places"> Leaderboard places</div>
                <ProfileLeaderboardPlaceBubble user={user} type="Total Victories"/>
                <ProfileLeaderboardPlaceBubble user={user} type="Ratio"/>
                <ProfileLeaderboardPlaceBubble user={user} type="Average Points"/>

            </div>
        </div>
    )
}