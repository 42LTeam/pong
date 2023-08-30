import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import MatchHistoryBubble from './MatchHistoryBubble';
import ProfileLeaderboardPlaceBubble from './ProfileLeaderboardPlaceBubble';
import {getUserByID, getUserMatchesResume} from "../../api";

import "../../css/profile.css"
import { User } from '../Auth';

export interface MatchResume {
        OpponentAvatar: string,
        OpponentUsername: string,
        OpponentScore: number,
        UserScore: number
}

export default function ProfilePage(){
    
    const { userID } = useParams();
    const [user, setUser] = useState<User | null>(null);
    const [matches, setMatches] = useState<MatchResume[]>([]);

    useEffect(() => {
        getUserByID(userID)
            .then(function (response) {
                setUser(response.data);
            })
            .catch(function (error) {
                 console.error('Error fetching user data:', error);
                setUser(null);
            });
    },[userID]);

    useEffect(() => {
        getUserMatchesResume(userID)
            .then(function (response) {
                setMatches(response.data);
            })
            .catch(function (error) {
                 console.error('Error fetching UserMatch resumes data:', error);
            });
    },[userID]);

    if (user === null || !matches){
        return(<h1>LOADING</h1>)
    }

    return (
        <div className='main-frame-profile'>
            <div className="left-frame-profile">
                
                {user?.avatar && (
                        <div
                            className="user-profile-picture"
                            style={{ backgroundImage: `url(${user.avatar})` }}
                        />
                )}

                <div className="user-profile-title">{user?.username}</div>
                
                <div className='match-history'>
                    {matches.map(match => (
                    <MatchHistoryBubble user={user} matchResume={match} />
                    ))}
                </div>

            </div>
            <div className='vertical-separator'></div>
            <div className='right-frame-profile'>

                <div className="leaderboard-places"> Leaderboard places</div>
                <ProfileLeaderboardPlaceBubble user={user} type="Total xp"/>
                <ProfileLeaderboardPlaceBubble user={user} type="Average points per match"/>
                <ProfileLeaderboardPlaceBubble user={user} type="Victories/defeat ratio"/>

            </div>
        </div>
    )
}