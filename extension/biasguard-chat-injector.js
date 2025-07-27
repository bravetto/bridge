// BiasGuard Chat Injector - Simple & Pragmatic
// 1. Detects BiasGuard pings and auto-posts to chat
// 2. Allows manual text analysis via global function
// Dashboard: http://localhost:1437/bias-dashboard

// Enhanced BiasGuard analysis (inline)
function quickBiasCheck(text) {
  let score = 0;
  const problems = [];
  
  // Detect bias patterns
  if (/phase \d+|roadmap|timeline|sprint/i.test(text)) {
    score += 30;
    problems.push('Planning Fallacy: Remove timeline language');
  }
  if (/comprehensive|framework|system|enterprise/i.test(text)) {
    score += 25;
    problems.push('Feature Creep: Simplify approach');
  }
  if (/standards|enforcement|approval|mandatory/i.test(text)) {
    score += 20;
    problems.push('Authority Bias: Use normal language');
  }
  
  // Context penalties
  const words = text.split(' ').length;
  if (words > 200) {
    score += 20;
    problems.push('Context Waste: Shorten response');
  }
  
  // Generate output
  const level = score < 30 ? '🟢 GOOD' : score < 60 ? '🟡 BIAS' : '🔴 FIX';
  const contextWarning = words > 200 ? ' 📊 CONTEXT-HEAVY' : words > 100 ? ' 📈 CONTEXT-WATCH' : '';
  
  return `[BiasGuard] ${level} (${Math.min(score, 100)}%)${contextWarning}${problems.length ? '\n' + problems.join(' | ') : ''}`;
}

// Chat injection function
function postToChat(message) {
  // Method 1: Try chat input
  const chatInput = document.querySelector('textarea, input[type="text"]');
  if (chatInput) {
    chatInput.value = message;
    chatInput.focus();
    
    // Trigger input events
    chatInput.dispatchEvent(new Event('input', { bubbles: true }));
    chatInput.dispatchEvent(new Event('change', { bubbles: true }));
    
    // Try to find send button
    const sendBtn = document.querySelector('button[type="submit"], .send-button, button:contains("Send")');
    if (sendBtn) {
      setTimeout(() => sendBtn.click(), 100);
      return true;
    }
  }
  
  // Method 2: Show floating notification
  showNotification(message);
  return false;
}

function showNotification(message) {
  // Remove existing notification
  const existing = document.getElementById('biasguard-notification');
  if (existing) existing.remove();
  
  // Create notification
  const notification = document.createElement('div');
  notification.id = 'biasguard-notification';
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #2d2d2d;
    color: #fff;
    padding: 16px;
    border-radius: 8px;
    border-left: 4px solid #ff6b6b;
    font-family: 'SF Mono', Monaco, monospace;
    font-size: 13px;
    white-space: pre-wrap;
    z-index: 999999;
    max-width: 400px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    backdrop-filter: blur(10px);
    cursor: pointer;
  `;
  notification.textContent = message;
  
  // Click to copy
  notification.addEventListener('click', () => {
    navigator.clipboard.writeText(message);
    notification.style.background = '#2d5a2d';
    setTimeout(() => notification.remove(), 1000);
  });
  
  // Auto-remove
  setTimeout(() => {
    if (notification.parentNode) notification.remove();
  }, 8000);
  
  document.body.appendChild(notification);
}

// BiasGuard ping detection
function detectBiasGuardPings() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.textContent) {
          const text = node.textContent.toLowerCase();
          
          // Detect BiasGuard notifications
          if (text.includes('biasguard') && 
              (text.includes('med') || text.includes('high') || text.includes('bias score'))) {
            
            // Get last AI response for analysis
            setTimeout(() => {
              const lastResponse = getLastAIResponse();
              if (lastResponse && lastResponse.length > 50) {
                const analysis = quickBiasCheck(lastResponse);
                if (!analysis.includes('🟢 GOOD')) {
                  postToChat(analysis);
                }
              }
            }, 500);
          }
        }
      });
    });
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
}

function getLastAIResponse() {
  // Try multiple selectors for AI responses
  const selectors = [
    '.message-content',
    '.chat-message', 
    '.response-text',
    '[data-testid="message"]',
    '.prose'
  ];
  
  for (const selector of selectors) {
    const messages = document.querySelectorAll(selector);
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      const text = lastMessage.textContent || lastMessage.innerText;
      if (text && text.length > 50 && !text.includes('[BiasGuard]')) {
        return text;
      }
    }
  }
  
  return null;
}

// Global functions for manual use
window.analyzeBias = function(text) {
  if (!text) {
    // Try to get selected text or last AI response
    text = window.getSelection().toString() || getLastAIResponse();
  }
  
  if (!text) {
    showNotification('No text provided. Select text or pass as parameter.');
    return;
  }
  
  const analysis = quickBiasCheck(text);
  postToChat(analysis);
  return analysis;
};

window.checkLastResponse = function() {
  const lastResponse = getLastAIResponse();
  if (lastResponse) {
    return window.analyzeBias(lastResponse);
  } else {
    showNotification('No AI response found to analyze.');
  }
};

// Initialize
console.log('🛡️ BiasGuard Chat Injector loaded');
console.log('Usage: analyzeBias("your text") or checkLastResponse()');

// Start ping detection
detectBiasGuardPings();

// Add to global scope
window.BiasGuardInjector = {
  analyzeBias: window.analyzeBias,
  checkLastResponse: window.checkLastResponse,
  quickBiasCheck: quickBiasCheck
}; 