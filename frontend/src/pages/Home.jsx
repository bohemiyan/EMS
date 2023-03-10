import { useEffect,useState }from 'react'
import { useEmpsContext } from "../hooks/useEmpsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

// components
import EmpForm from '../components/EmpForm'
import UpdateForm from '../components/UpdateForm'


const Home = () => {
 
  const [form, setform] = useState(<EmpForm/>)
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

  
  const handleClickD = async (em) => {
    if (!user) {
      return
    }
    const empid=em.target.value;
    const response = await fetch('/api/emps/' + empid, {
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

  useEffect(() => {
    setform(<EmpForm/>)
  }, [emps])
  

  const toogleform=(emm)=>{
    
    setform(<UpdateForm emp={emm.target.value}/>);
    
  }

  return (
    <div className="home">
      <div className="emps">
        {emps && emps.map((emp) => (
          
          <div className="emp-details" key={emp._id}>
          <h4>{emp.name}</h4>
    
          <div className='emp-image'></div>
    
          <div className='empinfo'>
          <strong>Email: </strong>{emp.email}
          <p><strong>Phone: </strong>{emp.phone}</p>
          <p><strong>address: </strong>{emp.address}</p>
          </div>
    
          <div className='keys'>
          <button className='updatekey' onClick={toogleform} value={emp._id}>Update</button>
          <button className="deletekey" onClick={handleClickD} value={emp._id}>Delete</button>
          <p>{formatDistanceToNow(new Date(emp.createdAt), { addSuffix: true })}</p>
          </div>
    
        </div>
        ))}
      </div>
      {form}
      
    </div>
  )
}

export default Home