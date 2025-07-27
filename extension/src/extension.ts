/**
 * 🎯 BIASGUARD CURSOR EXTENSION - ENHANCED VERSION
 * Real-time bias detection with enhanced analysis and chat integration
 */

import * as vscode from 'vscode';

// Enhanced bias patterns from web interface
const BIAS_PATTERNS = {
  'planning-fallacy': ['phase', 'roadmap', 'timeline', 'sprint', 'milestone'],
  'feature-creep': ['comprehensive', 'framework', 'system', 'enterprise', 'robust'],
  'authority-bias': ['standards', 'enforcement', 'approval', 'mandatory', 'required'],
  'assumption-bias': ['obviously', 'clearly', 'simply', 'just', 'easily'],
  'directive-bias': ['should', 'must', 'need to', 'have to', 'required']
};

interface EnhancedBiasResult {
  level: string;
  score: number;
  issues: string[];
  contextWarning?: string;
  formatted: string;
}

interface SimpleBiasResult {
  hasBias: boolean;
  biasScore: number;
  detectedPatterns: string[];
  suggestions: string[];
}

let outputChannel: vscode.OutputChannel;
let statusBarItem: vscode.StatusBarItem;
let webviewPanel: vscode.WebviewPanel | undefined;

export function activate(context: vscode.ExtensionContext) {
  console.log('🛡️ BiasGuard Extension Activated');

  // Initialize output channel
  outputChannel = vscode.window.createOutputChannel('BiasGuard');
  
  // Initialize status bar
  statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  statusBarItem.text = '🛡️ BiasGuard';
  statusBarItem.tooltip = 'BiasGuard: AI Bias Detection Active';
  statusBarItem.show();

  // Register commands
  registerCommands(context);
  
  // Start monitoring if enabled
  startBiasMonitoring(context);

  context.subscriptions.push(outputChannel, statusBarItem);
}

function registerCommands(context: vscode.ExtensionContext) {
  // Toggle overlay command
  const toggleOverlay = vscode.commands.registerCommand('biasguard.toggleOverlay', () => {
    if (webviewPanel) {
      webviewPanel.dispose();
      webviewPanel = undefined;
    } else {
      showBiasOverlay(context);
    }
  });

  // Open dashboard command
  const openDashboard = vscode.commands.registerCommand('biasguard.openDashboard', () => {
    const config = vscode.workspace.getConfiguration('biasguard');
    const dashboardUrl = config.get<string>('dashboardUrl', 'http://localhost:1437/bias-dashboard');
    vscode.env.openExternal(vscode.Uri.parse(dashboardUrl));
  });

  // Enhanced analyze conversation command
  const analyzeConversation = vscode.commands.registerCommand('biasguard.analyzeConversation', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage('No active editor found');
      return;
    }

    const selectedText = editor.document.getText(editor.selection);
    const textToAnalyze = selectedText || editor.document.getText();

    if (!textToAnalyze.trim()) {
      vscode.window.showWarningMessage('No text to analyze');
      return;
    }

    // Use enhanced bias analysis
    const result = enhancedBiasCheck(textToAnalyze);
    
    // Show result based on severity
    if (result.score >= 30) {
      // Create temporary document for detailed analysis
      const doc = await vscode.workspace.openTextDocument({
        content: `BiasGuard Analysis Results\n${'='.repeat(50)}\n\n${result.formatted}\n\nAnalyzed Text:\n${'-'.repeat(20)}\n${textToAnalyze}`,
        language: 'text'
      });
      await vscode.window.showTextDocument(doc, { preview: true });
      
      // Also show notification
      vscode.window.showWarningMessage(
        `BiasGuard: ${result.level} (${result.score}%) - Check analysis document`,
        'View Details'
      ).then(selection => {
        if (selection === 'View Details') {
          vscode.window.showTextDocument(doc);
        }
      });
    } else {
      // Simple notification for good results
      vscode.window.showInformationMessage(result.formatted);
    }

    // Update status bar
    updateStatusBar({
      hasBias: result.score >= 30,
      biasScore: result.score / 100,
      detectedPatterns: result.issues,
      suggestions: result.issues
    });
  });

  // Reset detection command
  const resetDetection = vscode.commands.registerCommand('biasguard.resetDetection', () => {
    outputChannel.appendLine('Bias detection reset');
    vscode.window.showInformationMessage('BiasGuard detection reset');
    updateStatusBar({ hasBias: false, biasScore: 0, detectedPatterns: [], suggestions: [] });
  });

  context.subscriptions.push(toggleOverlay, openDashboard, analyzeConversation, resetDetection);
}

/**
 * Enhanced bias detection function (matches web interface)
 */
function enhancedBiasCheck(text: string): EnhancedBiasResult {
  let score = 0;
  const problems: string[] = [];
  
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
  if (/obviously|clearly|simply|just|easily/i.test(text)) {
    score += 15;
    problems.push('Assumption Bias: Avoid absolute language');
  }
  if (/should|must|need to|have to/i.test(text)) {
    score += 10;
    problems.push('Directive Bias: Use suggestion language');
  }
  
  // Context penalties
  const words = text.split(' ').length;
  let contextWarning = '';
  if (words > 200) {
    score += 20;
    problems.push('Context Waste: Shorten response');
    contextWarning = '📊 CONTEXT-HEAVY';
  } else if (words > 100) {
    contextWarning = '📈 CONTEXT-WATCH';
  }
  
  // Generate level
  const level = score < 30 ? '🟢 GOOD' : score < 60 ? '🟡 BIAS' : '🔴 FIX';
  
  const formatted = `[BiasGuard] ${level} (${Math.min(score, 100)}%)${contextWarning ? ' ' + contextWarning : ''}${problems.length ? '\n' + problems.join(' | ') : ''}`;
  
  return {
    level,
    score: Math.min(score, 100),
    issues: problems,
    contextWarning,
    formatted
  };
}

/**
 * Start bias monitoring for AI interactions
 */
function startBiasMonitoring(context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration('biasguard');

  if (!config.get<boolean>('enabled', true)) {
    return;
  }

  // Monitor document changes for AI-generated content
  const documentChangeListener = vscode.workspace.onDidChangeTextDocument(async (event: vscode.TextDocumentChangeEvent) => {
    if (event.contentChanges.length === 0) return;

    // Detect if this might be AI-generated content (heuristic)
    const change = event.contentChanges[0];
    if (change.text.length > 50) { // Significant text addition
      const result = enhancedBiasCheck(change.text);
      
      if (result.score >= 60) { // High bias threshold for auto-detection
        updateStatusBar({
          hasBias: true,
          biasScore: result.score / 100,
          detectedPatterns: result.issues,
          suggestions: result.issues
        });
        
        // Show subtle notification
        vscode.window.showWarningMessage(
          `BiasGuard: ${result.level} detected in recent changes`,
          'Analyze'
        ).then(selection => {
          if (selection === 'Analyze') {
            vscode.commands.executeCommand('biasguard.analyzeConversation');
          }
        });
      }
    }
  });

  context.subscriptions.push(documentChangeListener);
}

/**
 * Update status bar with bias information
 */
function updateStatusBar(result: SimpleBiasResult) {
  if (result.hasBias) {
    statusBarItem.text = `🚨 BiasGuard (${Math.round(result.biasScore * 100)}%)`;
    statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
    statusBarItem.tooltip = `Bias detected: ${result.detectedPatterns.join(', ')}`;
  } else {
    statusBarItem.text = '🛡️ BiasGuard';
    statusBarItem.backgroundColor = undefined;
    statusBarItem.tooltip = 'BiasGuard: No bias detected';
  }
}

/**
 * Show bias overlay webview
 */
function showBiasOverlay(context: vscode.ExtensionContext) {
  webviewPanel = vscode.window.createWebviewPanel(
    'biasguardOverlay',
    'BiasGuard Monitor',
    vscode.ViewColumn.Beside,
    {
      enableScripts: true,
      retainContextWhenHidden: true
    }
  );

  webviewPanel.webview.html = getBiasOverlayHtml();

  // Handle messages from webview
  webviewPanel.webview.onDidReceiveMessage(
    message => {
      switch (message.command) {
        case 'refresh':
          vscode.commands.executeCommand('biasguard.analyzeConversation');
          break;
        case 'openDashboard':
          vscode.commands.executeCommand('biasguard.openDashboard');
          break;
      }
    }
  );

  webviewPanel.onDidDispose(() => {
    webviewPanel = undefined;
  });
}

/**
 * Generate HTML for bias overlay
 */
function getBiasOverlayHtml(): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>BiasGuard Monitor</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                margin: 0;
                padding: 20px;
                background: #1e1e1e;
                color: #cccccc;
            }
            .header {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 20px;
            }
            .status {
                padding: 10px;
                border-radius: 5px;
                margin-bottom: 15px;
            }
            .status.active {
                background: #0e4429;
                border-left: 4px solid #238636;
            }
            .status.monitoring {
                background: #332d00;
                border-left: 4px solid #f0c040;
            }
            .buttons {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
            }
            button {
                padding: 8px 16px;
                border: 1px solid #464647;
                background: #2d2d30;
                color: #cccccc;
                border-radius: 3px;
                cursor: pointer;
            }
            button:hover {
                background: #383838;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h2>🛡️ BiasGuard Monitor</h2>
        </div>
        
        <div class="status active">
            <strong>Status:</strong> Active & Monitoring
        </div>
        
        <div class="status monitoring">
            <strong>Bias Detection:</strong> Real-time Analysis
        </div>
        
        <div class="buttons">
            <button onclick="analyzeCurrentText()" style="background: #ff6b6b; font-weight: bold;">🛡️ ANALYZE & POST TO CHAT</button>
            <button onclick="openDashboard()">Open Dashboard</button>
            <button onclick="postToChat()" style="background: #ff6b6b; font-weight: bold;">🛡️ POST TO CHAT</button>
        </div>
        
        <div id="result" style="margin-top: 15px; padding: 10px; background: #2d2d30; border-radius: 5px; display: none;">
        </div>
        
        <script>
            const vscode = acquireVsCodeApi();
            
            function quickBiasCheck(text) {
                let score = 0;
                const problems = [];
                
                if (/phase \\d+|roadmap|timeline|sprint|milestone/i.test(text)) {
                    score += 30;
                    problems.push('Planning Fallacy: Remove timeline language');
                }
                if (/comprehensive|framework|system|enterprise|robust/i.test(text)) {
                    score += 25;
                    problems.push('Feature Creep: Simplify approach');
                }
                if (/standards|enforcement|approval|mandatory|required/i.test(text)) {
                    score += 20;
                    problems.push('Authority Bias: Use normal language');
                }
                
                const level = score < 30 ? '🟢 GOOD' : score < 60 ? '🟡 BIAS' : '🔴 FIX';
                return \`[BiasGuard] \${level} (\${Math.min(score, 100)}%)\${problems.length ? '\\n' + problems.join(' | ') : ''}\`;
            }
            
            function analyzeCurrentText() {
                const text = prompt("Enter text to analyze for bias:");
                if (!text) return;
                
                const analysis = quickBiasCheck(text);
                
                // Show result
                const resultDiv = document.getElementById('result');
                resultDiv.innerHTML = '<strong>Analysis Result:</strong><br><pre>' + analysis + '</pre><br><small>Copied to clipboard - paste into your chat!</small>';
                resultDiv.style.display = 'block';
                
                // Copy to clipboard
                navigator.clipboard.writeText(analysis).then(() => {
                    console.log('BiasGuard analysis copied to clipboard');
                }).catch(() => {
                    console.log('Failed to copy to clipboard');
                });
            }
            
            function postToChat() {
                const text = prompt("Enter text to analyze for bias:");
                if (!text) return;
                
                const analysis = quickBiasCheck(text);
                
                // Show result
                const resultDiv = document.getElementById('result');
                resultDiv.innerHTML = '<strong>Analysis Result:</strong><br><pre>' + analysis + '</pre><br><small>Copied to clipboard - paste into your chat!</small>';
                resultDiv.style.display = 'block';
                
                // Copy to clipboard
                navigator.clipboard.writeText(analysis).then(() => {
                    console.log('BiasGuard analysis copied to clipboard');
                }).catch(() => {
                    console.log('Failed to copy to clipboard');
                });
            }
            
            function openDashboard() {
                vscode.postMessage({ command: 'openDashboard' });
            }
            
            function refresh() {
                vscode.postMessage({ command: 'refresh' });
            }
        </script>
    </body>
    </html>
  `;
}

export function deactivate() {
  if (webviewPanel) {
    webviewPanel.dispose();
  }
} 