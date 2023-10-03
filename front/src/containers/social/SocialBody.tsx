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
  const [state, setState] = useState<any>(Number.parseInt(channelId));
  const [error, setError] = useState(undefined);

  const [resp, setResp] = useState(undefined);

  useEffect(() => {
    setState(Number.parseInt(channelId));
  }, [channelId]);

  useEffect(() => {    
      getChannelAllMembers(state)
        .then ((response) => {
          setResp(response);
        })
        .catch((err) => {
          setError(err.response);
        });    
  }, [channelId]);

  if ( (error && channelId !== undefined) || (!state && channelId)) {
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
