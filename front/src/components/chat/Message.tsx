import React from 'react';

export type MessageProps = {
    sender: any,
    content: string,
    date: string,
    sent: boolean,
}

export default function Message (props: MessageProps){

    const rootClassName = "chat-message" + (props.sent ? " chat-message-sent" : "");
    const bubbleClassName = "chat-message-bubble" + (props.sent ? " chat-message-bubble-sent" : "");

    return (
        <div className={rootClassName}>
            <div className="chat-message-avatar"></div>
            <div className={bubbleClassName}>{props.content}</div>
            <div className="chat-message-time">{props.date}</div>
        </div>
    )
}