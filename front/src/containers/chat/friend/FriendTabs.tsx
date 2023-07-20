import FriendButton from "../../../components/chat/friend/FriendButton";
import FriendTab from "../../../components/chat/friend/FriendTab";
import AddFriendButton from "../../../components/chat/friend/AddFriendButton";

export default function FriendTabs({states, handleClick ,state}){

    return (
        <div className="friend-tabs">
            <FriendButton state={1}/>
            <div className="vertical-separator"></div>
            {states.map((current) => {
                if (current == "Ajouter")
                    return (<AddFriendButton key={current+"friendtab"} handleClick={handleClick} text="Ajouter" state={state}></AddFriendButton>);
                return (
                  <FriendTab key={current+"friendtab"} handleClick={handleClick} text={current} state={state}></FriendTab>
                );
            })}

        </div>
    );
}