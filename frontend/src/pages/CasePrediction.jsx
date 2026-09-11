import { useState } from 'react'
import './CasePrediction.css'

function CasePrediction() {
  const [formData, setFormData] = useState({
    caseType: '',
    legalCategory: '',
    court: '',
    year: '',
    caseDurationMonths: '',
    previousStatus: '',
  })

  const [prediction, setPrediction] = useState('')
  const [confidence, setConfidence] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setPrediction('')
    setConfidence(null)
    setError('')

    try {
      const response = await fetch('/api/prediction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          caseType: formData.caseType,
          legalCategory: formData.legalCategory,
          court: formData.court,
          year: Number(formData.year),
          caseDurationMonths: Number(formData.caseDurationMonths),
          previousStatus: formData.previousStatus,
        }),
      })

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`)
      }

      const data = await response.json()

      setPrediction(
        data.predictedOutcome ||
        data.prediction ||
        data.outcome ||
        ''
      )

      if (data.confidence !== null && data.confidence !== undefined) {
        setConfidence(Number(data.confidence))
      }

    } catch (err) {
      console.error(err)

      setError(
        'Unable to get prediction. Make sure Spring Boot and the ML API are running.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="prediction-page">

      <div className="prediction-header">

        <p>AI-POWERED LEGAL ANALYSIS</p>

        <h1>Legal Case Prediction</h1>

        <span>
          Enter the details of your case to receive a predicted
          case outcome from our machine learning model.
        </span>

      </div>

      <div className="prediction-container">

        <form
          onSubmit={handleSubmit}
          className="prediction-form"
        >

          <div className="form-group">

            <label>Case Type</label>

            <select
              name="caseType"
              value={formData.caseType}
              onChange={handleChange}
              required
            >

              <option value="">
                Select case type
              </option>

              <option value="Criminal">
                Criminal
              </option>

              <option value="Civil">
                Civil
              </option>

            </select>

          </div>

          <div className="form-group">

            <label>Legal Category</label>

            <select
              name="legalCategory"
              value={formData.legalCategory}
              onChange={handleChange}
              required
            >

              <option value="">
                Select legal category
              </option>

              <option value="Criminal Law">
                Criminal Law
              </option>

              <option value="Civil Law">
                Civil Law
              </option>

            </select>

          </div>

          <div className="form-group">

            <label>Court</label>

            <select
              name="court"
              value={formData.court}
              onChange={handleChange}
              required
            >

              <option value="">
                Select court
              </option>

              <option value="High Court">
                High Court
              </option>

              <option value="Supreme Court">
                Supreme Court
              </option>

              <option value="District Court">
                District Court
              </option>

            </select>

          </div>

          <div className="form-row">

            <div className="form-group">

              <label>Year</label>

              <input
                type="number"
                name="year"
                placeholder="2026"
                value={formData.year}
                onChange={handleChange}
                required
              />

            </div>

            <div className="form-group">

              <label>Case Duration (Months)</label>

              <input
                type="number"
                name="caseDurationMonths"
                placeholder="18"
                value={formData.caseDurationMonths}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          <div className="form-group">

            <label>Previous Status</label>

            <select
              name="previousStatus"
              value={formData.previousStatus}
              onChange={handleChange}
              required
            >

              <option value="">
                Select previous status
              </option>

              <option value="Filed">
                Filed
              </option>

              <option value="Hearing">
                Hearing
              </option>

              <option value="Under Trial">
                Under Trial
              </option>

              <option value="Judgment">
                Judgment
              </option>

            </select>

          </div>

          <button
            type="submit"
            className="predict-button"
            disabled={loading}
          >

            {loading
              ? 'Analyzing Case...'
              : 'Predict Case Outcome'}

          </button>

        </form>

        <div className="prediction-result">

          {!prediction && !error && !loading && (
            <>
              <div className="result-icon">
                ⚖️
              </div>

              <h2>
                Prediction Result
              </h2>

              <p>
                Your predicted case outcome will appear here
                after submitting the case details.
              </p>
            </>
          )}

          {loading && (
            <>
              <div className="result-icon">
                🤖
              </div>

              <h2>
                Analyzing...
              </h2>

              <p>
                Our machine learning model is processing
                your case information.
              </p>
            </>
          )}

          {prediction && !loading && (
            <>
              <div className="result-icon">
                ✓
              </div>

              <p className="result-label">
                PREDICTED OUTCOME
              </p>

              <h2 className="prediction-value">
                {prediction}
              </h2>

              {confidence !== null && (
                <p className="prediction-confidence">
                  Confidence: {confidence.toFixed(2)}%
                </p>
              )}

              <p>
                This prediction is generated by the trained
                machine learning model.
              </p>
            </>
          )}

          {error && (
            <>
              <div className="result-icon">
                ⚠️
              </div>

              <h2>
                Prediction Failed
              </h2>

              <p className="error-message">
                {error}
              </p>
            </>
          )}

        </div>

      </div>

      <p className="disclaimer">

        ⚠️ This prediction is for educational and informational
        purposes only and should not be considered legal advice.

      </p>

    </div>
  )
}

export default CasePrediction