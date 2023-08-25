import "../../css/removable.css";

type Props = {
  content: string;
  icon?: any;
  onInteract?: any;
  style?: any;
};

export default function Removable(props: Props) {
  const { content, icon, onInteract } = props;
  return (
    <div className="removable-root" onClick={onInteract} style={props.style}>
      <div className="removable-content">{content}</div>
      {icon}
    </div>
  );
}
