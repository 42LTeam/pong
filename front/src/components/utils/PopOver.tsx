import React from 'react';
import {Children} from 'react';

import PopUp, {PopUpProps} from "./PopUp";


export default function PopOver(props: PopUpProps){
    return (
        <span className="popover-root">
            <PopUp {...props} center={props.center || true}>
                {Children.map(props.children, child => <>{child}</>)}
            </PopUp>
        </span>
    )
}