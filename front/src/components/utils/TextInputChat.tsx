import React from "react";
import "../../css/text-input.css";
import { Children, forwardRef, useState } from "react";

type Props = {
  text?: string;
  onChange?: any;
  button?: any;
  value?: string;
  bgColor?: string;
  color?: string;
  children?: any;
  onKeyDown?: any;
  password?: boolean;
};

const TextInputChat = forwardRef(function MyInput(props: Props, ref) {
  const [focus, setFocus] = useState(false);
  const handleFocus = () => {
    setFocus(true);
  };
  const handleBlur = () => {
    setFocus(false);
  };
  const [inputValue, setInputValue] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const maxWordLength = (str : string) => {
    const words = str.split(' ');
    return (words.some((word) => word.length > 25));
  }

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (maxWordLength(newValue) || newValue.length > 100) { // max 25 caractères sans espace
      setShowAlert(true);
      if (newValue.length > 100) { // max 100 cara de long
        alert("Frérot t'es censé écrire un message pas un bouquin 🧐");
      }
    } else {
      setShowAlert(false);
    }
  
    if (props.onChange) {
      props.onChange(newValue);
    }

  };

  const handleKeyDown = (e) => {
    if (showAlert === false) {
      props.onKeyDown(e);
    }
  }
  
  return (
    <>
    {showAlert && (
    <div className="max-length-alert">
      Max. 25 caractères par mot et max. 100 caractères au total. (raconte pas ta vie aussi tsais)
    </div>
      )}

    <div
      style={{ background: props.bgColor || "#34495E" }}
      className={"textinput-root" + (focus ? " textinput-root-focus" : "")}
    >
      {Children.map(props.children, (child) => (
        <>{child}</>
      ))}

      
      <input
        ref={ref}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{ color: props.color || "none" }}
        className="textinput-input"
        onChange={handleChange}
        placeholder={props.text}
        type={props.password ? "password" : ""}
        {...(props.value ? { defaultValue: props.value } : {})}
      />
      {showAlert ? "" : props.button}
    </div>
    
    </>
  );
});

export default TextInputChat;