import React from "react";
import { useState } from "react";

import TextInput from "../../components/TextInput";

import "../../css/homepage.css";

export default function SearchBar(){
    const [inviteText, setSearchText] = useState('');
    
    const searchFriend = () => {
        console.log("I wanna search " + inviteText);

    };

    const handleInputChange = (event) => {
        setSearchText(event.target.value);
      };

      const handleKeyPress = (event) => {
        if (event.key === "Enter") {
          searchFriend();
        }
      };
    
    return (
        
        <div className="search-bar-full" onClick={() => searchFriend()}>
            <TextInput
                text={"Pseudo"}
                cssClass={"search-bar-text-fill"}
                onChange={event => handleInputChange(event)}
                onKeyPress={handleKeyPress}
            />
            <div className="search-bar-text" > Search </div>
        </div>
    )
}