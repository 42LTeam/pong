import React from 'react'
import { useState } from 'react'
type Props = {
    text: string
    onChange: any
    cssClass: string
    onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}
export default function TextInput (props: Props) {

    return (
        <input className={props.cssClass}
            onChange={props.onChange}
            onKeyPress={props.onKeyPress}
            placeholder={props.text}
        />
    )
}