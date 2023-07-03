import React from 'react'
import { Link } from "react-router-dom";

type Props = {
    url: string,
    label: string
}

const HeaderButton = (props: Props) => {

    return (
        <div className='px-4 py-2 text-white'>
            <Link to={props.url}>
                {props.label}
            </Link>
        </div>
    )
}

export default HeaderButton;