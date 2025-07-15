Blockly.Java = new Blockly.Generator('Java');

Blockly.Java['drive_forward'] = function(block) {
  const speed = block.getFieldValue('SPEED');
  return `drivetrain.arcadeDrive(${speed}, 0);\n`;
};

// Needed for general structure
Blockly.Java.scrub_ = function(block, code) {
  const nextBlock = block.getNextBlock();
  const nextCode = nextBlock ? Blockly.Java.blockToCode(nextBlock) : '';
  return code + nextCode;
};
