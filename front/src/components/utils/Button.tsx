type Props = {
    handleClick: any,
    text: string,
    state: any,
}

export default function Button({handleClick, text, state}: Props){
    return (
        <div onClick={() => {handleClick(text)}} className={'button ' + (state == text ? 'button-current' : '')}>{text}</div>
    );
}