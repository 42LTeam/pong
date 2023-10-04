import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MatchHistoryBubble from "./MatchHistoryBubble";
import ProfileLeaderboardPlaceBubble from "./ProfileLeaderboardPlaceBubble";
import { getUserByID, getUserMatchesResume } from "../../api";

import "../../css/profile.css";
import { User } from "../Auth";
import NotFound from "../NotFound";
import Avatar from "../../components/utils/Avatar";
import { Tooltip, Zoom } from "@mui/material";

export interface MatchResume {
  OpponentAvatar: string;
  OpponentUsername: string;
  OpponentId: number;
  OpponentScore: number;
  UserScore: number;
}

export default function ProfilePage() {
  const { userID } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [matches, setMatches] = useState<MatchResume[]>([]);
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate("/leaderboard");
  };

  useEffect(() => {
    getUserByID(userID)
      .then(function (response) {
        setUser(response.data);
      })
      .catch(function (error) {
        setUser(null);
      });
  }, [userID]);

  useEffect(() => {
    getUserMatchesResume(userID)
      .then(function (response) {
        setMatches(response.data);
      })
      .catch(function (error) {
        console.log("No match found");
      });
  }, [userID]);

  if (user === null) {
    return (
      <NotFound page="profile" id={userID} />
    );
  }

  if (!matches) {
    return <h1>Chargement...</h1>;
  }

  return (
    <div className="main-frame-profile">
      <div className="left-frame-profile">
        <Avatar url={user.avatar} width={"100px"} height={"100px"}/>
        <div className="user-profile-title">{user?.username}</div>

        <div className="match-history">
          {matches.length > 0 ? (
            matches.map((match) => (
              <MatchHistoryBubble user={user} matchResume={match} />
            ))
          ) : (
            <h2>Aucun match joué pour le moment</h2>
          )}
        </div>
      </div>
      <div className="vertical-separator"></div>
      <div className="right-frame-profile">
        <Tooltip title="Aller au classement" TransitionComponent={Zoom}>
          <div className="leaderboard-places" onClick={handleClick}>Places du classement</div>
        </Tooltip>
        <ProfileLeaderboardPlaceBubble
          user={user}
          type="XP total" />
        <ProfileLeaderboardPlaceBubble
          user={user}
          type="Ratio victoires/défaites"/>
        <ProfileLeaderboardPlaceBubble
          user={user}
          type="Moyenne des points/match"
        />
        
      </div>
    </div>
  );
}
