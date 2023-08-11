import React from "react";

import "../../css/header.css"

import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

export default function HeaderNavigationIcon({handleClick,text, children, state, description}){
    return (
        <Tooltip title={description} TransitionComponent={Zoom} className="tooltip">
        <div onClick={() => {handleClick(text)}} className={'header-navigation-icon ' + (state == text ? 'header-navigation-icon-current' : '')}>
            {children}
            </div>
        </Tooltip>
    );
}