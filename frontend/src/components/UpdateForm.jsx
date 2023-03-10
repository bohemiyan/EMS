import { useState,useEffect } from "react"
import { useEmpsContext } from "../hooks/useEmpsContext"
import { useAuthContext } from '../hooks/useAuthContext'


const UpdateForm = (emp) => {
  const { dispatch,emps } = useEmpsContext()
  const { user } = useAuthContext()


  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setaddress] = useState('')
  const [phone, setphone] = useState('')
  const [vv, setvv] = useState(0)
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const empid=emp.emp;

useEffect(() => {
    const fetchemp = async () => {
        if (!user) {
          return
        }
        const response = await fetch('/api/emps/' + empid, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()
    
        if (response.ok) {
         setName(json.name);
         setEmail(json.email);
         setphone(json.phone);
         setaddress(json.address);
        }
      }
fetchemp();  
}, [empid,user])


  
const handleSubmit = async (e) => {
    e.preventDefault()
      if(vv)
      {
        dispatch({type: 'UPDATE_EMP', payload: emps})
      }
      // console.log(e.target)
    if (!user) {
      setError('You must be logged in')
      return
    }

    const emp = {name,phone,email,address}
    const response = await fetch('/api/emps/'+ empid, {
      method: 'PATCH',
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
      const response = await fetch('/api/emps', {
        headers: {
        'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'UPDATE_EMP', payload: json})
      }
      
    
    }
  }


  return (
   
    <form className="create" onSubmit={handleSubmit}>
      <h3>update Employee</h3>

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

       <label> address:</label>
      <textarea
        rows={2} 
        type="text"
        onChange={(e) => setaddress(e.target.value)}
        value={address}
        className={emptyFields.includes('address') ? 'error' : ''}
      />

      <button onClick={()=>{setvv(0)}}>Update Emp</button>
      <button onClick={()=>{setvv(1)}}>Cancel</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
};

export default UpdateForm;