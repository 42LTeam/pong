import { useEffect, useState } from 'react';
import { getChannels, getPublicChannels, validateChannelPassword } from '../../../api';
import Conversation from '../../../components/conversation/Conversation';
import React from 'react';


export default function PublicChannelsList() {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    async function fetchChannels() {
      try {
        const response = await getPublicChannels();
        setChannels(response.data);
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    }
    fetchChannels();
  }, []);

  const handleChannelClick = async (channel) => {
    if (channel.password) {
      const password = prompt("Please enter the channel password:");
      if (!password) {
        console.log("No password entered by user");
        return;
      }
      try {
        const isValidPassword = await validateChannelPassword(channel.id, password);
        if (isValidPassword) {
          // TODO
        } else {
          alert("Incorrect password!");
        }
      } catch (error) {
        console.error("Error validating password:", error);
      }

    } else {
      console.log("Channel doesn't have a password");
      // TODO
    }
  };


  return (
    channels.map(current =>
      <Conversation
        username={current.name}
        handleClick={() => handleChannelClick(current)}
        avatar={null}
        lastRead={null}
        channel={current}
        hasPassword={Boolean(current.password)}
      />
    )
  );
}
