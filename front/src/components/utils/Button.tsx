import {Children, useState} from "react";

export type ButtonProps = {
    handleClick: any,
    text: string,
    fill?: any,
    buttonProps?: any,
    clickable?: boolean,
    hoverProps?: any,
    children?: any,
}

export default function Button({fill, handleClick, text, buttonProps, clickable,hoverProps, children}: ButtonProps){
    const [hover, setHover] = useState(null);

    const handleHover = () => {
        setHover({
            ...hoverProps,
        });
    }

    const handleHoverOut = () => {
        setHover(null);
    }

    return (
        <div
            onMouseOver={handleHover}
            onMouseOut={handleHoverOut}
            style={{...buttonProps?.style,alignSelf: fill ? 'stretch' : null, ...hover}}
            onClick={(clickable ? () => {handleClick && handleClick(text)} : null)}
            className={'button' + (clickable ? ' button-clickable': '')}
        >
            {text}
            {Children.map(children, child => <>{child}</>)}
        </div>
    );
}