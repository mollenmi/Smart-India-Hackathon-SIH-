import React, { useState } from 'react';
import { FaHome, FaGraduationCap, FaUserFriends, FaCalendarAlt, FaBriefcase, FaUsers, FaMoon, FaSun, FaSearch, FaEdit, FaHeart, FaComment, FaBars, FaChevronDown, FaChevronUp , FaRobot, FaTimes} from 'react-icons/fa';
import { IoMdChatbubbles } from 'react-icons/io';
import './Dashboard.css';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [academiaOpen, setAcademiaOpen] = useState(false);
  const [activeComments, setActiveComments] = useState({});
  const [likedPosts, setLikedPosts] = useState({});
  const [comments, setComments] = useState({});
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatbotInput, setChatbotInput] = useState('');
  const [chatbotMessages, setChatbotMessages] = useState([]);



  // Updated placeholder data with dynamic image URL
  const [feeds, setFeeds] = useState([
    { 
      id: 1, 
      author: 'John Doe', 
      content: 'Just finished my final project!', 
      image: 'src/assets/ff.png', 
      likes: 15, 
      comments: [
        { id: 1, author: 'Jane Smith', content: 'Great job!' },
        { id: 2, author: 'Bob Johnson', content: 'Congrats!' }
      ]
    },
    { 
      id: 2, 
      author: 'Jane Smith', 
      content: 'Looking forward to the upcoming career fair.', 
      image: 'src/assets/ff.png', 
      likes: 20, 
      comments: [
        { id: 3, author: 'Alice Brown', content: 'Me too!' },
        { id: 4, author: 'Charlie Davis', content: 'See you there!' }
      ]
    },
  ]);

  const communities = [
    { id: 1, name: 'Computer Science Club' },
    { id: 2, name: 'Debate Society' },
    { id: 3, name: 'Photography Club' },
  ];

  const chatMessages = [
    { id: 1, community: 'Computer Science Club', message: 'Next meeting on Friday!' },
    { id: 2, community: 'Debate Society', message: 'Dont forget to submit your topics.' },
    { id: 3, community: 'Photography Club', message: 'New photo contest announced!' },
  ];

  const toggleComments = (postId) => {
    setActiveComments(prev => ({...prev, [postId]: !prev[postId]}));
  };

  const toggleLike = (postId) => {
    setLikedPosts(prev => ({...prev, [postId]: !prev[postId]}));
    setFeeds(feeds.map(feed => 
      feed.id === postId 
        ? {...feed, likes: feed.likes + (likedPosts[postId] ? -1 : 1)} 
        : feed
    ));
  };

  const handleCommentSubmit = (postId, event) => {
    event.preventDefault();
    const commentContent = comments[postId];
    if (commentContent) {
      setFeeds(feeds.map(feed => 
        feed.id === postId 
          ? {...feed, comments: [...feed.comments, { id: Date.now(), author: 'You', content: commentContent }]} 
          : feed
      ));
      setComments({...comments, [postId]: ''});
    }
  };
  const handleChatbotSubmit = (e) => {
    e.preventDefault();
    if (chatbotInput.trim()) {
      setChatbotMessages([...chatbotMessages, { type: 'user', content: chatbotInput }]);


      // Simulate bot response (replace with actual chatbot logic)
      setTimeout(() => {
        setChatbotMessages(prev => [...prev, { type: 'bot', content: `You asked: "${chatbotInput}". How can I help you with that?` }]);
      }, 1000);
      setChatbotInput('');
    }
  };

  return (
    <div className={`dashboard ${darkMode ? 'dark' : ''}`}>



      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          {sidebarOpen && <h2>Menu</h2>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="sidebar-toggle">
            <FaBars size={24} />
          </button>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item">
            <FaHome className="nav-icon" /> {sidebarOpen && 'Home'}
          </a>
          <div className="nav-item">
            <button onClick={() => setAcademiaOpen(!academiaOpen)} className="nav-button">
              <div className="nav-button-content">
                <FaGraduationCap className="nav-icon" /> 
                {sidebarOpen && 'Academia'}
              </div>
              {sidebarOpen && (academiaOpen ? <FaChevronUp /> : <FaChevronDown />)}
            </button>
            {sidebarOpen && academiaOpen && (
              <div className="submenu">
                <a href="#" className="submenu-item">BTech</a>
              </div>
            )}
          </div>
          <a href="#" className="nav-item">
            <FaUserFriends className="nav-icon" /> {sidebarOpen && 'AlumniConnect'}
          </a>
          <a href="{Video_Stream}" className="nav-item">
            <FaCalendarAlt className="nav-icon" /> {sidebarOpen && 'Events'}
          </a>
          <a href="#" className="nav-item">
            <FaBriefcase className="nav-icon" /> {sidebarOpen && 'Placement Help'}
          </a>
          <a href="#" className="nav-item">
            <FaUsers className="nav-icon" /> {sidebarOpen && 'Community'}
          </a>
        </nav>
        <div className="sidebar-footer">
          <button onClick={() => setDarkMode(!darkMode)} className="dark-mode-toggle">
            {darkMode ? <FaSun className="mode-icon" /> : <FaMoon className="mode-icon" />}
            {sidebarOpen && (darkMode ? 'Light Mode' : 'Dark Mode')}
          </button>
        </div>
      </aside>

      <div className="main-content">



        {/* Navbar */}
        <header className="navbar">
          <div className="navbar-brand">
            <img src="src/assets/logo.png" alt="Logo" className="navbar-logo" />
            <h1>Beyond Classroom</h1>
          </div>
          <div className="navbar-actions">
            <div className="chat-dropdown">
              <button onClick={() => setShowChat(!showChat)} className="chat-button">
                <IoMdChatbubbles size={24} />
              </button>
              {showChat && (
                <div className="chat-menu">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="chat-message">
                      <h3>{msg.community}</h3>
                      <p>{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="profile-dropdown">
              <button onClick={() => setShowLogout(!showLogout)} className="profile-button">
                <img src="src/assets/albert.jpg" alt="Profile" className="profile-image" />
              </button>
              {showLogout && (
                <div className="logout-menu">
                  <a href="#" className="logout-button">Logout</a>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="content">
          <div className="container">
            <div className="content-wrapper">
              <div className="feed-container">


                {/* Feed controls */}
                <div className="feed-controls">
                  <div className="search-container">
                    <span className="search-icon">
                      <FaSearch />
                    </span>
                    <input
                      type="text"
                      placeholder="Search feeds..."
                      className="search-input"
                    />
                  </div>
                  <button className="post-button">
                    <FaEdit className="post-icon" />
                    Post
                  </button>
                </div>

                {/* Feeds */}
                {feeds.map((feed) => (
                  <div key={feed.id} className="feed-item">
                    <div className="feed-header">
                      <img src={feed.image} alt={feed.author} className="author-image" />
                      <div className="author-info">
                        <h3>{feed.author}</h3>
                        <p>2 hours ago</p>
                      </div>
                    </div>
                    <p className="feed-content">{feed.content}</p>
                    <img src={feed.image} alt="Post image" className="feed-image" />
                    <div className="feed-actions">
                      <button 
                        onClick={() => toggleLike(feed.id)} 
                        className={`action-button ${likedPosts[feed.id] ? 'liked' : ''}`}
                      >
                        <FaHeart className="action-icon" />
                        {feed.likes}
                      </button>
                      <button 
                        onClick={() => toggleComments(feed.id)} 
                        className={`action-button ${activeComments[feed.id] ? 'active' : ''}`}
                      >
                        <FaComment className="action-icon" />
                        {feed.comments.length}
                      </button>
                    </div>
                    {activeComments[feed.id] && (
                      <div className="comments-section">
                        {feed.comments.map((comment) => (
                          <div key={comment.id} className="comment">
                            <span className="comment-author">{comment.author}</span>
                            <span className="comment-content">{comment.content}</span>
                          </div>
                        ))}
                        <form onSubmit={(e) => handleCommentSubmit(feed.id, e)} className="comment-form">
                          <input
                            type="text"
                            value={comments[feed.id] || ''}
                            onChange={(e) => setComments({...comments, [feed.id]: e.target.value})}
                            placeholder="Add a comment..."
                            className="comment-input"
                          />
                          <button type="submit" className="comment-submit">
                            Post Comment
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Joined Communities */}
              <div className="communities-container">
                <div className="communities-wrapper">
                  <h2>Joined Communities</h2>
                  <ul className="communities-list">
                    {communities.map((community) => (
                      <li key={community.id}>
                        <a href="#" className="community-link">
                          {community.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

           {/* Chatbot Icon */}
           <button
            onClick={() => setShowChatbot(true)}
            className="chatbot-toggle"
          >
            <FaRobot size={ 24} />
          </button>
 {/* Chatbot Interface */}
 {showChatbot && (
            <div className="chatbot-container">
              <div className="chatbot-header">
                <h3 className="chatbot-title">Chatbot</h3>
                <button onClick={() => setShowChatbot(false)} className="close-chatbot">
                  <FaTimes size={20} />
                </button>
              </div>
              <div className="chatbot-messages">
                {chatbotMessages.map((msg, index) => (
                  <div key={index} className={`message ${msg.type}`}>
                    <div className="message-content">
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleChatbotSubmit} className="chatbot-input-form">
                <div className="chatbot-input-container">
                  <input
                    type="text"
                    value={chatbotInput}
                    onChange={(e) => setChatbotInput(e.target.value)}
                    placeholder="Type your message..."
                    className="chatbot-input"
                  />
                  <button type="submit" className="chatbot-submit">
                    <FaSearch size={20} />
                  </button>
                </div>
              </form>
            </div>
          )}
 


        </main>
      </div>
    </div>
  );
}