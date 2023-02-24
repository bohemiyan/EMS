import { useEffect }from 'react'
import { useEmpsContext } from "../hooks/useEmpsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import EmpDetails from '../components/EmpDetails'
import EmpForm from '../components/EmpForm'
// import SkillsBar from '../components/SkillsBar'


const Home = () => {
  const {emps, dispatch} = useEmpsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchEmps = async () => {
      const response = await fetch('/api/emps', {
        headers: {
        'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_EMP', payload: json})
      }
    }

    if (user) {
      fetchEmps()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="emps">
        {emps && emps.map((emp) => (
          <EmpDetails key={emp._id} emp={emp} />
        ))}
      </div>
      <EmpForm />
      {/* <SkillsBar /> */}
    </div>
  )
}

export default Home