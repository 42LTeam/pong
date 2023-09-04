import FriendButton from "../../../components/friend/FriendButton";
import ToggleButton from "../../../components/utils/ToggleButton";

const addStates = [
  {
    background: "#2ECC71",
    color: "white",
  },
  {
    color: "#2ECC71",
    background: "none",
  },
];

const tabState = [
  {
    background: "none",
    color: "#7F8C8D",
  },
  {
    borderRadius: "10px",
    background: "#2D3843",
    color: "#7F8C8D",
  },
];

export default function FriendTabs({ states, handleClick, state }) {
  return (
    <div className="friend-tabs">
      <FriendButton state={1} />
      <div className="vertical-separator"></div>
      {states.map((current) => {
        return (
          <ToggleButton
            key={current + "friendtab"}
            handleClick={handleClick}
            text={current}
            states={current == "Ajouter" ? addStates : tabState}
            current={state}
            hoverProps={current == "Ajouter" ? null : { background: "#34495E" }}
          ></ToggleButton>
        );
      })}
    </div>
  );
}
