import "../../css/text-input.css"
import {Children, useState} from "react";

type Props = {
    text?: string
    onChange?: any,
    button?: any,
    value? :string,
    bgColor? :string,
    color?: string,
    children?: any,
}
export default function TextInput (props: Props) {
    const [focus, setFocus]=useState(false);
    const handleFocus = () => {
        setFocus(true);
    };
    const handleBlur = () => {
        setFocus(false);
    };


    return (
        <div
            style={{ background: props.bgColor || "#34495E"}}
            className={"textinput-root" + (focus ? " textinput-root-focus" : '')}>
            {Children.map(props.children, child => <>{child}</>)}
            <input
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{color: props.color || 'none'}}
                className='textinput-input'
                onChange={props.onChange}
                placeholder={props.text}
                {...(props.value ? {value: props.value} : {})}
            />
                {props.button}
        </div>
    )
}