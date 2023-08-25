export default function FriendTab({ handleClick, text, state }) {
  return (
    <div
      onClick={() => {
        handleClick(text);
      }}
      className={"friend-tab " + (state == text ? "friend-tab-current" : "")}
    >
      {text}
    </div>
  );
}
