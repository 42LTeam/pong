import React, { useContext, useEffect, useState } from "react";

import TextIcon from "../../components/TextIcon";

import "../../css/profile.css";
import "../../css/leaderboard.css";
import {
  UserRank,
  getAveragePoint,
  getRatio,
  getUserRank,
  getUsersRanks,
} from "../leaderboardpage/GetRanks";
import { getAllUsers } from "../../api";
import { AuthContext, User } from "../Auth";

type Props = {
  user: any;
  type: string;
};

export default function ProfileLeaderboardPlaceBubble(props: Props) {
  const me = useContext(AuthContext);

  const [placement, setPlacement] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [usersWithRank, setUsersRanks] = useState<UserRank[] | undefined>(
    undefined
  );

  useEffect(() => {
    getAllUsers({ friendOnly: false, notFriend: false })
      .then(function (response) {
        const updatedUsers = [...response.data, me];
        setUsers(updatedUsers);
      })
      .catch(function (error) {
        console.error("Error fetching user data:", error);
      });
  }, [me]);

  useEffect(() => {
    let isFetching = true;

    const fetch = async () => {
      const usersUpdatedRanks = await getUsersRanks(users, props.type);
      if (isFetching) setUsersRanks(usersUpdatedRanks);
    };
    fetch();

    return () => {
      isFetching = false;
    };
  }, [users]);

  useEffect(() => {
    if (props.user === undefined || usersWithRank === undefined) return;
    setPlacement(getUserRank(props.user, usersWithRank) ?? 0);
  }, [usersWithRank]);

  const [data, setData] = useState<number>(0);

  useEffect(() => {
    if (props.type === "XP total") {
      setData(props.user.xp);
    } else if (props.type === "Moyenne des points/match") {
      getAveragePoint(props.user.id)
        .then((average) => {
          setData(average);
        })
        .catch((error) => {
          console.error("Error fetching average point:", error);
          setData(0);
        });
    } else if (props.type === "Ratio victoires/défaites") {
      getRatio(props.user.id)
        .then((ratio) => {
          setData(ratio);
        })
        .catch((error) => {
          console.error("Error fetching average point:", error);
          setData(0);
        });
    }
  }, [props.type, props.user.id]);

  if (usersWithRank === undefined) {
    return <h2>Chargement...</h2>;
  }

  return (
    <div className="leaderboard-place-bubble">
      <div className="leaderboard-title-stat"> {props.type} </div>

      <div className="leaderboard-data">
        {" "}
        {props.user.xp ? data.toFixed(2) : "N/A"}{" "}
      </div>

      <TextIcon style="placement-icon" text={props.user.xp ? placement : "-"} />
    </div>
  );
}
