import "../../../css/chat.css";
import React, { useContext, useEffect, useState } from "react";
import {
  banUserFromChannel,
  getChannelAllMembers,
  muteUserFromChannel, ownerMakeAdmin,
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
      subheader="Membres"
      body={
        <>
          {ChannelAllMembers.map((current) => {
            console.log("log ChannelMemberList => Current: ", current);
            return (
              <Friend
                key={current.user.id}
                friend={current.user}
                channelId={channelId}
                contextMenu={
                  isAdmin && current.user.id != user.id && !current.isBanned && !current.isOwner
                      ? [
                        {
                          text: "Virer du salon",
                          handleClick: () =>
                              removeUserAdminFromChannel(
                                  channelId,
                                  current.user.id
                              ),
                        },
                        {
                          text: "Fermer sa bouche",
                          handleClick: () =>
                              muteUserFromChannel(channelId, current.user.id),
                        },
                        {
                          text: "Bannir",
                          handleClick: () =>
                              banUserFromChannel(channelId, current.user.id),
                        },
                        { separator: true },
                        ...(
                            user.id === current.channel.creatorId
                                ? [
                                  {
                                    text: "Nommer Ministre",
                                    handleClick: () => ownerMakeAdmin(channelId, current.user.id),
                                  },
                                  { separator: true }
                                ]
                                : []
                        ),
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
