
interface AvatarProps {
    url?: string,
    color?: string,
    width?: string,
    height?: string,
    salon?: boolean
    id?: any
}
export default function Avatar(props: AvatarProps) {
    let url;
    if (props.salon === false && props.id)
        url = `url("/img/discord-salon.png")`
    else
        url = props.url ? `url("${props.url}")` : `url("/img/discord-salon.png")`;

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
