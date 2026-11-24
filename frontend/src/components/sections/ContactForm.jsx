import { useState } from 'react'
import { sendContactMessage } from '../../services/contactApi.js'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedName, setSubmittedName] = useState('')

  const validate = () => {
    const errs = {}

    if (!formData.name.trim()) {
      errs.name = 'Please enter your name.'
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters long.'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.'
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address (e.g. name@domain.com).'
    }

    if (!formData.subject.trim()) {
      errs.subject = 'Please enter a subject.'
    } else if (formData.subject.trim().length < 3) {
      errs.subject = 'Subject must be at least 3 characters long.'
    }

    if (!formData.message.trim()) {
      errs.message = 'Please enter a message.'
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.'
    }

    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error for field once user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setSubmittedName(formData.name)

    try {
      await sendContactMessage(formData)
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setErrors({})
    } catch (err) {
      setIsSubmitting(false)
      setErrors({ form: err.message || 'Server error. Please try again later.' })
    }
  }

  if (isSubmitted) {
    return (
      <div className="form-success-card" role="alert">
        <div className="success-icon">✦</div>
        <h4 className="success-title">Message Delivered Successfully!</h4>
        <p className="success-text">
          Thank you, <strong>{submittedName}</strong>. Your inquiry has been securely stored and sent to Iffat.
        </p>
        <div className="success-notice">
          <span>✓</span> Your message is recorded in the backend database. Iffat will review your note and respond via email.
        </div>
        <button
          type="button"
          className="reset-form-btn"
          onClick={() => setIsSubmitted(false)}
        >
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {errors.form && (
        <div className="form-error-banner" role="alert">
          {errors.form}
        </div>
      )}
      {/* Name Field */}
      <div className={`form-field ${errors.name ? 'has-error' : ''}`}>
        <label htmlFor="contact-name" className="field-label">
          Your Name <span className="req">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          className="field-input"
          placeholder="e.g. Alex Johnson"
          value={formData.name}
          onChange={handleChange}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <span className="field-error-msg" id="name-error">
            {errors.name}
          </span>
        )}
      </div>

      {/* Email Field */}
      <div className={`form-field ${errors.email ? 'has-error' : ''}`}>
        <label htmlFor="contact-email" className="field-label">
          Email Address <span className="req">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          className="field-input"
          placeholder="e.g. alex@example.com"
          value={formData.email}
          onChange={handleChange}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <span className="field-error-msg" id="email-error">
            {errors.email}
          </span>
        )}
      </div>

      {/* Subject Field */}
      <div className={`form-field ${errors.subject ? 'has-error' : ''}`}>
        <label htmlFor="contact-subject" className="field-label">
          Subject <span className="req">*</span>
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          className="field-input"
          placeholder="e.g. Game Development Collaboration"
          value={formData.subject}
          onChange={handleChange}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
        />
        {errors.subject && (
          <span className="field-error-msg" id="subject-error">
            {errors.subject}
          </span>
        )}
      </div>

      {/* Message Field */}
      <div className={`form-field ${errors.message ? 'has-error' : ''}`}>
        <div className="label-row">
          <label htmlFor="contact-message" className="field-label">
            Message <span className="req">*</span>
          </label>
          <span className="char-hint">
            {formData.message.length}/10 min chars
          </span>
        </div>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          className="field-textarea"
          placeholder="Write your message or inquiry here..."
          value={formData.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <span className="field-error-msg" id="message-error">
            {errors.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="form-submit-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span>Validating details...</span>
        ) : (
          <>
            <span>Send Message</span>
            <span className="btn-send-icon">✦</span>
          </>
        )}
      </button>

      <p className="form-privacy-note">
        ✦ Your inquiry is securely delivered directly to Iffat&apos;s portfolio database.
      </p>
    </form>
  )
}
