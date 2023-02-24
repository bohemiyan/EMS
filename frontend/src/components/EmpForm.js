import { useState } from "react"
import { useEmpsContext } from "../hooks/useEmpsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const EmpForm = () => {
  const { dispatch } = useEmpsContext()
  const { user } = useAuthContext()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [phone, setphone] = useState('')

  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const emp = {name,phone,email,gender}
    // console.log(emp) 
    const response = await fetch('/api/emps', {
      method: 'POST',
      body: JSON.stringify(emp),
      headers: {
        'Content-Type': 'application/json',
        
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setName('')
      setphone('')
      setEmail('')
      setGender('')
      setError(null)
      setEmptyFields([])
      
      dispatch({type: 'CREATE_EMP', payload: json})
    }
  }

  return (
   
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Emp</h3>

      <label> Name: </label>
      <input 
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />

      <label>Phone: </label>
      <input 
        type="number"
        onChange={(e) => setphone(e.target.value)}
        value={phone}
        className={emptyFields.includes('phone') ? 'error' : ''}
      />

      <label> Email: </label>
      <input 
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className={emptyFields.includes('email') ? 'error' : ''}
      />

       <label> Gender:</label>
      <input 
        type="text"
        onChange={(e) => setGender(e.target.value)}
        value={gender}
        className={emptyFields.includes('gender') ? 'error' : ''}
      />

      <button>Add Emp</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
};

export default EmpForm;