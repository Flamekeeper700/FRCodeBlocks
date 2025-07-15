Blockly.Java = new Blockly.Generator('Java');

Blockly.Java['drive_forward'] = function(block) {
  const speed = block.getFieldValue('SPEED');
  return `drivetrain.arcadeDrive(${speed}, 0);\n`;
};

Blockly.Java['dio_pwm_example'] = function(block) {
    const pin = block.getFieldValue('PIN');
    const state = block.getFieldValue('STATE');
    return `dio.set(${pin}, ${state === "HIGH" ? "true" : "false"});\n`;
  };
  
  Blockly.Java['talonfx_example'] = function(block) {
    const id = block.getFieldValue('ID');
    const speed = block.getFieldValue('SPEED');
    return `TalonFX motor${id} = new TalonFX(${id});\nmotor${id}.set(${speed});\n`;
  };
  
  Blockly.Java['sparkmax_example'] = function(block) {
    const id = block.getFieldValue('ID');
    const speed = block.getFieldValue('SPEED');
    return `CANSparkMax spark${id} = new CANSparkMax(${id}, MotorType.kBrushless);\nspark${id}.set(${speed});\n`;
  };
  
  Blockly.Java['ledstrip_example'] = function(block) {
    const port = block.getFieldValue('PORT');
    const color = block.getFieldValue('COLOR');
    return `ledStrip.setColor(${port}, "${color}");\n`;
  };
  
  Blockly.Java['photonvision_example'] = function(block) {
    const camName = block.getFieldValue('CAM_NAME');
    return `PhotonCamera ${camName} = new PhotonCamera("${camName}");\n` +
           `${camName}.getLatestResult().getBestTarget().getYaw()`;
  };
  

// Needed for general structure
Blockly.Java.scrub_ = function(block, code) {
  const nextBlock = block.getNextBlock();
  const nextCode = nextBlock ? Blockly.Java.blockToCode(nextBlock) : '';
  return code + nextCode;
};
