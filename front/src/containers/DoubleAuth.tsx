import TextInput from "../components/utils/TextInput";
import Button from "../components/utils/Button";
import {useState} from "react";

export default function DoubleAuth (){
    const [clickable,setClickable]= useState(false);
    const handleClick = () => {
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
                onChange={(event) => setClickable(event.target.value.length > 0)}
                bgColor="#ECF0F1"
                color="#BDC3C7"
                text={"Entrez votre code unique"}
                button={<Button
                    handleClick={handleClick} text={"Confirmer"}
                    clickable={clickable}
                ></Button>}
            ></TextInput>
        </div>
    );
}