interface AvatarProps {
  url?: string;
  color?: string;
  width?: string;
  height?: string;
}
export default function Avatar(props: AvatarProps) {
  const url = props.url ? 'url("' + props.url + '")' : null;

  return (
    <div
      className="avatar-root user-picture"
      style={{
        backgroundImage: url,
        color: props.color || "#7F8C8D",
        width: props.width || props.height || 30,
        height: props.height || props.height || 30,
      }}
    ></div>
  );
}
