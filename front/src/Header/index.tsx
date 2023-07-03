import React from 'react';

import HeaderButton from '../ui/atoms/HeaderButton';
import ProfileButton from './ProfileButton';
import { Paths } from '../technical/paths';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    return (
        <div id="header"
        className="fixed top-0 left-0 w-full text-white
        p-4 flex justify-between items-center bg-[#2C3E50]">

            <div className="flex items-center space-x-4">
                <HeaderButton url={'/'} label={'Home'}/>
                <HeaderButton url={Paths.skins} label={'Skins'}/>
                <HeaderButton url={Paths.leaderboard} label={'LeaderBoard'}/>
            </div>

            <div className="flex items-center space-x-4">
                <ProfileButton image={''} />
            </div>

        </div>
    );
}
   
export default Header;