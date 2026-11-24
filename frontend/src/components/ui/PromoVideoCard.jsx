import { useState } from 'react'

/**
 * Promotional Video Player & Showcase Component
 * Gracefully plays videos placed in public/videos/promo.mp4 or offers an embed mode.
 * Includes a fall-back placeholder state when the file is not yet dropped into the folder.
 */
export default function PromoVideoCard() {
  const [videoError, setVideoError] = useState(false)

  return (
    <div className="promo-video-container">
      <div className="promo-video-header">
        <span className="promo-badge">✦ PROMOTIONAL SHOWCASE</span>
        <h4 className="promo-title">Portfolio Showreel & Project Highlights</h4>
        <p className="promo-subtitle">
          Watch gameplay footage, 3D simulations, and my overall work.
        </p>
      </div>

      <div className="video-player-wrapper">
        {!videoError ? (
          <video
            className="portfolio-video"
            controls
            playsInline
            preload="metadata"
            onError={() => setVideoError(true)}
          >
            <source src="/videos/promo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="video-placeholder-state">
            <span className="placeholder-icon">🎬</span>
            <h5>Promotional Video Ready for Asset</h5>
            <p>
              Drop your final showreel or project teaser MP4 into:
              <br />
              <code>frontend/public/videos/promo.mp4</code>
            </p>
            <span className="placeholder-hint">
              Once added, the player will automatically stream your video here!
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
