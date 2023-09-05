import TextInput from "../../../components/utils/TextInput";
import Button from "../../../components/utils/Button";
import PopUp from "../../../components/utils/PopUp";
import { useContext, useState } from "react";
import Friend from "../../../components/friend/Friend";
import {
  createChannel,
  getAllUsers,
  searchUser,
  sendChannelInvite,
} from "../../../api";
import Removable from "../../../components/utils/Removable";
import Cancel from "../../../components/svg/Cancel";
import { AuthContext } from "../../Auth";

type Props = {
  position: { left: number; top: number };
  clear: any;
};

export default function NewMessagePopup({ position, clear }: Props) {
  const user = useContext(AuthContext);
  const [suggestions, setSuggestions] = useState([]);
  const [checked, setChecked] = useState([]);

  const mapData = (current) => (
    <Friend
      key={"popupfriend-" + current.id}
      friend={current}
      onClick={() =>
        toggleCheck(current.username, !checked.includes(current.username))
      }
    >
      <div className="align-left">
        <input
          readOnly
          {...(checked.includes(current.username)
            ? { checked: true }
            : { checked: false })}
          type="checkbox"
        />
      </div>
    </Friend>
  );

  const handlePopupSearch = async (event) => {
    const search = event.target.value;
    if (!search)
      return getAllUsers({ notFriend: false, friendOnly: false }).then(
        (response) =>
          setSuggestions(
            response.data.filter((current) => current.id !== user.id),
          ),
      );
    const { data } = await searchUser(search, { friendOnly: false });
    setSuggestions(data);
  };

  const handleClickMP = async (isPrivate) => {
    const response = await createChannel({
      name: [...checked, user.username].sort().join("+"),
      creatorId: user.id,
      privated: isPrivate,
      conv: true,
    });
    const channel = response.data;
    sendChannelInvite({
      channelId: channel.id,
      ids: suggestions
        .filter((f) => checked.includes(f.username))
        .map((f) => f.id),
    }).then(() => {
      clear(true);
    });
  };

  const handleClick = async (isPrivate) => {
    const response = await createChannel({
      name: [...checked, user.username].sort().join("+"),
      creatorId: user.id,
      privated: isPrivate,
    });
    const channel = response.data;
    sendChannelInvite({
      channelId: channel.id,
      ids: suggestions
        .filter((f) => checked.includes(f.username))
        .map((f) => f.id),
    }).then(() => {
      clear(true);
    });
  };

  const toggleCheck = (current, check) => {
    if (check) setChecked((c) => [...c, current]);
    else setChecked(checked.filter((c) => c !== current));
  };

  if (!suggestions.length)
    getAllUsers({ notFriend: false, friendOnly: false }).then((response) =>
      setSuggestions(response.data.filter((current) => current.id !== user.id)),
    );

  return (
    <PopUp key={"newmessage-root"} position={position} clear={clear}>
      <h1>Sélectionne des amis</h1>
      <h3>Tu peux ajouter des amis.</h3>
      <TextInput
        key={"newmessage-input"}
        text="Trouve ton ami.e tape son nom..."
        bgColor="#2C3E50"
        onChange={handlePopupSearch}
      >
        {checked.map((current) => (
          <Removable
            content={current}
            onInteract={() => toggleCheck(current, false)}
            icon={<Cancel tiny />}
            key={"removable=" + current}
          />
        ))}
      </TextInput>
      <div className="newmessage-suggestions">{suggestions?.map(mapData)}</div>
      {checked.length === 0 ? (
        <Button
          key={"newmessage-button"}
          fill
          text="Select Friends First"
          clickable={false}
        ></Button>
      ) : checked.length === 1 ? (
        <Button
          key={"newmessage-button"}
          fill
          handleClick={() => handleClickMP(true)}
          text="Creer un MP"
          clickable={true}
        ></Button>
      ) : (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Button
            key={"newmessage-button-public"}
            fill
            handleClick={() => handleClick(false)}
            text="Creer un channel public"
            clickable={true}
            style={{ flex: 1, marginRight: "10px" }}
          ></Button>
          <Button
            key={"newmessage-button-private"}
            fill
            handleClick={() => handleClick(true)}
            text="Creer un channel privé"
            clickable={true}
            style={{ flex: 1, marginLeft: "10px" }}
          ></Button>
        </div>
      )}
    </PopUp>
  );
}
