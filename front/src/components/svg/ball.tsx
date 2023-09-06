import React from "react";

import "../../css/homepage.css";

type Props = {
    color: string;
}

export default function Ball(props : Props) {
  return (
    /*<svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="#ECF0F1"/>
    </svg>*/


    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
    <defs>
        <filter id="sofGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feMorphology operator="dilate" radius="5" in="SourceAlpha" result="thicken" />
        <feGaussianBlur in="thicken" stdDeviation="10" result="blurred" />
        <feFlood flood-color="rgb(0,186,255)" result="glowColor" />
        <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow_colored" />
        <feMerge>
            <feMergeNode in="softGlow_colored" />
            <feMergeNode in="SourceGraphic" />
        </feMerge>
        </filter>
    </defs>
    <circle cx="50" cy="50" r="25" fill="rgb(0,186,255)" filter="url(#sofGlow)"/>
    </svg>

);
}