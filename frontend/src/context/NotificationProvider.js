import React, { createContext } from 'react'

const NotificationContext = createContext();

function NotificationProvider({children}) {

    const updateNotification = () =>{
        
    }

  return (
    <NotificationContext.Provider value={{updateNotification}}>{children}</NotificationContext.Provider>
  )
}

export default NotificationProvider