import TextInput from "../components/utils/TextInput";
import Button from "../components/utils/Button";
import {useRef, useState} from "react";
import {set2fa} from "../api";

export default function DoubleAuth ({setDestination}){
    const ref = useRef(null);
    const [clickable,setClickable]= useState(false);
    const handleClick = () => {
        if (ref) set2fa(ref.current.value).then((response) => {
            if (response.data) setDestination(null)
        })
    }

    return (
        <div className='bubble column center'
        style={{
            height: 'min-content',
            width: '15%',
            position: 'fixed',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '20px',
            gap: '10px',
        }}>
            <h1>Entrez votre code unique</h1>
            <h3>Votre code unique est fournis par l 'instance TOTP que vous avez choisis</h3>
            <TextInput
                ref={ref}
                onChange={(event) => setClickable(event.target.value.length > 0)}
                bgColor="#ECF0F1"
                color="black"
                text={"Entrez votre code unique"}
                onKeyDown={(event) => {
                    if (event.key != null && event.key != 'Enter') return;
                    handleClick();
                }}
                button={<Button
                    handleClick={handleClick} text={"Confirmer"}
                    clickable={clickable}
                ></Button>}
            ></TextInput>
        </div>
    );
}