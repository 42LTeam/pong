import Button, { ButtonProps } from "./Button";
import { useState } from "react";

type ToggleButtonProps = {
  states: any[];
  current: string;
} & ButtonProps;
export default function ToggleButton(props: ToggleButtonProps) {
  const [state, setState] = useState(1);
  if (state && props.current != props.text) setState(0);
  const handleClick = (text) => {
    if (props.current != props.text)
      setState(state == props.states.length - 1 ? 0 : state + 1);
    props.handleClick && props.handleClick(text);
  };

  const buttonProps = {
    ...props,
    buttonProps: {
      ...props.buttonProps,
      style: {
        ...props.buttonProps?.style,
        ...(props.states ? props.states[state] : {}),
      },
    },
    clickable: true,
    handleClick,
  };

  return <Button {...buttonProps}></Button>;
}
