import { CONTACT_DATA } from '../../data/portfolioData.js'
import ContactForm from './ContactForm.jsx'

export default function ContactSection() {
  return (
    <div className="section-content section-contact">
      <p className="contact-lead-text">
        Whether you are interested in discussing <strong>NoorQuest</strong>, collaborating on game development, or exploring 3D web applications, I would love to connect!
      </p>

      {/* Contact Channels Grid */}
      <div className="contact-channels-grid">
        <a
          href={`mailto:${CONTACT_DATA.email}`}
          className="channel-card"
          title="Send an email"
        >
          <div className="channel-icon-wrap">
            <span className="channel-icon">✉</span>
          </div>
          <div className="channel-info">
            <span className="channel-label">EMAIL ADDRESS</span>
            <span className="channel-value">{CONTACT_DATA.email}</span>
          </div>
          <span className="channel-arrow">↗</span>
        </a>

        <a
          href={CONTACT_DATA.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="channel-card"
          title="Visit GitHub profile"
        >
          <div className="channel-icon-wrap">
            <span className="channel-icon">🐙</span>
          </div>
          <div className="channel-info">
            <span className="channel-label">GITHUB PROFILE</span>
            <span className="channel-value">{CONTACT_DATA.github}</span>
          </div>
          <span className="channel-arrow">↗</span>
        </a>

        <a
          href={CONTACT_DATA.linkedinUrl}
          target="_blank"
          rel="noreferrer"
          className="channel-card"
          title="Visit LinkedIn profile"
        >
          <div className="channel-icon-wrap">
            <span className="channel-icon">💼</span>
          </div>
          <div className="channel-info">
            <span className="channel-label">LINKEDIN PROFILE</span>
            <span className="channel-value">{CONTACT_DATA.linkedin}</span>
          </div>
          <span className="channel-arrow">↗</span>
        </a>
      </div>

      {/* Interactive Contact Form Box */}
      <div className="contact-form-container">
        <div className="form-container-header">
          <span className="form-header-badge">✦ SEND A MESSAGE</span>
          <h4 className="form-heading">Direct Inquiry Form</h4>
          <p className="form-subheading">
            Fill in the details below to test the validated message submission interface:
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  )
}
