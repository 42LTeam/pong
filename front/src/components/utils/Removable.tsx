import "../../css/removable.css"

type Props = {
    content: string,
    icon?: any,
    onInteract?: any,
}

export default function Removable (props: Props){
    const {content, icon, onInteract} = props;
    return (
        <div className="removable-root" onClick={onInteract}>
            <div className="removable-content">{content}</div>
            {icon}
        </div>
    )
}