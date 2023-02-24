import { useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'

const UpdateForm = () => {
  const { user } = useAuthContext()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const emp = {email,password}

    const response = await fetch('/api/user', {
      method: 'PUT',
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
      setEmail('')
      setPassword('')
      setError(null)
      setEmptyFields([])
      user({type: 'updateFarmer', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Update User Profile</h3>

      <label>email:</label>
      <input 
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={user.email}
        className={emptyFields.includes('email') ? 'error' : ''}
      />

      <label>password:</label>
      <input 
        type="text"
        onChange={(e) => setPassword(e.target.value)}
        value={user.password}
        className={emptyFields.includes('password') ? 'error' : ''}
      />

      <button>Update profile</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default UpdateForm