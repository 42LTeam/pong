import "../../../css/chat.css";
import React, {useEffect, useState} from "react";
import {getChannelAllMembers} from "../../../api";
import SidePanel from "../../../components/utils/SidePanel";
import Friend from "../../../components/friend/Friend";

type ChannelMembersListProps = {
  setChannelId: any,
  channelId: number
}

export default function ChannelMembersList({ channelId }: ChannelMembersListProps) {
  const [ChannelAllMembers, setChannelAllMembers] = useState([]);

  const fetchChannelAllMembers = () => {
    getChannelAllMembers(channelId).then((response) => {
      setChannelAllMembers(response.data);
      console.log(response);
    })
        .catch((err) => console.log(err));
  };

  useEffect(() => {
      fetchChannelAllMembers();
  }, [channelId]);

  return (
    <SidePanel
      subheader="Members"
      body={
        <>
          {ChannelAllMembers.map( (current) => {
              return (<Friend unremovable={true} unblockable={true} friend={current.user} ></Friend>);
          })}
        </>
      }
    />
  );
}
