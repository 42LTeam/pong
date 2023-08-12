export default function Cross(props: { color?: string, handleClick?: any}){
    return (
        <svg onClick={props.handleClick} width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2.11143L14.3886 0.5L8 6.88857L1.61143 0.5L0 2.11143L6.38857 8.5L0 14.8886L1.61143 16.5L8 10.1114L14.3886 16.5L16 14.8886L9.61143 8.5L16 2.11143Z"
                  fill={props.color || "#7F8C8D"}/>
        </svg>
    )
}