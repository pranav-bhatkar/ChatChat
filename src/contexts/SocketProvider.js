import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useSelector } from "react-redux";

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ id, phone, pubkey, children }) {
  const [socket, setSocket] = useState()
  const { user } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (user == null) return
    const newSocket = io(
      process.env.REACT_APP_API_URL,
      { query: { id: user.id, phone: user.phone, pubkey: user.pubkey } }
    )
    setSocket(newSocket)
    return () => newSocket.close()
  }, [user, setSocket])
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}