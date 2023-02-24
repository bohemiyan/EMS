import { createContext, useReducer } from 'react'

export const EmpsContext = createContext()

export const EmpsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EMP':
      return { 
        emps: action.payload 
      }
    case 'CREATE_EMP':
      return { 
        emps: [action.payload, ...state.emps] 
      }
    case 'DELETE_EMP':
     return { 
        emps: state.emps.filter((w) => w._id !== action.payload._id) 
      }
    default:
      return state
  }
}

export const EmpsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(EmpsReducer, { 
    emps: null
  })
  
  return (
    <EmpsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </EmpsContext.Provider>
  )
}