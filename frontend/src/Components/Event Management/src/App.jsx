import React, { useState } from 'react'
import { FaCalendarAlt, FaClock, FaUsers, FaVideo, FaTimes } from 'react-icons/fa'
import './App.css'

export default function EventManagement() {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [events, setEvents] = useState([
    { id: 1, title: "AI in Healthcare Workshop", type: "Workshop", date: "2023-07-15", time: "14:00", attendees: 25 },
    { id: 2, title: "Career Mentoring Session", type: "Mentoring", date: "2023-07-18", time: "10:00", attendees: 1 },
    { id: 3, title: "Web Development Meetup", type: "Meetup", date: "2023-07-20", time: "18:00", attendees: 50 },
  ])

  const [newEvent, setNewEvent] = useState({
    title: '',
    type: '',
    date: '',
    time: '',
    description: '',
    maxAttendees: '',
  })

  const [managingEvent, setManagingEvent] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewEvent({ ...newEvent, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const createdEvent = {
      id: events.length + 1,
      ...newEvent,
      attendees: 0,
    }
    setEvents([...events, createdEvent])
    setNewEvent({
      title: '',
      type: '',
      date: '',
      time: '',
      description: '',
      maxAttendees: '',
    })
    setActiveTab('upcoming')
  }

  const handleManageEvent = (event) => {
    setManagingEvent(event)
  }

  const closeManageEvent = () => {
    setManagingEvent(null)
  }

  return (
    <div className="container">
      <h1 className="main-title">Event Management</h1>
      <div className="tab-container">
        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Events
          </button>
          <button
            className={`tab-button ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            Create Event
          </button>
        </div>
      </div>
      {activeTab === 'upcoming' && (
        <div className="content-box">
          <h2 className="section-title">Upcoming Events</h2>
          <p className="section-description">View and manage your scheduled events</p>
          <div className="event-grid">
            {events.map((event) => (
              <div key={event.id} className="event-card">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-type">{event.type}</p>
                <div className="event-details">
                  <div className="event-detail">
                    <FaCalendarAlt className="event-icon" />
                    <span>{event.date}</span>
                  </div>
                  <div className="event-detail">
                    <FaClock className="event-icon" />
                    <span>{event.time}</span>
                  </div>
                  <div className="event-detail">
                    <FaUsers className="event-icon" />
                    <span>{event.attendees} attendees</span>
                  </div>
                  <div className="event-detail">
                    <FaVideo className="event-icon" />
                    <span>Virtual</span>
                  </div>
                </div>
                <button
                  onClick={() => handleManageEvent(event)}
                  className="manage-button"
                >
                  Manage Event
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeTab === 'create' && (
        <div className="content-box">
          <h2 className="section-title">Create New Event</h2>
          <p className="section-description">Schedule a new virtual event</p>
          <form onSubmit={handleSubmit} className="create-event-form">
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Event Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={newEvent.title}
                onChange={handleInputChange}
                placeholder="Enter event title"
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="type" className="form-label">
                Event Type
              </label>
              <select
                id="type"
                name="type"
                value={newEvent.type}
                onChange={handleInputChange}
                required
                className="form-input"
              >
                <option value="">Select event type</option>
                <option value="Meetup">Meetup</option>
                <option value="Workshop">Workshop</option>
                <option value="Mentoring">Mentoring Session</option>
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={newEvent.date}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="time" className="form-label">
                  Time
                </label>
                <input
                  id="time"
                  name="time"
                  type="time"
                  value={newEvent.time}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
                placeholder="Enter event description"
                required
                rows={4}
                className="form-input"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="maxAttendees" className="form-label">
                Maximum Attendees
              </label>
              <input
                id="maxAttendees"
                name="maxAttendees"
                type="number"
                value={newEvent.maxAttendees}
                onChange={handleInputChange}
                placeholder="Enter maximum number of attendees"
                required
                className="form-input"
              />
            </div>
            <button
              type="submit"
              className="submit-button"
            >
              Create Event
            </button>
          </form>
        </div>
      )}
      {managingEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Manage Event</h3>
              <button onClick={closeManageEvent} className="close-button">
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <p><strong>Title:</strong> {managingEvent.title}</p>
              <p><strong>Type:</strong> {managingEvent.type}</p>
              <p><strong>Date:</strong> {managingEvent.date}</p>
              <p><strong>Time:</strong> {managingEvent.time}</p>
              <p><strong>Attendees:</strong> {managingEvent.attendees}</p>
              <div className="modal-footer">
                <button
                  onClick={closeManageEvent}
                  className="close-modal-button"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}