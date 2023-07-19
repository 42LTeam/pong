import React from 'react'
import { useState } from 'react'
type Props = {
    text: string
    onChange: any
    onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}
export default function TextInput (props: Props) {

    return (
        <input className='text-input'
            onChange={props.onChange}
            onKeyPress={props.onKeyPress}
            placeholder={props.text}
        />
    )
}