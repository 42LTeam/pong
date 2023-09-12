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



  const buttonProps = {
    buttonProps: {
      style: {
        background: "none",
        cursor: "pointer",
        textAlign: "left",
      },
    },
    fill: true,
    hoverProps: {
      background: "#2C3E50",
    },
  };

  const handleContextMenu = (event) => {
    let tmp: {right: any,left: any, top:any, bottom: any} = {
      right: 'none',
      left: 'none',
      top: 'none',
      bottom: 'none'
    }
    if (event.clientX >= window.innerWidth / 2)
      tmp.right = window.innerWidth - event.clientX;
    else
      tmp.left = event.clientX;



    if (event.clientY >= window.innerHeight / 2)
      tmp.bottom = window.innerHeight - event.clientY;
    else
      tmp.top = event.clientY;


    setPopUpPosition(tmp);
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
                {...(props.buttonProps || buttonProps)}
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
