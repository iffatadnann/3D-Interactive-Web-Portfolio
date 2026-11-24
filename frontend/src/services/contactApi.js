/**
 * Direct email submission using Web3Forms
 */
export async function sendContactMessage(formData) {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: 'a47e841d-d67f-4152-af1f-29a45b08b73e', // <-- Paste your Web3Forms access key here
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    }),
  })

  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to send message.')
  }
  return result
}