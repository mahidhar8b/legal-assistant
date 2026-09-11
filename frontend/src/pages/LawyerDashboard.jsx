import { useEffect, useState } from 'react'
import './LawyerDashboard.css'

function LawyerDashboard() {

  const [consultations, setConsultations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingId, setUpdatingId] = useState(null)

  // Temporary lawyer ID
  // Later this will come from login/authentication
  const lawyerId = 1


  const loadConsultations = () => {

    setLoading(true)
    setError('')

    fetch(`http://127.0.0.1:8080/api/consultations/lawyer/${lawyerId}`)

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

        setError(
          'Unable to load consultation requests.'
        )

        setLoading(false)
      })
  }


  useEffect(() => {

    loadConsultations()

  }, [])


  const updateStatus = async (id, action) => {

    setUpdatingId(id)

    try {

      const response = await fetch(
        `http://127.0.0.1:8080/api/consultations/${id}/${action}`,
        {
          method: 'PUT',
        }
      )

      if (!response.ok) {
        throw new Error('Failed to update consultation')
      }

      // Refresh the list
      loadConsultations()

    } catch (err) {

      console.error(err)

      setError(
        'Unable to update consultation status.'
      )

      setUpdatingId(null)
    }
  }


  const pendingCount =
    consultations.filter(
      (item) => item.status === 'PENDING'
    ).length


  const acceptedCount =
    consultations.filter(
      (item) => item.status === 'ACCEPTED'
    ).length


  return (

    <div className="dashboard-page">


      {/* HEADER */}

      <div className="dashboard-header">

        <div>

          <p className="dashboard-label">
            LAWYER PORTAL
          </p>

          <h1>
            Lawyer Dashboard
          </h1>

          <span>
            Manage your consultation requests and
            communicate with clients.
          </span>

        </div>


        <div className="lawyer-profile">

          <div className="profile-avatar">
            ⚖️
          </div>

          <div>

            <strong>
              Lawyer #1
            </strong>

            <small>
              Legal Professional
            </small>

          </div>

        </div>

      </div>



      {/* STATS */}

      <div className="dashboard-stats">


        <div className="stat-card">

          <div className="stat-icon">
            📋
          </div>

          <div>

            <strong>
              {consultations.length}
            </strong>

            <span>
              Total Requests
            </span>

          </div>

        </div>



        <div className="stat-card">

          <div className="stat-icon pending">
            🕐
          </div>

          <div>

            <strong>
              {pendingCount}
            </strong>

            <span>
              Pending
            </span>

          </div>

        </div>



        <div className="stat-card">

          <div className="stat-icon accepted">
            ✓
          </div>

          <div>

            <strong>
              {acceptedCount}
            </strong>

            <span>
              Accepted
            </span>

          </div>

        </div>


      </div>



      {/* CONTENT */}

      <div className="requests-section">

        <div className="requests-heading">

          <div>

            <p>
              CONSULTATION MANAGEMENT
            </p>

            <h2>
              Client Requests
            </h2>

          </div>


          <button
            className="refresh-button"
            onClick={loadConsultations}
          >
            ↻ Refresh
          </button>

        </div>



        {loading && (

          <div className="dashboard-message">

            <div>
              ⚖️
            </div>

            <h2>
              Loading Requests...
            </h2>

            <p>
              Checking for new consultation requests.
            </p>

          </div>

        )}



        {!loading && error && (

          <div className="dashboard-message error">

            <div>
              ⚠️
            </div>

            <h2>
              Something went wrong
            </h2>

            <p>
              {error}
            </p>

          </div>

        )}



        {!loading &&
          !error &&
          consultations.length === 0 && (

            <div className="dashboard-message">

              <div>
                📭
              </div>

              <h2>
                No Consultation Requests
              </h2>

              <p>
                New consultation requests from clients
                will appear here.
              </p>

            </div>

          )}



        {!loading &&
          !error &&
          consultations.length > 0 && (

            <div className="requests-list">

              {consultations.map((consultation) => (

                <div
                  className="request-card"
                  key={consultation.id}
                >


                  {/* REQUEST HEADER */}

                  <div className="request-top">


                    <div className="client-info">

                      <div className="client-avatar">
                        👤
                      </div>

                      <div>

                        <small>
                          CLIENT
                        </small>

                        <h3>
                          User #{consultation.userId}
                        </h3>

                      </div>

                    </div>


                    <span
                      className={`request-status ${
                        consultation.status === 'ACCEPTED'
                          ? 'accepted'
                          : consultation.status === 'REJECTED'
                          ? 'rejected'
                          : 'pending'
                      }`}
                    >
                      {consultation.status}
                    </span>

                  </div>



                  {/* MESSAGE */}

                  <div className="client-message">

                    <small>
                      CLIENT MESSAGE
                    </small>

                    <p>
                      {consultation.message}
                    </p>

                  </div>



                  {/* FOOTER */}

                  <div className="request-footer">

                    <span>
                      Request #{consultation.id}
                    </span>


                    {consultation.status === 'PENDING' && (

                      <div className="request-actions">

                        <button
                          className="reject-button"
                          disabled={
                            updatingId === consultation.id
                          }
                          onClick={() =>
                            updateStatus(
                              consultation.id,
                              'reject'
                            )
                          }
                        >
                          {updatingId === consultation.id
                            ? 'Updating...'
                            : 'Reject'}
                        </button>


                        <button
                          className="accept-button"
                          disabled={
                            updatingId === consultation.id
                          }
                          onClick={() =>
                            updateStatus(
                              consultation.id,
                              'accept'
                            )
                          }
                        >
                          {updatingId === consultation.id
                            ? 'Updating...'
                            : 'Accept'}
                        </button>

                      </div>

                    )}


                    {consultation.status === 'ACCEPTED' && (

                      <span className="completed-text">
                        ✓ Consultation Accepted
                      </span>

                    )}


                    {consultation.status === 'REJECTED' && (

                      <span className="rejected-text">
                        Consultation Rejected
                      </span>

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

export default LawyerDashboard