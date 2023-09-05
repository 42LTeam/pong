import "../../css/friend.css";

export default function FriendButton({ state, handleClick, style }) {
  return (
    <div
      onClick={handleClick}
      className={"friend-button " + (state ? "" : "friend-button-focused ")}
      style={style}
    >
      <img
        style={{ minWidth: "35px" }}
        alt="friend  logo"
        src="/svg/friend.svg"
      />
      <h2 style={{ color: "#7F8C8D" }}>Amis</h2>
    </div>
  );
}
