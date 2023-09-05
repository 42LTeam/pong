import { Children, useEffect, useRef } from "react";
import "../../css/popup.css";

export type PopUpProps = {
  children?: any;
  position?: { left: number; top: number };
  clear: any;
  center?: boolean;
  height?: string;
  divStyle?: any;
};
export default function PopUp({
  children,
  position,
  clear,
  center,
  height,
  divStyle,
}: PopUpProps) {
  const ref = useRef(null);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (!ref?.current.contains(event.target)) clear();
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  return (
    <div
      ref={ref}
      className={"popup-root" + (center ? " center" : "")}
      style={{ ...position, minHeight: height, ...divStyle }}
    >
      {Children.map(children, (child) => (
        <>{child}</>
      ))}
    </div>
  );
}
