// AI X-Ray Cursor Menu Injector - JAHmere Webb Mission
;(() => {
  function createXRayButton() {
    const btn = document.createElement('button')
    btn.innerHTML = '🔍 X-Ray'
    btn.title = 'AI X-Ray - Generate codebase map for AI context'
    btn.style.cssText = `
      position: fixed; top: 100px; right: 20px; z-index: 10000;
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      color: white; border: none; border-radius: 8px;
      padding: 8px 12px; font-size: 12px; font-weight: 600;
      cursor: pointer; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
      transition: all 0.2s ease;
    `
    
    btn.onmouseover = () => { btn.style.transform = 'scale(1.05)' }
    btn.onmouseout = () => { btn.style.transform = 'scale(1)' }
    
    btn.onclick = async () => {
      btn.innerHTML = '🔄 Mapping...'
      btn.disabled = true
      
      try {
        // Run AI X-Ray mapping
        const response = await fetch('/api/xray-map', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        })
        
        if (response.ok) {
          const result = await response.text()
          navigator.clipboard.writeText(result)
          btn.innerHTML = '✅ Copied!'
          alert('🔍 AI X-Ray mapping complete!\n\nCodebase summary copied to clipboard.\nPaste this into your AI chat for instant context.')
        } else {
          throw new Error('X-Ray mapping failed')
        }
      } catch (error) {
        btn.innerHTML = '❌ Error'
        alert('AI X-Ray error: ' + error.message + '\n\nTry running: npm run xray')
      }
      
      setTimeout(() => {
        btn.innerHTML = '🔍 X-Ray'
        btn.disabled = false
      }, 3000)
    }
    
    return btn
  }

  // Add X-Ray button to page
  function addXRayButton() {
    const existing = document.getElementById('xray-btn')
    if (existing) existing.remove()
    
    const btn = createXRayButton()
    btn.id = 'xray-btn'
    document.body.appendChild(btn)
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addXRayButton)
  } else {
    addXRayButton()
  }

  // Auto-re-inject if removed
  const observer = new MutationObserver(() => {
    if (!document.getElementById('xray-btn')) {
      addXRayButton()
    }
  })
  
  observer.observe(document.body, { childList: true, subtree: true })
  
  console.log('🔍 AI X-Ray button added! Click the blue button to generate codebase map.')
})() 