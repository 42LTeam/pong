import React from 'react';

import "../css/profile.css"
import MatchHistoryBubble from '../components/MatchHistoryBubble';

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
                {Array.from({ length: 15 }, (_, index) => (
                        <MatchHistoryBubble key={index} user={user} matchID={index} />
                ))} {/* A voir comment on fait pour boucler avec le back */}
            </div>

            </div>
            <div className='vertical-separator'></div>
            <div className='right-frame-profile'>



            </div>
        </div>
    )
}