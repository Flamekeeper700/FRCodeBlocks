window.codeGeneration = {
  generateJavaCode: function(tabId) {
    if (!tabId) tabId = window.tabManagement.activeTabId;
    const ws = window.tabManagement.workspaces[tabId];
    if (!ws) return '';

    // Collect all imports from used blocks
    const usedImports = new Set();
    const allBlocks = ws.getAllBlocks(true); // Include all blocks (nested ones too)
    
    allBlocks.forEach(block => {
      if (block.imports && Array.isArray(block.imports)) {
        block.imports.forEach(imp => {
          if (imp && typeof imp === 'string') {
            // Ensure import ends with semicolon
            const cleanImport = imp.trim().endsWith(';') ? imp.trim() : imp.trim() + ';';
            usedImports.add(cleanImport);
          }
        });
      }
    });

    // Generate base code
    let code = Blockly.FRCJava.workspaceToCode(ws);
    
    // Format imports section
    let importsSection = '';
    if (usedImports.size > 0) {
      importsSection = Array.from(usedImports)
        .sort()
        .join('\n') + '\n\n';
    }

    const tab = window.tabManagement.tabs.find(t => t.id === tabId);
    if (!tab) return importsSection + code;  // Return at least imports if no tab type
    
    // Add appropriate wrapper based on tab type
    switch(tab.type) {
      case 'robot':
        code = `package frc.robot;\n\n` +
               `import edu.wpi.first.wpilibj.TimedRobot;\n` +
               importsSection +
               `public class Robot extends TimedRobot {\n` +
               `  private final RobotContainer robotContainer = new RobotContainer();\n\n` +
               code +
               `}\n`;
        break;
        
      case 'command':
        code = `package frc.robot.commands;\n\n` +
               `import edu.wpi.first.wpilibj2.command.CommandBase;\n` +
               importsSection +
               `public class ${tab.title.replace(/\s+/g, '')} extends CommandBase {\n` +
               code +
               `}\n`;
        break;
        
      case 'subsystem':
        code = `package frc.robot.subsystems;\n\n` +
               `import edu.wpi.first.wpilibj2.command.SubsystemBase;\n` +
               importsSection +
               `public class ${tab.title.replace(/\s+/g, '')} extends SubsystemBase {\n` +
               code +
               `}\n`;
        break;
        
      case 'credits':
        code = "/**\n * CREDITS\n */\n" + 
               importsSection +
               code +
               "\n/**/\n";
        break;
        
      default:
        // For all other cases, ensure imports are included
        code = importsSection + code;
    }
    
    // Update output area
    if (window.domElements.outputArea) {
      window.domElements.outputArea.textContent = code;
    }
    
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
