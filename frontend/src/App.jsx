import { Routes, Route } from 'react-router-dom'

import LegalAssistant from './pages/LegalAssistant'
import CasePrediction from './pages/CasePrediction'
import Lawyers from './pages/Lawyers'
import MyConsultations from './pages/MyConsultations'
import LawyerDashboard from './pages/LawyerDashboard'

import './App.css'


// ======================================================
// HOME PAGE
// ======================================================

function Home() {

  return (

    <div className="app">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <div className="logo">
          ⚖️ <span>Legal Assistant</span>
        </div>

        <div className="nav-links">

          <a href="#home">
            Home
          </a>

          <a href="#services">
            Services
          </a>

          <a href="#about">
            About
          </a>

          <a href="#services">
            My Consultations
          </a>

          <a href="#services" className="login-btn">
            Find a Lawyer
          </a>

        </div>

      </nav>


      {/* ================= HERO ================= */}

      <section
        id="home"
        className="hero-section"
      >

        <div className="hero-content">

          <p className="welcome">
            WELCOME TO LEGAL ASSISTANT
          </p>

          <h1>

            Your Legal Help,

            <br />

            <span>
              Made Simple.
            </span>

          </h1>

          <p className="hero-text">

            Find qualified lawyers, request consultations,
            and get intelligent insights about your legal case
            in one place.

          </p>

          <div className="hero-buttons">

            <a
              href="#services"
              className="primary-btn"
            >
              Find a Lawyer
            </a>

            <a
              href="/prediction"
              className="secondary-btn"
            >
              Predict Case Outcome
            </a>

          </div>

        </div>


        {/* ================= HERO CARD ================= */}

        <div className="hero-card">

          <div className="scales">
            ⚖️
          </div>

          <h2>
            Legal Assistance
          </h2>

          <p>

            Connect with legal professionals and
            get the support you need.

          </p>

          <div className="card-stats">

            <div>

              <strong>
                24/7
              </strong>

              <span>
                Access
              </span>

            </div>

            <div>

              <strong>
                4+
              </strong>

              <span>
                Legal Categories
              </span>

            </div>

            <div>

              <strong>
                AI
              </strong>

              <span>
                Powered
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* ================= SERVICES ================= */}

      <section
        id="services"
        className="services-section"
      >

        <div className="section-heading">

          <p>
            OUR SERVICES
          </p>

          <h2>
            How We Can Help
          </h2>

        </div>


        <div className="services-grid">


          {/* FIND LAWYER */}

          <div className="service-card">

            <div className="service-icon">
              ⚖️
            </div>

            <h3>
              Find a Lawyer
            </h3>

            <p>

              Search for lawyers based on their
              specialization and location.

            </p>

            <a
              href="/lawyers"
              className="service-link"
            >
              Explore Lawyers →
            </a>

          </div>


          {/* CONSULTATION */}

          <div className="service-card">

            <div className="service-icon">
              📋
            </div>

            <h3>
              Consultation
            </h3>

            <p>

              Request consultations and communicate
              with qualified legal professionals.

            </p>

            <a
              href="/consultations"
              className="service-link"
            >
              My Consultations →
            </a>

          </div>


          {/* CASE PREDICTION */}

          <div className="service-card">

            <div className="service-icon">
              🤖
            </div>

            <h3>
              Case Prediction
            </h3>

            <p>

              Use our machine learning model to
              predict possible case outcomes.

            </p>

            <a
              href="/prediction"
              className="service-link"
            >
              Predict Outcome →
            </a>

          </div>


          {/* LEGAL AI ASSISTANT */}

          <div className="service-card">

            <div className="service-icon">
              💬
            </div>

            <h3>
              Legal Assistant
            </h3>

            <p>

              Get general legal information and
              guidance through our AI assistant.

            </p>

            <a
              href="/assistant"
              className="service-link"
            >
              Ask Assistant →
            </a>

          </div>


        </div>

      </section>


      {/* ================= ABOUT ================= */}

      <section
        id="about"
        className="about-section"
      >

        <div>

          <p className="section-label">
            ABOUT THE PROJECT
          </p>

          <h2>

            Technology meets

            <br />

            <span>
              Legal Assistance.
            </span>

          </h2>

        </div>

        <p>

          Legal Assistant is a platform designed to make
          legal services easier to access. Users can discover
          lawyers, request consultations, and use machine
          learning to analyze legal case outcomes.

        </p>

      </section>


      {/* ================= FOOTER ================= */}

      <footer>

        <div className="logo">
          ⚖️ Legal Assistant
        </div>

        <p>
          © 2026 Legal Assistant. All rights reserved.
        </p>

      </footer>

    </div>

  )

}


// ======================================================
// APP ROUTES
// ======================================================

function App() {

  return (

    <Routes>

      {/* HOME */}

      <Route
        path="/"
        element={<Home />}
      />


      {/* FIND LAWYERS */}

      <Route
        path="/lawyers"
        element={<Lawyers />}
      />


      {/* CONSULTATIONS */}

      <Route
        path="/consultations"
        element={<MyConsultations />}
      />


      {/* CASE PREDICTION */}

      <Route
        path="/prediction"
        element={<CasePrediction />}
      />


      {/* LEGAL AI ASSISTANT */}

      <Route
        path="/assistant"
        element={<LegalAssistant />}
      />


      {/* LAWYER DASHBOARD */}

      <Route
        path="/lawyer-dashboard"
        element={<LawyerDashboard />}
      />

    </Routes>

  )

}


export default App