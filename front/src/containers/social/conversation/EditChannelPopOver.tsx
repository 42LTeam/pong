import TextInput from "../../../components/utils/TextInput";
import Lock from "../../../components/svg/Lock";
import ToggleSwitch from "../../../components/utils/ToggleSwitch";
import Button from "../../../components/utils/Button";
import PopOver from "../../../components/utils/PopOver";
import React, { useRef, useState } from "react";
import { createChannel, editChannel, sendChannelInvite } from "../../../api";

export default function EditChannelPopOver({ channel, checked, clear, privateddefault }: { channel?: any, checked: any[], clear: any, privateddefault?: boolean }) {
    const [hasName, setHasName] = useState(false);
    const [privated, setPrivated] = useState(channel ? channel.privated : privateddefault);
    const [passworded, setPassworded] = useState(false);
    const nameRef = useRef(null);
    const passwordRef = useRef(null);

    const handleValidation = channel
        ? () => {
            const name = nameRef.current ? nameRef.current.value : null;
            const password = passwordRef.current ? passwordRef.current.value : "";
            if (password || name) {
                editChannel(channel.id, { privated, name, password })
                    .then(() => clear(true))
                    .catch((err) => console.error("Erreur lors de la modification du canal", err));
            }
        }
        : async () => {
            const name = nameRef.current ? nameRef.current.value : null;
            const password = passwordRef.current ? passwordRef.current.value : null;
            setPassworded(password ? true : false);
            if (name) {
                try {
                    const response = await createChannel({
                        name,
                        conv: false,
                        password,
                        privated,
                        passworded, 
                    });
                    const channel = response.data;
                    await sendChannelInvite({
                        channelId: channel.id,
                        usernames: checked,
                    });
                    clear(true);
                } catch (err) {
                    console.error("Erreur lors de la création du canal ou de l'envoi des invitations", err);
                }
            }
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