// Simple BiasGuard - Clear Visual Output + Context Protection
function checkBias(text) {
  const score = getBiasScore(text);
  const level = getLevel(score);
  const issues = getIssues(text);
  const contextWarning = checkContextEfficiency(text);
  
  return `[BiasGuard] ${level} (${score}%)${contextWarning}${issues ? '\n' + issues : ''}`;
}

function checkContextEfficiency(text) {
  const words = text.split(' ').length;
  if (words > 200) return ' 📊 CONTEXT-HEAVY';
  if (words > 100) return ' 📈 CONTEXT-WATCH';
  return '';
}

function getBiasScore(text) {
  let score = 0;
  if (text.includes('phase') || text.includes('roadmap')) score += 30;
  if (text.includes('comprehensive') || text.includes('framework')) score += 25;
  if (text.includes('standards') || text.includes('enforcement')) score += 20;
  
  // Context window penalties
  const words = text.split(' ').length;
  if (words > 200) score += 20; // Penalize context waste
  if (words > 300) score += 30; // Heavy penalty for bloat
  
  return Math.min(score, 100);
}

function getLevel(score) {
  if (score < 30) return '🟢 GOOD';
  if (score < 60) return '🟡 BIAS';
  return '🔴 FIX';
}

function getIssues(text) {
  const problems = [];
  if (text.includes('phase') || text.includes('roadmap')) problems.push('Planning Fallacy: Remove timeline language');
  if (text.includes('comprehensive') || text.includes('framework')) problems.push('Feature Creep: Simplify approach');
  if (text.includes('standards') || text.includes('enforcement')) problems.push('Authority Bias: Use normal language');
  
  // Context efficiency issues
  const words = text.split(' ').length;
  if (words > 200) problems.push('Context Waste: Shorten response');
  
  return problems.join(' | ');
}

// AI Drift Detection
let responseHistory = [];
function trackDrift(text) {
  const words = text.split(' ').length;
  responseHistory.push(words);
  if (responseHistory.length > 5) responseHistory.shift();
  
  if (responseHistory.length >= 3) {
    const avgLength = responseHistory.reduce((a,b) => a+b) / responseHistory.length;
    if (avgLength > 150) return '[DRIFT] Responses getting longer';
  }
  return '';
}

// Enhanced check with drift detection
function fullCheck(text) {
  const biasResult = checkBias(text);
  const driftWarning = trackDrift(text);
  return biasResult + (driftWarning ? '\n⚠️ ' + driftWarning : '');
}

// Test
console.log('TEST: Short response');
console.log(fullCheck("Use the simple approach"));

console.log('\nTEST: Medium response');
console.log(fullCheck("We need a comprehensive 3-phase framework with multiple stakeholders and implementation phases"));

console.log('\nTEST: Long response (context waste)');
const longText = "We need a comprehensive implementation framework with multiple phases and enterprise standards that will require extensive documentation and complex automation systems with real-time monitoring dashboards and analytics capabilities for tracking user engagement metrics and performance optimization across multiple deployment environments with automated testing and validation protocols that ensure compliance with industry best practices and regulatory requirements while maintaining scalability and performance optimization.";
console.log(fullCheck(longText));

console.log('\nTEST: Drift detection (multiple long responses)');
console.log(fullCheck("Another comprehensive enterprise solution with extensive documentation and complex implementation phases requiring multiple stakeholder coordination and advanced monitoring capabilities."));
console.log(fullCheck("Yet another comprehensive framework requiring extensive planning and implementation with multiple phases and enterprise-grade solutions.")); 