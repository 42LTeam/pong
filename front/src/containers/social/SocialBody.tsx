import "../../css/chat.css";
import Conversations from "./conversation/Conversations";
import React, { useEffect, useState } from "react";
import Friends from "./friend/Friends";
import Chat from "./chat/Chat";
import { useParams } from "react-router-dom";
import ChannelMembersList from "./channel/ChannelMembersList";
import {getChannelAllMembers} from "../../api";
import NotFound from "../NotFound";

export default function SocialBody() {
  const { channelId } = useParams();
  const [state, setState] = useState(Number.parseInt(channelId) || null);
  const [error, setError] = useState(0);

  useEffect(() => {
    setState(Number.parseInt(channelId));
  }, [channelId]);

  useEffect(() => {
    getChannelAllMembers(state)
      .catch((err) => {
        //console.log(err);
        //console.log("STATUS = "+err.response.status);
        setError(err.response.status);
      });
  }, [channelId]);

  if (error && channelId !== undefined && error !== 400){
    return (
    <NotFound page={"social"}/>
    );
  }

  return (
    <div className="chatbody bubble">
      <Conversations conversations={[]} state={state}></Conversations>
      <div className="vertical-separator"></div>
      {state ? <Chat channel={state}></Chat> : <Friends></Friends>}
      {state ? (
        <>
          <div className="vertical-separator"></div>
          <ChannelMembersList channelId={state} />
        </>
      ) : null}
    </div>
  );
}
