export default function ChatbotLauncher({ isOpen, onToggle, unreadCount = 0 }) {
  return (
    <button
      type="button"
      className={`chatbot-launcher ${isOpen ? 'active' : ''}`}
      onClick={onToggle}
      aria-label={isOpen ? 'Close AI Portfolio Assistant' : 'Open AI Portfolio Assistant'}
      title="Chat with Iffat's Portfolio AI Assistant"
    >
      <span className="launcher-icon">{isOpen ? '✕' : '🏮'}</span>
      <span className="launcher-glow" />
      {unreadCount > 0 && !isOpen && (
        <span className="launcher-badge">{unreadCount}</span>
      )}
    </button>
  )
}

