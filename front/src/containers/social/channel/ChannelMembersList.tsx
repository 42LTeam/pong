import "../../../css/chat.css";
import React, { useContext, useEffect, useState } from "react";
import {
  banUserFromChannel,
  getChannelAllMembers,
  muteUserFromChannel, ownerMakeAdmin,
  removeUserAdminFromChannel,
  sendMessageToChannel,
} from "../../../api";
import SidePanel from "../../../components/utils/SidePanel";
import Friend from "../../../components/friend/Friend";
import { AuthContext, useRerender } from "../../Auth";

type ChannelMembersListProps = {
  channelId: number;
};

export default function ChannelMembersList({
  channelId,
}: ChannelMembersListProps) {
  if (Number.isNaN(channelId))
    return ;
  const user = useContext(AuthContext);
  const [rerenderFlag, setRerenderFlag] = useState(false);
  const forceRerender = useRerender();

  const [ChannelAllMembers, setChannelAllMembers] = useState([]);
  const fetchChannelAllMembers = () => {
    getChannelAllMembers(channelId)
      .then((response) => {
        setChannelAllMembers(response.data);
        setRerenderFlag(true);

      })
      .catch((err) => {
        console.log(err)
      });
  };

  useEffect(() => {
    if (!channelId) return;
    fetchChannelAllMembers();
  }, [channelId, rerenderFlag]);

  const isAdmin = ChannelAllMembers.some((member) => {
    return member.userId === user.id && member.isAdmin === true;
  });

  const handleRemoveUserFromChannel = (userId) => {
    removeUserAdminFromChannel(channelId, userId)
      .then(() => {
        setRerenderFlag(false);
        fetchChannelAllMembers();
      })
      .catch((err) => console.log(err));
  };
  
  const handleBanUserFromChannel = (userId) => {
    banUserFromChannel(channelId, userId)
      .then(() => {
        setRerenderFlag(false);
        fetchChannelAllMembers();
      })
      .catch((err) => console.log(err));
  };

  const handleMuteUserFromChannel = async (user) => {
    
    muteUserFromChannel(channelId, user.id);
    const muteMessage = "J'ai fermé la bouche de [" + user.username + "] pour 1 minute";
    await sendMessageToChannel(channelId, muteMessage);
  }

  return (
    <SidePanel
      subheader="Membres"
      body={
        <>
          {ChannelAllMembers.map((current) => {
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
                          handleRemoveUserFromChannel(current.user.id)
                        },
                        {
                          text: "Fermer sa bouche",
                          handleClick: () =>
                              handleMuteUserFromChannel(current.user)
                        },
                        {
                          text: "Bannir",
                          handleClick: () =>
                          handleBanUserFromChannel(current.user.id)
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
