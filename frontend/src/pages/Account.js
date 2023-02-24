import { useEffect }from 'react'
import { useAuthContext } from "../hooks/useAuthContext"

// components
import UpdateForm from '../components/profileUpdate'


const Account = () => {
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('/api/user/_id', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        user({type: 'updateHr', payload: json})
      }
    }

    if (user) {
        fetchUser()
    }
  }, [user])

  return (
    <div className="home">

        <UpdateForm />

    </div>
  )
}

export default Account