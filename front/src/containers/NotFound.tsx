import React from "react";

import "../css/main.css";
// @ts-ignore

import { useNavigate } from "react-router-dom";
import Button from "../components/utils/Button";

type Props = {
  page?: string;
  id?: any;
}

const NotFound = function (props: Props) {
  
  const navigate = useNavigate();

  return (
    <div className="not-found">
      {props.page === "profile" ?
      (<h1>The user with id {props.id} does not exist</h1>) :
      (<>
        <h1>404 Not Found</h1>
        <h1>The ressource you are looking for does not exist</h1>
        </>
      )}
      <Button
              handleClick={() => navigate("/")}
              text={"HOME"}
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