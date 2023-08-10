import React, { useContext, useEffect, useState } from 'react';

import LeaderboardTabs from './LeaderboardTabs';
import LeaderboardPlaceBubble from './LeaderboardPlaceBubble';
import { ApplicationContext, User } from "../root/Auth";
import {getUsers} from "../../api";
import LeaderboardContent from './LeaderboardContent';

import "../../css/leaderboard.css"


export default function LeaderboardPage(){

    const user = useContext(ApplicationContext);

    var [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
          .then(function (response) {
            setUsers(response.data);

          })
          .catch(function (error) {
            console.error('Error fetching user data:', error);
          });
      }, []);


    return (
        <div className='leaderboard-body'>
            <div className='leaderboard-main-frame'>
                <div className="leaderboard-places"> Leaderboard </div> {/*a changer en titre h1 ?*/}

                <LeaderboardTabs />
                
                <div className='horizontal-separator'></div>
                
                {/* <div className='leaderboard-content'> */}
                    <LeaderboardContent users={users}/>
                {/* <LeaderboardPlaceBubble user={user} kind={"Total victories"}/>
                <LeaderboardPlaceBubble user={user} kind={"Victories / defeat ratio"}/>
                <LeaderboardPlaceBubble user={user} kind={"Average points per match"}/> */}
                {/* </div> */}

            </div>
        </div>
    )
}