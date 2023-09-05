import PopUp from "./PopUp";
import { Children, useState } from "react";
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
      {Children.map(props.children, (child) => (
        <>{child}</>
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
          {props.buttons?.map((current) => {
            if (current.separator)
              return (
                <div
                  style={{ background: "#2c3e50" }}
                  className="horizontal-separator"
                ></div>
              );
            return (
              <Button
                key={props.buttons?.indexOf(current)}
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
