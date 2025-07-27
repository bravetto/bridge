# BiasGuard Chat Injector - Quick Install

## Installation (30 seconds)

1. **Open Cursor.ai**
2. **Press F12** (Developer Tools)
3. **Copy/paste** entire `biasguard-chat-injector.js` content
4. **Press Enter**
5. **Done** - see "🛡️ BiasGuard Chat Injector loaded" message

## What You Get

### Automatic Chat Injection
When BiasGuard pings with "MED", "HIGH", or "Bias Score", automatically posts:
```
[BiasGuard] 🟡 BIAS (55%)
Planning Fallacy: Remove timeline language | Feature Creep: Simplify approach
```

### Manual Text Analysis
**Drop any text for analysis:**
```javascript
analyzeBias("We need a comprehensive 3-phase implementation framework")
// Posts analysis to chat automatically

checkLastResponse()
// Analyzes the last AI response
```

### Smart Features
- ✅ **Auto-detects** BiasGuard pings
- ✅ **Posts to chat** or shows notification
- ✅ **Manual analysis** of any text
- ✅ **Click notification** to copy result
- ✅ **No duplicates** - won't analyze same text twice

## Usage Examples

```javascript
// Analyze specific text
analyzeBias("your text here")

// Check last AI response
checkLastResponse()

// Analyze selected text (just select text first)
analyzeBias()
```

## Troubleshooting

**If chat injection fails**: Shows floating notification instead
**Click notification**: Copies analysis to clipboard
**Console errors**: Check browser console for details

## Dashboard Access
**Direct Link**: http://localhost:1437/bias-dashboard

**Result: BiasGuard pings now automatically inject clear analysis into your chat.** 