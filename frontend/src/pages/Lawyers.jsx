import { useEffect, useState } from 'react'
import './Lawyers.css'

function Lawyers() {

  const [lawyers, setLawyers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchLawyers()
  }, [])

  const fetchLawyers = async () => {

    try {

      setLoading(true)
      setError('')

      const response = await fetch('/api/lawyers')

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`)
      }

      const data = await response.json()

      setLawyers(Array.isArray(data) ? data : [])

    } catch (err) {

      console.error('Lawyer loading error:', err)

      setError(
        'Unable to load lawyers. Please make sure Spring Boot is running.'
      )

    } finally {

      setLoading(false)

    }
  }


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="lawyers-page">

        <div className="lawyers-container">

          <div className="lawyers-loading">

            <div className="loading-icon">
              ⚖️
            </div>

            <h2>
              Loading Lawyers...
            </h2>

            <p>
              Please wait while we find available lawyers.
            </p>

          </div>

        </div>

      </div>

    )
  }


  // =====================================================
  // ERROR
  // =====================================================

  if (error) {

    return (

      <div className="lawyers-page">

        <div className="lawyers-container">

          <div className="lawyers-error">

            <div className="error-icon">
              ⚠️
            </div>

            <h2>
              Unable to Load Lawyers
            </h2>

            <p>
              {error}
            </p>

            <button
              onClick={fetchLawyers}
              className="retry-button"
            >
              Try Again
            </button>

          </div>

        </div>

      </div>

    )
  }


  // =====================================================
  // LAWYER LIST
  // =====================================================

  return (

    <div className="lawyers-page">

      {/* HEADER */}

      <div className="lawyers-header">

        <p className="page-label">
          LEGAL PROFESSIONALS
        </p>

        <h1>
          Find a Lawyer
        </h1>

        <p>
          Connect with qualified legal professionals
          for your legal needs.
        </p>

      </div>


      {/* BACK BUTTON */}

      <div className="lawyers-top">

        <a
          href="/"
          className="back-button"
        >
          ← Back to Home
        </a>

      </div>


      {/* LAWYERS */}

      <div className="lawyers-container">

        {lawyers.length === 0 ? (

          <div className="empty-lawyers">

            <div>
              ⚖️
            </div>

            <h2>
              No Lawyers Available
            </h2>

            <p>
              There are currently no lawyers registered
              in the system.
            </p>

          </div>

        ) : (

          <div className="lawyers-grid">

            {lawyers.map((lawyer, index) => (

              <div
                className="lawyer-card"
                key={lawyer.id || index}
              >

                <div className="lawyer-icon">
                  ⚖️
                </div>

                <div className="lawyer-info">

                  <h2>
                    {lawyer.name ||
                     lawyer.fullName ||
                     'Lawyer'}
                  </h2>

                  <p className="lawyer-specialization">

                    {lawyer.specialization ||
                     lawyer.speciality ||
                     lawyer.legalCategory ||
                     'Legal Professional'}

                  </p>

                  <p className="lawyer-location">

                    📍 {lawyer.location ||
                        lawyer.city ||
                        'Location not available'}

                  </p>

                  {lawyer.email && (

                    <p className="lawyer-email">
                      ✉️ {lawyer.email}
                    </p>

                  )}

                </div>


                <div className="lawyer-actions">

                  {lawyer.email && (

                    <a
                      href={`mailto:${lawyer.email}`}
                      className="consult-button"
                    >
                      Contact Lawyer
                    </a>

                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  )
}

export default Lawyers