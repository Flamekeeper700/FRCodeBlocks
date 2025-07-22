// Define blocks
Blockly.defineBlocksWithJsonArray([
  {
    "type": "frc_motorcontroller_set",
    "message0": "Set %1 motor %2 to speed %3",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "MOTOR_TYPE",
        "options": [
          ["Spark", "Spark"],
          ["TalonSRX", "TalonSRX"],
          ["VictorSP", "VictorSP"]
        ]
      },
      {"type": "field_number", "name": "CHANNEL", "value": 0},
      {"type": "input_value", "name": "SPEED"}
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160,
    "tooltip": "Set motor speed (-1 to 1)"
  },
  {
    "type": "frc_robot_init",
    "message0": "Robot Initialization",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Code that runs when robot initializes"
  },
  {
    "type": "frc_robot_periodic",
    "message0": "Robot Periodic",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Code that runs periodically"
  },
  {
    "type": "frc_encoder_getdistance",
    "message0": "Get encoder %1 distance",
    "args0": [
      {"type": "field_number", "name": "CHANNEL", "value": 0}
    ],
    "output": "Number",
    "colour": 210,
    "tooltip": "Read encoder distance in meters"
  },
  {
    "type": "frc_bind_tankdrive",
    "message0": "Bind Tank Drive to controller %1 left axis %2 right axis %3",
    "args0": [
      {"type": "field_number", "name": "CONTROLLER_PORT", "value": 0},
      {"type": "field_number", "name": "LEFT_AXIS", "value": 1},
      {"type": "field_number", "name": "RIGHT_AXIS", "value": 3}
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160,
    "tooltip": "Bind tank drive controls to controller axes"
  },
  {
    "type": "frc_subsystem_tankdrive",
    "message0": "Tank Drive left %1 right %2",
    "args0": [
      {"type": "input_value", "name": "LEFT_SPEED"},
      {"type": "input_value", "name": "RIGHT_SPEED"}
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Set tank drive speeds"
  }
]);

// Initialize generator
Blockly.FRCJava = new Blockly.Generator('FRCJava');

// Add reserved words
Blockly.FRCJava.RESERVED_WORDS_ = 'abstract,assert,boolean,break,byte,case,catch,char,class,const,' +
  'continue,default,do,double,else,enum,extends,final,finally,float,for,goto,if,' +
  'implements,import,instanceof,int,interface,long,native,new,package,private,' +
  'protected,public,return,short,static,strictfp,super,switch,synchronized,' +
  'this,throw,throws,transient,try,void,volatile,while';

// Generator mappings
Blockly.FRCJava['frc_motorcontroller_set'] = function(block) {
  const motorType = block.getFieldValue('MOTOR_TYPE');
  const channel = block.getFieldValue('CHANNEL');
  const speed = Blockly.FRCJava.valueToCode(block, 'SPEED', Blockly.FRCJava.ORDER_ATOMIC);
  return `${motorType} motor${channel} = new ${motorType}(${channel});\n` +
         `motor${channel}.set(${speed});\n`;
};

Blockly.FRCJava['frc_robot_init'] = function(block) {
  return 'public void robotInit() {\n' +
         Blockly.FRCJava.statementToCode(block, 'STEPS') +
         '}\n';
};

Blockly.FRCJava['frc_robot_periodic'] = function(block) {
  return 'public void robotPeriodic() {\n' +
         Blockly.FRCJava.statementToCode(block, 'STEPS') +
         '}\n';
};

Blockly.FRCJava['frc_encoder_getdistance'] = function(block) {
  const channel = block.getFieldValue('CHANNEL');
  return [`encoder${channel}.getDistance()`, Blockly.FRCJava.ORDER_ATOMIC];
};