// BiasGuard Chat Button Injector - JAHmere Webb Mission Enhanced
;(() => {
  function findChatInput() {
    const selectors = ['textarea[placeholder*="message"]','textarea[placeholder*="chat"]','textarea[placeholder*="ask"]','div[contenteditable="true"]','.chat-input','.message-input','[data-testid*="chat"]','[role="textbox"]']
    for (const selector of selectors) {
      const element = document.querySelector(selector)
      if (element) return element
    }
    return null
  }
  
  function quickBias(text) {
    let score = 0
    const problems = []
    
    // 🎯 MISSION-CRITICAL PATTERNS (JAHmere Webb Project)
    if (/court.?date/i.test(text)) { 
      score += 35; problems.push('⏰ PRESSURE - Stay focused on deliverables') 
    }
    if (/perfect|ideal|comprehensive/i.test(text)) { 
      score += 30; problems.push('🎯 PERFECTIONISM - Ship functional over perfect') 
    }
    if (/refactor|rebuild|rewrite/i.test(text)) { 
      score += 40; problems.push('🚫 REWRITE TRAP - Improve existing, don\'t restart') 
    }
    
    // 🔧 TECHNICAL BIAS PATTERNS
    if (/roadm|timel|miles/i.test(text)) { score += 30; problems.push('📅 Planning Fallacy') }
    if (/compreh|framew|enterp/i.test(text)) { score += 25; problems.push('🏗️ Feature Creep') }
    if (/mandato/i.test(text)) { score += 20; problems.push('👑 Authority Bias') }
    if (/obvious|simpl|easil/i.test(text)) { score += 15; problems.push('🤔 Assumption Bias') }
    
    // 🎨 DESIGN SYSTEM PATTERNS
    if (/animation|transition|effect/i.test(text)) { 
      score += 20; problems.push('✨ ANIMATION TRAP - CSS-only, performance first') 
    }
    if (/component.?librar|ui.?kit/i.test(text)) { 
      score += 25; problems.push('📦 COMPONENT BLOAT - Use existing Tailwind patterns') 
    }
    
    // 🛡️ MISSION ALIGNMENT CHECK
    if (!/letter|witness|judge|freedom|support/i.test(text) && text.length > 100) {
      score += 15; problems.push('🎯 MISSION DRIFT - Does this serve JAHmere\'s case?')
    }
    
    const level = score < 30 ? '🟢 GOOD' : score < 60 ? '🟡 BIAS' : '🔴 FIX'
    const missionContext = problems.some(p => p.includes('⏰') || p.includes('🎯')) ? '\n🚨 MISSION-CRITICAL BIAS DETECTED' : ''
    
    return `[BiasGuard JAHmere] ${level} (${Math.min(score, 100)}%)\n${problems.join(' | ')}${missionContext}`
  }
  
  function createBiasGuardButton() {
    const btn = document.createElement('button')
    btn.innerHTML = '🛡️'
    btn.title = 'BiasGuard JAHmere - Mission-focused bias detection'
    btn.style.cssText = `background:linear-gradient(45deg,#2563eb,#7c3aed);color:white;border:none;border-radius:6px;padding:8px 12px;margin:0 5px;cursor:pointer;font-size:14px;font-weight:bold;box-shadow:0 4px 12px rgba(37,99,235,0.3);transition:all 0.2s;position:relative`
    
    // Mission indicator pulse
    const pulse = document.createElement('div')
    pulse.style.cssText = `position:absolute;top:-2px;right:-2px;width:8px;height:8px;background:#ea580c;border-radius:50%;animation:missionPulse 2s infinite`
    btn.appendChild(pulse)
    
    // Add pulse animation
    if (!document.getElementById('biasguard-styles')) {
      const style = document.createElement('style')
      style.id = 'biasguard-styles'
      style.textContent = `
        @keyframes missionPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `
      document.head.appendChild(style)
    }
    
    btn.onmouseover = () => { 
      btn.style.background = 'linear-gradient(45deg,#1d4ed8,#6d28d9)'
      btn.style.transform = 'translateY(-1px)'
    }
    btn.onmouseout = () => { 
      btn.style.background = 'linear-gradient(45deg,#2563eb,#7c3aed)'
      btn.style.transform = 'translateY(0)'
    }
    
    btn.onclick = () => {
      const text = prompt('🛡️ BiasGuard JAHmere Analysis\n\nEnter text to analyze for mission-critical bias patterns:')
      if (!text) return
      
      const result = quickBias(text)
      const chatInput = findChatInput()
      
      if (chatInput) {
        if (chatInput.tagName === 'TEXTAREA') {
          chatInput.value = result
          chatInput.dispatchEvent(new Event('input', { bubbles: true }))
        } else if (chatInput.contentEditable === 'true') {
          chatInput.textContent = result
          chatInput.dispatchEvent(new Event('input', { bubbles: true }))
        }
        chatInput.focus()
      } else {
        navigator.clipboard.writeText(result).then(() => {
          alert('🛡️ BiasGuard JAHmere Analysis copied to clipboard!\n\n' + result)
        })
      }
    }
    return btn
  }
  
  function addToChat() {
    const chatInput = findChatInput()
    if (!chatInput) { setTimeout(addToChat, 1000); return }
    const existing = document.getElementById('biasguard-chat-btn')
    if (existing) existing.remove()
    const btn = createBiasGuardButton()
    btn.id = 'biasguard-chat-btn'
    const parent = chatInput.parentElement
    if (parent) {
      const toolbar = parent.querySelector('[class*="toolbar"], [class*="button"], [class*="action"]')
      if (toolbar) { toolbar.appendChild(btn) } else { parent.insertBefore(btn, chatInput.nextSibling) }
    } else {
      btn.style.position = 'fixed'
      btn.style.bottom = '20px'
      btn.style.right = '20px'
      btn.style.zIndex = '9999'
      document.body.appendChild(btn)
    }
  }
  
  addToChat()
  const observer = new MutationObserver(() => { if (!document.getElementById('biasguard-chat-btn')) { addToChat() } })
  observer.observe(document.body, { childList: true, subtree: true })
})()
