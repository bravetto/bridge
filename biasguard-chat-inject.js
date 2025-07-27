// BiasGuard Chat Button Injector - Paste in Cursor Console
(function() {
    // Find the chat input area
    function findChatInput() {
        // Look for common chat input selectors
        const selectors = [
            'textarea[placeholder*="message"]',
            'textarea[placeholder*="chat"]',
            'textarea[placeholder*="ask"]',
            'div[contenteditable="true"]',
            '.chat-input',
            '.message-input',
            '[data-testid*="chat"]',
            '[role="textbox"]'
        ];
        
        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element) return element;
        }
        return null;
    }
    
    // BiasGuard analysis function
    function quickBias(text) {
        let score = 0;
        const problems = [];
        
        if (/phase \d+|roadmap|timeline|sprint|milestone/i.test(text)) {
            score += 30; problems.push('Planning Fallacy');
        }
        if (/comprehensive|framework|system|enterprise|robust/i.test(text)) {
            score += 25; problems.push('Feature Creep');
        }
        if (/standards|enforcement|approval|mandatory|required/i.test(text)) {
            score += 20; problems.push('Authority Bias');
        }
        if (/obviously|clearly|simply|just|easily/i.test(text)) {
            score += 15; problems.push('Assumption Bias');
        }
        
        const level = score < 30 ? '🟢 GOOD' : score < 60 ? '🟡 BIAS' : '🔴 FIX';
        return `[BiasGuard] ${level} (${Math.min(score, 100)}%)\n${problems.join(' | ')}`;
    }
    
    // Create BiasGuard button
    function createBiasGuardButton() {
        const btn = document.createElement('button');
        btn.innerHTML = '🛡️';
        btn.title = 'BiasGuard - Analyze text for bias';
        btn.style.cssText = `
            background: #ff6b6b;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 8px 12px;
            margin: 0 5px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            transition: background 0.2s;
        `;
        
        btn.onmouseover = () => btn.style.background = '#ff5252';
        btn.onmouseout = () => btn.style.background = '#ff6b6b';
        
        btn.onclick = function() {
            const text = prompt('Enter text to analyze for bias:');
            if (!text) return;
            
            const result = quickBias(text);
            
            // Try to insert into chat input
            const chatInput = findChatInput();
            if (chatInput) {
                if (chatInput.tagName === 'TEXTAREA') {
                    chatInput.value = result;
                    chatInput.dispatchEvent(new Event('input', { bubbles: true }));
                } else if (chatInput.contentEditable === 'true') {
                    chatInput.textContent = result;
                    chatInput.dispatchEvent(new Event('input', { bubbles: true }));
                }
                chatInput.focus();
            } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(result).then(() => {
                    alert('BiasGuard analysis copied to clipboard!\n\n' + result);
                });
            }
        };
        
        return btn;
    }
    
    // Try to add button to chat interface
    function addToChat() {
        const chatInput = findChatInput();
        if (!chatInput) {
            console.log('Chat input not found, trying again in 1 second...');
            setTimeout(addToChat, 1000);
            return;
        }
        
        // Remove existing button
        const existing = document.getElementById('biasguard-chat-btn');
        if (existing) existing.remove();
        
        const btn = createBiasGuardButton();
        btn.id = 'biasguard-chat-btn';
        
        // Try to find a good place to insert the button
        const parent = chatInput.parentElement;
        if (parent) {
            // Look for button containers or toolbar areas
            const toolbar = parent.querySelector('[class*="toolbar"], [class*="button"], [class*="action"]');
            if (toolbar) {
                toolbar.appendChild(btn);
            } else {
                // Insert after the input
                parent.insertBefore(btn, chatInput.nextSibling);
            }
            console.log('🛡️ BiasGuard button added to chat interface!');
        } else {
            // Fallback: add as floating button near chat
            btn.style.position = 'fixed';
            btn.style.bottom = '20px';
            btn.style.right = '20px';
            btn.style.zIndex = '9999';
            document.body.appendChild(btn);
            console.log('🛡️ BiasGuard button added as floating button!');
        }
    }
    
    // Start the injection
    addToChat();
    
    // Also watch for DOM changes in case chat interface loads later
    const observer = new MutationObserver(() => {
        if (!document.getElementById('biasguard-chat-btn')) {
            addToChat();
        }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    console.log('🛡️ BiasGuard Chat Injector loaded!');
})(); 