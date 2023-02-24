import { useAuthContext } from './useAuthContext'

import { useEmpsContext } from './useEmpsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchEmps} = useEmpsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchEmps({ type: 'SET_EMPS', payload: null })
  }

  return { logout }
}