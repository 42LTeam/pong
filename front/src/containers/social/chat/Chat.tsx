import TextInput from "../../../components/utils/TextInput";
import React, { useContext, useEffect, useRef, useState } from "react";
import Message from "../../../components/chat/Message";
import { AuthContext } from "../../Auth";
import "../../../css/chatBody.css";
import Send from "../../../components/svg/Send";
import {
  getChannelMessages,
  readMessage,
  sendMessageToChannel,
} from "../../../api";
import { ApplicationContext } from "../../Application";
import TextInputChat from "../../../components/utils/TextInputChat";

interface ChatProps {
  channel: any;
}

export default function Chat(props: ChatProps) {
  const [messages, setMessages] = useState([]);
  const [channel, setChannel] = useState<number | null>(props.channel);
  const [lastRead, setLastRead] = useState(0);
  const user = useContext(AuthContext);
  const application = useContext(ApplicationContext);
  const ref = useRef(null);
  const toAdd =
    application.social.newMessages.filter(
      (current) =>
        current.channelId == channel &&
        messages.map((c) => c.id).includes(current.id) == false
    ) || [];

  const fetchData = async () => {
    const response = await getChannelMessages(props.channel);
    const data = response.data;
    const tmp_messages = [...data.messages].reverse();
    setMessages(tmp_messages);
    setLastRead(data.lastRead);
    if (tmp_messages.length)
      await readMessage(props.channel, tmp_messages[0].id);
  };

  useEffect(() => {
    fetchData();
    return () => {
      setMessages([]);
      application?.clearMessage(toAdd);
    };
  }, [channel]);

  useEffect(() => {
    if (toAdd.length) {
      const last = toAdd[toAdd.length - 1];
      setMessages([...toAdd, ...messages]);
      readMessage(props.channel, last.id).then(() => {});
      if (last.userId == user.id) {
        setLastRead(last.id);
      }
    }
  }, [application]);

  if (props.channel != channel) setChannel(props.channel);
  const handleSendMessage = async (event) => {
    if (!ref || !ref.current.value) return;
    if (event.key != null && event.key != "Enter") return;
    await sendMessageToChannel(channel, ref.current.value);

    ref.current.value = null;
  };

  const unReadMessages = messages.filter((current) => {
    return current.id > lastRead;
  });

  // console.log("From Chat.tsx : unRead = "+ JSON.stringify(unReadMessages));
  // console.log("From Chat.tsx : messages = "+ JSON.stringify(messages));

  return (
    <div className="chat-root">
      <div className="chat-messages">
        {unReadMessages.map((current) => {
          return (
            <>
              <Message
                
                senderId={current.userId}
                senderAvatar={current.user.avatar}
                content={current.content}
                date={new Date(current.created_at).toTimeString().slice(0, 5)}
                sent={current.userId == user.id}
              ></Message>
            </>
          );
        })}

        {unReadMessages.length ? (
          <div className="row">
            <h2
              style={{
                background: "#E74C3C",
                borderRadius: "10px",
                paddingLeft: "3px",
                paddingRight: "3px",
              }}
            >
              Nouveaux
            </h2>
            <div
              className="horizontal-separator"
              style={{
                background: "#E74C3C",
                alignSelf: "center",
                flexShrink: 0,
                flexGrow: 1,
              }}
            ></div>
          </div>
        ) : null}
        {messages
          .filter((current) => {
            return current.id <= lastRead;
          })
          .map((current) => {
            return (
              <>
                <Message
                  key={current.id}
                  senderId={current.userId}
                  senderAvatar={current.user.avatar}
                  content={current.content}
                  date={new Date(current.created_at).toTimeString().slice(0, 5)}
                  sent={current.userId == user.id}
                ></Message>
              </>
            );
          })}
      </div>
      {props.channel.conv === false && (
        <div className="conv-false-content">
          {}
          This is the content when 'conv' is false.
        </div>
      )}
      <TextInputChat
        ref={ref}
        color="#7F8C8D"
        text="Votre message..."
        bgColor="#ECF0F1"
        onKeyDown={handleSendMessage}
        button={<Send handleClick={handleSendMessage}></Send>}
        isChat={true}
      ></TextInputChat>
    </div>
  );
}
