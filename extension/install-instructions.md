# Cursor BiasGuard Integration - Installation

## What This Does
When Cursor shows BiasGuard pings like "BiasGuard: MED" or "Bias Score: 70%", this automatically posts our enhanced analysis to the chat:

```
🛡️ BiasGuard Analysis
[BiasGuard] 🟡 BIAS (55%)
Planning Fallacy: Remove timeline language | Feature Creep: Simplify approach
```

## Installation Options

### Option 1: Browser Extension (Recommended)
1. Load `cursor-biasguard-integration.js` as browser extension
2. Enable in Cursor.ai web interface
3. Automatic activation on BiasGuard pings

### Option 2: Console Injection
1. Open Cursor.ai
2. Press F12 (Developer Tools)
3. Paste the entire `cursor-biasguard-integration.js` content
4. Press Enter
5. Integration activates immediately

### Option 3: User Script (Tampermonkey)
1. Install Tampermonkey browser extension
2. Create new user script
3. Copy `cursor-biasguard-integration.js` content
4. Set to run on cursor.sh domain

## How It Works
- **Detects** BiasGuard notification pings
- **Analyzes** the last AI response text
- **Posts** enhanced analysis to chat (only when bias detected)
- **Shows** visual notification if chat posting fails

## Features
- ✅ Only triggers on bias detection (not on GOOD responses)
- ✅ Shows pattern names and specific fixes
- ✅ Includes context window efficiency warnings
- ✅ Prevents duplicate analysis of same response
- ✅ Fallback notification if chat integration fails

## Testing
After installation, trigger a biased AI response in Cursor to see enhanced analysis appear automatically in chat. 