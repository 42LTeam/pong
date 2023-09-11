import Button, {ButtonProps} from "./Button";
import Check from "../svg/Check";
import Cancel from "../svg/Cancel";
import "../../css/toggleswitch.css"

type Props = {
    toggle: any,
    state: boolean,
}

export default function ToggleSwitch(props: Props){

    const {toggle, state} = props;


    return (
        <Button className={"toggle-switch-root"} clickable handleClick={() => toggle()} buttonProps={{style: {
                background: (state ? '#2ECC71' : '#7F8C8D'),
            }
        }} text={''}>
            <div className={'toggle-switch-svg + toggle-switch-' + (state ? 'on' : 'off')}>
                {state ?
                    <Check color={"#ECF0F1"}></Check> :
                    <Cancel color={"#ECF0F1"}></Cancel>
                }
            </div>
        </Button>
    )
}