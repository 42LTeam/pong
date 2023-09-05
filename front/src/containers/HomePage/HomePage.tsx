import React from "react";

import { PlayerSkin } from "./PlayerSkin";
import { BallSkin } from "./BallSkin";

import "../../css/homepage.css";
import Button from "../../components/utils/Button";
import { useNavigate } from "react-router-dom";
import FriendQuickInvite from "./FriendQuickInvite";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="frame">
        <div className="frame-left">
          <div className="skin-selection">
            <PlayerSkin />
            <BallSkin />
            <Button
              handleClick={() => navigate("/game")}
              text={"PLAY"}
              clickable
              buttonProps={{
                style: {
                  width: "220px",
                  height: "60px",
                  fontSize: "37px",
                },
              }}
            ></Button>
            <Button
              handleClick={() => navigate("/game?custom=true")}
              text={"CUSTOM"}
              clickable
              buttonProps={{
                style: {
                  width: "220px",
                  height: "60px",
                  fontSize: "37px",
                },
              }}
            ></Button>
          </div>
        </div>
        <div className="frame-right">
          <FriendQuickInvite></FriendQuickInvite>
        </div>
      </div>
    </>
  );
}
