import { EmpsContext } from '../context/EmpsContext'
import { useContext } from 'react'

export const useEmpsContext = () => {
  const context = useContext(EmpsContext)

  if (!context) {
    throw Error('useEmpsContext must be used inside an EmpsContextProvider')
  }

  return context
}