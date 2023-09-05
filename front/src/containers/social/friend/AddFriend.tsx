import TextInput from "../../../components/utils/TextInput";
import { useContext, useState } from "react";
import Friend from "../../../components/friend/Friend";
import { getAllUsers, searchUser, sendFriendRequest } from "../../../api";
import Button from "../../../components/utils/Button";
import Removable from "../../../components/utils/Removable";
import Cancel from "../../../components/svg/Cancel";
import { AuthContext } from "../../Auth";

export default function AddFriend() {
  const user = useContext(AuthContext);
  const [suggestions, setSuggestions] = useState([]);
  const [checked, setChecked] = useState([]);

  const handleInputChange = (event) => {
    if (event.target.value) {
      searchUser(event.target.value, { notFriend: true }).then((response) => {
        setSuggestions(response.data);
      });
    } else
      getAllUsers({ notFriend: true }).then((response) =>
        setSuggestions(
          response.data.filter((current) => current.id != user.id),
        ),
      );
  };
  const toggleCheck = (current, check) => {
    if (check) setChecked((c) => [...c, current]);
    else setChecked(checked.filter((c) => c != current));
  };
  const mapData = (current) => {
    return (
      <Friend
        key={"popupfriend-" + current.username}
        friend={current}
        notFriend={true}
        onClick={() => toggleCheck(current, !checked.includes(current))}
      >
        <div className="align-left">
          <input checked={checked.includes(current)} type="checkbox" />
        </div>
      </Friend>
    );
  };

  const onButtonClick = () => {
    checked.forEach((current) => sendFriendRequest(current.id));
    setChecked([]);
  };

  if (!suggestions.length)
    getAllUsers({ notFriend: true }).then((response) =>
      setSuggestions(response.data.filter((current) => current.id != user.id)),
    );

  return (
    <>
      <h1> Ajouter</h1>
      <h3> Tu peux ajouter des amis grâce à leurs noms d utilisateur. </h3>
      <TextInput
        text={"Trouve ami.e, tape nom..."}
        onChange={(event) => handleInputChange(event)}
        button={
          <Button
            handleClick={onButtonClick}
            text={"Envoyer une demande d’ami"}
            clickable={Boolean(checked.length)}
          ></Button>
        }
      >
        {checked.map((current) => (
          <Removable
            style={{ background: "#2C3E50" }}
            content={current.username}
            onInteract={() => {
              toggleCheck(current, false);
            }}
            icon={<Cancel tiny />}
            key={"removable=" + current.id}
          />
        ))}
      </TextInput>
      {suggestions?.map(mapData)}
    </>
  );
}
