import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paths } from "../technical/paths";

type Props = {
  image: string //to change for the most appropriate to show the profile image
}

const ProfileButton = (props: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigate = useNavigate();

  const handleOptionClick = (option: string) => {
    if (option == "my_profile"){
      setMenuOpen(!menuOpen);
      navigate(Paths.profile);
    }
    else if (option == "settings"){
      setMenuOpen(!menuOpen);
      navigate(Paths.settings);
    }

  };
  
  // ### TO CHANGE WITH USER'S PROFILE IMAGE ### //
  return (
    <div className="px-4 py-2 text-white">
      <button onClick={toggleMenu} className="flex items-center">
       Profile 
        <img src="https://cdn.discordapp.com/attachments/699371045613993998/699383576243994715/8.jpg"
            alt="ProfileImage" width={40} height={40} className="ml-1.5" />
            </button>
      
      {menuOpen && (
        <ul className="absolute bg-[#2C3E50] text-white py-4 px-4">
          
          <li
            className="cursor-pointer"
            onClick={() => handleOptionClick("my_profile")}
          >

            My profile
          </li>

          <li
            className="cursor-pointer"
            onClick={() => handleOptionClick("settings")}
          >
            Settings
          </li>

        </ul>
      )}
    </div>
  );
};

export default ProfileButton;
