import React, { useContext, useEffect, useState } from "react";

import LeaderboardTabs from "./LeaderboardTabs";
import { AuthContext, User } from "../Auth";
import { getAllUsers } from "../../api";
import LeaderboardContent from "./LeaderboardContent";

import "../../css/leaderboard.css";
import { UserRank, getUserRank, getUsersRanks } from "./GetRanks";

const states = [
  "XP total",
  "Ratio victoires/défaites",
  "Moyenne des points par match",
];

export default function LeaderboardPage() {
  const user = useContext(AuthContext);

  const [placement, setPlacement] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [state, setState] = useState("XP total");
  const [usersWithRank, setUsersRanks] = useState<UserRank[] | undefined>(
    undefined
  );

  const handleClick = (text) => {
    setState(text);
  };

  useEffect(() => {
    getAllUsers({ friendOnly: false, notFriend: false })
      .then(function (response) {
        const updatedUsers = [...response.data, user];
        setUsers(updatedUsers);
      })
      .catch(function (error) {
        console.error("Error fetching user data:", error);
      });
  }, [user]);

  useEffect(() => {
    let isFetching = true;

    const fetch = async () => {
      const usersUpdatedRanks = await getUsersRanks(users, state);
      if (isFetching) setUsersRanks(usersUpdatedRanks);
    };
    fetch();

    return () => {
      isFetching = false;
    };
  }, [users, state]);

  useEffect(() => {
    if (user === undefined || usersWithRank === undefined) return;
    setPlacement(getUserRank(user, usersWithRank) ?? 0);
  }, [usersWithRank]);

  if (usersWithRank === undefined) {
    return <h1>Chargement...</h1>;
  }

  return (
    <div className="leaderboard-body">
      <div className="leaderboard-main-frame">
        <div className="leaderboard-places"> Classement </div>

        <LeaderboardTabs
          key="tabs"
          states={states}
          handleClick={handleClick}
          state={state}
          placement={placement}
        />

        <div className="horizontal-separator"></div>

        <LeaderboardContent users={usersWithRank} state={state} />
      </div>
    </div>
  );
}
