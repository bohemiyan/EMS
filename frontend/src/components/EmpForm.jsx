import { useState } from "react"
import { useEmpsContext } from "../hooks/useEmpsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const EmpForm = () => {
  const { dispatch } = useEmpsContext()
  const { user } = useAuthContext()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setaddress] = useState('')
  const [phone, setphone] = useState('')
  const [vv, setvv] = useState(0);
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (vv) {
      setName('')
      setphone('')
      setEmail('')
      setaddress('')
      setError(null)
      setEmptyFields([])
     return
    }

    if (!user) {
      setError('You must be logged in')
      return
    }

    const emp = {name,phone,email,address}
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
      setaddress('')
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

       <label> Address:</label>
      <textarea
        rows={2}
        type="text"
        onChange={(e) => setaddress(e.target.value)}
        value={address}
        className={emptyFields.includes('address') ? 'error' : ''}
      />


      <button onClick={()=>{setvv(0)}}>Add Emp</button>
      <button onClick={()=>{setvv(1)}}>Cancel</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
};

export default EmpForm;