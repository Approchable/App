import React, { useState, createContext } from 'react'

// when we want to use categories we import categorie context
// categorie provdider provides to other childern

export const CategorieContext = createContext()

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([])

  return (
    <CategorieContext.Provider value={[categories, setCategories]}>
      {/* children is the component that is wrapped in the provider */}
      {children}
    </CategorieContext.Provider>
  )
}
