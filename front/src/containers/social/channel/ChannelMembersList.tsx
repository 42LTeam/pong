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
        console.log("cannot fetch members")
      });
  };

  useEffect(() => {
    if (!channelId) return;
    fetchChannelAllMembers();
  }, [channelId, rerenderFlag]);

  const isAdmin = ChannelAllMembers.some((member) => {
    return member.userId === user.id && member.isAdmin === true;
  });

  const handleRemoveUserFromChannel = async (user) => {
    removeUserAdminFromChannel(channelId, user.id)
      .then(() => {
        setRerenderFlag(false);
        fetchChannelAllMembers();
      })
      .catch((err) => console.log("cannot remove user"));
      const kickMessage = "[" + user.username + "]... T'es viré mon grand... Reviens quand tu seras frais";
      await sendMessageToChannel(channelId, kickMessage);
      setRerenderFlag(false);
  };
  
  const handleBanUserFromChannel = async (user) => {
    banUserFromChannel(channelId, user.id)
      .then(() => {
        setRerenderFlag(false);
        fetchChannelAllMembers();
      })
      .catch((err) => console.log("cannot ban user"));
      const banMessage = "J'ai décidé de bannir [" + user.username + "] de la tribu.. et ma sentence est irrévocable !";
      await sendMessageToChannel(channelId, banMessage);
      setRerenderFlag(false);
  };

  const handleMuteUserFromChannel = async (user) => {
    
    await muteUserFromChannel(channelId, user.id);
    const muteMessage = "J'ai fermé la bouche de [" + user.username + "] pour 1 minute";
    await sendMessageToChannel(channelId, muteMessage);
    setRerenderFlag(false);
  }

  const handleNewAdminUserFromChannel = async (user) => {

    await ownerMakeAdmin(channelId, user.id);
    const makeAdminMessage = "J'ai nommé [" + user.username + "] ministre. Ouais, c'est moi l'owner, je fais ce que je veux.";
    await sendMessageToChannel(channelId, makeAdminMessage);
    setRerenderFlag(false);
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
                          handleRemoveUserFromChannel(current.user)
                        },
                        {
                          text: "Fermer sa bouche",
                          handleClick: () =>
                              handleMuteUserFromChannel(current.user)
                        },
                        {
                          text: "Bannir",
                          handleClick: () =>
                          handleBanUserFromChannel(current.user)
                        },
                        { separator: true },
                        ...(
                            user.id === current.channel.creatorId
                                ? [
                                  {
                                    text: "Nommer Ministre",
                                    handleClick: () => handleNewAdminUserFromChannel(current.user),
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
