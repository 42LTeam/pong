type Props = {
    text: string
    onChange: any
}
export default function TextInput (props: Props) {

    return (
        <input className='text-input'
            onChange={props.onChange}
            placeholder={props.text}
        />
    )
}