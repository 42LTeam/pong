type Props = {
    handleClick: any,
    text: string,
    state: any,
    fill?: any,
}

export default function Button({fill, handleClick, text, state}: Props){
    return (
        <div style={{alignSelf: fill ? 'stretch' : null}} onClick={() => {handleClick(text)}} className={'button ' + (state == text ? 'button-current' : '')}>{text}</div>
    );
}