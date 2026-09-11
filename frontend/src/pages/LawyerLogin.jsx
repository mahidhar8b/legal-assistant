import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './LawyerLogin.css'

function LawyerLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/lawyer-auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })

      if (!response.ok) {
        throw new Error('Invalid email or password')
      }

      const data = await response.json()

      localStorage.setItem('lawyerToken', data.token)
      localStorage.setItem('lawyerRole', data.role)

      navigate('/lawyer-dashboard')

    } catch (err) {
      console.error(err)
      setError('Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="lawyer-login-page">

      <div className="lawyer-login-card">

        <div className="lawyer-login-icon">
          ⚖️
        </div>

        <p className="lawyer-login-label">
          LAWYER PORTAL
        </p>

        <h1>
          Lawyer Sign In
        </h1>

        <p className="lawyer-login-description">
          Sign in to manage your consultations and legal requests.
        </p>

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>

          <div className="login-form-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          <div className="login-form-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          <button
            type="submit"
            className="lawyer-login-button"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In →'}
          </button>

        </form>

        <div className="login-back">
          <Link to="/">
            ← Back to Home
          </Link>
        </div>

      </div>

    </div>
  )
}

export default LawyerLogin