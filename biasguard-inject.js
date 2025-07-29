// BiasGuard Direct Inject - Paste in VS Code Console (F12)
;(() => {
  // Remove any existing BiasGuard button
  const existing = document.getElementById('biasguard-btn')
  if (existing) existing.remove()

  // Create floating BiasGuard button
  const btn = document.createElement('button')
  btn.id = 'biasguard-btn'
  btn.innerHTML = '🛡️ BiasGuard'
  btn.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 9999;
        background: #ff6b6b;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    `

  // BiasGuard analysis function
  function quickBias(text) {
    let score = 0
    const problems = []

    if (/phase \d+|roadmap|timeline|sprint|milestone/i.test(text)) {
      score += 30
      problems.push('Planning Fallacy')
    }
    if (/comprehensive|framework|system|enterprise|robust/i.test(text)) {
      score += 25
      problems.push('Feature Creep')
    }
    if (/standards|enforcement|approval|mandatory|required/i.test(text)) {
      score += 20
      problems.push('Authority Bias')
    }
    if (/obviously|clearly|simply|just|easily/i.test(text)) {
      score += 15
      problems.push('Assumption Bias')
    }

    const level = score < 30 ? '🟢 GOOD' : score < 60 ? '🟡 BIAS' : '🔴 FIX'
    return `[BiasGuard] ${level} (${Math.min(score, 100)}%)\n${problems.join(' | ')}`
  }

  // Button click handler
  btn.onclick = () => {
    const text = prompt('Enter text to analyze for bias:')
    if (!text) return

    const result = quickBias(text)

    // Copy to clipboard
    navigator.clipboard
      .writeText(result)
      .then(() => {
        alert('BiasGuard analysis copied to clipboard!\n\n' + result)
      })
      .catch(() => {
        alert('BiasGuard analysis:\n\n' + result + '\n\n(Copy manually)')
      })
  }

  // Add to page
  document.body.appendChild(btn)

  console.log('🛡️ BiasGuard button added! Click the red button in top-right corner.')
})()
