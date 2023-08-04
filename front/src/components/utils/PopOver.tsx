import PopUp, {PopUpProps} from "./PopUp";
import {Children} from 'react';

export default function PopOver(props: PopUpProps){
    return (
        <span className="popover-root">
            <PopUp {...props} center={props.center || true}>
                {Children.map(props.children, child => <>{child}</>)}
            </PopUp>
        </span>
    )
}