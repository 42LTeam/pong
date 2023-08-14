import "../../css/chat.css"

type Props = {
    header?: React.ReactNode
    body: React.ReactNode
    subheader?: React.ReactNode
    subheaderIcon?: React.ReactNode
}

export default function SidePanel(props: Props){

    return (
        <div className="conversations">
            {props.header}
            <div className="conversations-separator">
                <div className="conversations-separator-text">{props.subheader}</div>
                {props.subheaderIcon}
            </div>
            {props.body}
        </div>
    )
}