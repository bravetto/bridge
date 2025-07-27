# 🛡️ BIASGUARD METHODOLOGY FRAMEWORK
**Standardized Bias Detection & Analysis System**

## 📋 ANALYSIS METHODOLOGY

### **BIAS DETECTION CRITERIA**
```typescript
interface BiasDetectionCriteria {
  evidenceQuality: 'strong' | 'moderate' | 'weak';
  severityThreshold: number;
  confidenceCalibration: boolean;
  alternativeExplanations: number; // minimum 2 required
}
```

#### **1. Evidence Quality Standards**
- **STRONG**: Multiple independent sources, verified through testing
- **MODERATE**: Single reliable source, partially verified
- **WEAK**: Assumptions, unverified claims, or single data points

#### **2. Severity Calibration Framework**
```markdown
HIGH SEVERITY: System-breaking issues, fundamental deceptions, safety risks
MODERATE SEVERITY: Process issues, documentation problems, methodology gaps  
LOW SEVERITY: Minor inconsistencies, optimization opportunities
```

#### **3. Confidence Matching Requirements**
- **Strong Claims** require **Strong Evidence**
- **Moderate Claims** require **Moderate Evidence**
- **Weak Claims** require **Weak Evidence**

---

## 🎯 BIAS PATTERN TAXONOMY

### **COGNITIVE BIAS PATTERNS**
1. **Confirmation Bias**: Seeking evidence that supports predetermined conclusions
2. **Severity Inflation**: Over-rating impact without proportional evidence
3. **Authority Simulation**: Fabricating expertise or credentials
4. **Binary Thinking**: False dichotomies, lack of nuanced assessment
5. **Complexity Inflation**: Over-engineering simple problems

### **EVIDENCE BIAS PATTERNS**
1. **Cherry Picking**: Selective evidence presentation
2. **False Correlation**: Assuming causation from correlation
3. **Sample Size Neglect**: Drawing conclusions from insufficient data
4. **Recency Bias**: Over-weighting recent information

### **ASSESSMENT BIAS PATTERNS**
1. **Anchoring Bias**: Over-reliance on first information received
2. **Overconfidence Bias**: Certainty without supporting evidence
3. **Availability Bias**: Judging by easily recalled examples
4. **Self-Serving Bias**: Favorable assessment of own capabilities

---

## 📊 SEVERITY CALIBRATION MATRIX

| Impact Level | Evidence Required | Confidence Threshold | Example |
|--------------|-------------------|---------------------|---------|
| **HIGH** | Multiple verified sources | >90% | System security breach |
| **MODERATE** | Single reliable source | 70-90% | Documentation error |
| **LOW** | Reasonable assumption | 50-70% | Style inconsistency |

### **Context-Aware Severity Adjustment**
```typescript
function calculateSeverity(
  baseImpact: Impact,
  context: DocumentContext,
  domain: TechnicalDomain
): SeverityLevel {
  let adjustedSeverity = baseImpact;
  
  // Reduce severity for documentation vs. system issues
  if (context.type === 'documentation') {
    adjustedSeverity = Math.max(1, adjustedSeverity - 1);
  }
  
  // Increase severity for safety-critical domains
  if (domain === 'safety-critical') {
    adjustedSeverity = Math.min(3, adjustedSeverity + 1);
  }
  
  return adjustedSeverity;
}
```

---

## 📝 STANDARDIZED OUTPUT TEMPLATE

### **BIASGUARD ANALYSIS REPORT**
```markdown
# 🛡️ BIASGUARD ANALYSIS REPORT
**Target**: [Document/Content Name]
**Analysis Date**: [Date]
**Confidence Level**: [High/Medium/Low] ([Evidence Quality])

## 🚨 BIAS PATTERNS DETECTED

### **[Bias Type] - [SEVERITY LEVEL]**
**Pattern**: [Description of detected pattern]
**Evidence**: [Specific examples with line numbers/quotes]
**Impact**: [Why this matters]
**Confidence**: [X%] ([Evidence quality justification])

## 📊 EVIDENCE ANALYSIS

### **Evidence Quality Assessment**
- **Strong Evidence**: [Count] instances
- **Moderate Evidence**: [Count] instances  
- **Weak Evidence**: [Count] instances

### **Alternative Explanations Considered**
1. [Alternative explanation 1]
2. [Alternative explanation 2]
3. [Selected explanation and rationale]

## 🎯 CORRECTED ASSESSMENT

### **Original vs. Corrected**
- **Original Claim**: [Original statement]
- **Corrected Claim**: [Revised statement]
- **Reasoning**: [Why correction was needed]

### **Confidence Calibration**
- **Original Confidence**: [X%]
- **Calibrated Confidence**: [Y%]
- **Adjustment Rationale**: [Evidence quality justification]

## 📋 RECOMMENDATIONS

### **Immediate Actions**
1. [Specific corrective action]
2. [Specific corrective action]

### **Process Improvements**
1. [Methodology enhancement]
2. [Prevention strategy]

## 🏆 FINAL VERDICT

**Overall Assessment**: [BIASED/MODERATE/UNBIASED]
**Primary Issues**: [Top 2-3 concerns]
**Confidence in Analysis**: [High/Medium/Low]
**Key Insight**: [Main takeaway]

---
**Analysis Conducted**: By AI Assistant using BIASGUARD methodology
**Methodology Version**: 1.0
**Next Review**: [If applicable]
```

---

## 🔍 QUALITY ASSURANCE CHECKLIST

### **Pre-Analysis Requirements**
- [ ] Document context identified (planning/current-state/aspirational)
- [ ] Evidence sources catalogued
- [ ] Alternative explanations brainstormed (minimum 2)
- [ ] Severity thresholds calibrated for domain

### **During Analysis**
- [ ] Each bias claim supported by specific evidence
- [ ] Confidence levels matched to evidence quality
- [ ] Alternative explanations considered and documented
- [ ] Severity ratings justified with impact assessment

### **Post-Analysis Validation**
- [ ] Evidence-claim matching verified
- [ ] Confidence calibration checked
- [ ] Recommendations are actionable
- [ ] Analysis methodology disclosed

---

## 🛠️ IMPLEMENTATION GUIDELINES

### **When to Apply BIASGUARD**
**Trigger Phrases**:
- "BIASGUARD analysis"
- "Check for bias"
- "Assess bias patterns"
- "Analyze for bias"
- "Use BIASGUARD"

### **Analysis Depth Levels**
1. **Quick Scan**: Pattern recognition only (30 seconds)
2. **Standard Analysis**: Full methodology application (2-3 minutes)
3. **Deep Dive**: Comprehensive review with alternatives (5+ minutes)

### **Confidence Calibration Rules**
```typescript
const confidenceRules = {
  multipleVerifiedSources: 'high',
  singleReliableSource: 'medium',
  reasonableAssumption: 'low',
  speculation: 'very-low'
};
```

---

## 📈 CONTINUOUS IMPROVEMENT

### **Learning Integration**
- Track correction accuracy over time
- Identify recurring bias patterns
- Refine severity thresholds based on outcomes
- Update taxonomy with new bias types discovered

### **Validation Metrics**
- **Accuracy**: How often corrections prove valid
- **Precision**: Ratio of true positives to total positives
- **Recall**: Ratio of detected biases to total biases present
- **Calibration**: Confidence levels vs. actual accuracy

---

**Framework Version**: 1.0
**Last Updated**: 2025-01-27
**Status**: ACTIVE - Ready for implementation
**Usage**: Apply when explicitly requested by user 