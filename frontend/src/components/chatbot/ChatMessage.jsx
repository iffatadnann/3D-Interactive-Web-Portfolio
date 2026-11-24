export default function ChatMessage({ message }) {
  const isUser = message.sender === 'user'

  return (
    <div className={`chat-message ${isUser ? 'user-message' : 'bot-message'}`}>
      <div className="message-bubble">
        <p className="message-text">{message.text}</p>
        
        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="message-sources">
            <span className="sources-label">Sources:</span>
            {message.sources.map((s, idx) => (
              <span key={idx} className={`source-tag ${s.relevance || ''}`}>
                {s.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

