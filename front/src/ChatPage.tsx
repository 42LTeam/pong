import {useEffect, useState} from 'react'
// import './App.css'
import io, { Socket } from "socket.io-client"
import MessageInput from "./MessageInput";
import Messages from "./Messages";
function App() {
  const [socket, setSocket] = useState<Socket>()
    const[messages, setMessages] = useState<string[]>([])

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
