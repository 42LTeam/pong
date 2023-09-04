import "../../css/friend.css"
import React, { Component } from "react";

// eslint-disable-next-line
export default class FriendButton extends Component<{ state: any, handleClick: any, style: any }> {
    render() {
        const { state, handleClick, style } = this.props;
        return (
          <div onClick={handleClick} className={"friend-button " + (state ? "" : "friend-button-focused ")}
               style={style}
          >
              <img style={{ minWidth: "35px" }} alt="friend  logo" src="/svg/friend.svg" />
              <h2 style={{ color: "#7F8C8D" }}>Amis</h2>
          </div>
        );
    }
}
