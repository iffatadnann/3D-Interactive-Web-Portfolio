import { useState, useRef, useEffect } from 'react'
import ChatMessage from './ChatMessage.jsx'
import { askChatbot } from '../../services/chatbotApi.js'

const SUGGESTED_QUESTIONS = [
  'What is NoorQuest?',
  'What are her technical skills?',
  'What projects has she built?',
  'Tell me about her background',
]

export default function ChatbotWindow({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Greetings! I'm Iffat's Portfolio AI Assistant, grounded in her verified project work and technical background. Ask me anything about her skills, games, or experience!",
      sources: [],
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  const handleSend = async (questionText) => {
    const query = (questionText || input).trim()
    if (!query || loading) return

    setInput('')
    setError(null)

    // Add user message
    const userMsg = { sender: 'user', text: query }
    setMessages((prev) => [...prev, userMsg])
    setLoading(true)

    try {
      const res = await askChatbot(query)
      const botMsg = {
        sender: 'bot',
        text: res.answer,
        sources: res.sources || [],
      }
      setMessages((prev) => [...prev, botMsg])
    } catch (err) {
      setError(err.message || 'Unable to connect to assistant.')
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: "I couldn't reach the backend server right now. Please ensure the Django backend is running at http://localhost:8000.",
          sources: [],
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!isOpen) return null

  return (
    <aside className="chatbot-window" aria-label="Portfolio AI Chat Assistant">
      <header className="chatbot-header">
        <div className="chatbot-title-group">
          <span className="chatbot-header-icon">🏮</span>
          <div>
            <h3>Iffat&apos;s Assistant</h3>
            <span className="chatbot-status">
              <span className="status-dot" /> Powered by Gemini & ChromaDB
            </span>
          </div>
        </div>
        <button
          type="button"
          className="chatbot-close"
          onClick={onClose}
          aria-label="Close Chat"
        >
          ✕
        </button>
      </header>

      {/* Message history */}
      <div className="chatbot-messages">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg} />
        ))}

        {loading && (
          <div className="chat-message bot-message">
            <div className="message-bubble typing-indicator">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested prompts (show if fewer than 3 user messages) */}
      {messages.filter((m) => m.sender === 'user').length < 3 && (
        <div className="chatbot-suggestions">
          {SUGGESTED_QUESTIONS.map((q, i) => (
            <button
              key={i}
              type="button"
              className="suggestion-chip"
              onClick={() => handleSend(q)}
              disabled={loading}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {error && <div className="chatbot-error-banner">{error}</div>}

      {/* Input box */}
      <footer className="chatbot-input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about NoorQuest, Unity, skills..."
          maxLength={500}
          disabled={loading}
          aria-label="Your question"
        />
        <button
          type="button"
          className="chatbot-send-btn"
          onClick={() => handleSend()}
          disabled={loading || !input.trim()}
          aria-label="Send question"
        >
          ➤
        </button>
      </footer>
    </aside>
  )
}

