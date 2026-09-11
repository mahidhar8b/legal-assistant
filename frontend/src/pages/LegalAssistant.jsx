import { useState } from 'react'
import './LegalAssistant.css'

function LegalAssistant() {

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const sendMessage = async (e) => {

    e.preventDefault()

    if (!message.trim() || loading) {
      return
    }

    const userMessage = message.trim()

    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        text: userMessage
      }
    ])

    setMessage('')
    setLoading(true)

    try {

      const response = await fetch(
        'http://127.0.0.1:8080/api/assistant',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: userMessage
          })
        }
      )

      if (!response.ok) {
        throw new Error('Server error')
      }

      const data = await response.json()

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text:
            data.response ||
            data.message ||
            'Unable to generate a response.'
        }
      ])

    } catch (error) {

      console.error(error)

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text:
            'Unable to connect to the Legal Assistant server. Please make sure the Spring Boot backend is running.'
        }
      ])

    } finally {

      setLoading(false)

    }
  }


  return (

    <div className="assistant-page">

      <div className="assistant-header">

        <p>AI-POWERED LEGAL SUPPORT</p>

        <h1>Legal Assistant</h1>

        <span>
          Ask general legal questions and receive
          AI-powered guidance in simple language.
        </span>

      </div>


      <div className="chat-container">


        {/* CHAT HEADER */}

        <div className="chat-header">

          <div className="assistant-avatar">
            ⚖️
          </div>

          <div>

            <h2>
              Legal Assistant
            </h2>

            <span>
              AI Legal Information Assistant
            </span>

          </div>

        </div>


        {/* MESSAGES */}

        <div className="messages-container">

          {messages.length === 0 && (

            <div className="welcome-message">

              <div className="welcome-icon">
                🤖
              </div>

              <h2>
                How can I help you?
              </h2>

              <p>
                Ask a general legal question to get
                started.
              </p>


              <div className="example-questions">

                <button
                  onClick={() =>
                    setMessage(
                      'What is the difference between civil and criminal cases?'
                    )
                  }
                >
                  What is the difference between
                  civil and criminal cases?
                </button>


                <button
                  onClick={() =>
                    setMessage(
                      'What are the basic steps involved in filing a case?'
                    )
                  }
                >
                  What are the basic steps involved
                  in filing a case?
                </button>


                <button
                  onClick={() =>
                    setMessage(
                      'What is a legal notice?'
                    )
                  }
                >
                  What is a legal notice?
                </button>

              </div>

            </div>

          )}


          {messages.map((msg, index) => (

            <div
              key={index}
              className={`chat-message ${msg.role}`}
            >

              <div className="message-avatar">

                {msg.role === 'user'
                  ? '👤'
                  : '⚖️'}

              </div>

              <div className="message-bubble">

                {msg.text}

              </div>

            </div>

          ))}


          {loading && (

            <div className="chat-message assistant">

              <div className="message-avatar">
                ⚖️
              </div>

              <div className="message-bubble typing">
                AI is thinking...
              </div>

            </div>

          )}

        </div>


        {/* INPUT */}

        <form
          className="chat-input"
          onSubmit={sendMessage}
        >

          <input
            type="text"
            placeholder="Ask a legal question..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
          />

          <button
            type="submit"
            disabled={loading || !message.trim()}
          >
            {loading ? '...' : 'Send'}
          </button>

        </form>


        <p className="chat-disclaimer">
          ⚠️ This AI assistant provides general legal
          information only and does not constitute legal advice.
        </p>

      </div>

    </div>

  )
}

export default LegalAssistant