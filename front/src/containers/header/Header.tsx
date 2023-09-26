import React from "react";

import UserBubble from "./UserBubble";
import NavigationBubble from "./NavigationBubble";

import "../../css/header.css";
// @ts-ignore

const Header = function () {
  return (
    <div className="header">
      <div className="header-title">Transpirance 💦</div>
      <NavigationBubble></NavigationBubble>
      <UserBubble></UserBubble>
    </div>
  );
};

export default Header;
