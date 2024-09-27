import React, { useState } from 'react'
import { FiSend, FiPaperclip } from 'react-icons/fi'
import './App.css'

export default function Component() {
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [message, setMessage] = useState('')
  const [conversations, setConversations] = useState([
    { id: 1, name: "Dr. Priyanshu kumar", lastMessage: "Looking forward to our meeting!", unread: 2 },
    { id: 2, name: "Mollen mist", lastMessage: "Thanks for your advice!", unread: 0 },
    { id: 3, name: "Dr. Bhanu", lastMessage: "Can we schedule a call?", unread: 1 },
  ])
  const [messages, setMessages] = useState([
    { id: 1, sender: "Dr. Emily Rodriguez", content: "Hello! How can I help you today?", timestamp: "10:30 AM" },
    { id: 2, sender: "You", content: "Hi Dr. Rodriguez! I wanted to ask about the research opportunity we discussed.", timestamp: "10:32 AM" },
    { id: 3, sender: "Dr. Emily Rodriguez", content: "Of course! I'd be happy to provide more information. What specific aspects are you interested in?", timestamp: "10:35 AM" },
    { id: 4, sender: "You", content: "I'm particularly curious about the data analysis techniques you mentioned. Could you elaborate on those?", timestamp: "10:37 AM" },
    { id: 5, sender: "Dr. Emily Rodriguez", content: "We'll be using advanced machine learning algorithms for data analysis, including...", timestamp: "10:40 AM" },
  ])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        sender: "You",
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages([...messages, newMessage])
      setMessage('')
    }
  }

  return (
    <div className="container">
      <h1 className="title">Inbox</h1>
      <div className="messaging-layout">
        <div className="conversation-list">
          <div className="conversation-list-content">
            <h2 className="subtitle">Conversations</h2>
            <div className="conversation-scroll">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`conversation-item ${selectedConversation === conversation.id ? 'selected' : ''}`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="avatar">
                    <span className="avatar-text">
                      {conversation.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="conversation-details">
                    <h3 className="conversation-name">{conversation.name}</h3>
                    <p className="conversation-last-message">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <span className="unread-badge">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="message-area">
          <div className="message-area-content">
            {selectedConversation ? (
              <>
                <div className="selected-conversation-header">
                  <div className="avatar">
                    <span className="avatar-text">
                      {conversations.find(c => c.id === selectedConversation)?.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h2 className="subtitle">
                    {conversations.find(c => c.id === selectedConversation)?.name}
                  </h2>
                </div>
                <div className="message-scroll">
                  <div className="message-list">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`message ${msg.sender === 'You' ? 'sent' : 'received'}`}
                      >
                        <div className="message-content">
                          <p>{msg.content}</p>
                          <p className="message-timestamp">{msg.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <form onSubmit={handleSendMessage} className="message-form">
                  <button type="button" className="attach-button">
                    <FiPaperclip className="icon" />
                    <span className="sr-only">Attach file</span>
                  </button>
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="message-input"
                  />
                  <button type="submit" className="send-button">
                    <FiSend className="icon" />
                    Send
                  </button>
                </form>
              </>
            ) : (
              <div className="no-conversation-selected">
                <p>Select a conversation to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}