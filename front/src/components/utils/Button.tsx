import {useState} from "react";

export interface ButtonProps {
    handleClick: any,
    text: string,
    fill?: any,
    buttonProps?: any,
    clickable?: boolean,
    hoverProps?: any,
}

export default function Button({fill, handleClick, text, buttonProps, clickable,hoverProps}: ButtonProps){
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
            onClick={() => {handleClick(text)}}
            className={'button' + (clickable ? ' button-clickable': '')}
        >
            {text}
        </div>
    );
}