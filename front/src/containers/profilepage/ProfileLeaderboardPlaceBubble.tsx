import React, { useContext, useEffect, useState } from "react";

import TextIcon from "../../components/TextIcon"

import "../../css/profile.css"
import "../../css/leaderboard.css"
import { UserRank, getUserRank, getUsersRanks } from "../leaderboardpage/GetRanks";
import { getAllUsers } from "../../api";
import { AuthContext, User } from "../Auth";

type Props = {
    user: any;
    type: string;
}


export default function ProfileLeaderboardPlaceBubble(props: Props) {
    
    const me = useContext(AuthContext);
  
    const [placement, setPlacement] = useState(0);
    const [users, setUsers] = useState<User[]>([]);
    const [usersWithRank, setUsersRanks] = useState<UserRank[] | undefined>(undefined);

    useEffect(() => {
        getAllUsers({friendOnly: false, notFriend: false})
        .then(function (response) {
            const updatedUsers = [...response.data, me];
            setUsers(updatedUsers);
        })
        .catch(function (error) {
            console.error('Error fetching user data:', error);
        });
    }, [me]);

    useEffect(() => {
        let isFetching = true;

        const fetch = async () => {
        const usersUpdatedRanks = await getUsersRanks(users, props.type);
        if (isFetching)
            setUsersRanks(usersUpdatedRanks);
        }
        fetch();

        return () => {
        isFetching = false;
        }
    }, [users])

    useEffect(() => {
        if (props.user === undefined || usersWithRank === undefined )
        return ;
        setPlacement(getUserRank(props.user, usersWithRank) ?? 0)
    }, [usersWithRank])

    if (usersWithRank === undefined) {
        return <h1>LOADING</h1>
    }//
    
    var data: number = 0;
    var placementcc: number = 0;

    function getData() {
        if (props.type === "Total xp"){
            data =  5;  // a chopper avec back
        }
        else if (props.type === "Average points per match"){
            data = 0.5;    // a chopper avec back
        }
        else if (props.type === "Victories/defeat ratio"){
            data = 4;    // a chopper avec back
        }
    };

    function getPlacement() {
        placementcc = 2;     //a pécho avec le backk ossi ouais ouais ouais
    }
    
    getData();
    getPlacement();
    
    return (
        <div className="leaderboard-place-bubble">

            <div className="leaderboard-title-stat"> {props.type} </div>            

            <div className="leaderboard-data"> {data} </div>

            <TextIcon style="placement-icon" text={placementcc} />

        </div>
    )
}