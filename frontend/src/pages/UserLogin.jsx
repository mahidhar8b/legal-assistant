import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './UserLogin.css'

function UserLogin() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
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

      const token = await response.text()

      localStorage.setItem('token', token)
      localStorage.setItem('role', 'USER')

      navigate('/')
    } catch (err) {
      console.error(err)
      setError('Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="user-login-page">

      <div className="user-login-card">

        <div className="login-icon">
          ⚖️
        </div>

        <p className="login-label">
          LEGAL ASSISTANT
        </p>

        <h1>
          Welcome Back
        </h1>

        <p className="login-subtitle">
          Sign in to access your legal assistance.
        </p>

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>

          <div className="login-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-group">
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
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

        </form>

        <div className="login-footer">
          <span>Are you a lawyer?</span>

          <Link to="/lawyer-login">
            Lawyer Login
          </Link>
        </div>

      </div>

    </div>
  )
}

export default UserLogin