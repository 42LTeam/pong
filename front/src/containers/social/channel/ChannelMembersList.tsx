import "../../../css/chat.css";
import React, {useContext, useEffect, useState} from "react";
import { AuthContext } from "../../Auth";
import {getChannelAllMembers} from "../../../api";
import SidePanel from "../../../components/utils/SidePanel";
import NewMessagePopup from "../conversation/NewMessagePopup";
import ChannelMember from "../../../components/channelpanel/ChannelMember";

type ChannelMembersListProps = {
  setChannelId: any,
  //state: number | null,
  channelId: number
}

export default function ChannelMembersList({ channelId, setChannelId }: ChannelMembersListProps) {
  const [ChannelAllMembers, setChannelAllMembers] = useState(null);
  const [popUpPosition, setPopUpPosition] = useState(null);

  const user = useContext(AuthContext);

  const handlePopUp = (event) => {
    setPopUpPosition({
      right: event.clientX,
      top: event.clientY,
      width: "420px",
    });
  };

  const fetchChannelAllMembers = () => {
    getChannelAllMembers(channelId).then((response) => {
      setChannelAllMembers(response.data);
      console.log(response);
    })
        .catch((err) => console.log(err));
  };

  const clear = async (refresh) => {
    if (refresh) fetchChannelAllMembers();
    setPopUpPosition(null);
  };

  useEffect(() => {
    //if (state !== undefined && state !== null)
      fetchChannelAllMembers();
  }, [channelId]);

  return (
    <SidePanel
      subheader="Members"
      body={
        <>
          {popUpPosition &&
              <NewMessagePopup
                key={"newMessagePopup"}
                position={popUpPosition}
                clear={clear}>
              </NewMessagePopup>}
          {ChannelAllMembers?.map((ChannelAllMembersList) => (
            <ChannelMember
                key={'conversation_id ' + ChannelAllMembersList.id}
                username={ChannelAllMembersList.user.username}
                status={ChannelAllMembersList.status}
              />
          ))}
        </>
      }
    />
  );
}
