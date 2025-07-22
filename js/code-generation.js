window.codeGeneration = {
  generateJavaCode: function(tabId) {
    if (!tabId) tabId = window.tabManagement.activeTabId;
    const ws = window.tabManagement.workspaces[tabId];
    if (!ws) return '';

    let code = Blockly.FRCJava.workspaceToCode(ws);
    
    const tab = window.tabManagement.tabs.find(t => t.id === tabId);
    if (tab?.type === 'robot') {
      code = `package frc.robot;\n\n` +
             `import edu.wpi.first.wpilibj.TimedRobot;\n\n` +
             `public class Robot extends TimedRobot {\n` +
             code +
             `}\n`;
    }
    
    window.domElements.outputArea.textContent = code;
    return code;
  },

  downloadJavaFile: function() {
    const code = this.generateJavaCode();
    const blob = new Blob([code], { type: 'text/java' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Robot.java';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  copyCodeToClipboard: function() {
    const code = this.generateJavaCode();
    navigator.clipboard.writeText(code).then(() => {
      alert('Code copied to clipboard!');
    });
  }
};