import { MouseEventHandler, useState } from "react";
import "../css/homepage.css";
import TextInput from "./TextInput";
import React from "react";

export default function SearchBar(){
    const [inviteText, setSearchText] = useState('');
    
    const searchFriend = () => {
        console.log(inviteText);

    };


    const handleInputChange = (event) => {
        setSearchText(event.target.value);
      };
    
    return (
        
        <div className="search-bar-full" onClick={() => searchFriend()}>
            <TextInput
                text={"Pseudo"}
                cssClass={"search-bar-text-fill"}
                onChange={event => handleInputChange(event)} />
            <div className="search-bar-text"> Search </div>
        </div>
    )
}