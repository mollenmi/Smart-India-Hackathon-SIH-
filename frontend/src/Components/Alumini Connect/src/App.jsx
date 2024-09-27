import React, { useState } from 'react'
import { FaGraduationCap, FaBriefcase, FaSearch, FaUserPlus, FaEnvelope, FaBell, FaCog } from 'react-icons/fa'
import './App.css'


export default function AlumniConnect() {
  const [interests, setInterests] = useState([])
  const [careerGoals, setCareerGoals] = useState([])
  const [matches, setMatches] = useState([])

  const suggestedInterests = [
    "Artificial Intelligence", "Machine Learning", "Web Development", 
    "Data Science", "Cybersecurity", "Cloud Computing", "Blockchain",
    "Internet of Things", "Robotics", "Virtual Reality"
  ]

  const suggestedCareerGoals = [
    "Software Engineer", "Data Scientist", "AI Researcher",
    "Product Manager", "Cybersecurity Analyst", "Cloud Architect",
    "UX/UI Designer", "DevOps Engineer", "Blockchain Developer",
    "IoT Specialist"
  ]

  const handleInterestChange = (e) => {
    const value = e.target.value
    if (!interests.includes(value)) {
      setInterests([...interests, value])
    }
  }

  const handleCareerGoalChange = (e) => {
    const value = e.target.value
    if (!careerGoals.includes(value)) {
      setCareerGoals([...careerGoals, value])
    }
  }

  const handleRemoveInterest = (interest) => {
    setInterests(interests.filter(i => i !== interest))
  }

  const handleRemoveCareerGoal = (goal) => {
    setCareerGoals(careerGoals.filter(g => g !== goal))
  }

  const handleFindMatches = () => {
    // Simulating API call to find matches
    const simulatedMatches = [
      { id: 1, name: "John Doe", role: "Software Engineer at Tech Corp", matchPercentage: 95 },
      { id: 2, name: "Jane Smith", role: "Data Scientist at AI Innovations", matchPercentage: 88 },
      { id: 3, name: "Mike Johnson", role: "Product Manager at StartUp Inc", matchPercentage: 82 },
    ]
    setMatches(simulatedMatches)
  }

  return (
    <div className="alumni-connect">
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
           {/*  <FaGraduationCap className="logo-icon" />*/} 
           <img src="src/logo.png" alt="Logo" className="navbar-logo" />
            <span className="logo-text">AlumniConnect</span>
          </div>

          {/*
          <div className="navbar-actions">
            <button className="navbar-button"><FaEnvelope /></button>
            <button className="navbar-button"><FaBell /></button>
            <button className="navbar-button"><FaCog /></button>
          </div> */}
        </div>
      </nav>

      <main className="main-content">
        <h1 className="page-title">Find Your Perfect Match</h1>
        
        <div className="section">
          <h2 className="section-title">Your Interests</h2>
          <select onChange={handleInterestChange} className="select-input">
            <option value="">Select an interest</option>
            {suggestedInterests.map((interest, index) => (
              <option key={index} value={interest}>{interest}</option>
            ))}
          </select>
          <div className="tag-container">
            {interests.map((interest, index) => (
              <span key={index} className="tag interest-tag">
                {interest}
                <button onClick={() => handleRemoveInterest(interest)} className="tag-remove">&times;</button>
              </span>
            ))}
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Your Career Goals</h2>
          <select onChange={handleCareerGoalChange} className="select-input">
            <option value="">Select a career goal</option>
            {suggestedCareerGoals.map((goal, index) => (
              <option key={index} value={goal}>{goal}</option>
            ))}
          </select>
          <div className="tag-container">
            {careerGoals.map((goal, index) => (
              <span key={index} className="tag career-goal-tag">
                {goal}
                <button onClick={() => handleRemoveCareerGoal(goal)} className="tag-remove">&times;</button>
              </span>
            ))}
          </div>
        </div>

        <div className="button-container">
          <button onClick={handleFindMatches} className="find-matches-button">
            <FaSearch className="button-icon" />
            Find Matches
          </button>
        </div>

        {matches.length > 0 && (
          <div className="matches-section">
            <h2 className="section-title">Your Matches</h2>
            <div className="matches-grid">
              {matches.map((match) => (
                <div key={match.id} className="match-card">
                  <h3 className="match-name">{match.name}</h3>
                  <p className="match-role">{match.role}</p>
                  <p className="match-percentage">{match.matchPercentage}% Match</p>
                  <button className="connect-button">
                    <FaUserPlus className="button-icon" />
                    Connect
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}