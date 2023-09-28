import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MatchHistoryBubble from "./MatchHistoryBubble";
import ProfileLeaderboardPlaceBubble from "./ProfileLeaderboardPlaceBubble";
import { getUserByID, getUserMatchesResume } from "../../api";

import "../../css/profile.css";
import { User } from "../Auth";
import NotFound from "../NotFound";
import Avatar from "../../components/utils/Avatar";

export interface MatchResume {
  OpponentAvatar: string;
  OpponentUsername: string;
  OpponentScore: number;
  UserScore: number;
}

export default function ProfilePage() {
  const { userID } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [matches, setMatches] = useState<MatchResume[]>([]);

  useEffect(() => {
    getUserByID(userID)
      .then(function (response) {
        setUser(response.data);
      })
      .catch(function (error) {
        console.error("Error fetching user data (@getUserByID):", error);
        setUser(null);
      });
  }, [userID]);

  useEffect(() => {
    getUserMatchesResume(userID)
      .then(function (response) {
        setMatches(response.data);
      })
      .catch(function (error) {
        console.error("Error fetching UserMatch resumes data:", error);
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
        <Avatar url={user.avatar} width={"100"} height={"100"}/>

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
        <div className="leaderboard-places">Places du classement</div>
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
