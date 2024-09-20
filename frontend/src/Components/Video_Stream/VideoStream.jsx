import React, { useState } from 'react'
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash } from 'react-icons/fa'
import { IoMdSend } from 'react-icons/io'
import './VideoStream.css'

export default function LiveStudentInteraction() {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (inputMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        sender: 'teacher',
        text: inputMessage.trim(),
      }
      setMessages([...messages, newMessage])
      setInputMessage('')
    }
  }

  return (
    <div className="interaction-container">
      <div className="video-section">
        <div className="video-feed">
          {isVideoOff ? (
            <div className="video-off-text">Video Off</div>
          ) : (
            <img
              src="/placeholder.svg?height=360&width=640"
              alt="Student video feed"
              className="video-content"
            />
          )}
        </div>
        <div className="controls">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`control-button ${isMuted ? 'button-muted' : ''}`}
          >
            {isMuted ? <FaMicrophoneSlash size={24} /> : <FaMicrophone size={24} />}
          </button>
          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`control-button ${isVideoOff ? 'button-muted' : ''}`}
          >
            {isVideoOff ? <FaVideoSlash size={24} /> : <FaVideo size={24} />}
          </button>
          <button className="control-button button-hangup">
            <FaPhoneSlash size={24} color="white" />
          </button>
        </div>
      </div>
      <div className="chat-section">
        <div className="message-list">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-item ${message.sender === 'teacher' ? 'message-teacher' : ''}`}
            >
              <p className="message-text">{message.text}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="input-section">
          <div className="input-container">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="message-input"
            />
            <button type="submit" className="send-button">
              <IoMdSend size={24} />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
