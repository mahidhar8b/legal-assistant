import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Auth.css'

function UserSignup() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSignup = async (e) => {
    e.preventDefault()

    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })

      if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Registration failed')
      }

      setSuccess('Account created successfully!')

      setTimeout(() => {
        navigate('/login')
      }, 1000)

    } catch (err) {
      console.error(err)
      setError(
        err.message || 'Unable to create account.'
      )
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

        <h1>
          Create Account
        </h1>

        <p className="auth-subtitle">
          Create your account to access legal assistance.
        </p>

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        <form onSubmit={handleSignup}>

          <div className="login-group">

            <label>
              Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>

          <div className="login-group">

            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          <div className="login-group">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

        </form>

        <div className="login-footer">

          <span>
            Already have an account?
          </span>

          <Link to="/login">
            Sign In
          </Link>

        </div>

        <div className="login-footer">

          <span>
            Are you a lawyer?
          </span>

          <Link to="/lawyer-signup">
            Lawyer Signup
          </Link>

        </div>

      </div>

    </div>
  )
}

export default UserSignup