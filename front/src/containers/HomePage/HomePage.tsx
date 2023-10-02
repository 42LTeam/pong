import React, { useContext, useEffect, useState } from "react";
import "../../css/homepage.css";
import Button from "../../components/utils/Button";
import { useNavigate } from "react-router-dom";
import FriendQuickInvite from "./FriendQuickInvite";
import Ball from "../../components/svg/Ball";
import { AuthContext } from "../Auth";
import { updateUserColorball, getUserByID } from "../../api";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

const colors = [
  "#ECF0F1", //white
  "#00BAFF", //blue
  "#E74C3C", //red
  "#2ECC71", //green
  "#000000", //black
]; 

export default function HomePage() {
  const navigate = useNavigate();
  const user = useContext(AuthContext);
  const [shine, setShine] = useState(false);
  let index: number = 0;
  const [userUp, setUser] = useState(null);
  const [color, setColor] = useState(colors[index]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserByID(user.id);
        if (response.data) {
          setUser(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user's colorball: ", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [user.id]);

  useEffect(() => {
    if (!loading) {
      for (let i = 0; i <= colors.length; i++) {
        if (colors[i] === userUp.colorball) {
          index = i;
          break;
        }
      }
      if (index === colors.length) {
        index = 0;
        updateUserColorball(user.id, colors[0]);
        alert("Not supported color detected: default white set");
      } else {
        setColor(colors[index]);
      }
    }
  }, [loading, user.id, userUp]);

  const handleBallClickLeft = () => {
    const currentIndex = colors.indexOf(color);
    const nextIndex = (currentIndex - 1 + colors.length) % colors.length;
    updateUserColorball(user.id, colors[nextIndex]);
    setColor(colors[nextIndex]);
  };
  const handleBallClickRight = () => {
    const currentIndex = colors.indexOf(color);
    const nextIndex = (currentIndex + 1) % colors.length;
    updateUserColorball(user.id, colors[nextIndex]);
    setColor(colors[nextIndex]);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (
        (event.key === "l" || event.key === "L") &&
        event.target.tagName !== "INPUT" &&
        event.target.tagName !== "TEXTAREA"
      ) {
        setShine(!shine);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [shine, color]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="frame-homepage">
      <div className="frame-left">
        <div className="ball-skin">
          <img
            className="vector"
            alt="Vector"
            src="/svg/vector-left.svg"
            onClick={handleBallClickLeft}
          />

          <div className="ball-glow">
            <Ball color={color} shine={shine} />
          </div>

          <img
            className="vector"
            alt="Vector"
            src="/svg/vector-right.svg"
            onClick={handleBallClickRight}
          />
        </div>

        <Tooltip
        title={"Semblable au jeu original de 1972"}
        TransitionComponent={Zoom}>
          <div>
        <Button
          handleClick={() => navigate("/game")}
          text={"STANDARD"}
          clickable
          buttonProps={{
            style: {
              width: "100%",
              fontSize: "40px",
            },
          }}
        ></Button></div>
        </Tooltip>

        <Tooltip
        title={"La même mais avec des paddles invisibles"}
        TransitionComponent={Zoom}>
          <div>
        <Button
          handleClick={() => navigate("/game?custom=true")}
          text={"CUSTOM"}
          clickable
          buttonProps={{
            style: {
              width: "100%",
              fontSize: "40px",
            },
          }}
        ></Button></div>
        </Tooltip>
      </div>
      <div className="frame-right">
        <FriendQuickInvite></FriendQuickInvite>
      </div>
    </div>
  );
}
