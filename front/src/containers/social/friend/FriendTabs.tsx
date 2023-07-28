import FriendButton from "../../../components/friend/FriendButton";
import FriendTab from "../../../components/friend/FriendTab";
import Button from "../../../components/utils/Button";

export default function FriendTabs({states, handleClick ,state}){

    return (
        <div className="friend-tabs">
            <FriendButton state={1}/>
            <div className="vertical-separator"></div>
            {states.map((current) => {
                if (current == "Ajouter")
                    return (<Button key={current+"friendtab"} handleClick={handleClick} text="Ajouter" state={state}></Button>);
                return (
                  <FriendTab key={current+"friendtab"} handleClick={handleClick} text={current} state={state}></FriendTab>
                );
            })}

        </div>
    );
}