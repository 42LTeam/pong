import React, { Component } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class FriendTab extends Component<{ handleClick: any, text: any, state: any }> {
    render() {
        const { handleClick, text, state } = this.props;
        return (
          <div onClick={() => {
              handleClick(text);
          }} className={"friend-tab " + (state == text ? "friend-tab-current" : "")}>{text}</div>
        );
    }
}