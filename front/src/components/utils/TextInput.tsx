import "../../css/text-input.css"
import {useState} from "react";

type Props = {
    text?: string
    onChange?: any,
    buttonProps?: any,
    buttonContent?: string,
    friend?: any,
    value? :string,
    bgColor? :string,
}
export default function TextInput (props: Props) {
    const [focus, setFocus]=useState(false);
    const handleFocus = () => {
        setFocus(true);
    };
    const handleBlur = () => {
        setFocus(false);
    };

    const obj = {value: props.friend?.username}

    return (
        <div
            style={{background: props.bgColor || "#34495E"}}
            className={"textinput-root" + (focus ? " textinput-root-focus" : '')}>
            <input
                onFocus={handleFocus}
                onBlur={handleBlur}
                className='textinput-input'
                onChange={props.onChange}
                placeholder={props.text}
                {...obj}
            />
            { props.buttonContent ?
                <div
                className={"textinput-button" + (props.friend ? " textinput-button-focus" : '')} {...(props.buttonProps)}>{props.buttonContent}
                </div> :
                null}
        </div>
    )
}