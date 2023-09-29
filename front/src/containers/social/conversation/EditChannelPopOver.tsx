import TextInput from "../../../components/utils/TextInput";
import Lock from "../../../components/svg/Lock";
import ToggleSwitch from "../../../components/utils/ToggleSwitch";
import Button from "../../../components/utils/Button";
import PopOver from "../../../components/utils/PopOver";
import React, {useRef, useState} from "react";
import {createChannel, editChannel, sendChannelInvite} from "../../../api";

export default function EditChannelPopOver({channel, checked, clear, privateddefault}:{channel?: any,checked: any[], clear: any, privateddefault?: boolean}){
    const [hasName, setHasName] = useState(false);
    const [privated, setPrivated] = useState(channel ? channel.privated : privateddefault);
    const nameRef = useRef(null);
    const passwordRef = useRef(null);

    const handleValidation = channel ?
        () => {
            const name = hasName ? nameRef.current.value : null;
            const password = !privated ? passwordRef.current.value : "";
            editChannel(channel.id,{privated, name, password}).then(() => clear(true))
        }
        : async () => {
        const response = await createChannel({
            name: nameRef.current.value,
            conv: false,
            password: passwordRef.current.value || null,
            privated,
        });
        const channel = response.data;
        sendChannelInvite({
            channelId: channel.id,
            usernames: checked,
        }).then(() => {
            clear(true);
        });
    };

    return (
        <PopOver divStyle={{ width: "15vw", padding: 0 }} clear={clear}>
            <div
                className="column align-start"
                style={{ padding: 10, gap: "5px" }}
            >
                <h1>{channel ? "Modifier le salon" : "Créer un salon"}</h1>
                <h3>dans salons textuels</h3>
                <h2>Nom du salon</h2>
                <TextInput
                    ref={nameRef}
                    onChange={(event) => {
                        if (!event.target.value.length) setHasName(false);
                        else if (!hasName) setHasName(true);
                    }}
                    text="Entrez un nom"
                    {...(!hasName ? { value: channel?.name } : {})}
                    bgColor="#2C3E50"
                ></TextInput>
                {!privated && (
                <>
                <h2>Mot de passe</h2>
                <TextInput
                    ref={passwordRef}
                    password
                    text="Entrez un mot de passe"
                    bgColor="#2C3E50"
                ></TextInput>
                </>)}
                <div className="row">
                    <div className={"row"} style={{ gap: "5px" }}>
                        <Lock></Lock>
                        <h2>Salon privé</h2>
                    </div>
                    <ToggleSwitch
                        toggle={() => setPrivated(!privated)}
                        state={privated}
                    ></ToggleSwitch>
                </div>
            </div>
            <div className="footer">
                <Button
                    handleClick={() => clear(false)}
                    text={"Annuler"}
                    clickable
                    buttonProps={{ style: { background: "none" } }}
                ></Button>
                <Button
                    handleClick={handleValidation}
                    text={channel ? "Modifier le salon" : "Créer un salon"}
                    clickable={true}
                ></Button>
            </div>
        </PopOver>

    )
}