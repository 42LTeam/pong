import TextInput from "../../../components/utils/TextInput";
import Button from "../../../components/utils/Button";
import PopUp from "../../../components/utils/PopUp";
import {useState} from "react";
import Friend from "../../../components/friend/Friend";
import {searchUser} from "../../../api";
import Removable from "../../../components/utils/Removable";
import Cancel from "../../../components/svg/Cancel";


type Props = {
    position: {left: number, top: number},
    clear: any,
}
export default function NewMessagePopup({position, clear}: Props) {

    const [suggestions, setSuggestions] = useState([]);
    const [checked, setChecked] = useState([]);
    if (!suggestions)
        searchUser('', {friendOnly: true}).then(response => setSuggestions(response.data));

    const handlePopupSearch = async (event) => {
        const search = event.target.value;
        const {data} = await searchUser(search, {friendOnly: true});
        setSuggestions(data);
    }

    const toggleCheck = (current, check) => {
        if (check)
            setChecked([...checked, current]);
        else {
            setChecked(checked.filter(c => c.username != current.username));
            current.el.checked = false;
        }
    }

    return (
        <PopUp position={position} clear={clear}>
            <h1>Sélectionne des amis</h1>
            <h2>Tu peux ajouter des amis.</h2>
            <TextInput
                text="Trouve taon ami.e tape sa on nom..."
                bgColor="#2C3E50"
                onChange={handlePopupSearch}
            >
                {checked.map(current => <Removable content={current.username} onInteract={() => {
                    toggleCheck(current, false);
                }} icon={<Cancel/>} key={"removable="+current.username}/>)}
            </TextInput>
            <div className="newmessage-suggestions">
                {suggestions?.map(current =>
                    <Friend key={"popupfriend-" + current.username} friend={current}>
                        <div className="align-left">
                            <input onChange={(event) => toggleCheck({el: event.target, username: current.username}, event.target.checked)} type="checkbox"/>
                        </div>
                    </Friend>)}

            </div>
            <Button fill handleClick={null} text="Creer un MP ou un channel" state={null}></Button>
        </PopUp>
    )
}