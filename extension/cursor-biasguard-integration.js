// Cursor.ai BiasGuard Integration v1.0
// Enhanced with Methodology Framework for better accuracy and reporting

// Import our enhanced BiasGuard v1.0
const { biasGuardV1 } = require('../src/agents/bias-detection/biasguard-methodology-v1.ts');

class CursorBiasGuardIntegration {
  constructor() {
    this.isEnabled = true;
    this.lastAnalyzedText = '';
    this.methodologyVersion = '1.0';
    this.init();
  }

  init() {
    console.log(`🛡️ BiasGuard v${this.methodologyVersion} initialized`);
    // Listen for Cursor BiasGuard notifications
    this.observeNotifications();
    // Hook into AI response completion
    this.hookAIResponses();
    // Add manual analysis button listener
    this.setupManualAnalysis();
  }

  setupManualAnalysis() {
    // Listen for "Analyze Current Text" button clicks
    document.addEventListener('click', (event) => {
      if (this.isAnalyzeButton(event.target)) {
        this.handleManualAnalysis();
      }
    });

    // Listen for keyboard shortcut (Ctrl/Cmd + Shift + B)
    document.addEventListener('keydown', (event) => {
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'B') {
        event.preventDefault();
        this.handleManualAnalysis();
      }
    });
  }

  isAnalyzeButton(element) {
    if (!element) return false;
    const text = element.textContent?.toLowerCase() || '';
    return text.includes('analyze current text') || 
           text.includes('analyze') && element.tagName === 'BUTTON';
  }

  async handleManualAnalysis() {
    try {
      // Get selected text or current conversation
      const selectedText = this.getSelectedText();
      const conversationContext = this.getCurrentConversationContext();
      
      if (!selectedText && !conversationContext) {
        this.showNotification('⚠️ No text selected or conversation found for analysis', 'warning');
        return;
      }

      this.showNotification('🔍 Analyzing with BiasGuard v1.0...', 'info');

      // Run enhanced analysis
      const result = await biasGuardV1.analyzeWithMethodology({
        aiResponse: selectedText || conversationContext.lastAIResponse,
        userPrompt: conversationContext.lastUserPrompt,
        conversationHistory: conversationContext.history
      });

      // Display enhanced results
      this.displayEnhancedResults(result);

    } catch (error) {
      console.error('BiasGuard analysis failed:', error);
      this.showNotification('❌ Analysis failed. Check console for details.', 'error');
    }
  }

  getSelectedText() {
    const selection = window.getSelection();
    return selection.toString().trim();
  }

  getCurrentConversationContext() {
    // Extract conversation context from Cursor chat
    const messages = this.extractChatMessages();
    
    if (messages.length === 0) return null;

    return {
      lastAIResponse: messages[messages.length - 1]?.text || '',
      lastUserPrompt: messages[messages.length - 2]?.text || '',
      history: messages.slice(-10).map(m => `${m.type}: ${m.text}`)
    };
  }

  extractChatMessages() {
    // Try multiple selectors to find chat messages
    const selectors = [
      '.message-content',
      '.chat-message',
      '.conversation-message',
      '[data-testid="message"]'
    ];

    const messages = [];
    
    for (const selector of selectors) {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        elements.forEach((el, index) => {
          messages.push({
            type: index % 2 === 0 ? 'USER' : 'AI',
            text: el.textContent?.trim() || ''
          });
        });
        break;
      }
    }

    return messages.filter(m => m.text.length > 0);
  }

  async displayEnhancedResults(result) {
    // Create enhanced notification with methodology v1.0 format
    const formattedResult = biasGuardV1.getMethodologyFormattedResult(result);
    
    // Show main notification
    this.showNotification(formattedResult, this.getNotificationType(result.biasScore));

    // Show detailed analysis if bias detected
    if (result.biasScore > 0.3) {
      setTimeout(() => {
        this.showDetailedAnalysis(result);
      }, 1000);
    }

    // Update status indicator
    this.updateStatusIndicator(result);
  }

  showDetailedAnalysis(result) {
    const { structuredReport, patterns, evidenceQuality } = result;
    
    const detailedHtml = `
      <div class="biasguard-detailed-analysis">
        <h3>🛡️ BiasGuard v1.0 Detailed Analysis</h3>
        
        <div class="analysis-summary">
          <strong>Target:</strong> ${structuredReport.target}<br>
          <strong>Evidence Quality:</strong> ${evidenceQuality.toUpperCase()}<br>
          <strong>Overall Assessment:</strong> ${structuredReport.finalVerdict.overallAssessment}
        </div>

        ${patterns.length > 0 ? `
          <div class="detected-patterns">
            <h4>🚨 Detected Patterns:</h4>
            ${patterns.map(p => `
              <div class="pattern-item">
                <strong>${p.type}:</strong> ${p.description}<br>
                <em>Intervention:</em> ${p.intervention}
              </div>
            `).join('')}
          </div>
        ` : ''}

        <div class="evidence-analysis">
          <h4>📊 Evidence Analysis:</h4>
          Strong: ${structuredReport.evidenceAnalysis.strongEvidence} | 
          Moderate: ${structuredReport.evidenceAnalysis.moderateEvidence} | 
          Weak: ${structuredReport.evidenceAnalysis.weakEvidence}
        </div>

        <div class="key-insight">
          <h4>💡 Key Insight:</h4>
          ${structuredReport.finalVerdict.keyInsight}
        </div>
      </div>
    `;

    this.showCustomNotification(detailedHtml, 'detailed', 15000);
  }

  getNotificationType(biasScore) {
    if (biasScore < 0.3) return 'success';
    if (biasScore < 0.6) return 'warning';
    return 'error';
  }

  updateStatusIndicator(result) {
    // Update any status indicators in the UI
    const statusElements = document.querySelectorAll('.biasguard-status, #biasguard-indicator');
    const level = result.biasScore < 0.3 ? 'LOW' : result.biasScore < 0.6 ? 'MED' : 'HIGH';
    const color = result.biasScore < 0.3 ? '#22c55e' : result.biasScore < 0.6 ? '#eab308' : '#ef4444';
    
    statusElements.forEach(el => {
      el.textContent = level;
      el.style.color = color;
    });
  }

  // Enhanced notification system
  showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `biasguard-notification biasguard-${type}`;
    
    const colors = {
      success: '#22c55e',
      warning: '#eab308', 
      error: '#ef4444',
      info: '#3b82f6'
    };

    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #1a1a1a;
      color: #fff;
      padding: 12px 16px;
      border-radius: 8px;
      border-left: 4px solid ${colors[type]};
      font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
      font-size: 12px;
      white-space: pre-wrap;
      z-index: 10000;
      max-width: 400px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      animation: slideInRight 0.3s ease-out;
    `;

    notification.textContent = message;
    
    // Auto-remove
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 300);
      }
    }, duration);
    
    // Click to dismiss
    notification.addEventListener('click', () => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    });
    
    document.body.appendChild(notification);
  }

  showCustomNotification(htmlContent, className = '', duration = 10000) {
    const notification = document.createElement('div');
    notification.className = `biasguard-notification ${className}`;
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #1a1a1a;
      color: #fff;
      padding: 16px;
      border-radius: 8px;
      border-left: 4px solid #3b82f6;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 13px;
      z-index: 10000;
      max-width: 500px;
      max-height: 400px;
      overflow-y: auto;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;

    notification.innerHTML = htmlContent;
    
    // Auto-remove
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, duration);
    
    // Click to dismiss
    notification.addEventListener('click', () => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    });
    
    document.body.appendChild(notification);
  }

  // Legacy methods for compatibility
  observeNotifications() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (this.isBiasGuardNotification(node)) {
            this.handleBiasGuardPing(node);
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  isBiasGuardNotification(node) {
    if (!node.textContent) return false;
    const text = node.textContent.toLowerCase();
    return text.includes('biasguard') && 
           (text.includes('low') || text.includes('med') || text.includes('high'));
  }

  hookAIResponses() {
    window.addEventListener('ai-response-complete', (event) => {
      if (event.detail && event.detail.text) {
        this.analyzeResponse(event.detail.text);
      }
    });

    this.monitorChatUpdates();
  }

  monitorChatUpdates() {
    const chatObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (this.isAIResponse(node)) {
            const text = this.extractResponseText(node);
            if (text && text !== this.lastAnalyzedText) {
              this.analyzeResponse(text);
            }
          }
        });
      });
    });

    const chatContainer = this.findChatContainer();
    if (chatContainer) {
      chatObserver.observe(chatContainer, {
        childList: true,
        subtree: true
      });
    }
  }

  async analyzeResponse(responseText) {
    if (!responseText || responseText === this.lastAnalyzedText) return;
    
    this.lastAnalyzedText = responseText;
    
    try {
      // Use enhanced methodology v1.0
      const result = await biasGuardV1.analyzeWithMethodology({
        aiResponse: responseText
      });
      
      // Only show notification if bias detected (user preference)
      if (result.biasScore > 0.3) {
        const formattedResult = biasGuardV1.getMethodologyFormattedResult(result);
        this.showNotification(formattedResult, this.getNotificationType(result.biasScore));
      }
    } catch (error) {
      console.error('BiasGuard auto-analysis failed:', error);
    }
  }

  // Helper methods
  findChatContainer() {
    const selectors = [
      '.chat-container',
      '.messages-container', 
      '[data-testid="chat"]',
      '.conversation-container'
    ];
    
    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element) return element;
    }
    return document.body;
  }

  isAIResponse(node) {
    if (!node.textContent) return false;
    const text = node.textContent;
    return text.length > 50 && !text.includes('[BiasGuard]');
  }

  extractResponseText(node) {
    return node.textContent || '';
  }

  handleBiasGuardPing(notificationNode) {
    const lastResponse = this.getLastAIResponse();
    if (lastResponse) {
      this.analyzeResponse(lastResponse);
    }
  }

  getLastAIResponse() {
    const responses = document.querySelectorAll('.message, .chat-message, .response');
    if (responses.length > 0) {
      const lastResponse = responses[responses.length - 1];
      return lastResponse.textContent;
    }
    return null;
  }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  
  .biasguard-detailed-analysis {
    line-height: 1.4;
  }
  
  .biasguard-detailed-analysis h3, .biasguard-detailed-analysis h4 {
    margin: 0 0 8px 0;
    color: #60a5fa;
  }
  
  .analysis-summary, .detected-patterns, .evidence-analysis, .key-insight {
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid #374151;
  }
  
  .pattern-item {
    margin-bottom: 8px;
    padding-left: 12px;
    border-left: 2px solid #ef4444;
  }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new CursorBiasGuardIntegration();
  });
} else {
  new CursorBiasGuardIntegration();
}

// Export for manual initialization
window.CursorBiasGuardIntegration = CursorBiasGuardIntegration; 