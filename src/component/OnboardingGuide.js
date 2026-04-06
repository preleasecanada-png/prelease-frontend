import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const STEPS_RENTER = [
  { key: 'profile', label: 'Complete your profile', desc: 'Add your name, photo, and contact info', link: '/account', icon: '👤' },
  { key: 'verify', label: 'Verify your identity', desc: 'Upload ID for trusted renter status', link: '/user-verification', icon: '✅' },
  { key: 'preferences', label: 'Set rental preferences', desc: 'Tell us what you\'re looking for', link: '/preferences', icon: '🎯' },
  { key: 'browse', label: 'Browse properties', desc: 'Explore available homes in your area', link: '/find-home', icon: '🏠' },
  { key: 'apply', label: 'Apply for a property', desc: 'Submit your first rental application', link: '/find-home', icon: '📝' },
]

const STEPS_HOST = [
  { key: 'profile', label: 'Complete your profile', desc: 'Add your name, photo, and contact info', link: '/account', icon: '👤' },
  { key: 'verify', label: 'Verify ownership', desc: 'Upload property ownership documents', link: '/user-verification', icon: '✅' },
  { key: 'list', label: 'List your first property', desc: 'Add photos, amenities, and pricing', link: '/properties', icon: '🏡' },
  { key: 'review', label: 'Review applications', desc: 'Check incoming rental applications', link: '/applications', icon: '📋' },
]

const TIPS = {
  '/find-home': { title: 'Search Tips', body: 'Use the filter panel to narrow results by price, amenities, dates, and more. Toggle amenity chips to find exactly what you need.' },
  '/properties': { title: 'Listing Tips', body: 'Add high-quality photos and detailed descriptions to attract more renters. Complete all fields for better visibility.' },
  '/applications': { title: 'Applications', body: 'Review applications promptly. Renters appreciate quick responses. Use the status tabs to manage your pipeline.' },
  '/leases': { title: 'Lease Management', body: 'Track all your active and past leases here. You can sign agreements and manage terms digitally.' },
  '/maintenance': { title: 'Maintenance', body: 'Submit requests with photos for faster resolution. Track progress with the status timeline.' },
  '/user-verification': { title: 'Verification', body: 'Verified accounts build trust. Complete all verification types to unlock the "Verified" badge on your profile.' },
}

const OnboardingGuide = () => {
  const router = useRouter()
  const [showWelcome, setShowWelcome] = useState(false)
  const [showChecklist, setShowChecklist] = useState(false)
  const [completedSteps, setCompletedSteps] = useState([])
  const [dismissed, setDismissed] = useState(false)
  const [role, setRole] = useState('')
  const [userName, setUserName] = useState('')
  const [tipDismissed, setTipDismissed] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    const r = localStorage.getItem('role') || ''
    const name = localStorage.getItem('user_name') || ''
    setRole(r)
    setUserName(name)

    const onboarded = localStorage.getItem('onboarding_complete')
    const welcomeSeen = localStorage.getItem('welcome_seen')
    const saved = localStorage.getItem('onboarding_steps')

    if (saved) {
      try { setCompletedSteps(JSON.parse(saved)) } catch { setCompletedSteps([]) }
    }

    if (!welcomeSeen) {
      setShowWelcome(true)
    }

    if (!onboarded) {
      setShowChecklist(true)
    }
  }, [])

  useEffect(() => {
    setTipDismissed(false)
  }, [router.pathname])

  const steps = role === 'host' ? STEPS_HOST : STEPS_RENTER
  const progress = Math.round((completedSteps.length / steps.length) * 100)

  const markComplete = (key) => {
    const updated = [...new Set([...completedSteps, key])]
    setCompletedSteps(updated)
    localStorage.setItem('onboarding_steps', JSON.stringify(updated))
    if (updated.length >= steps.length) {
      localStorage.setItem('onboarding_complete', '1')
    }
  }

  const dismissWelcome = () => {
    setShowWelcome(false)
    localStorage.setItem('welcome_seen', '1')
  }

  const dismissChecklist = () => {
    setDismissed(true)
    localStorage.setItem('onboarding_complete', '1')
  }

  const currentTip = TIPS[router.pathname]
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  if (!token) return null

  return (
    <>
      {/* Welcome Modal */}
      {showWelcome && (
        <div className="onb-overlay" onClick={dismissWelcome}>
          <div className="onb-welcome" onClick={e => e.stopPropagation()}>
            <div className="onb-welcome-header">
              <img src="/images/logo.svg" alt="Prelease" style={{ height: 32 }} onError={e => { e.target.style.display = 'none' }} />
              <button className="onb-close" onClick={dismissWelcome}>&times;</button>
            </div>
            <div className="onb-welcome-body">
              <div className="onb-welcome-emoji">🎉</div>
              <h2>Welcome{userName ? `, ${userName}` : ''}!</h2>
              <p>
                {role === 'host'
                  ? 'You\'re all set to start listing properties and finding great tenants on Prelease Canada.'
                  : 'You\'re all set to start finding your perfect home on Prelease Canada.'}
              </p>
              <div className="onb-welcome-features">
                {(role === 'host' ? [
                  { icon: '🏡', text: 'List your properties' },
                  { icon: '📋', text: 'Manage applications' },
                  { icon: '💰', text: 'Track payments & leases' },
                ] : [
                  { icon: '🔍', text: 'Browse verified properties' },
                  { icon: '📝', text: 'Apply with one click' },
                  { icon: '🛡️', text: 'Rental insurance included' },
                ]).map((f, i) => (
                  <div key={i} className="onb-feature">
                    <span className="onb-feature-icon">{f.icon}</span>
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>
              <button className="onb-cta" onClick={dismissWelcome}>Get Started</button>
            </div>
          </div>
        </div>
      )}

      {/* Getting Started Checklist */}
      {showChecklist && !dismissed && !showWelcome && completedSteps.length < steps.length && (
        <div className="onb-checklist">
          <div className="onb-checklist-header">
            <div>
              <strong>Getting Started</strong>
              <span className="onb-checklist-progress">{progress}%</span>
            </div>
            <button className="onb-close-sm" onClick={dismissChecklist}>&times;</button>
          </div>
          <div className="onb-progress-bar">
            <div className="onb-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="onb-steps">
            {steps.map(step => {
              const done = completedSteps.includes(step.key)
              return (
                <Link href={step.link} key={step.key} className={`onb-step ${done ? 'onb-step-done' : ''}`}
                  onClick={() => markComplete(step.key)}>
                  <span className="onb-step-icon">{done ? '✓' : step.icon}</span>
                  <div className="onb-step-text">
                    <span className="onb-step-label">{step.label}</span>
                    <span className="onb-step-desc">{step.desc}</span>
                  </div>
                </Link>
              )
            })}
          </div>
          <button className="onb-skip" onClick={dismissChecklist}>Skip setup</button>
        </div>
      )}

      {/* Contextual Tip */}
      {currentTip && !tipDismissed && !showWelcome && (
        <div className="onb-tip">
          <div className="onb-tip-icon">💡</div>
          <div className="onb-tip-content">
            <strong>{currentTip.title}</strong>
            <p>{currentTip.body}</p>
          </div>
          <button className="onb-tip-close" onClick={() => setTipDismissed(true)}>&times;</button>
        </div>
      )}
    </>
  )
}

export default OnboardingGuide
