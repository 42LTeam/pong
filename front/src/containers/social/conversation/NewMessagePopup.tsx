import TextInput from "../../../components/utils/TextInput";
import Button from "../../../components/utils/Button";
import PopUp from "../../../components/utils/PopUp";
import { useContext, useEffect, useRef, useState } from "react";
import Friend from "../../../components/friend/Friend";
import {
  createChannel,
  getAllUsers,
  searchUser,
  sendChannelInvite,
  setChannelPassword,
} from "../../../api";
import Removable from "../../../components/utils/Removable";
import Cancel from "../../../components/svg/Cancel";
import { AuthContext } from "../../Auth";
import PopOver from "../../../components/utils/PopOver";
import Lock from "../../../components/svg/Lock";
import ToggleButton from "../../../components/utils/ToggleButton";
import Avatar from "../../../components/utils/Avatar";
import Check from "../../../components/svg/Check";
import Cross from "../../../components/svg/Cross";
import ToggleSwitch from "../../../components/utils/ToggleSwitch";

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
            response.data.filter((current) => current.id !== user.id)
          )
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

  const handleClickPrivate = async (isPrivate) => {
    const enteredPassword = prompt(
      "Please enter the password for the private channel:"
    );
    if (enteredPassword === null) {
      return;
    }
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
    setChannelPassword(channel.id, enteredPassword);
  };

  const toggleCheck = (current, check) => {
    if (check) setChecked((c) => [...c, current]);
    else setChecked(checked.filter((c) => c !== current));
  };

  useEffect(() => {
    getAllUsers({ notFriend: false, friendOnly: false }).then((response) =>
      setSuggestions(response.data.filter((current) => current.id !== user.id))
    );
  }, []);

  const [popOver, setPopOver] = useState(false);
  const [privated, setPrivated] = useState(false);
  const [hasName, setHasName] = useState(false);
  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const handleChannelCreation = async () => {
    const response = await createChannel({
      name: nameRef.current.value,
      conv: false,
      creatorId: 0,
      password: passwordRef.current.value || null,
      privated,
    });
    const channel = response.data;
    sendChannelInvite({
      channelId: channel.id,
      usernames: checked,
    }).then(() => {
      clear(true);
    });
  };

  return (
    <PopUp key={"newmessage-root"} position={position} clear={clear}>
      {popOver ? (
        <PopOver divStyle={{ width: "15vw", padding: 0 }} clear={null}>
          <div
            className="column align-start"
            style={{ padding: 10, gap: "5px" }}
          >
            <h1>Créer un salon</h1>
            <h3>dans salons textuels</h3>
            <h2>Nom du salon</h2>
            <TextInput
              ref={nameRef}
              onChange={(event) => {
                if (!event.target.value.length) setHasName(false);
                else if (!hasName) setHasName(true);
              }}
              text="Entrez un nom"
              bgColor="#2C3E50"
            ></TextInput>
            <h2>Mot de passe</h2>
            <TextInput
              ref={passwordRef}
              password
              text="Entrez un mot de passe"
              bgColor="#2C3E50"
            ></TextInput>
            <div className="row">
              <div className={"row"} style={{ gap: "5px" }}>
                <Lock></Lock>
                <h2>Salon privé</h2>
              </div>
              <ToggleSwitch
                toggle={() => setPrivated(!privated)}
                state={privated}
              ></ToggleSwitch>
            </div>
          </div>
          <div className="footer">
            <Button
              handleClick={() => clear(false)}
              text={"Annuler"}
              clickable
              buttonProps={{ style: { background: "none" } }}
            ></Button>
            <Button
              handleClick={handleChannelCreation}
              text={"Créer un salon"}
              clickable={hasName}
            ></Button>
          </div>
        </PopOver>
      ) : null}
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
      <Button
        fill
        text={"Creer un channel"}
        handleClick={() => setPopOver(true)}
        clickable={Boolean(checked.length)}
      ></Button>
      {/*{checked.length === 0 ? (*/}
      {/*  <Button*/}
      {/*    key={"newmessage-button"}*/}
      {/*    fill*/}
      {/*    text="Select Friends First"*/}
      {/*    clickable={false}*/}
      {/*  ></Button>*/}
      {/*) : checked.length === 1 ? (*/}
      {/*  <Button*/}
      {/*    key={"newmessage-button"}*/}
      {/*    fill*/}
      {/*    handleClick={() => handleClickMP(true)}*/}
      {/*    text="Creer un MP"*/}
      {/*    clickable={true}*/}
      {/*  ></Button>*/}
      {/*) : (*/}
      {/*  <div*/}
      {/*    style={{*/}
      {/*      display: "flex",*/}
      {/*      width: "100%",*/}
      {/*      justifyContent: "space-between",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <Button*/}
      {/*      key={"newmessage-button-public"}*/}
      {/*      fill*/}
      {/*      handleClick={() => handleClick(false)}*/}
      {/*      text="Creer un channel public"*/}
      {/*      clickable={true}*/}
      {/*      style={{ flex: 1, marginRight: "10px" }}*/}
      {/*    ></Button>*/}
      {/*    <Button*/}
      {/*      key={"newmessage-button-private"}*/}
      {/*      fill*/}
      {/*      handleClick={() => handleClickPrivate(true)}*/}
      {/*      text="Creer un channel privé"*/}
      {/*      clickable={true}*/}
      {/*      style={{ flex: 1, marginLeft: "10px" }}*/}
      {/*    ></Button>*/}
      {/*  </div>*/}
      {/*)}*/}
    </PopUp>
  );
}
