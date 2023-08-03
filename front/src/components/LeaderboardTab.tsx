import React from "react";

export default function LeaderboardTab({handleClick,text, state}){
    return (
        <div onClick={() => {handleClick(text)}} className={'friend-tab ' + (state == text ? 'friend-tab-current' : '')}>
            {text}
        </div>
    );
}