import "../../../css/chat.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../Auth";
import { getChannels } from "../../../api";
import SidePanel from "../../../components/utils/SidePanel";

type Props = {
  channelId: any;
  setState: any;
};

export default function ChannelMembersList({ channelId, setState }: Props) {
  const [ChannelAllMembersList, setChannelAllMembersList] = useState(null);
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
    //TODO in back - getChannelAllMembers
    getAllUsersInChannel(channelId).then((response) => {
      setChannelAllMembers(response.data);
    });
  };

  const clear = async (refresh) => {
    if (refresh) fetchChannelAllMembers();
    setPopUpPosition(null);
  };

  if (!ChannelAllMembersList && user) fetchChannelAllMembers();

  return (
    <SidePanel
      subheader="Members"
      body={
        <>
          {popUpPosition && (
            //TODO popup new user on the channel list member

          )}
          {ChannelAllMembersList?.map((conversation) => (
            //TODO add ChannelMember

          ))}
        </>
      }
    />
  );
}
