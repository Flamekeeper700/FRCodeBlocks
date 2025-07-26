// Define all blocks
Blockly.defineBlocksWithJsonArray([
  // Motor blocks
  {
    "type": "frc_motorcontroller_set",
    "message0": "Set %1 motor %2 to speed %3",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "MOTOR_TYPE",
        "options": [
          ["Spark", "PWMSparkMax"],
          ["TalonSRX", "PWMTalonSRX"],
          ["VictorSP", "PWMVictorSP"]
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

  // Drive blocks
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
    "colour": 120,
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
    "colour": 120,
    "tooltip": "Set tank drive speeds"
  },

  // Sensor blocks
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

  // Subsystem blocks
  {
    "type": "frc_subsystem_init",
    "message0": "Subsystem %1 Initialization",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "SUBSYSTEM_TYPE",
        "options": [
          ["DriveSubsystem", "DriveSubsystem"],
          ["ArmSubsystem", "ArmSubsystem"],
          ["IntakeSubsystem", "IntakeSubsystem"]
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 180,
    "tooltip": "Initialize a subsystem"
  },
  {
    "type": "frc_subsystem_periodic",
    "message0": "Subsystem Periodic",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 180,
    "tooltip": "Periodic code for a subsystem"
  },

  // Robot Container blocks
  {
    "type": "frc_robotcontainer_init",
    "message0": "Robot Container Initialization",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 200,
    "tooltip": "Initialize robot container"
  },
  {
    "type": "frc_robotcontainer_configurebuttonbindings",
    "message0": "Configure Button Bindings",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 200,
    "tooltip": "Configure button bindings"
  },
  {
    "type": "frc_robotcontainer_getautonomouscommand",
    "message0": "Get Autonomous Command",
    "output": "Command",
    "colour": 200,
    "tooltip": "Get autonomous command"
  },
  {
    "type": "frc_robot_init",
    "message0": "robotInit() %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "STEPS"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 200,
    "tooltip": "Called once when the robot starts"
  },
  {
    "type": "frc_robot_periodic",
    "message0": "robotPeriodic() %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "STEPS"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 200,
    "tooltip": "Called periodically while the robot is enabled"
  },
  {
    "type": "frc_simulation_init",
    "message0": "simulationInit() %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "STEPS"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 200,
    "tooltip": "Called once when simulation starts"
  },
  {
    "type": "frc_simulation_periodic",
    "message0": "simulationPeriodic() %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "STEPS"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 200,
    "tooltip": "Called periodically during simulation"
  },
  {
    "type": "frc_disabled_init",
    "message0": "disabledInit() %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "STEPS"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 200,
    "tooltip": "Called once when robot enters disabled mode"
  },
  {
    "type": "frc_disabled_periodic",
    "message0": "disabledPeriodic() %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "STEPS"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 200,
    "tooltip": "Called periodically while robot is disabled"
  },
  {
    "type": "frc_autonomous_init",
    "message0": "autonomousInit() %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "STEPS"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 200,
    "tooltip": "Called once when autonomous mode starts"
  },
  {
    "type": "frc_autonomous_periodic",
    "message0": "autonomousPeriodic() %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "STEPS"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 200,
    "tooltip": "Called periodically during autonomous mode"
  },
  {
    "type": "frc_teleop_init",
    "message0": "teleopInit() %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "STEPS"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 200,
    "tooltip": "Called once when teleop mode starts"
  },
  {
    "type": "frc_teleop_periodic",
    "message0": "teleopPeriodic() %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "STEPS"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 200,
    "tooltip": "Called periodically during teleop mode"
  },
  {
    "type": "frc_test_init",
    "message0": "testInit() %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "STEPS"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 200,
    "tooltip": "Called once when test mode starts"
  },
  {
    "type": "frc_test_periodic",
    "message0": "testPeriodic() %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "STEPS"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 200,
    "tooltip": "Called periodically during test mode"
  },

  // Constants blocks
  {
    "type": "frc_constants_motorports",
    "message0": "Motor Ports: Left %1 Right %2",
    "args0": [
      {"type": "field_number", "name": "LEFT_MOTOR_PORT", "value": 0},
      {"type": "field_number", "name": "RIGHT_MOTOR_PORT", "value": 1}
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 330,
    "tooltip": "Define motor ports"
  },
  {
    "type": "comment_block",
    "message0": "// %1",
    "args0": [
      {
        "type": "field_input",
        "name": "TEXT",
        "text": "Comment here"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160,
    "tooltip": "Add a code comment"
  },
  {
    "type": "frc_joystick_getaxis",
    "message0": "Get Joystick %1 Axis %2",
    "args0": [
      {"type": "field_number", "name": "PORT", "value": 0},
      {"type": "field_number", "name": "AXIS", "value": 1}
    ],
    "output": "Number",
    "colour": 30,
    "tooltip": "Get joystick axis value (-1 to 1)"
  },
  {
    "type": "frc_joystick_getbutton",
    "message0": "Get Joystick %1 Button %2",
    "args0": [
      {"type": "field_number", "name": "PORT", "value": 0},
      {"type": "field_number", "name": "BUTTON", "value": 1}
    ],
    "output": "Boolean",
    "colour": 30,
    "tooltip": "Get joystick button state"
  },
  {
    "type": "frc_pidcontroller_create",
    "message0": "Create PID Controller %1 P %2 I %3 D %4",
    "args0": [
      {"type": "field_input", "name": "NAME", "text": "pidController"},
      {"type": "input_value", "name": "P", "value": 0.1},
      {"type": "input_value", "name": "I", "value": 0.0},
      {"type": "input_value", "name": "D", "value": 0.0}
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 220,
    "tooltip": "Create a PID controller"
  },
  {
    "type": "frc_pidcontroller_calculate",
    "message0": "Calculate PID %1 Setpoint %2 Measurement %3",
    "args0": [
      {"type": "field_input", "name": "NAME", "text": "pidController"},
      {"type": "input_value", "name": "SETPOINT"},
      {"type": "input_value", "name": "MEASUREMENT"}
    ],
    "output": "Number",
    "colour": 220,
    "tooltip": "Calculate PID output"
  },
  {
    "type": "frc_encoder_create",
    "message0": "Create Encoder %1 Channel A %2 Channel B %3",
    "args0": [
      {"type": "field_input", "name": "NAME", "text": "encoder"},
      {"type": "field_number", "name": "CHANNEL_A", "value": 0},
      {"type": "field_number", "name": "CHANNEL_B", "value": 1}
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 210,
    "tooltip": "Create a quadrature encoder"
  },
  {
    "type": "frc_timer",
    "message0": "Timer %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "OPERATION",
        "options": [
          ["Start", "start"],
          ["Stop", "stop"],
          ["Reset", "reset"],
          ["Get", "get"],
          ["Has Elapsed", "hasElapsed"]
        ]
      },
      {"type": "input_value", "name": "SECONDS", "check": "Number"}
    ],
    "output": ["Number", "Boolean"],
    "colour": 330,
    "tooltip": "Timer operations"
  },
  {
    "type": "frc_motorcontroller_safety",
    "message0": "Set motor %1 safety %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "MOTOR_TYPE",
        "options": [
          ["Spark", "PWMSparkMax"],
          ["TalonSRX", "PWMTalonSRX"],
          ["VictorSP", "PWMVictorSP"],
          ["TalonFX", "PWMTalonFX"],
          ["Venom", "PWMVenom"]
        ]
      },
      {
        "type": "field_dropdown",
        "name": "STATE",
        "options": [
          ["Enabled", "true"],
          ["Disabled", "false"]
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160,
    "tooltip": "Enable/disable motor safety"
  },
  {
    "type": "frc_motorcontroller_setinverted",
    "message0": "Set motor %1 inverted %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "MOTOR_TYPE",
        "options": [
          ["Spark", "PWMSparkMax"],
          ["TalonSRX", "PWMTalonSRX"],
          ["VictorSP", "PWMVictorSP"],
          ["TalonFX", "PWMTalonFX"],
          ["Venom", "PWMVenom"]
        ]
      },
      {
        "type": "field_dropdown",
        "name": "STATE",
        "options": [
          ["True", "true"],
          ["False", "false"]
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160,
    "tooltip": "Set motor inversion state"
  },
  {
    "type": "frc_encoder_setdistanceperpulse",
    "message0": "Set encoder %1 distance per pulse %2 meters",
    "args0": [
      {"type": "field_number", "name": "CHANNEL", "value": 0},
      {"type": "input_value", "name": "DISTANCE"}
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 210,
    "tooltip": "Set encoder distance per pulse"
  },
  {
    "type": "frc_pidcontroller_settolerance",
    "message0": "Set PID %1 tolerance absolute %2 meters",
    "args0": [
      {"type": "field_input", "name": "NAME", "text": "pidController"},
      {"type": "input_value", "name": "TOLERANCE"}
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 220,
    "tooltip": "Set PID controller absolute tolerance"
  },
  {
    "type": "frc_pidcontroller_at_setpoint",
    "message0": "PID %1 at setpoint",
    "args0": [
      {"type": "field_input", "name": "NAME", "text": "pidController"}
    ],
    "output": "Boolean",
    "colour": 220,
    "tooltip": "Check if PID controller is at setpoint"
  },
  {
    "type": "frc_command_init",
    "message0": "Command %1 initialize",
    "args0": [
      {"type": "field_input", "name": "NAME", "text": "myCommand"}
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Command initialization"
  },
  {
    "type": "frc_command_execute",
    "message0": "Command %1 execute",
    "args0": [
      {"type": "field_input", "name": "NAME", "text": "myCommand"}
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Command execution"
  },
  {
    "type": "frc_command_is_finished",
    "message0": "Command %1 is finished",
    "args0": [
      {"type": "field_input", "name": "NAME", "text": "myCommand"}
    ],
    "output": "Boolean",
    "colour": 260,
    "tooltip": "Check if command is finished"
  },
  {
    "type": "frc_command_end",
    "message0": "Command %1 end",
    "args0": [
      {"type": "field_input", "name": "NAME", "text": "myCommand"}
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Command end"
  },
  {
    "type": "frc_variable_declaration",
    "message0": "Declare %1 %2 = %3",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "TYPE",
        "options": [
          ["int", "int"],
          ["double", "double"],
          ["boolean", "boolean"],
          ["String", "String"],
          ["MotorController", "MotorController"],
          ["Joystick", "Joystick"],
          ["Encoder", "Encoder"],
          ["PIDController", "PIDController"],
          ["Timer", "Timer"]
        ]
      },
      {
        "type": "field_input",
        "name": "NAME",
        "text": "variableName"
      },
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 330,
    "tooltip": "Declare a variable with initialization"
  },
  {
    "type": "frc_variable_set",
    "message0": "Set %1 %2 = %3",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "TYPE",
        "options": [
          ["int", "int"],
          ["double", "double"],
          ["boolean", "boolean"],
          ["String", "String"],
          ["MotorController", "MotorController"],
          ["Joystick", "Joystick"],
          ["Encoder", "Encoder"],
          ["PIDController", "PIDController"],
          ["Timer", "Timer"]
        ]
      },
      {
        "type": "field_input",
        "name": "NAME",
        "text": "variableName"
      },
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 330,
    "tooltip": "Set the value of an existing variable"
  },
  {
    "type": "frc_variable_get",
    "message0": "Get %1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "TYPE",
        "options": [
          ["int", "int"],
          ["double", "double"],
          ["boolean", "boolean"],
          ["String", "String"],
          ["MotorController", "MotorController"],
          ["Joystick", "Joystick"],
          ["Encoder", "Encoder"],
          ["PIDController", "PIDController"],
          ["Timer", "Timer"]
        ]
      },
      {
        "type": "field_input",
        "name": "NAME",
        "text": "variableName"
      }
    ],
    "output": null,
    "colour": 330,
    "tooltip": "Get the value of a variable"
  },
  {
    "type": "frc_custom_function_declare",
    "message0": "%1 %2 %3 function %4 %5 %6",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "ACCESS_MODIFIER",
        "options": [
          ["public", "public"],
          ["private", "private"],
          ["protected", "protected"],
          ["---", ""]
        ]
      },
      {
        "type": "field_dropdown",
        "name": "STATIC_MODIFIER",
        "options": [
          ["static", "static"],
          ["---", ""]
        ]
      },
      {
        "type": "field_dropdown",
        "name": "RETURN_TYPE",
        "options": [
          ["void", "void"],
          ["int", "int"],
          ["double", "double"],
          ["boolean", "boolean"],
          ["String", "String"],
          ["MotorController", "MotorController"],
          ["Joystick", "Joystick"],
          ["Encoder", "Encoder"],
          ["PIDController", "PIDController"],
          ["Timer", "Timer"]
        ]
      },
      {
        "type": "field_input",
        "name": "FUNCTION_NAME",
        "text": "myFunction"
      },
      {
        "type": "input_dummy",
        "name": "PARAMS_DUMMY"
      },
      {
        "type": "input_statement",
        "name": "FUNCTION_BODY"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 280,
    "tooltip": "Declare a custom function with parameters and body",
    "mutator": "function_parameter_mutator"
  },
  {
    "type": "frc_custom_function_call",
    "message0": "call %1 %2",
    "args0": [
      {
        "type": "field_input",
        "name": "FUNCTION_NAME",
        "text": "myFunction"
      },
      {
        "type": "input_dummy",
        "name": "PARAMS_DUMMY"
      }
    ],
    "output": null,
    "colour": 280,
    "tooltip": "Call a custom function",
    "mutator": "function_argument_mutator"
  },
  {
    "type": "frc_function_parameter",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "PARAM_TYPE",
        "options": [
          ["int", "int"],
          ["double", "double"],
          ["boolean", "boolean"],
          ["String", "String"],
          ["MotorController", "MotorController"],
          ["Joystick", "Joystick"],
          ["Encoder", "Encoder"],
          ["PIDController", "PIDController"],
          ["Timer", "Timer"]
        ]
      },
      {
        "type": "field_input",
        "name": "PARAM_NAME",
        "text": "param"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 280,
    "tooltip": "A function parameter"
  },
  {
    "type": "frc_function_argument",
    "message0": "%1",
    "args0": [
      {
        "type": "input_value",
        "name": "ARG_VALUE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 280,
    "tooltip": "A function argument"
  }
]);

// Initialize generator
Blockly.FRCJava = new Blockly.Generator('FRCJava');

// Define order constants for operations
Blockly.FRCJava.ORDER_ATOMIC = 0;          // Literal values, variables
Blockly.FRCJava.ORDER_MEMBER = 1;          // . (dot) operator
Blockly.FRCJava.ORDER_FUNCTION_CALL = 2;   // Function calls
Blockly.FRCJava.ORDER_INCREMENT = 3;       // ++ (postfix)
Blockly.FRCJava.ORDER_DECREMENT = 3;       // -- (postfix)
Blockly.FRCJava.ORDER_BITWISE_NOT = 4;     // ~ (bitwise NOT)
Blockly.FRCJava.ORDER_UNARY_PLUS = 4;      // + (unary)
Blockly.FRCJava.ORDER_UNARY_NEGATION = 4;  // - (unary)
Blockly.FRCJava.ORDER_LOGICAL_NOT = 4;     // ! (logical NOT)
Blockly.FRCJava.ORDER_MULTIPLICATION = 5;  // *
Blockly.FRCJava.ORDER_DIVISION = 5;        // /
Blockly.FRCJava.ORDER_MODULUS = 5;         // %
Blockly.FRCJava.ORDER_ADDITION = 6;        // +
Blockly.FRCJava.ORDER_SUBTRACTION = 6;     // -
Blockly.FRCJava.ORDER_RELATIONAL = 8;      // <, >, <=, >=
Blockly.FRCJava.ORDER_EQUALITY = 9;        // ==, !=
Blockly.FRCJava.ORDER_LOGICAL_AND = 13;    // &&
Blockly.FRCJava.ORDER_LOGICAL_OR = 14;     // ||
Blockly.FRCJava.ORDER_CONDITIONAL = 15;    // ?:
Blockly.FRCJava.ORDER_ASSIGNMENT = 16;     // =, +=, -=, etc.
Blockly.FRCJava.ORDER_NONE = 99;           // Statements

// Add reserved words
Blockly.FRCJava.RESERVED_WORDS_ = 'abstract,assert,boolean,break,byte,case,catch,char,class,const,' +
  'continue,default,do,double,else,enum,extends,final,finally,float,for,goto,if,' +
  'implements,import,instanceof,int,interface,long,native,new,package,private,' +
  'protected,public,return,short,static,strictfp,super,switch,synchronized,' +
  'this,throw,throws,transient,try,void,volatile,while';

// Generator mappings for all blocks

Blockly.FRCJava['frc_motorcontroller_set'] = function(block) {
  const motorType = block.getFieldValue('MOTOR_TYPE');
  const channel = block.getFieldValue('CHANNEL');
  const speed = Blockly.FRCJava.valueToCode(block, 'SPEED', Blockly.FRCJava.ORDER_ASSIGNMENT) || '0';
  return `${motorType} motor${channel} = new ${motorType}(${channel});\n` +
    `motor${channel}.set(${speed});\n`;
};

Blockly.FRCJava['frc_bind_tankdrive'] = function(block) {
  const controllerPort = block.getFieldValue('CONTROLLER_PORT');
  const leftAxis = block.getFieldValue('LEFT_AXIS');
  const rightAxis = block.getFieldValue('RIGHT_AXIS');
  return `Joystick controller${controllerPort} = new Joystick(${controllerPort});\n` +
    `new JoystickButton(controller${controllerPort}, 1).whenPressed(\n` +
    `  () -> driveSubsystem.tankDrive(\n` +
    `    controller${controllerPort}.getRawAxis(${leftAxis}),\n` +
    `    controller${controllerPort}.getRawAxis(${rightAxis})\n` +
    `  )\n` +
    `);\n`;
};

Blockly.FRCJava['frc_subsystem_tankdrive'] = function(block) {
  const leftSpeed = Blockly.FRCJava.valueToCode(block, 'LEFT_SPEED', Blockly.FRCJava.ORDER_ASSIGNMENT) || '0';
  const rightSpeed = Blockly.FRCJava.valueToCode(block, 'RIGHT_SPEED', Blockly.FRCJava.ORDER_ASSIGNMENT) || '0';
  return `public void tankDrive(double leftSpeed, double rightSpeed) {\n` +
    `  leftMotor.set(${leftSpeed});\n` +
    `  rightMotor.set(${rightSpeed});\n` +
    `}\n\n`;
};

Blockly.FRCJava['frc_encoder_getdistance'] = function(block) {
  const channel = block.getFieldValue('CHANNEL');
  return [`encoder${channel}.getDistance()`, Blockly.FRCJava.ORDER_MEMBER];
};

Blockly.FRCJava['frc_subsystem_init'] = function(block) {
  const subsystemType = block.getFieldValue('SUBSYSTEM_TYPE');
  return `public class ${subsystemType} {\n` +
    `  public ${subsystemType}() {\n` +
    Blockly.FRCJava.statementToCode(block, 'STEPS') +
    `  }\n\n`;
};

Blockly.FRCJava['frc_subsystem_periodic'] = function(block) {
  return `public void periodic() {\n` +
    Blockly.FRCJava.statementToCode(block, 'STEPS') +
    `}\n\n`;
};

Blockly.FRCJava['frc_robotcontainer_init'] = function(block) {
  return `public class RobotContainer {\n` +
    `  public RobotContainer() {\n` +
    `    configureButtonBindings();\n` +
    Blockly.FRCJava.statementToCode(block, 'STEPS') +
    `  }\n\n`;
};

Blockly.FRCJava['frc_robotcontainer_configurebuttonbindings'] = function(block) {
  return `private void configureButtonBindings() {\n` +
    Blockly.FRCJava.statementToCode(block, 'BUTTON_BINDINGS') +
    `}\n\n`;
};

Blockly.FRCJava['frc_robotcontainer_getautonomouscommand'] = function(block) {
  return [`new AutonomousCommand()`, Blockly.FRCJava.ORDER_ATOMIC];
};

Blockly.FRCJava['frc_constants_motorports'] = function(block) {
  const leftPort = block.getFieldValue('LEFT_MOTOR_PORT');
  const rightPort = block.getFieldValue('RIGHT_MOTOR_PORT');
  return `public static final class Constants {\n` +
    `  public static final int LEFT_MOTOR_PORT = ${leftPort};\n` +
    `  public static final int RIGHT_MOTOR_PORT = ${rightPort};\n` +
    `}\n\n`;
};

// Basic blocks support
Blockly.FRCJava['math_number'] = function(block) {
  const code = block.getFieldValue('NUM');
  return [code, Blockly.FRCJava.ORDER_ATOMIC];
};

Blockly.FRCJava['variables_get'] = function(block) {
  const code = Blockly.FRCJava.variableDB_.getName(block.getFieldValue('VAR'), 
    Blockly.Variables.NAME_TYPE);
  return [code, Blockly.FRCJava.ORDER_ATOMIC];
};

Blockly.FRCJava['variables_set'] = function(block) {
  const argument0 = Blockly.FRCJava.valueToCode(block, 'VALUE',
      Blockly.FRCJava.ORDER_ASSIGNMENT) || '0';
  const varName = Blockly.FRCJava.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + ';\n';
};

Blockly.FRCJava['frc_robot_init'] = function(block) {
  return 'public void robotInit() {\n' +
    Blockly.FRCJava.statementToCode(block, 'STEPS') +
    '}\n\n';
};

Blockly.FRCJava['frc_robot_periodic'] = function(block) {
  return 'public void robotPeriodic() {\n' +
    Blockly.FRCJava.statementToCode(block, 'STEPS') +
    '}\n\n';
};

Blockly.FRCJava['frc_simulation_init'] = function(block) {
  return 'public void simulationInit() {\n' +
    Blockly.FRCJava.statementToCode(block, 'STEPS') +
    '}\n\n';
};

Blockly.FRCJava['frc_simulation_periodic'] = function(block) {
  return 'public void simulationPeriodic() {\n' +
    Blockly.FRCJava.statementToCode(block, 'STEPS') +
    '}\n\n';
};

Blockly.FRCJava['frc_disabled_init'] = function(block) {
  return 'public void disabledInit() {\n' +
    Blockly.FRCJava.statementToCode(block, 'STEPS') +
    '}\n\n';
};

Blockly.FRCJava['frc_disabled_periodic'] = function(block) {
  return 'public void disabledPeriodic() {\n' +
    Blockly.FRCJava.statementToCode(block, 'STEPS') +
    '}\n\n';
};

Blockly.FRCJava['frc_autonomous_init'] = function(block) {
  return 'public void autonomousInit() {\n' +
    Blockly.FRCJava.statementToCode(block, 'STEPS') +
    '}\n\n';
};

Blockly.FRCJava['frc_autonomous_periodic'] = function(block) {
  return 'public void autonomousPeriodic() {\n' +
    Blockly.FRCJava.statementToCode(block, 'STEPS') +
    '}\n\n';
};

Blockly.FRCJava['frc_teleop_init'] = function(block) {
  return 'public void teleopInit() {\n' +
    Blockly.FRCJava.statementToCode(block, 'STEPS') +
    '}\n\n';
};

Blockly.FRCJava['frc_teleop_periodic'] = function(block) {
  return 'public void teleopPeriodic() {\n' +
    Blockly.FRCJava.statementToCode(block, 'STEPS') +
    '}\n\n';
};

Blockly.FRCJava['frc_test_init'] = function(block) {
  return 'public void testInit() {\n' +
    Blockly.FRCJava.statementToCode(block, 'STEPS') +
    '}\n\n';
};

Blockly.FRCJava['frc_test_periodic'] = function(block) {
  return 'public void testPeriodic() {\n' +
    Blockly.FRCJava.statementToCode(block, 'STEPS') +
    '}\n\n';
};

Blockly.FRCJava['comment_block'] = function(block) {
  const text = block.getFieldValue('TEXT');
  return `// ${text}\n`;
};

Blockly.Blocks['comment_block'].onchange = function(event) {
  if (event.type === Blockly.Events.BLOCK_CHANGE && 
      this.workspace.id === 'credits' && 
      this.isEditable()) {
    // Revert any changes made to credit blocks
    this.setFieldValue(this.getFieldValue('TEXT'), 'TEXT');
  }
};

Blockly.FRCJava['frc_joystick_getaxis'] = function(block) {
  const port = block.getFieldValue('PORT');
  const axis = block.getFieldValue('AXIS');
  return [`joystick${port}.getRawAxis(${axis})`, Blockly.FRCJava.ORDER_MEMBER];
};

Blockly.FRCJava['frc_joystick_getbutton'] = function(block) {
  const port = block.getFieldValue('PORT');
  const button = block.getFieldValue('BUTTON');
  return [`joystick${port}.getRawButton(${button})`, Blockly.FRCJava.ORDER_MEMBER];
};

Blockly.FRCJava['frc_pidcontroller_create'] = function(block) {
  const name = block.getFieldValue('NAME');
  const p = Blockly.FRCJava.valueToCode(block, 'P', Blockly.FRCJava.ORDER_ASSIGNMENT) || '0.1';
  const i = Blockly.FRCJava.valueToCode(block, 'I', Blockly.FRCJava.ORDER_ASSIGNMENT) || '0.0';
  const d = Blockly.FRCJava.valueToCode(block, 'D', Blockly.FRCJava.ORDER_ASSIGNMENT) || '0.0';
  return `PIDController ${name} = new PIDController(${p}, ${i}, ${d});\n`;
};

Blockly.FRCJava['frc_pidcontroller_calculate'] = function(block) {
  const name = block.getFieldValue('NAME');
  const setpoint = Blockly.FRCJava.valueToCode(block, 'SETPOINT', Blockly.FRCJava.ORDER_ASSIGNMENT) || '0';
  const measurement = Blockly.FRCJava.valueToCode(block, 'MEASUREMENT', Blockly.FRCJava.ORDER_ASSIGNMENT) || '0';
  return [`${name}.calculate(${measurement}, ${setpoint})`, Blockly.FRCJava.ORDER_MEMBER];
};

Blockly.FRCJava['frc_encoder_create'] = function(block) {
  const name = block.getFieldValue('NAME');
  const channelA = block.getFieldValue('CHANNEL_A');
  const channelB = block.getFieldValue('CHANNEL_B');
  return `Encoder ${name} = new Encoder(${channelA}, ${channelB});\n`;
};

Blockly.FRCJava['frc_timer'] = function(block) {
  const operation = block.getFieldValue('OPERATION');
  const seconds = Blockly.FRCJava.valueToCode(block, 'SECONDS', Blockly.FRCJava.ORDER_ASSIGNMENT) || '0';
  
  switch(operation) {
    case 'start':
      return 'timer.start();\n';
    case 'stop':
      return 'timer.stop();\n';
    case 'reset':
      return 'timer.reset();\n';
    case 'get':
      return ['timer.get()', Blockly.FRCJava.ORDER_MEMBER];
    case 'hasElapsed':
      return [`timer.hasElapsed(${seconds})`, Blockly.FRCJava.ORDER_MEMBER];
    default:
      return '';
  }
};

Blockly.FRCJava['frc_motorcontroller_safety'] = function(block) {
  const motorType = block.getFieldValue('MOTOR_TYPE');
  const channel = block.getFieldValue('CHANNEL');
  const state = block.getFieldValue('STATE');
  return `motor${channel}.setSafetyEnabled(${state});\n`;
};

Blockly.FRCJava['frc_motorcontroller_setinverted'] = function(block) {
  const motorType = block.getFieldValue('MOTOR_TYPE');
  const channel = block.getFieldValue('CHANNEL');
  const state = block.getFieldValue('STATE');
  return `motor${channel}.setInverted(${state});\n`;
};

Blockly.FRCJava['frc_encoder_setdistanceperpulse'] = function(block) {
  const channel = block.getFieldValue('CHANNEL');
  const distance = Blockly.FRCJava.valueToCode(block, 'DISTANCE', Blockly.FRCJava.ORDER_ASSIGNMENT) || '0';
  return `encoder${channel}.setDistancePerPulse(${distance});\n`;
};

Blockly.FRCJava['frc_pidcontroller_settolerance'] = function(block) {
  const name = block.getFieldValue('NAME');
  const tolerance = Blockly.FRCJava.valueToCode(block, 'TOLERANCE', Blockly.FRCJava.ORDER_ASSIGNMENT) || '0';
  return `${name}.setTolerance(${tolerance});\n`;
};

Blockly.FRCJava['frc_pidcontroller_at_setpoint'] = function(block) {
  const name = block.getFieldValue('NAME');
  return [`${name}.atSetpoint()`, Blockly.FRCJava.ORDER_MEMBER];
};

Blockly.FRCJava['frc_command_init'] = function(block) {
  const name = block.getFieldValue('NAME');
  return `public void initialize() {\n` +
    Blockly.FRCJava.statementToCode(block, 'STEPS') +
    `}\n\n`;
};

Blockly.FRCJava['frc_command_execute'] = function(block) {
  const name = block.getFieldValue('NAME');
  return `public void execute() {\n` +
    Blockly.FRCJava.statementToCode(block, 'STEPS') +
    `}\n\n`;
};

Blockly.FRCJava['frc_command_is_finished'] = function(block) {
  const name = block.getFieldValue('NAME');
  return [`public boolean isFinished() {\n` +
    Blockly.FRCJava.statementToCode(block, 'STEPS') +
    `}\n\n`, Blockly.FRCJava.ORDER_ATOMIC];
};

Blockly.FRCJava['frc_command_end'] = function(block) {
  const name = block.getFieldValue('NAME');
  return `public void end(boolean interrupted) {\n` +
    Blockly.FRCJava.statementToCode(block, 'STEPS') +
    `}\n\n`;
};

Blockly.FRCJava['frc_variable_declaration'] = function(block) {
  const type = block.getFieldValue('TYPE');
  const name = block.getFieldValue('NAME');
  const value = Blockly.FRCJava.valueToCode(block, 'VALUE', Blockly.FRCJava.ORDER_ASSIGNMENT) || Blockly.FRCJava.getDefaultValue(type);

  // Special handling for FRC types
  if (type === 'MotorController') {
    return `MotorController ${name} = new PWMSparkMax(0);\n` + 
           `${name}.set(${value});\n`;
  } else if (type === 'Joystick') {
    return `Joystick ${name} = new Joystick(${value || '0'});\n`;
  } else if (type === 'Encoder') {
    return `Encoder ${name} = new Encoder(${value || '0, 1'});\n`;
  } else if (type === 'PIDController') {
    return `PIDController ${name} = new PIDController(${value || '0.1, 0.0, 0.0'});\n`;
  } else if (type === 'Timer') {
    return `Timer ${name} = new Timer();\n`;
  }
  
  return `${type} ${name} = ${value};\n`;
};

Blockly.FRCJava['frc_variable_set'] = function(block) {
  const type = block.getFieldValue('TYPE');
  const name = block.getFieldValue('NAME');
  const value = Blockly.FRCJava.valueToCode(block, 'VALUE', Blockly.FRCJava.ORDER_ASSIGNMENT) || Blockly.FRCJava.getDefaultValue(type);
  return `${name} = ${value};\n`;
};

Blockly.FRCJava['frc_variable_get'] = function(block) {
  const name = block.getFieldValue('NAME');
  return [name, Blockly.FRCJava.ORDER_ATOMIC];
};

// Helper function to get default values for types
Blockly.FRCJava.getDefaultValue = function(type) {
  switch(type) {
    case 'int': return '0';
    case 'double': return '0.0';
    case 'boolean': return 'false';
    case 'String': return '""';
    case 'MotorController': return '0.0';
    case 'Joystick': return '0';
    case 'Encoder': return '0, 1';
    case 'PIDController': return '0.1, 0.0, 0.0';
    case 'Timer': return '0.0';
    default: return 'null';
  }
};

Blockly.Extensions.registerMutator('function_parameter_mutator',
  {
    mutationToDom: function() {
      const container = Blockly.utils.xml.createElement('mutation');
      const paramsInput = this.getInput('PARAMS_DUMMY');
      
      // Check if the input exists and has a connection
      if (paramsInput && paramsInput.connection) {
        const params = paramsInput.connection.targetBlock();
        if (params) {
          let paramCount = 0;
          let currentParam = params;
          while (currentParam) {
            paramCount++;
            const paramElement = Blockly.utils.xml.createElement('param');
            paramElement.setAttribute('type', currentParam.getFieldValue('PARAM_TYPE'));
            paramElement.setAttribute('name', currentParam.getFieldValue('PARAM_NAME'));
            container.appendChild(paramElement);
            currentParam = currentParam.nextConnection && currentParam.nextConnection.targetBlock();
          }
        }
      }
      return container;
    },

    domToMutation: function(xmlElement) {
      let paramBlock = null;
      for (let i = 0; i < xmlElement.childNodes.length; i++) {
        const paramElement = xmlElement.childNodes[i];
        if (paramElement.nodeName.toLowerCase() === 'param') {
          const newParam = this.workspace.newBlock('frc_function_parameter');
          newParam.setFieldValue(paramElement.getAttribute('type'), 'PARAM_TYPE');
          newParam.setFieldValue(paramElement.getAttribute('name'), 'PARAM_NAME');
          newParam.initSvg();
          newParam.render();
          
          if (paramBlock) {
            paramBlock.nextConnection.connect(newParam.previousConnection);
          } else {
            const paramsInput = this.getInput('PARAMS_DUMMY');
            if (paramsInput && paramsInput.connection) {
              paramsInput.connection.connect(newParam.previousConnection);
            }
          }
          paramBlock = newParam;
        }
      }
    },

    decompose: function(workspace) {
      const containerBlock = workspace.newBlock('frc_function_parameter_container');
      containerBlock.initSvg();
      
      const paramsInput = this.getInput('PARAMS_DUMMY');
      if (paramsInput && paramsInput.connection) {
        const params = paramsInput.connection.targetBlock();
        if (params) {
          let currentParam = params;
          while (currentParam) {
            const newParam = workspace.newBlock('frc_function_parameter');
            newParam.setFieldValue(currentParam.getFieldValue('PARAM_TYPE'), 'PARAM_TYPE');
            newParam.setFieldValue(currentParam.getFieldValue('PARAM_NAME'), 'PARAM_NAME');
            newParam.initSvg();
            newParam.render();
            
            if (paramBlock) {
              paramBlock.nextConnection.connect(newParam.previousConnection);
            } else {
              containerBlock.getInput('STACK').connection.connect(newParam.previousConnection);
            }
            paramBlock = newParam;
            
            currentParam = currentParam.nextConnection && currentParam.nextConnection.targetBlock();
          }
        }
      }
      return containerBlock;
    },

    compose: function(containerBlock) {
      let paramBlock = containerBlock.getInputTargetBlock('STACK');
      if (paramBlock) {
        let currentParam = paramBlock;
        let firstParam = null;
        
        while (currentParam) {
          if (currentParam.type === 'frc_function_parameter') {
            if (!firstParam) {
              firstParam = currentParam;
            }
          }
          currentParam = currentParam.nextConnection && currentParam.nextConnection.targetBlock();
        }
        
        if (firstParam) {
          const paramsInput = this.getInput('PARAMS_DUMMY');
          if (paramsInput && paramsInput.connection) {
            paramsInput.connection.connect(firstParam.previousConnection);
          }
        }
      } else {
        const paramsInput = this.getInput('PARAMS_DUMMY');
        if (paramsInput && paramsInput.connection) {
          paramsInput.connection.connect(null);
        }
      }
    },

    saveConnections: function(containerBlock) {
      let paramBlock = containerBlock.getInputTargetBlock('STACK');
      if (paramBlock) {
        let currentParam = paramBlock;
        let i = 0;
        
        while (currentParam) {
          const input = this.getInput('PARAM' + i);
          if (input) {
            currentParam.valueConnection_ = input.connection.targetConnection;
          }
          i++;
          currentParam = currentParam.nextConnection && currentParam.nextConnection.targetBlock();
        }
      }
    }
  }
);

Blockly.Extensions.registerMutator('function_argument_mutator',
  {
    mutationToDom: function() {
      const container = Blockly.utils.xml.createElement('mutation');
      const argsInput = this.getInput('PARAMS_DUMMY');
      
      // Check if the input exists and has a connection
      if (argsInput && argsInput.connection) {
        const args = argsInput.connection.targetBlock();
        if (args) {
          let argCount = 0;
          let currentArg = args;
          while (currentArg) {
            argCount++;
            container.setAttribute('arg' + argCount, 'true');
            currentArg = currentArg.nextConnection && currentArg.nextConnection.targetBlock();
          }
        }
      }
      return container;
    },

    domToMutation: function(xmlElement) {
      for (let i = 0; i < xmlElement.attributes.length; i++) {
        const attr = xmlElement.attributes[i];
        if (attr.name.startsWith('arg')) {
          const newArg = this.workspace.newBlock('frc_function_argument');
          newArg.initSvg();
          newArg.render();
          
          if (i === 0) {
            const argsInput = this.getInput('PARAMS_DUMMY');
            if (argsInput && argsInput.connection) {
              argsInput.connection.connect(newArg.previousConnection);
            }
          } else {
            const prevArg = this.getInput('ARG' + (i-1)).connection.targetBlock();
            if (prevArg) {
              prevArg.nextConnection.connect(newArg.previousConnection);
            }
          }
          
          this.appendValueInput('ARG' + i)
            .setCheck(null)
            .appendField('arg' + (i+1));
        }
      }
    },

    decompose: function(workspace) {
      const containerBlock = workspace.newBlock('frc_function_argument_container');
      containerBlock.initSvg();
      
      const argsInput = this.getInput('PARAMS_DUMMY');
      if (argsInput && argsInput.connection) {
        const args = argsInput.connection.targetBlock();
        if (args) {
          let currentArg = args;
          let i = 0;
          
          while (currentArg) {
            const newArg = workspace.newBlock('frc_function_argument');
            newArg.initSvg();
            newArg.render();
            
            if (i === 0) {
              containerBlock.getInput('STACK').connection.connect(newArg.previousConnection);
            } else {
              const prevArg = containerBlock.getInput('ARG' + (i-1)).connection.targetBlock();
              if (prevArg) {
                prevArg.nextConnection.connect(newArg.previousConnection);
              }
            }
            
            currentArg = currentArg.nextConnection && currentArg.nextConnection.targetBlock();
            i++;
          }
        }
      }
      return containerBlock;
    },

    compose: function(containerBlock) {
      let argBlock = containerBlock.getInputTargetBlock('STACK');
      if (argBlock) {
        let currentArg = argBlock;
        let i = 0;
        
        while (currentArg) {
          if (i > 0) {
            this.appendValueInput('ARG' + i)
              .setCheck(null)
              .appendField('arg' + (i+1));
          }
          
          currentArg = currentArg.nextConnection && currentArg.nextConnection.targetBlock();
          i++;
        }
        
        const argsInput = this.getInput('PARAMS_DUMMY');
        if (argsInput && argsInput.connection) {
          argsInput.connection.connect(argBlock.previousConnection);
        }
      } else {
        const argsInput = this.getInput('PARAMS_DUMMY');
        if (argsInput && argsInput.connection) {
          argsInput.connection.connect(null);
        }
      }
    },

    saveConnections: function(containerBlock) {
      let argBlock = containerBlock.getInputTargetBlock('STACK');
      if (argBlock) {
        let currentArg = argBlock;
        let i = 0;
        
        while (currentArg) {
          const input = this.getInput('ARG' + i);
          if (input) {
            currentArg.valueConnection_ = input.connection.targetConnection;
          }
          i++;
          currentArg = currentArg.nextConnection && currentArg.nextConnection.targetBlock();
        }
      }
    }
  }
);

Blockly.FRCJava['frc_custom_function_declare'] = function(block) {
  const accessModifier = block.getFieldValue('ACCESS_MODIFIER');
  const staticModifier = block.getFieldValue('STATIC_MODIFIER');
  const returnType = block.getFieldValue('RETURN_TYPE');
  const functionName = block.getFieldValue('FUNCTION_NAME');
  
  // Get parameters
  let params = '';
  const paramsInput = block.getInput('PARAMS_DUMMY');
  if (paramsInput && paramsInput.connection) {
    let paramBlock = paramsInput.connection.targetBlock();
    if (paramBlock) {
      let currentParam = paramBlock;
      while (currentParam) {
        if (params) params += ', ';
        params += currentParam.getFieldValue('PARAM_TYPE') + ' ' + 
                 currentParam.getFieldValue('PARAM_NAME');
        currentParam = currentParam.nextConnection && currentParam.nextConnection.targetBlock();
      }
    }
  }
  
  const body = Blockly.FRCJava.statementToCode(block, 'FUNCTION_BODY') || '';
  
  let code = '';
  if (accessModifier) code += accessModifier + ' ';
  if (staticModifier) code += staticModifier + ' ';
  code += returnType + ' ' + functionName + '(' + params + ') {\n' +
          body + 
          '}\n\n';
  return code;
};

Blockly.FRCJava['frc_custom_function_call'] = function(block) {
  const functionName = block.getFieldValue('FUNCTION_NAME');
  
  // Get arguments
  let args = '';
  for (let i = 0; i < block.inputList.length; i++) {
    const input = block.inputList[i];
    if (input.name.startsWith('ARG')) {
      const argCode = Blockly.FRCJava.valueToCode(block, input.name, 
        Blockly.FRCJava.ORDER_COMMA) || '';
      if (args) args += ', ';
      args += argCode;
    }
  }
  
  return [functionName + '(' + args + ')', Blockly.FRCJava.ORDER_FUNCTION_CALL];
};

Blockly.FRCJava['frc_function_parameter'] = function(block) {
  // This block is only used in the mutator and doesn't generate code directly
  return '';
};

Blockly.FRCJava['frc_function_argument'] = function(block) {
  // This block is only used in the mutator and doesn't generate code directly
  return '';
};

// Helper function to generate proper indentation
Blockly.FRCJava.scrub_ = function(block, code) {
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  const nextCode = nextBlock ? Blockly.FRCJava.blockToCode(nextBlock) : '';
  return code + nextCode;
};