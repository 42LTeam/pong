import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  getChannelAllMembers,
  getPublicChannels,
  joinChannel,
  validateChannelPassword,
} from "../../../api";
import Conversation from "../../../components/conversation/Conversation";
import { AuthContext } from "../../Auth";
import PopOver from "../../../components/utils/PopOver";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/utils/Button";

export default function PublicChannelsList() {
  const [channels, setChannels] = useState([]);
  const [isPasswordPopUpVisible, setPasswordPopUpVisible] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const user = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchChannels() {
      try {
        const response = await getPublicChannels(user.id);
        setChannels(response.data);
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    }
    fetchChannels();
  }, []);

  const handleChannelClick = async (channel) => {

    if (channel.passworded) {
      setSelectedChannel(channel);
      setPasswordPopUpVisible(true);
      return;
    } else {
      await joinChannelDirectly(channel);
      navigate(`/social/${channel.id}`);
    }
  };

  const handlePasswordSubmit = async (password) => {
    setPasswordPopUpVisible(false);

    if (selectedChannel) {
      try {
        const isValidPassword = await validateChannelPassword(
          selectedChannel.id,
          password
        );
        if (isValidPassword) {
          await joinChannelDirectly(selectedChannel);
          navigate(`/social/${selectedChannel.id}`);
        } else {
          alert("Incorrect password!");
        }
      } catch (error) {
        console.error("Error validating password:", error);
      }
    }
  };

  const joinChannelDirectly = async (channel) => {
    await joinChannel(channel.id);

    navigate(`/social/${channel.id}`);
  };

  return (
    <div>
      {channels.map((current) => (
        <Conversation
          key={current.id}
          username={current.name}
          id={current.id}
          handleClick={() => handleChannelClick(current)}
          avatar={null}
          lastRead={null}
          hasPassword={Boolean(current.passworded)}
        />
      ))}
      {isPasswordPopUpVisible && (
        <PopOver clear={() => setPasswordPopUpVisible(false)} height="50px">
          <input
            type="password"
            placeholder="Enter channel password"
            id="channelPasswordInput"
          />
          <Button
            handleClick={() =>
              handlePasswordSubmit(
                document.getElementById("channelPasswordInput").value
              )
            }
            text="Join"
            clickable={true}
          />
        </PopOver>
      )}
    </div>
  );
}
