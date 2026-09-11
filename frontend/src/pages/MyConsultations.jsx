import { useEffect, useState } from 'react'
import './MyConsultations.css'

function MyConsultations() {
  const [consultations, setConsultations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const userId = 1

  useEffect(() => {
    fetch(`http://127.0.0.1:8080/api/consultations/user/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch consultations')
        }

        return response.json()
      })
      .then((data) => {
        setConsultations(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError('Unable to load your consultations.')
        setLoading(false)
      })
  }, [])

  const getStatusClass = (status) => {
    if (status === 'ACCEPTED') return 'status-accepted'
    if (status === 'REJECTED') return 'status-rejected'

    return 'status-pending'
  }

  return (
    <div className="consultations-page">

      <div className="consultations-header">

        <p>YOUR LEGAL REQUESTS</p>

        <h1>My Consultations</h1>

        <span>
          Track your consultation requests and their current status.
        </span>

      </div>


      {loading && (
        <div className="consultations-message">

          <div className="consultation-icon">
            📋
          </div>

          <h2>
            Loading Consultations...
          </h2>

          <p>
            Please wait while we retrieve your consultation requests.
          </p>

        </div>
      )}


      {error && (
        <div className="consultations-message">

          <div className="consultation-icon">
            ⚠️
          </div>

          <h2>
            Unable to Load
          </h2>

          <p>
            {error}
          </p>

        </div>
      )}


      {!loading && !error && (

        consultations.length === 0 ? (

          <div className="consultations-message">

            <div className="consultation-icon">
              📭
            </div>

            <h2>
              No Consultations Yet
            </h2>

            <p>
              You haven't submitted any consultation requests.
            </p>

          </div>

        ) : (

          <div className="consultations-list">

            {consultations.map((consultation) => (

              <div
                className="consultation-card"
                key={consultation.id}
              >

                <div className="consultation-card-top">

                  <div className="consultation-lawyer">

                    <div className="consultation-avatar">
                      ⚖️
                    </div>

                    <div>

                      <small>
                        LAWYER ID
                      </small>

                      <h2>
                        Lawyer #{consultation.lawyerId}
                      </h2>

                    </div>

                  </div>


                  <span
                    className={`consultation-status ${getStatusClass(
                      consultation.status
                    )}`}
                  >
                    {consultation.status}
                  </span>

                </div>


                <div className="consultation-message-box">

                  <small>
                    YOUR MESSAGE
                  </small>

                  <p>
                    {consultation.message}
                  </p>

                </div>


                <div className="consultation-footer">

                  <span>
                    Consultation #{consultation.id}
                  </span>

                  {consultation.status === 'PENDING' && (
                    <span>
                      Waiting for lawyer response
                    </span>
                  )}

                  {consultation.status === 'ACCEPTED' && (
                    <span>
                      Your consultation has been accepted
                    </span>
                  )}

                  {consultation.status === 'REJECTED' && (
                    <span>
                      Your consultation was rejected
                    </span>
                  )}

                </div>

              </div>

            ))}

          </div>

        )

      )}

    </div>
  )
}

export default MyConsultations