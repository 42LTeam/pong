import "../../../css/chat.css";
import React, { useContext, useEffect, useState } from "react";
import {
  banUserFromChannel,
  getChannelAllMembers,
  muteUserFromChannel,
  removeUserAdminFromChannel,
} from "../../../api";
import SidePanel from "../../../components/utils/SidePanel";
import Friend from "../../../components/friend/Friend";
import { AuthContext } from "../../Auth";

type ChannelMembersListProps = {
  channelId: number;
};

export default function ChannelMembersList({
  channelId,
}: ChannelMembersListProps) {
  const user = useContext(AuthContext);

  const [ChannelAllMembers, setChannelAllMembers] = useState([]);
  const fetchChannelAllMembers = () => {
    getChannelAllMembers(channelId)
      .then((response) => {
        setChannelAllMembers(response.data);
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!channelId) return;
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
            console.log("Current = ", current);
            return (
              <Friend
                key={current.user.id}
                unremovable={true}
                friend={current.user}
                channelId={channelId}
                contextMenu={
                  isAdmin && current.user.id != user.id && !current.isBanned
                    ? [
                        {
                          text: "Kick",
                          handleClick: () =>
                            removeUserAdminFromChannel(
                              channelId,
                              current.user.id
                            ),
                        },
                        {
                          text: "Mute",
                          handleClick: () =>
                            muteUserFromChannel(channelId, current.user.id),
                        },
                        {
                          text: "Ban",
                          handleClick: () =>
                            banUserFromChannel(channelId, current.user.id),
                        },
                        { separator: true },
                        {
                          text: "Make me Admin",
                          handleClick: () =>
                              banUserFromChannel(channelId, current.user.id),
                        },
                        { separator: true },
                      ]
                    : null
                }
                isAdmin={isAdmin}
                isBanned={current.isBanned}
              ></Friend>
            );
          })}
        </>
      }
    />
  );
}
