import React, { useState, createContext } from 'react'

// when we want to use categories we import categorie context
// categorie provdider provides to other childern

export var UserContext = createContext()

export function UserProvider({ children }) {
  var [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={[user, setUser]}>
      {/* children is the component that is wrapped in the provider */}
      {children}
    </UserContext.Provider>
  )
}
