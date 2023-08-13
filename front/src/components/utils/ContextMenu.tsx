import PopUp from "./PopUp";
import {Children, useState} from "react";
import Button from "./Button";

type Props = {
    children: any
}


const buttonProps = {
    buttonProps: {
        style: {
            background: 'none',
            cursor: 'pointer',
            textAlign: 'left'
        }
    },
    fill: true,
    hoverProps: {
        background: '#2C3E50'}
};

const buttons = [
    {text: 'Profile'},
    {text: 'Envoyer un message'},
    {separator: true},
    {text: 'Match amical'},
    {text: 'Retirer l\'ami'},
    {text: 'Bloquer'},
]

export default function ContextMenu(props: Props){


    const [popUpPosition, setPopUpPosition] = useState(null);
    const handleContextMenu = (event)  => {
            setPopUpPosition({left: event.clientX, top: event.clientY});
            event.preventDefault();
            return false;
    }


    return (
        <div onContextMenu={handleContextMenu} style={{alignSelf: "stretch"}}>
            {Children.map(props.children, child => <>{child}</>)}
            {popUpPosition ?
            <PopUp height="min-content" position={popUpPosition} clear={() => setPopUpPosition(null)}>
                {buttons.map(current => {
                    if (current.separator) return <div style={{background: '#2c3e50'}} className="horizontal-separator"></div>
                    return (
                        <Button key={buttons.indexOf(current)} {...buttonProps} {...current} ></Button>
                    )
                })}
            </PopUp>
            : null}
        </div>
    )
}