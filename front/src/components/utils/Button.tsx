import { Children, useState } from "react";

export type ButtonProps = {
  handleClick: any;
  text: string;
  fill?: any;
  buttonProps?: any;
  clickable?: boolean;
  hoverProps?: any;
  className?: string;
  children?: any;
};

export default function Button({
  fill,
  handleClick,
  text,
  buttonProps,
  clickable,
  hoverProps,
  className,
  children,
}: ButtonProps) {
  const [hover, setHover] = useState(null);

  const handleHover = () => {
    setHover({
      ...hoverProps,
    });
  };

  const handleHoverOut = () => {
    setHover(null);
  };

  return (
    <div
      onMouseOver={handleHover}
      onMouseOut={handleHoverOut}
      style={{
        alignSelf: fill ? "stretch" : null,
        ...buttonProps?.style,
        ...hover,
      }}
      onClick={
        clickable
          ? () => {
              handleClick && handleClick(text);
            }
          : null
      }
      className={
        "button" +
        (clickable ? " button-clickable" : "") +
        (className ? " " + className : "")
      }
    >
      {text}
      {Children.map(children, (child) => (
        <>{child}</>
      ))}
    </div>
  );
}
