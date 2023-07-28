export default function Button({handleClick, text, state}){
    return (
        <div onClick={() => {handleClick(text)}} className={'friend-add-button ' + (state == text ? 'friend-add-button-current' : '')}>{text}</div>
    );
}