// import "../../css/chat.css"
import Setting from "../../components/setting/Setting";
import { useContext, useState } from "react";
import { AuthContext } from "../Auth";
import { getFriendOfUser } from "../../api";
import React from "react";

export default function UserSettings({ state }) {
  const [settings, setSettings] = useState(null);
  const user = useContext(AuthContext);

  if (!settings && user) {
    getFriendOfUser(user.id).then((response) => {
      setSettings(response.data);
    });
  }

  return (
    // <div className="">
    <Setting />

    // </div>
  );
}
