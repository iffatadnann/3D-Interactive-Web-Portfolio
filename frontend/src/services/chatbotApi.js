const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

/**
 * Ask a question to the portfolio RAG chatbot.
 * @param {string} question - The user query.
 * @returns {Promise<{answer: string, sources: Array<{name: string, relevance: string}>}>}
 */
export async function askChatbot(question) {
  const response = await fetch(`${API_BASE}/api/chatbot/ask/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to get a response from the chatbot.')
  }

  return data
}
