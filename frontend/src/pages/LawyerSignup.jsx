import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './LawyerSignup.css'

function LawyerSignup() {
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
      const response = await fetch('/api/lawyer-auth/register', {
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
        throw new Error(message || 'Lawyer registration failed')
      }

      setSuccess('Lawyer account created successfully!')

      setTimeout(() => {
        navigate('/lawyer-login')
      }, 1000)

    } catch (err) {
      console.error(err)
      setError(
        err.message || 'Unable to create lawyer account.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="lawyer-signup-page">

      <div className="lawyer-signup-card">

        <div className="lawyer-signup-icon">
          ⚖️
        </div>

        <p className="lawyer-signup-label">
          LAWYER PORTAL
        </p>

        <h1>
          Create Lawyer Account
        </h1>

        <p className="lawyer-signup-description">
          Register to manage consultations and legal requests.
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

          <div className="login-form-group">

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

          <div className="login-form-group">

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

          <div className="login-form-group">

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
            className="lawyer-login-button"
            disabled={loading}
          >
            {loading
              ? 'Creating Account...'
              : 'Create Lawyer Account'}
          </button>

        </form>

        <div className="login-back">

          <Link to="/lawyer-login">
            Already have an account? Lawyer Login
          </Link>

        </div>

        <div className="login-back">

          <Link to="/">
            ← Back to Home
          </Link>

        </div>

      </div>

    </div>
  )
}

export default LawyerSignup