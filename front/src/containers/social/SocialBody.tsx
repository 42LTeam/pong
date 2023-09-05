import "../../css/chat.css";
import Conversations from "./conversation/Conversations";
import React, { useEffect, useState } from "react";
import Friends from "./friend/Friends";
import Chat from "./chat/Chat";
import { useParams } from "react-router-dom";
import ChannelMembersList from "./channel/ChannelMembersList";

export default function SocialBody() {
  const { channelId } = useParams();
  const [state, setState] = useState(Number.parseInt(channelId) || null);

  useEffect(() => {
    setState(Number.parseInt(channelId));
  }, [channelId]);

  return (
    <div className="chatbody bubble">
      <Conversations conversations={[]} state={state}></Conversations>
      <div className="vertical-separator"></div>
      {state ? (
        <Chat key={channelId} channel={state} channelId={setState}></Chat>
      ) : (
        <Friends></Friends>
      )}
      {state ? (
        <>
          <div className="vertical-separator"></div>
          <ChannelMembersList
            key={channelId}
            channelId={state}
            // setChannelId={setState}
          />
        </>
      ) : null}
    </div>
  );
}
