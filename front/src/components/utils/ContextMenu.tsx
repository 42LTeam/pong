import PopUp from "./PopUp";
import React, { Children, useState } from "react";
import Button from "./Button";

type Props = {
  children?: any;
  buttons?: any[];
  buttonProps?: any;
};

export default function ContextMenu(props: Props) {
  const [popUpPosition, setPopUpPosition] = useState(null);

  const handleContextMenu = (event) => {
    setPopUpPosition({ left: event.clientX, top: event.clientY });
    event.preventDefault();
    return false;
  };

  return (
    <div onContextMenu={handleContextMenu} style={{ alignSelf: "stretch" }}>
      {Children.map(props.children, (child, index) => (
        <div key={index}>{child}</div>
      ))}
      {popUpPosition ? (
        <PopUp
          divStyle={{
            padding: "5px",
          }}
          height="min-content"
          position={popUpPosition}
          clear={() => setPopUpPosition(null)}
        >
          {props.buttons?.map((current, index) => {
            if (current.separator)
              return (
                <div
                  key={"separator-" + index}
                  style={{ background: "#2c3e50" }}
                  className="horizontal-separator"
                ></div>
              );
            return (
              <Button
                key={"button-" + index}
                {...props.buttonProps}
                {...current}
                clickable={true}
                handleClick={() => {
                  setPopUpPosition(null);
                  current.handleClick();
                }}
              ></Button>
            );
          })}
        </PopUp>
      ) : null}
    </div>
  );
}
