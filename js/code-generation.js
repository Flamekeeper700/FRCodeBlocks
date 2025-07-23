
window.codeGeneration = {
  generateJavaCode: function(tabId) {
    if (!tabId) tabId = window.tabManagement.activeTabId;
    const ws = window.tabManagement.workspaces[tabId];
    if (!ws) return '';

    let code = Blockly.FRCJava.workspaceToCode(ws);
    
    const tab = window.tabManagement.tabs.find(t => t.id === tabId);
    if (tab?.type === 'robot') {
      code = `package frc.robot;\n\n` +
             `import edu.wpi.first.wpilibj.TimedRobot;\n` +
             `import edu.wpi.first.wpilibj.Joystick;\n` +
             `import edu.wpi.first.wpilibj2.command.button.JoystickButton;\n` +
             `import edu.wpi.first.wpilibj.motorcontrol.MotorController;\n` +
             `import edu.wpi.first.wpilibj.motorcontrol.PWMSparkMax;\n` +
             `import edu.wpi.first.wpilibj.motorcontrol.PWMTalonSRX;\n` +
             `import edu.wpi.first.wpilibj.motorcontrol.PWMVictorSP;\n` +
             `import edu.wpi.first.wpilibj.motorcontrol.PWMTalonFX;\n` +
             `import edu.wpi.first.wpilibj.motorcontrol.PWMVenom;\n` +
             `import edu.wpi.first.wpilibj.Encoder;\n` +
             `import edu.wpi.first.wpilibj.controller.PIDController;\n` +
             `import edu.wpi.first.wpilibj.Timer;\n\n` +
             `public class Robot extends TimedRobot {\n` +
             `  private final RobotContainer robotContainer = new RobotContainer();\n\n` +
             code +
             `}\n`;
    }
    if (tab?.type === 'command') {
      code = `package frc.robot.commands;\n\n` +
             `import edu.wpi.first.wpilibj2.command.CommandBase;\n\n` +
             `public class ${tab.title.replace(/\s+/g, '')} extends CommandBase {\n` +
             code +
             `}\n`;
    }
    if (tab?.type === 'subsystem') {
      code = `package frc.robot.subsystems;\n\n` +
             `import edu.wpi.first.wpilibj2.command.SubsystemBase;\n\n` +
             `public class ${tab.title.replace(/\s+/g, '')} extends SubsystemBase {\n` +
             code +
             `}\n`;
    }
    if (tab?.type === 'credits') {
      code = "/**\n * CREDITS\n */\n" + 
             Blockly.FRCJava.workspaceToCode(ws) +
             "\n/**/\n";
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