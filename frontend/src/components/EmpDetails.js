import { useEmpsContext } from '../hooks/useEmpsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const EmpDetails = ({ emp }) => {
  const { dispatch } = useEmpsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/emps/' + emp._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_EMP', payload: json})
    }
  }

  return (
    <div className="emp-details">
      <h4>{emp.name}</h4>
      <p><strong>Email: </strong>{emp.email}</p>
      <p><strong>Phone: </strong>{emp.phone}</p>
      <p><strong>Gender: </strong>{emp.gender}</p>
      <p>{formatDistanceToNow(new Date(emp.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default EmpDetails