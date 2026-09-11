import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'

function UserLogin() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    try {
      const response = await fetch(
        'http://127.0.0.1:8080/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        }
      )

      if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Invalid email or password')
      }

      const token = await response.text()

      localStorage.setItem('token', token)

      alert('Login successful!')

      navigate('/')

    } catch (err) {
      console.error(err)
      setError(err.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-icon">
          ⚖️
        </div>

        <p className="auth-label">
          LEGAL ASSISTANT
        </p>

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Sign in to access your legal assistance account.
        </p>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="auth-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />

          </div>

          <div className="auth-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />

          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

        </form>

        <p className="auth-footer">
          Don't have an account?{' '}
          <Link to="/user-signup">
            Create account
          </Link>
        </p>

      </div>

    </div>
  )
}

export default UserLogin