import "../../css/text-input.css"
import {useState} from "react";

type Props = {
    text: string
    onChange: any,
    buttonProps: any,
    buttonContent: string,
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
        <div className={"textinput-root" + (focus ? " textinput-root-focus" : '')}>
            <input
                onFocus={handleFocus}
                onBlur={handleBlur}
                className='textinput-input'
                onChange={props.onChange}
                placeholder={props.text}
            />
            <div className={"textinput-button" + (focus ? " textinput-button-focus" : '')} {...(props.buttonProps)}>{props.buttonContent}</div>
        </div>
    )
}