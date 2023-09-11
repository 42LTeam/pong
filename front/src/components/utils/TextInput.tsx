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

const TextInput = forwardRef(function MyInput(props: Props, ref) {
  const [focus, setFocus] = useState(false);
  const handleFocus = () => {
    setFocus(true);
  };
  const handleBlur = () => {
    setFocus(false);
  };

  return (
    <div
      style={{ background: props.bgColor || "#34495E" }}
      className={"textinput-root" + (focus ? " textinput-root-focus" : "")}
    >
      {Children.map(props.children, (child) => (
        <>{child}</>
      ))}
      <input
        ref={ref}
        onKeyDown={props.onKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{ color: props.color || "none" }}
        className="textinput-input"
        onChange={props.onChange}
        placeholder={props.text}
        type={props.password ? "password" : ""}
        {...(props.value ? { value: props.value } : {})}
      />
      {props.button}
    </div>
  );
});

export default TextInput;
/*(props: Props) {
    const [focus, setFocus]=useState(false);
    const handleFocus = () => {
        setFocus(true);
    };
    const handleBlur = () => {
        setFocus(false);
    };


    return (
        <div
            style={{ background: props.bgColor || "#34495E"}}
            className={"textinput-root" + (focus ? " textinput-root-focus" : '')}>
            {Children.map(props.children, child => <>{child}</>)}
            <input
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{color: props.color || 'none'}}
                className='textinput-input'
                onChange={props.onChange}
                placeholder={props.text}
                {...(props.value ? {value: props.value} : {})}
            />
                {props.button}
        </div>
    )
}*/
