import React from "react";

import "../css/main.css";
// @ts-ignore

import { useNavigate } from "react-router-dom";
import Button from "../components/utils/Button";

type Props = {
  page?: string;
  id?: any;
};

const NotFound = function (props: Props) {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      {props.page === "profile" && (
        <h1>L'utilisateur avec l'identifiant {props.id} n'existe pas</h1>
      )}

      {props.page === "social" && (
        <h1>La conversation que tu cherches n'existe pas ou tu n'as pas le droit d'y accéder</h1>
      )}

      {!props.page && (
        <>
          <h1>404 Pas trouvé</h1>
          <h1>La ressource que tu cherches n'existe pas</h1>
        </>
      )}
      <Button
        handleClick={() => navigate("/")}
        text={"Accueil"}
        clickable
        buttonProps={{
          style: {
            width: "150px",
            height: "60px",
            fontSize: "40px",
          },
        }}
      />
    </div>
  );
};

export default NotFound;
