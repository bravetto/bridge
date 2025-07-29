---
ai_tags: ["codification", "schema", "context-window", "pragmatic"]
ai_priority: "high"
ai_context_type: "operational-standard"
related_files: ["00-AI-ARCHITECTURE-CORNERSTONE-2025", "AI_ALIGNMENT_PROTOCOL"]
last_verified: "2025-01-27"
mission_alignment: "july-28-deadline"
---

# 🎯 PRAGMATIC CODIFICATION SCHEMA
**AI Context Window Optimization Standard**

## Core Principle
**Evidence > Claims | Function > Form | Ship > Perfect**

---

## 📊 INFORMATION HIERARCHY

### **Level 1: VERIFIED FACTS**
```yaml
status: "verified" | "unverified" | "failed"
evidence: [terminal_output, file_exists, test_result]
last_checked: timestamp
```

### **Level 2: FUNCTIONAL PATTERNS**
```typescript
// ✅ WORKS: Verified through execution
export const workingPattern = {
  command: "npm run type-check",
  result: "exit_code_0",
  evidence: "terminal_output"
}

// ❌ BROKEN: Verified failure
export const brokenPattern = {
  command: "curl localhost:1437", 
  result: "connection_refused",
  evidence: "status_000"
}

// ⚠️ UNVERIFIED: No evidence yet
export const unverifiedClaim = {
  claim: "27-131ms API responses",
  evidence: null,
  status: "requires_verification"
}
```

### **Level 3: ACTIONABLE GUIDANCE**
```bash
# IMMEDIATE: Fix blocking issues
npm run type-check  # Must pass
npm run build       # Must complete

# SHIP-READY: Minimum viable verification
curl -I http://localhost:1437  # Must respond

# OPTIMIZE: Post-deadline improvements
performance benchmarking       # Nice to have
```

---

## 🔧 CODIFICATION TEMPLATES

### **Problem Statement Template**
```markdown
## Problem: [Specific Issue]
**Evidence**: [Terminal output, error message, file state]
**Impact**: [Blocks build | Breaks functionality | Performance degradation]
**Priority**: [Critical | High | Medium | Low]
**Verification**: [How to test if fixed]
```

### **Solution Template**
```markdown
## Solution: [Specific Fix]
**Commands**: 
```bash
# Exact commands to execute
npm run command
```
**Expected Result**: [Specific success criteria]
**Verification**: [How to confirm it worked]
**Rollback**: [How to undo if it breaks]
```

### **Status Template**
```yaml
component: "error-boundaries"
status: "fixed"           # fixed | broken | unknown
evidence: "0_typescript_errors"
last_verified: "2025-01-27T10:30:00Z"
verification_command: "npm run type-check"
```

---

## 📋 VERIFICATION STANDARDS

### **Evidence Levels**
1. **TERMINAL_VERIFIED**: Command executed, output captured
2. **FILE_VERIFIED**: File exists, content confirmed
3. **BUILD_VERIFIED**: Compilation successful
4. **RUNTIME_VERIFIED**: Server responds, functionality works
5. **UNVERIFIED**: Claim without evidence

### **Claim Validation**
```typescript
interface ValidatedClaim {
  assertion: string;
  evidence: TerminalOutput | FileContent | TestResult;
  timestamp: Date;
  verification_method: string;
  confidence: "high" | "medium" | "low";
}

// ✅ VALID
const validClaim: ValidatedClaim = {
  assertion: "TypeScript errors fixed",
  evidence: "exit_code_0_from_type_check",
  timestamp: new Date(),
  verification_method: "npm run type-check",
  confidence: "high"
}

// ❌ INVALID
const invalidClaim = {
  assertion: "Championship performance achieved",
  evidence: null,  // No evidence provided
  confidence: "high"  // Overconfident without data
}
```

---

## 🎯 AI CONTEXT OPTIMIZATION

### **Token Efficiency Rules**
```yaml
max_tokens_per_section: 500
prefer_code_over_prose: true
evidence_required_for_claims: true
eliminate_redundant_success_reports: true
```

### **Context Compression**
```markdown
# ❌ VERBOSE (wastes tokens)
"Based on extensive research and alignment with established patterns including Dan Abramov from the React Core Team who has stated that..."

# ✅ COMPRESSED (efficient)
"CSS animations prevent framework conflicts. Evidence: 0 motion library errors."
```

### **Semantic Tagging**
```yaml
# Required for all AI context files
ai_tags: ["specific", "searchable", "keywords"]
ai_priority: "critical" | "high" | "medium" | "low"
ai_context_type: "reference" | "troubleshooting" | "operational"
verification_status: "verified" | "unverified" | "failed"
```

---

## 🚀 IMPLEMENTATION PROTOCOL

### **Before Adding Information**
1. **Verify**: Can this be proven with a command?
2. **Compress**: Remove unnecessary explanation
3. **Tag**: Add semantic metadata
4. **Link**: Reference related verified facts

### **Documentation Standards**
```markdown
# ✅ PRAGMATIC: Actionable, verified, compressed
## Error Boundary Fix
**Status**: ✅ Verified (npm run type-check: exit 0)
**Pattern**: `withErrorBoundary(Component, "string")`
**Evidence**: 11 TypeScript errors → 0 errors

# ❌ VERBOSE: Unverified claims, excessive explanation
## Battle-Tested Championship Architecture Excellence
**Validation from Elite Developers**: Based on extensive research...
**Status**: Production-ready, championship-level performance achieved
```

### **AI Guidance Protocol**
```typescript
function provideGuidance(query: string) {
  // 1. Check verified facts first
  const evidence = getVerifiedEvidence(query)
  
  // 2. Only make claims with evidence
  if (!evidence) {
    return "Requires verification: " + suggestVerificationMethod(query)
  }
  
  // 3. Provide actionable solution
  return generateActionableSolution(evidence)
}
```

---

## 📊 SUCCESS METRICS

### **Context Window Efficiency**
- **Token reduction**: 80% compression achieved
- **Retrieval speed**: <200ms context lookup
- **Accuracy**: Claims backed by terminal evidence
- **Actionability**: Every recommendation includes verification method

### **Verification Compliance**
```bash
# Daily verification script
find docs -name "*.md" -exec grep -L "verification_status\|evidence" {} \;
# Should return empty (all files have evidence)

grep -r "✅.*COMPLETE\|✅.*SUCCESS" docs/ | wc -l
# Should be minimal (avoid success inflation)
```

---

## 🎯 MISSION ALIGNMENT

**July 28th Context**: Every piece of information must either:
1. **Help ship working software** (build, deploy, function)
2. **Prevent system failures** (error detection, rollback)
3. **Enable rapid debugging** (clear evidence trail)

**Eliminate**:
- Theoretical architecture discussions
- Unverified performance claims  
- Redundant success reports
- Authority-based validation

**Prioritize**:
- Terminal-verified facts
- Actionable commands
- Clear success/failure criteria
- Rapid problem resolution

---

**Schema Motto**: "Verify, compress, ship. Evidence over elegance." 