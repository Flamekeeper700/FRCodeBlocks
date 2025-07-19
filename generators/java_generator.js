// Create FRCJava generator
Blockly.FRCJava = new Blockly.Generator('FRCJava');

Blockly.FRCJava.ORDER_ATOMIC = 0;

Blockly.FRCJava.RESERVED_WORDS_ =
  'abstract,assert,boolean,break,byte,case,catch,char,class,const,continue,default,do,double,' +
  'else,enum,extends,final,finally,float,for,goto,if,implements,import,instanceof,int,interface,' +
  'long,native,new,null,package,private,protected,public,return,short,static,strictfp,super,' +
  'switch,synchronized,this,throw,throws,transient,try,void,volatile,while';

Blockly.FRCJava.init = function(workspace) {
  this.definitions_ = Object.create(null);
  this.nameDB_ = new Blockly.Names(this.RESERVED_WORDS_);
  this.variableDB_ = new Blockly.Names(this.RESERVED_WORDS_);
  
  // Add FRC-specific type definitions
  this.setVariableTypes({
    'Command': 'Command',
    'Subsystem': 'SubsystemBase'
  });
  
  if (workspace) {
    this.variableDB_.reset();
    const variables = workspace.getVariableMap().getAllVariables();
    for (const variable of variables) {
      this.variableDB_.getName(variable.getId(), Blockly.VARIABLE_CATEGORY_NAME);
    }
  }
};

Blockly.FRCJava.finish = function() {
  const definitions = [];
  for (const name in this.definitions_) {
    definitions.push(this.definitions_[name]);
  }
  return definitions.join('\n');
};

Blockly.FRCJava.blockToCode = function(block) {
  if (!block) {
    return '';
  }
  const func = this[block.type];
  if (!func) {
    throw Error(`FRCJava generator does not know how to generate code for block type "${block.type}".`);
  }
  return func.call(this, block);
};

Blockly.FRCJava.workspaceToCode = function(workspace) {
  this.init(workspace);
  
  // Generate base structure
  let code = 
    `package frc.robot;\n\n` +
    `import edu.wpi.first.wpilibj.TimedRobot;\n` +
    `import edu.wpi.first.wpilibj2.command.Command;\n` +
    `import edu.wpi.first.wpilibj2.command.CommandScheduler;\n` +
    `import edu.wpi.first.wpilibj2.command.SubsystemBase;\n` +
    `import edu.wpi.first.wpilibj.motorcontrol.MotorController;\n` +
    `import edu.wpi.first.wpilibj.motorcontrol.PWMVictorSPX;\n\n` +
    `public class Robot extends TimedRobot {\n`;
  
  // Generate fields and methods
  const blocks = workspace.getTopBlocks(true);
  
  // 1. Generate all definitions first (commands, subsystems)
  for (const block of blocks) {
    if (block.outputConnection) {
      const blockCode = this.blockToCode(block);
      if (Array.isArray(blockCode)) {
        code += blockCode[0];
      }
    }
  }
  
  // 2. Generate field declarations
  for (const block of blocks) {
    if (!block.outputConnection) {
      const blockCode = this.blockToCode(block);
      if (blockCode) code += blockCode;
    }
  }
  
  // 3. Generate method implementations
  for (const block of blocks) {
    if (block.type.startsWith('frc_') && !block.outputConnection) {
      const blockCode = this.blockToCode(block);
      if (blockCode) code += blockCode;
    }
  }
  
  code += `}\n` + this.finish();
  return code;
};

Blockly.FRCJava.statementToCode = function(block, name) {
  const targetBlock = block.getInputTargetBlock(name);
  if (!targetBlock) return '';
  let code = this.blockToCode(targetBlock);
  if (Array.isArray(code)) code = code[0];
  return code;
};

Blockly.FRCJava.valueToCode = function(block, name, order) {
  const targetBlock = block.getInputTargetBlock(name);
  if (!targetBlock) return '';
  let code = this.blockToCode(targetBlock);
  if (Array.isArray(code)) code = code[0];
  return code;
};

// =====================
// STANDARD BLOCKS
// =====================

Blockly.FRCJava['text_print'] = function(block) {
  const msg = Blockly.FRCJava.valueToCode(block, 'TEXT', Blockly.FRCJava.ORDER_ATOMIC) || '""';
  return `System.out.println(${msg});\n`;
};

Blockly.FRCJava['text'] = function(block) {
  const text = block.getFieldValue('TEXT') || '';
  return [`"${text.replace(/"/g, '\\"')}"`, Blockly.FRCJava.ORDER_ATOMIC];
};

Blockly.FRCJava['math_number'] = function(block) {
  const num = block.getFieldValue('NUM');
  return [num, Blockly.FRCJava.ORDER_ATOMIC];
};

Blockly.FRCJava['math_arithmetic'] = function(block) {
  const OPERATORS = {
    'ADD': '+',
    'MINUS': '-',
    'MULTIPLY': '*',
    'DIVIDE': '/',
    'POWER': 'Math.pow'
  };
  const op = block.getFieldValue('OP');
  const A = Blockly.FRCJava.valueToCode(block, 'A', Blockly.FRCJava.ORDER_ATOMIC) || '0';
  const B = Blockly.FRCJava.valueToCode(block, 'B', Blockly.FRCJava.ORDER_ATOMIC) || '0';

  if (op === 'POWER') {
    return [`Math.pow(${A}, ${B})`, Blockly.FRCJava.ORDER_ATOMIC];
  }
  return [`(${A} ${OPERATORS[op]} ${B})`, Blockly.FRCJava.ORDER_ATOMIC];
};

Blockly.FRCJava['controls_if'] = function(block) {
  const condition = Blockly.FRCJava.valueToCode(block, 'IF0', Blockly.FRCJava.ORDER_ATOMIC) || 'false';
  const statements = Blockly.FRCJava.statementToCode(block, 'DO0');
  return `if (${condition}) {\n${statements}}\n`;
};

Blockly.FRCJava['logic_compare'] = function(block) {
  const OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  const operator = OPERATORS[block.getFieldValue('OP')] || '==';
  const A = Blockly.FRCJava.valueToCode(block, 'A', Blockly.FRCJava.ORDER_ATOMIC) || '0';
  const B = Blockly.FRCJava.valueToCode(block, 'B', Blockly.FRCJava.ORDER_ATOMIC) || '0';
  return [`(${A} ${operator} ${B})`, Blockly.FRCJava.ORDER_ATOMIC];
};

Blockly.FRCJava['controls_repeat_ext'] = function(block) {
  const times = Blockly.FRCJava.valueToCode(block, 'TIMES', Blockly.FRCJava.ORDER_ATOMIC) || '10';
  const statements = Blockly.FRCJava.statementToCode(block, 'DO');
  return `for (int i = 0; i < ${times}; i++) {\n${statements}}\n`;
};

// =====================
// FRC-SPECIFIC BLOCKS
// =====================

// Robot Methods
Blockly.FRCJava['frc_robot_init'] = function(block) {
  const statements = Blockly.FRCJava.statementToCode(block, 'STATEMENTS');
  return `@Override\npublic void robotInit() {\n${statements}}\n\n`;
};

Blockly.FRCJava['frc_robot_periodic'] = function(block) {
  const statements = Blockly.FRCJava.statementToCode(block, 'STATEMENTS');
  return `@Override\npublic void robotPeriodic() {\n${statements}}\n\n`;
};

Blockly.FRCJava['frc_autonomous_init'] = function(block) {
  const statements = Blockly.FRCJava.statementToCode(block, 'STATEMENTS');
  return `@Override\npublic void autonomousInit() {\n${statements}}\n\n`;
};

Blockly.FRCJava['frc_teleop_init'] = function(block) {
  const statements = Blockly.FRCJava.statementToCode(block, 'STATEMENTS');
  return `@Override\npublic void teleopInit() {\n${statements}}\n\n`;
};

// Command System
Blockly.FRCJava['frc_command'] = function(block) {
  const name = this.nameDB_.getName(block.getFieldValue('NAME') || 'Command', Blockly.VARIABLE_CATEGORY_NAME);
  const init = Blockly.FRCJava.statementToCode(block, 'INIT');
  const execute = Blockly.FRCJava.statementToCode(block, 'EXECUTE');
  const end = Blockly.FRCJava.statementToCode(block, 'END');
  const finished = Blockly.FRCJava.valueToCode(block, 'FINISHED', Blockly.FRCJava.ORDER_ATOMIC) || 'false';
  
  const className = name.replace(/\s+/g, '') + 'Command';
  
  const code = 
    `public class ${className} extends CommandBase {\n` +
    `  @Override\n` +
    `  public void initialize() {\n` +
    `    ${init}\n` +
    `  }\n\n` +
    `  @Override\n` +
    `  public void execute() {\n` +
    `    ${execute}\n` +
    `  }\n\n` +
    `  @Override\n` +
    `  public void end(boolean interrupted) {\n` +
    `    ${end}\n` +
    `  }\n\n` +
    `  @Override\n` +
    `  public boolean isFinished() {\n` +
    `    return ${finished};\n` +
    `  }\n` +
    `}\n\n`;
  
  this.definitions_[`command_${className}`] = code;
  return [`new ${className}()`, Blockly.FRCJava.ORDER_ATOMIC];
};

Blockly.FRCJava['frc_run_command'] = function(block) {
  const command = Blockly.FRCJava.valueToCode(block, 'COMMAND', Blockly.FRCJava.ORDER_ATOMIC) || 'null';
  return `CommandScheduler.getInstance().schedule(${command});\n`;
};

// Subsystem Blocks
Blockly.FRCJava['frc_subsystem'] = function(block) {
  const name = this.nameDB_.getName(block.getFieldValue('NAME') || 'Subsystem', Blockly.VARIABLE_CATEGORY_NAME);
  const init = Blockly.FRCJava.statementToCode(block, 'INIT');
  const periodic = Blockly.FRCJava.statementToCode(block, 'PERIODIC');
  
  const className = name.replace(/\s+/g, '') + 'Subsystem';
  
  const code = 
    `public class ${className} extends SubsystemBase {\n` +
    `  public ${className}() {\n` +
    `    ${init}\n` +
    `  }\n\n` +
    `  @Override\n` +
    `  public void periodic() {\n` +
    `    ${periodic}\n` +
    `  }\n` +
    `}\n\n`;
  
  this.definitions_[`subsystem_${className}`] = code;
  return [`new ${className}()`, Blockly.FRCJava.ORDER_ATOMIC];
};

Blockly.FRCJava['frc_motor_set'] = function(block) {
  const motor = block.getFieldValue('MOTOR') || 'left';
  const speed = Blockly.FRCJava.valueToCode(block, 'SPEED', Blockly.FRCJava.ORDER_ATOMIC) || '0';
  
  const motorVar = `motor_${motor.toLowerCase()}`;
  if (!this.definitions_[`motor_${motorVar}`]) {
    this.definitions_[`motor_${motorVar}`] = 
      `private MotorController ${motorVar} = new PWMVictorSPX(${motor === 'LEFT' ? 0 : 1});\n`;
  }
  
  return `${motorVar}.set(${speed});\n`;
};