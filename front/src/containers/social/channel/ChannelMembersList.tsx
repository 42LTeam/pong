import "../../../css/chat.css";
import React, { useContext, useEffect, useState } from "react";
import {getChannelAllMembers} from "../../../api";
import SidePanel from "../../../components/utils/SidePanel";
import Friend from "../../../components/friend/Friend";
import { AuthContext } from "../../Auth";

type ChannelMembersListProps = {

  channelId: number
}

export default function ChannelMembersList({ channelId }: ChannelMembersListProps) {
  const user = useContext(AuthContext);

  const [ChannelAllMembers, setChannelAllMembers] = useState([]);
  const fetchChannelAllMembers = () => {
    getChannelAllMembers(channelId).then((response) => {
      setChannelAllMembers(response.data);
      console.log(response);
    })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!channelId)
      return;
    fetchChannelAllMembers();
  }, [channelId]);

  const isAdmin = ChannelAllMembers.some((member) => {
    return member.userId === user.id && member.isAdmin === true;
  });


  return (
    <SidePanel
      subheader="Members"
      body={
        <>
          {ChannelAllMembers.map((current) => {
            console.log("Current = ", current)
              return (<Friend key={current.user.id} unremovable={true} friend={current.user} channelId={channelId} isAdmin={isAdmin} isBanned={current.isBanned} ></Friend>);
          })}
        </>
      }
    />
  );
}
