import {useEffect, useState} from 'react'
import io, { Socket } from "socket.io-client"
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import axios from "axios";

/* Get Message Front */
// const client = axios.create({
    const baseURL = "http://localhost:3000/message/"
// });

function App() {
  const [socket, setSocket] = useState<Socket>()
    const[messages, setMessages] = useState<string[]>([])

    useEffect(() => {
        axios.get(`${baseURL}`, {withCredentials: true}).then((response) => {
            const texts = response.data.map(e => e.text);
            setMessages(prev => [...prev, ...texts]);
        })
        .catch((error) => {
            console.error(error);
        });
    },[setMessages])

    const send = (value: string) => {
      socket?.emit("message", value)
    }
    useEffect(() => {
        const newSocket=io("http://localhost:8001")
        setSocket(newSocket)
    }, [setSocket])

    const messageListener = (message: string) => {
      setMessages([...messages, message])
    }
    // @ts-ignore
    useEffect(() => {
        socket?.on("message", messageListener)
        return () => socket?.off("message", messageListener)
    }, [messageListener])


  return (
   <>

       {" "}
       <MessageInput send={send}/>
       <Messages messages={messages}/>
   </>
  )
}

export default App
