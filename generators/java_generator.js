Blockly.FRCJava = new Blockly.Generator('FRCJava');

Blockly.FRCJava.ORDER_ATOMIC = 0;

Blockly.FRCJava.RESERVED_WORDS_ = 'abstract,assert,boolean,break,byte,case,catch,char,class,const,continue,default,do,double,else,enum,extends,final,finally,float,for,goto,if,implements,import,instanceof,int,interface,long,native,new,null,package,private,protected,public,return,short,static,strictfp,super,switch,synchronized,this,throw,throws,transient,try,void,volatile,while';

Blockly.FRCJava.init = function(workspace) {
  this.definitions_ = Object.create(null);
  this.nameDB_ = new Blockly.Names(this.RESERVED_WORDS_);
  this.variableDB_ = new Blockly.Names(this.RESERVED_WORDS_);
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
    throw Error('FRCJava generator does not know how to generate code for block type "' + block.type + '".');
  }
  return func.call(this, block);
};

Blockly.FRCJava.workspaceToCode = function(workspace) {
  this.init(workspace);
  let code = '';
  const blocks = workspace.getTopBlocks(true);
  for (const block of blocks) {
    let blockCode = this.blockToCode.call(this, block);
    if (Array.isArray(blockCode)) {
      blockCode = blockCode[0];
    }
    code += blockCode;
  }
  code += this.finish();
  return code;
};

Blockly.FRCJava.statementToCode = function(block, name) {
  const targetBlock = block.getInputTargetBlock(name);
  if (!targetBlock) return '';
  let code = this.blockToCode.call(this, targetBlock);
  if (Array.isArray(code)) code = code[0];
  return code;
};

Blockly.FRCJava.valueToCode = function(block, name, order) {
  const targetBlock = block.getInputTargetBlock(name);
  if (!targetBlock) return '';
  let code = this.blockToCode.call(this, targetBlock);
  if (Array.isArray(code)) code = code[0];
  return code;
};

// === Block generators ===

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
    return [`${OPERATORS[op]}(${A}, ${B})`, Blockly.FRCJava.ORDER_ATOMIC];
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

// Example custom FRC block generator:
Blockly.FRCJava['set_motor_speed'] = function(block) {
  const motor = block.getFieldValue('MOTOR') || 'left';
  const speed = Blockly.FRCJava.valueToCode(block, 'SPEED', Blockly.FRCJava.ORDER_ATOMIC) || '0';
  return `setMotorSpeed("${motor}", ${speed});\n`;
};
