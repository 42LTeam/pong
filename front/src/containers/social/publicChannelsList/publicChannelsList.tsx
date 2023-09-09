import { useEffect, useState } from 'react';
import { getChannels, getPublicChannels } from '../../../api';
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


  return (
    channels.map(current => <Conversation username={current.name} handleClick={null} avatar={null} lastRead={null}></Conversation>)
  );
}
