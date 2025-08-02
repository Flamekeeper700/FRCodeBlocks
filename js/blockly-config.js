// Helper function to define FRC blocks with proper property handling
function defineFRCBlock(type, jsonDef) {
  Blockly.Blocks[type] = {
    init: function() {
      this.jsonInit(jsonDef);
      // Copy all custom properties to the instance
      for (const prop in jsonDef) {
        if (prop !== 'type' && prop !== 'message0' && prop !== 'args0') {
          this[prop] = jsonDef[prop];
        }
      }
    }
  };
}



// Initialize dataTypes if not exists
if (!window.dataTypes) {
  window.dataTypes = {
    getDefaultValue: (type) => {
      switch(type) {
        case 'int': return '0';
        case 'double': return '0.0';
        case 'boolean': return 'false';
        case 'String': return '""';
        default: return 'null';
      }
    },
    getDropdownOptions: () => [
      ['int', 'int'],
      ['double', 'double'],
      ['boolean', 'boolean'],
      ['String', 'String'],
      ['Joystick', 'Joystick'],
      ['Timer', 'Timer']
    ]
  };
}

// ==================== Drive System Blocks ====================
defineFRCBlock('frc_bind_tankdrive', {
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
  "tooltip": "Bind tank drive controls to controller axes",
  "data": {
    "imports": [
      "import edu.wpi.first.wpilibj.Joystick;",
      "import edu.wpi.first.wpilibj2.command.button.JoystickButton;"
    ]
  }
});

defineFRCBlock('frc_subsystem_tankdrive', {
  "type": "frc_subsystem_tankdrive",
  "message0": "Tank Drive left %1 right %2",
  "args0": [
    {"type": "input_value", "name": "LEFT_SPEED"},
    {"type": "input_value", "name": "RIGHT_SPEED"}
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 120,
  "tooltip": "Set tank drive speeds",
  "data": {
    "imports": []
  }
});

// ==================== Subsystem Blocks ====================
defineFRCBlock('frc_subsystem_init', {
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
  "tooltip": "Initialize a subsystem",
  "data": {
    "imports": [
      "import edu.wpi.first.wpilibj2.command.SubsystemBase;"
    ]
  }
});

defineFRCBlock('frc_subsystem_periodic', {
  "type": "frc_subsystem_periodic",
  "message0": "Subsystem Periodic",
  "previousStatement": null,
  "nextStatement": null,
  "colour": 180,
  "tooltip": "Periodic code for a subsystem",
  "data": {
    "imports": []
  }
});

// ==================== Robot Container Blocks ====================
defineFRCBlock('frc_robotcontainer_init', {
  "type": "frc_robotcontainer_init",
  "message0": "Robot Container Initialization %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "STEPS"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 200,
  "tooltip": "Initialize robot container",
  "data": {
    "imports": []
  }
});
defineFRCBlock('frc_robotcontainer_configurebuttonbindings', {
  "type": "frc_robotcontainer_configurebuttonbindings",
  "message0": "Configure Button Bindings %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "STEPS"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 200,
  "tooltip": "Configure button bindings",
  "data": {
    "imports": []
  }
});
defineFRCBlock('frc_robotcontainer_getautonomouscommand', {
  "type": "frc_robotcontainer_getautonomouscommand",
  "message0": "Get Autonomous Command %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "STEPS"
    }
  ],
  "output": "Command",
  "colour": 200,
  "tooltip": "Get autonomous command",
  "data": {
    "imports": [
      "import edu.wpi.first.wpilibj2.command.Command;"
    ]
  }
});
// ==================== Robot Lifecycle Blocks ====================
defineFRCBlock('frc_robot_init', {
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
  "tooltip": "Called once when the robot starts",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_robot_periodic', {
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
  "tooltip": "Called periodically while the robot is enabled",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_simulation_init', {
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
  "tooltip": "Called once when simulation starts",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_simulation_periodic', {
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
  "tooltip": "Called periodically during simulation",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_disabled_init', {
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
  "tooltip": "Called once when robot enters disabled mode",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_disabled_periodic', {
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
  "tooltip": "Called periodically while robot is disabled",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_autonomous_init', {
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
  "tooltip": "Called once when autonomous mode starts",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_autonomous_periodic', {
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
  "tooltip": "Called periodically during autonomous mode",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_teleop_init', {
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
  "tooltip": "Called once when teleop mode starts",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_teleop_periodic', {
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
  "tooltip": "Called periodically during teleop mode",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_test_init', {
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
  "tooltip": "Called once when test mode starts",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_test_periodic', {
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
  "tooltip": "Called periodically during test mode",
  "data": {
    "imports": []
  }
});

// ==================== Constants Blocks ====================
defineFRCBlock('frc_constants_motorports', {
  "type": "frc_constants_motorports",
  "message0": "Motor Ports: Left %1 Right %2",
  "args0": [
    {"type": "field_number", "name": "LEFT_MOTOR_PORT", "value": 0},
    {"type": "field_number", "name": "RIGHT_MOTOR_PORT", "value": 1}
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 330,
  "tooltip": "Define motor ports",
  "data": {
    "imports": []
  }
});

// ==================== Joystick Blocks ====================

// Joystick constructor block
defineFRCBlock('frc_joystick_create', {
  "type": "frc_joystick_create",
  "message0": "Create Joystick port %1",
  "args0": [
    {"type": "field_number", "name": "PORT", "value": 0}
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 30,
  "tooltip": "Create a new joystick instance",
  "data": {
    "imports": [
      "import edu.wpi.first.wpilibj.Joystick;"
    ]
  }
});

// Joystick axis channel configuration blocks
defineFRCBlock('frc_joystick_set_axis_channel', {
  "type": "frc_joystick_set_axis_channel",
  "message0": "Set %1 axis channel %2 for joystick %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "AXIS_TYPE",
      "options": [
        ["X", "X"],
        ["Y", "Y"],
        ["Z", "Z"],
        ["Twist", "TWIST"],
        ["Throttle", "THROTTLE"]
      ]
    },
    {"type": "field_number", "name": "CHANNEL", "value": 0},
    {"type": "field_input", "name": "JOYSTICK_NAME", "text": "joystick"}
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 30,
  "tooltip": "Set the channel for a specific joystick axis",
  "data": {
    "imports": []
  }
});

// Joystick axis value getters
defineFRCBlock('frc_joystick_get_axis', {
  "type": "frc_joystick_get_axis",
  "message0": "Get %1 axis value from joystick %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "AXIS_TYPE",
      "options": [
        ["X", "X"],
        ["Y", "Y"],
        ["Z", "Z"],
        ["Twist", "TWIST"],
        ["Throttle", "THROTTLE"]
      ]
    },
    {"type": "field_input", "name": "JOYSTICK_NAME", "text": "joystick"}
  ],
  "output": "Number",
  "colour": 30,
  "tooltip": "Get the value of a joystick axis",
  "data": {
    "imports": []
  }
});

// Joystick button blocks
defineFRCBlock('frc_joystick_get_button', {
  "type": "frc_joystick_get_button",
  "message0": "Get button %1 state from joystick %2",
  "args0": [
    {"type": "field_number", "name": "BUTTON", "value": 1},
    {"type": "field_input", "name": "JOYSTICK_NAME", "text": "joystick"}
  ],
  "output": "Boolean",
  "colour": 30,
  "tooltip": "Get the state of a joystick button",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_joystick_get_button_pressed', {
  "type": "frc_joystick_get_button_pressed",
  "message0": "Check if button %1 was pressed since last check on joystick %2",
  "args0": [
    {"type": "field_number", "name": "BUTTON", "value": 1},
    {"type": "field_input", "name": "JOYSTICK_NAME", "text": "joystick"}
  ],
  "output": "Boolean",
  "colour": 30,
  "tooltip": "Check if button was pressed since last check",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_joystick_get_button_released', {
  "type": "frc_joystick_get_button_released",
  "message0": "Check if button %1 was released since last check on joystick %2",
  "args0": [
    {"type": "field_number", "name": "BUTTON", "value": 1},
    {"type": "field_input", "name": "JOYSTICK_NAME", "text": "joystick"}
  ],
  "output": "Boolean",
  "colour": 30,
  "tooltip": "Check if button was released since last check",
  "data": {
    "imports": []
  }
});

// Special button blocks (trigger and top)
defineFRCBlock('frc_joystick_get_trigger', {
  "type": "frc_joystick_get_trigger",
  "message0": "Get trigger state from joystick %1",
  "args0": [
    {"type": "field_input", "name": "JOYSTICK_NAME", "text": "joystick"}
  ],
  "output": "Boolean",
  "colour": 30,
  "tooltip": "Get the state of the trigger button",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_joystick_get_top', {
  "type": "frc_joystick_get_top",
  "message0": "Get top button state from joystick %1",
  "args0": [
    {"type": "field_input", "name": "JOYSTICK_NAME", "text": "joystick"}
  ],
  "output": "Boolean",
  "colour": 30,
  "tooltip": "Get the state of the top button",
  "data": {
    "imports": []
  }
});

// Direction and magnitude blocks
defineFRCBlock('frc_joystick_get_magnitude', {
  "type": "frc_joystick_get_magnitude",
  "message0": "Get joystick %1 magnitude",
  "args0": [
    {"type": "field_input", "name": "JOYSTICK_NAME", "text": "joystick"}
  ],
  "output": "Number",
  "colour": 30,
  "tooltip": "Get the magnitude of the joystick vector",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_joystick_get_direction_degrees', {
  "type": "frc_joystick_get_direction_degrees",
  "message0": "Get joystick %1 direction (degrees)",
  "args0": [
    {"type": "field_input", "name": "JOYSTICK_NAME", "text": "joystick"}
  ],
  "output": "Number",
  "colour": 30,
  "tooltip": "Get the direction of the joystick in degrees (0 is forward, 90 is right)",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_joystick_get_direction_radians', {
  "type": "frc_joystick_get_direction_radians",
  "message0": "Get joystick %1 direction (radians)",
  "args0": [
    {"type": "field_input", "name": "JOYSTICK_NAME", "text": "joystick"}
  ],
  "output": "Number",
  "colour": 30,
  "tooltip": "Get the direction of the joystick in radians (0 is forward, π/2 is right)",
  "data": {
    "imports": []
  }
});

// ==================== Xbox Controller Blocks ====================
defineFRCBlock('frc_xboxcontroller_create', {
  "type": "frc_xboxcontroller_create",
  "message0": "Create Xbox Controller port %1",
  "args0": [
    {"type": "field_number", "name": "PORT", "value": 0}
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 30,
  "tooltip": "Create a new Xbox controller instance",
  "data": {
    "imports": [
      "import edu.wpi.first.wpilibj.XboxController;"
    ]
  }
});

// Axis value getters
defineFRCBlock('frc_xboxcontroller_get_axis', {
  "type": "frc_xboxcontroller_get_axis",
  "message0": "Get %1 axis from controller %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "AXIS",
      "options": [
        ["Left X", "LEFT_X"],
        ["Left Y", "LEFT_Y"],
        ["Right X", "RIGHT_X"],
        ["Right Y", "RIGHT_Y"],
        ["Left Trigger", "LEFT_TRIGGER"],
        ["Right Trigger", "RIGHT_TRIGGER"]
      ]
    },
    {"type": "field_input", "name": "CONTROLLER_NAME", "text": "controller"}
  ],
  "output": "Number",
  "colour": 30,
  "tooltip": "Get axis value from Xbox controller",
  "data": {
    "imports": []
  }
});

// Button blocks with dropdown
defineFRCBlock('frc_xboxcontroller_get_button', {
  "type": "frc_xboxcontroller_get_button",
  "message0": "Get %1 button state from controller %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "BUTTON",
      "options": [
        ["A", "A"],
        ["B", "B"],
        ["X", "X"],
        ["Y", "Y"],
        ["Left Bumper", "LEFT_BUMPER"],
        ["Right Bumper", "RIGHT_BUMPER"],
        ["Back", "BACK"],
        ["Start", "START"],
        ["Left Stick", "LEFT_STICK"],
        ["Right Stick", "RIGHT_STICK"]
      ]
    },
    {"type": "field_input", "name": "CONTROLLER_NAME", "text": "controller"}
  ],
  "output": "Boolean",
  "colour": 30,
  "tooltip": "Get button state from Xbox controller",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_xboxcontroller_get_button_pressed', {
  "type": "frc_xboxcontroller_get_button_pressed",
  "message0": "Check if %1 button was pressed since last check on controller %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "BUTTON",
      "options": [
        ["A", "A"],
        ["B", "B"],
        ["X", "X"],
        ["Y", "Y"],
        ["Left Bumper", "LEFT_BUMPER"],
        ["Right Bumper", "RIGHT_BUMPER"],
        ["Back", "BACK"],
        ["Start", "START"],
        ["Left Stick", "LEFT_STICK"],
        ["Right Stick", "RIGHT_STICK"]
      ]
    },
    {"type": "field_input", "name": "CONTROLLER_NAME", "text": "controller"}
  ],
  "output": "Boolean",
  "colour": 30,
  "tooltip": "Check if button was pressed since last check",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_xboxcontroller_get_button_released', {
  "type": "frc_xboxcontroller_get_button_released",
  "message0": "Check if %1 button was released since last check on controller %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "BUTTON",
      "options": [
        ["A", "A"],
        ["B", "B"],
        ["X", "X"],
        ["Y", "Y"],
        ["Left Bumper", "LEFT_BUMPER"],
        ["Right Bumper", "RIGHT_BUMPER"],
        ["Back", "BACK"],
        ["Start", "START"],
        ["Left Stick", "LEFT_STICK"],
        ["Right Stick", "RIGHT_STICK"]
      ]
    },
    {"type": "field_input", "name": "CONTROLLER_NAME", "text": "controller"}
  ],
  "output": "Boolean",
  "colour": 30,
  "tooltip": "Check if button was released since last check",
  "data": {
    "imports": []
  }
});

// Trigger event blocks
defineFRCBlock('frc_xboxcontroller_trigger_event', {
  "type": "frc_xboxcontroller_trigger_event",
  "message0": "%1 trigger event on controller %2 threshold %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "TRIGGER",
      "options": [
        ["Left", "LEFT"],
        ["Right", "RIGHT"]
      ]
    },
    {"type": "field_input", "name": "CONTROLLER_NAME", "text": "controller"},
    {"type": "input_value", "name": "THRESHOLD", "check": "Number"}
  ],
  "output": "Boolean",
  "colour": 30,
  "tooltip": "Trigger event when trigger exceeds threshold",
  "data": {
    "imports": [
      "import edu.wpi.first.wpilibj.event.EventLoop;"
    ]
  }
});

// Button event block
defineFRCBlock('frc_xboxcontroller_button_event', {
  "type": "frc_xboxcontroller_button_event",
  "message0": "%1 button event on controller %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "BUTTON",
      "options": [
        ["A", "A"],
        ["B", "B"],
        ["X", "X"],
        ["Y", "Y"],
        ["Left Bumper", "LEFT_BUMPER"],
        ["Right Bumper", "RIGHT_BUMPER"],
        ["Back", "BACK"],
        ["Start", "START"],
        ["Left Stick", "LEFT_STICK"],
        ["Right Stick", "RIGHT_STICK"]
      ]
    },
    {"type": "field_input", "name": "CONTROLLER_NAME", "text": "controller"}
  ],
  "output": "Boolean",
  "colour": 30,
  "tooltip": "Button event",
  "data": {
    "imports": [
      "import edu.wpi.first.wpilibj.event.EventLoop;"
    ]
  }
});

// ==================== PID Control Blocks ====================
defineFRCBlock('frc_pidcontroller_create', {
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
  "tooltip": "Create a PID controller",
  "data": {
    "imports": [
      "import edu.wpi.first.wpilibj.controller.PIDController;"
    ]
  }
});

defineFRCBlock('frc_pidcontroller_calculate', {
  "type": "frc_pidcontroller_calculate",
  "message0": "Calculate PID %1 Setpoint %2 Measurement %3",
  "args0": [
    {"type": "field_input", "name": "NAME", "text": "pidController"},
    {"type": "input_value", "name": "SETPOINT"},
    {"type": "input_value", "name": "MEASUREMENT"}
  ],
  "output": "Number",
  "colour": 220,
  "tooltip": "Calculate PID output",
  "data": {
    "imports": [
      "import edu.wpi.first.wpilibj.controller.PIDController;"
    ]
  }
});

defineFRCBlock('frc_pidcontroller_settolerance', {
  "type": "frc_pidcontroller_settolerance",
  "message0": "Set PID %1 tolerance absolute %2 meters",
  "args0": [
    {"type": "field_input", "name": "NAME", "text": "pidController"},
    {"type": "input_value", "name": "TOLERANCE"}
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 220,
  "tooltip": "Set PID controller absolute tolerance",
  "data": {
    "imports": [
      "import edu.wpi.first.wpilibj.controller.PIDController;"
    ]
  }
});

defineFRCBlock('frc_pidcontroller_at_setpoint', {
  "type": "frc_pidcontroller_at_setpoint",
  "message0": "PID %1 at setpoint",
  "args0": [
    {"type": "field_input", "name": "NAME", "text": "pidController"}
  ],
  "output": "Boolean",
  "colour": 220,
  "tooltip": "Check if PID controller is at setpoint",
  "data": {
    "imports": [
      "import edu.wpi.first.wpilibj.controller.PIDController;"
    ]
  }
});

// ==================== Timer Blocks ====================
defineFRCBlock('frc_timer', {
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
  "tooltip": "Timer operations",
  "data": {
    "imports": [
      "import edu.wpi.first.wpilibj.Timer;"
    ]
  }
});

// ==================== Command Blocks ====================
defineFRCBlock('frc_command_init', {
  "type": "frc_command_init",
  "message0": "Command %1 initialize %2",
  "args0": [
    {"type": "field_input", "name": "NAME", "text": "myCommand"},
    {"type": "input_statement", "name": "STEPS"}
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 260,
  "tooltip": "Command initialization",
  "data": {
    "imports": [
      "import edu.wpi.first.wpilibj2.command.CommandBase;"
    ]
  }
});

defineFRCBlock('frc_command_execute', {
  "type": "frc_command_execute",
  "message0": "Command %1 execute %2",
  "args0": [
    {"type": "field_input", "name": "NAME", "text": "myCommand"},
    {"type": "input_statement", "name": "STEPS"}
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 260,
  "tooltip": "Command execution",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_command_is_finished', {
  "type": "frc_command_is_finished",
  "message0": "Command %1 is finished %2",
  "args0": [
    {"type": "field_input", "name": "NAME", "text": "myCommand"},
    {"type": "input_statement", "name": "STEPS"}
  ],
  "output": "Boolean",
  "colour": 260,
  "tooltip": "Check if command is finished",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_command_end', {
  "type": "frc_command_end",
  "message0": "Command %1 end %2",
  "args0": [
    {"type": "field_input", "name": "NAME", "text": "myCommand"},
    {"type": "input_statement", "name": "STEPS"}
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 260,
  "tooltip": "Command end",
  "data": {
    "imports": []
  }
});

// ==================== Variable Blocks ====================
defineFRCBlock('frc_variable_declaration', {
  "type": "frc_variable_declaration",
  "message0": "Declare %1 %2 = %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "TYPE",
      "options": function() {
        try {
          if (window.dataTypes && window.dataTypes.getDropdownOptions) {
            const options = window.dataTypes.getDropdownOptions();
            return options.length > 0 ? options : [['int', 'int']];
          }
        } catch (e) {
          console.error('Error getting data types:', e);
        }
        return [['int', 'int']];
      }
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
  "tooltip": "Declare a variable with initialization",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_variable_set', {
  "type": "frc_variable_set",
  "message0": "Set %1 %2 = %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "TYPE",
      "options": function() {
        try {
          if (window.dataTypes && window.dataTypes.getDropdownOptions) {
            const options = window.dataTypes.getDropdownOptions();
            return options.length > 0 ? options : [['int', 'int']];
          }
        } catch (e) {
          console.error('Error getting data types:', e);
        }
        return [['int', 'int']];
      }
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
  "tooltip": "Set the value of an existing variable",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_variable_get', {
  "type": "frc_variable_get",
  "message0": "Get %1 %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "TYPE",
      "options": function() {
        try {
          if (window.dataTypes && window.dataTypes.getDropdownOptions) {
            const options = window.dataTypes.getDropdownOptions();
            return options.length > 0 ? options : [['int', 'int']];
          }
        } catch (e) {
          console.error('Error getting data types:', e);
        }
        return [['int', 'int']];
      }
    },
    {
      "type": "field_input",
      "name": "NAME",
      "text": "variableName"
    }
  ],
  "output": null,
  "colour": 330,
  "tooltip": "Get the value of a variable",
  "data": {
    "imports": []
  }
});

// ==================== Function Blocks ====================
defineFRCBlock('frc_custom_function_declare', {
  "type": "frc_custom_function_declare",
  "message0": "%1 %2 %3 function %4 ( %5 ) %6",
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
      "options": function() {
        try {
          if (window.dataTypes && window.dataTypes.getDropdownOptions) {
            return [['void', 'void'], ...window.dataTypes.getDropdownOptions()];
          }
        } catch (e) {
          console.error('Error getting data types:', e);
        }
        return [['void', 'void'], ['int', 'int']];
      }
    },
    {
      "type": "field_input",
      "name": "FUNCTION_NAME",
      "text": "myFunction"
    },
    {
      "type": "input_dummy",
      "name": "PARAMS"
    },
    {
      "type": "input_statement",
      "name": "FUNCTION_BODY"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 280,
  "tooltip": "Declare a custom function",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_function_call_statement', {
  "type": "frc_function_call_statement",
  "message0": "call %1 ( %2 )",
  "args0": [
    {
      "type": "field_input",
      "name": "FUNCTION_NAME",
      "text": "myFunction"
    },
    {
      "type": "input_dummy",
      "name": "ARGS"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 280,
  "tooltip": "Call a function as a statement",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_function_call_value', {
  "type": "frc_function_call_value",
  "message0": "call %1 ( %2 )",
  "args0": [
    {
      "type": "field_input",
      "name": "FUNCTION_NAME",
      "text": "myFunction"
    },
    {
      "type": "input_dummy",
      "name": "ARGS"
    }
  ],
  "output": null,
  "colour": 280,
  "tooltip": "Call a function as an expression",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_function_return', {
  "type": "frc_function_return",
  "message0": "return %1",
  "args0": [
    {
      "type": "input_value",
      "name": "VALUE",
      "check": null
    }
  ],
  "previousStatement": null,
  "colour": 280,
  "tooltip": "Return a value from a function",
  "data": {
    "imports": []
  }
});

// ==================== Logic Blocks ====================
defineFRCBlock('frc_logic_compare', {
  "type": "frc_logic_compare",
  "message0": "%1 %2 %3",
  "args0": [
    {
      "type": "input_value",
      "name": "A"
    },
    {
      "type": "field_dropdown",
      "name": "OP",
      "options": [
        ["==", "EQ"],
        ["!=", "NEQ"],
        ["<", "LT"],
        ["<=", "LTE"],
        [">", "GT"],
        [">=", "GTE"]
      ]
    },
    {
      "type": "input_value",
      "name": "B"
    }
  ],
  "output": "Boolean",
  "colour": 230,
  "tooltip": "Compare two values",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_logic_operation', {
  "type": "frc_logic_operation",
  "message0": "%1 %2 %3",
  "args0": [
    {
      "type": "input_value",
      "name": "A",
      "check": "Boolean"
    },
    {
      "type": "field_dropdown",
      "name": "OP",
      "options": [
        ["AND", "AND"],
        ["OR", "OR"]
      ]
    },
    {
      "type": "input_value",
      "name": "B",
      "check": "Boolean"
    }
  ],
  "output": "Boolean",
  "colour": 230,
  "tooltip": "Logical AND/OR operation",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_logic_negate', {
  "type": "frc_logic_negate",
  "message0": "NOT %1",
  "args0": [
    {
      "type": "input_value",
      "name": "BOOL",
      "check": "Boolean"
    }
  ],
  "output": "Boolean",
  "colour": 230,
  "tooltip": "Logical NOT operation",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_logic_boolean', {
  "type": "frc_logic_boolean",
  "message0": "%1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "BOOL",
      "options": [
        ["true", "TRUE"],
        ["false", "FALSE"]
      ]
    }
  ],
  "output": "Boolean",
  "colour": 230,
  "tooltip": "Boolean constant",
  "data": {
    "imports": []
  }
});

// ==================== Math Blocks ====================
defineFRCBlock('frc_math_arithmetic', {
  "type": "frc_math_arithmetic",
  "message0": "%1 %2 %3",
  "args0": [
    {
      "type": "input_value",
      "name": "A",
      "check": "Number"
    },
    {
      "type": "field_dropdown",
      "name": "OP",
      "options": [
        ["+", "ADD"],
        ["-", "MINUS"],
        ["×", "MULTIPLY"],
        ["÷", "DIVIDE"],
        ["^", "POWER"]
      ]
    },
    {
      "type": "input_value",
      "name": "B",
      "check": "Number"
    }
  ],
  "output": "Number",
  "colour": 240,
  "tooltip": "Basic arithmetic operations",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_math_single', {
  "type": "frc_math_single",
  "message0": "%1 %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "OP",
      "options": [
        ["√", "ROOT"],
        ["abs", "ABS"],
        ["-", "NEG"],
        ["ln", "LN"],
        ["log10", "LOG10"],
        ["e^", "EXP"],
        ["10^", "POW10"]
      ]
    },
    {
      "type": "input_value",
      "name": "NUM",
      "check": "Number"
    }
  ],
  "output": "Number",
  "colour": 240,
  "tooltip": "Single input math operations",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_math_trig', {
  "type": "frc_math_trig",
  "message0": "%1 %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "OP",
      "options": [
        ["sin", "SIN"],
        ["cos", "COS"],
        ["tan", "TAN"],
        ["asin", "ASIN"],
        ["acos", "ACOS"],
        ["atan", "ATAN"]
      ]
    },
    {
      "type": "input_value",
      "name": "NUM",
      "check": "Number"
    }
  ],
  "output": "Number",
  "colour": 240,
  "tooltip": "Trigonometric functions",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_math_number', {
  "type": "frc_math_number",
  "message0": "%1",
  "args0": [
    {
      "type": "field_number",
      "name": "NUM",
      "value": 0
    }
  ],
  "output": "Number",
  "colour": 240,
  "tooltip": "Number constant",
  "data": {
    "imports": []
  }
});

// ==================== Control Blocks ====================
defineFRCBlock('frc_controls_if', {
  "type": "frc_controls_if",
  "message0": "if %1 then %2",
  "args0": [
    {
      "type": "input_value",
      "name": "CONDITION",
      "check": "Boolean"
    },
    {
      "type": "input_statement",
      "name": "THEN_STATEMENT"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "Execute blocks if condition is true",
  "data": {
    "imports": []
  }
});

defineFRCBlock('frc_controls_ifelse', {
  "type": "frc_controls_ifelse",
  "message0": "if %1 then %2 else %3",
  "args0": [
    {
      "type": "input_value",
      "name": "CONDITION",
      "check": "Boolean"
    },
    {
      "type": "input_statement",
      "name": "THEN_STATEMENT"
    },
    {
      "type": "input_statement",
      "name": "ELSE_STATEMENT"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "Execute different blocks depending on condition",
  "data": {
    "imports": []
  }
});

// ==================== Comment Block ====================
defineFRCBlock('comment_block', {
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
  "tooltip": "Add a code comment",
  "data": {
    "imports": []
  }
});

// ==================== Initialize Generator ====================
Blockly.FRCJava = new Blockly.Generator('FRCJava');

// Define order constants for operations
Blockly.FRCJava.ORDER_ATOMIC = 0;
Blockly.FRCJava.ORDER_MEMBER = 1;
Blockly.FRCJava.ORDER_FUNCTION_CALL = 2;
Blockly.FRCJava.ORDER_INCREMENT = 3;
Blockly.FRCJava.ORDER_DECREMENT = 3;
Blockly.FRCJava.ORDER_BITWISE_NOT = 4;
Blockly.FRCJava.ORDER_UNARY_PLUS = 4;
Blockly.FRCJava.ORDER_UNARY_NEGATION = 4;
Blockly.FRCJava.ORDER_LOGICAL_NOT = 4;
Blockly.FRCJava.ORDER_MULTIPLICATION = 5;
Blockly.FRCJava.ORDER_DIVISION = 5;
Blockly.FRCJava.ORDER_MODULUS = 5;
Blockly.FRCJava.ORDER_ADDITION = 6;
Blockly.FRCJava.ORDER_SUBTRACTION = 6;
Blockly.FRCJava.ORDER_RELATIONAL = 8;
Blockly.FRCJava.ORDER_EQUALITY = 9;
Blockly.FRCJava.ORDER_LOGICAL_AND = 13;
Blockly.FRCJava.ORDER_LOGICAL_OR = 14;
Blockly.FRCJava.ORDER_CONDITIONAL = 15;
Blockly.FRCJava.ORDER_ASSIGNMENT = 16;
Blockly.FRCJava.ORDER_NONE = 99;

// Add reserved words
Blockly.FRCJava.RESERVED_WORDS_ = 'abstract,assert,boolean,break,byte,case,catch,char,class,const,' +
  'continue,default,do,double,else,enum,extends,final,finally,float,for,goto,if,' +
  'implements,import,instanceof,int,interface,long,native,new,package,private,' +
  'protected,public,return,short,static,strictfp,super,switch,synchronized,' +
  'this,throw,throws,transient,try,void,volatile,while';

// ==================== Generator Functions ====================

// Drive System Generators
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


// Subsystem Generators
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

// Robot Container Generators
Blockly.FRCJava['frc_robotcontainer_init'] = function(block) {
  return `public class RobotContainer {\n` +
    `  public RobotContainer() {\n` +
    Blockly.FRCJava.statementToCode(block, 'STEPS') +
    `  }\n\n`;
};
Blockly.FRCJava['frc_robotcontainer_configurebuttonbindings'] = function(block) {
  return `private void configureButtonBindings() {\n` +
    Blockly.FRCJava.statementToCode(block, 'STEPS') +
    `}\n\n`;
};
Blockly.FRCJava['frc_robotcontainer_getautonomouscommand'] = function(block) {
  const steps = Blockly.FRCJava.statementToCode(block, 'STEPS') || '';
  return [`new CommandBase() {\n` +
    `  @Override\n` +
    `  public void initialize() {\n` +
    steps +
    `  }\n` +
    `  @Override\n` +
    `  public boolean isFinished() {\n` +
    `    return true;\n` +
    `  }\n` +
    `}`, Blockly.FRCJava.ORDER_ATOMIC];
};

// Robot Lifecycle Generators
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

// Constants Generators
Blockly.FRCJava['frc_constants_motorports'] = function(block) {
  const leftPort = block.getFieldValue('LEFT_MOTOR_PORT');
  const rightPort = block.getFieldValue('RIGHT_MOTOR_PORT');
  return `public static final class Constants {\n` +
    `  public static final int LEFT_MOTOR_PORT = ${leftPort};\n` +
    `  public static final int RIGHT_MOTOR_PORT = ${rightPort};\n` +
    `}\n\n`;
};

//  Joystick Generators 

Blockly.FRCJava['frc_joystick_create'] = function(block) {
  const port = block.getFieldValue('PORT');
  return `Joystick joystick${port} = new Joystick(${port});\n`;
};

Blockly.FRCJava['frc_joystick_set_axis_channel'] = function(block) {
  const axisType = block.getFieldValue('AXIS_TYPE');
  const channel = block.getFieldValue('CHANNEL');
  const joystickName = block.getFieldValue('JOYSTICK_NAME');
  
  const methodMap = {
    'X': 'setXChannel',
    'Y': 'setYChannel',
    'Z': 'setZChannel',
    'TWIST': 'setTwistChannel',
    'THROTTLE': 'setThrottleChannel'
  };
  
  return `${joystickName}.${methodMap[axisType]}(${channel});\n`;
};

Blockly.FRCJava['frc_joystick_get_axis'] = function(block) {
  const axisType = block.getFieldValue('AXIS_TYPE');
  const joystickName = block.getFieldValue('JOYSTICK_NAME');
  
  const methodMap = {
    'X': 'getX',
    'Y': 'getY',
    'Z': 'getZ',
    'TWIST': 'getTwist',
    'THROTTLE': 'getThrottle'
  };
  
  return [`${joystickName}.${methodMap[axisType]}()`, Blockly.FRCJava.ORDER_MEMBER];
};

Blockly.FRCJava['frc_joystick_get_button'] = function(block) {
  const button = block.getFieldValue('BUTTON');
  const joystickName = block.getFieldValue('JOYSTICK_NAME');
  return [`${joystickName}.getRawButton(${button})`, Blockly.FRCJava.ORDER_MEMBER];
};

Blockly.FRCJava['frc_joystick_get_button_pressed'] = function(block) {
  const button = block.getFieldValue('BUTTON');
  const joystickName = block.getFieldValue('JOYSTICK_NAME');
  return [`${joystickName}.getRawButtonPressed(${button})`, Blockly.FRCJava.ORDER_MEMBER];
};

Blockly.FRCJava['frc_joystick_get_button_released'] = function(block) {
  const button = block.getFieldValue('BUTTON');
  const joystickName = block.getFieldValue('JOYSTICK_NAME');
  return [`${joystickName}.getRawButtonReleased(${button})`, Blockly.FRCJava.ORDER_MEMBER];
};

Blockly.FRCJava['frc_joystick_get_trigger'] = function(block) {
  const joystickName = block.getFieldValue('JOYSTICK_NAME');
  return [`${joystickName}.getTrigger()`, Blockly.FRCJava.ORDER_MEMBER];
};

Blockly.FRCJava['frc_joystick_get_top'] = function(block) {
  const joystickName = block.getFieldValue('JOYSTICK_NAME');
  return [`${joystickName}.getTop()`, Blockly.FRCJava.ORDER_MEMBER];
};

Blockly.FRCJava['frc_joystick_get_magnitude'] = function(block) {
  const joystickName = block.getFieldValue('JOYSTICK_NAME');
  return [`${joystickName}.getMagnitude()`, Blockly.FRCJava.ORDER_MEMBER];
};

Blockly.FRCJava['frc_joystick_get_direction_degrees'] = function(block) {
  const joystickName = block.getFieldValue('JOYSTICK_NAME');
  return [`${joystickName}.getDirectionDegrees()`, Blockly.FRCJava.ORDER_MEMBER];
};

Blockly.FRCJava['frc_joystick_get_direction_radians'] = function(block) {
  const joystickName = block.getFieldValue('JOYSTICK_NAME');
  return [`${joystickName}.getDirectionRadians()`, Blockly.FRCJava.ORDER_MEMBER];
};


//  Xbox Controller Generators 
Blockly.FRCJava['frc_xboxcontroller_create'] = function(block) {
  const port = block.getFieldValue('PORT');
  return `XboxController controller${port} = new XboxController(${port});\n`;
};

Blockly.FRCJava['frc_xboxcontroller_get_axis'] = function(block) {
  const controllerName = block.getFieldValue('CONTROLLER_NAME');
  const axis = block.getFieldValue('AXIS');
  
  const methodMap = {
    'LEFT_X': 'getLeftX',
    'LEFT_Y': 'getLeftY',
    'RIGHT_X': 'getRightX',
    'RIGHT_Y': 'getRightY',
    'LEFT_TRIGGER': 'getLeftTriggerAxis',
    'RIGHT_TRIGGER': 'getRightTriggerAxis'
  };
  
  return [`${controllerName}.${methodMap[axis]}()`, Blockly.FRCJava.ORDER_MEMBER];
};

Blockly.FRCJava['frc_xboxcontroller_get_button'] = function(block) {
  const controllerName = block.getFieldValue('CONTROLLER_NAME');
  const button = block.getFieldValue('BUTTON');
  return [`${controllerName}.get${button}Button()`, Blockly.FRCJava.ORDER_MEMBER];
};

Blockly.FRCJava['frc_xboxcontroller_get_button_pressed'] = function(block) {
  const controllerName = block.getFieldValue('CONTROLLER_NAME');
  const button = block.getFieldValue('BUTTON');
  return [`${controllerName}.get${button}ButtonPressed()`, Blockly.FRCJava.ORDER_MEMBER];
};

Blockly.FRCJava['frc_xboxcontroller_get_button_released'] = function(block) {
  const controllerName = block.getFieldValue('CONTROLLER_NAME');
  const button = block.getFieldValue('BUTTON');
  return [`${controllerName}.get${button}ButtonReleased()`, Blockly.FRCJava.ORDER_MEMBER];
};

Blockly.FRCJava['frc_xboxcontroller_trigger_event'] = function(block) {
  const controllerName = block.getFieldValue('CONTROLLER_NAME');
  const trigger = block.getFieldValue('TRIGGER').toLowerCase();
  const threshold = Blockly.FRCJava.valueToCode(block, 'THRESHOLD', Blockly.FRCJava.ORDER_NONE) || '0.5';
  return [`${controllerName}.${trigger}Trigger(${threshold}, loop)`, Blockly.FRCJava.ORDER_MEMBER];
};

Blockly.FRCJava['frc_xboxcontroller_button_event'] = function(block) {
  const controllerName = block.getFieldValue('CONTROLLER_NAME');
  const button = block.getFieldValue('BUTTON').toLowerCase();
  return [`${controllerName}.${button}(loop)`, Blockly.FRCJava.ORDER_MEMBER];
};


// PID Control Generators
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

Blockly.FRCJava['frc_pidcontroller_settolerance'] = function(block) {
  const name = block.getFieldValue('NAME');
  const tolerance = Blockly.FRCJava.valueToCode(block, 'TOLERANCE', Blockly.FRCJava.ORDER_ASSIGNMENT) || '0';
  return `${name}.setTolerance(${tolerance});\n`;
};

Blockly.FRCJava['frc_pidcontroller_at_setpoint'] = function(block) {
  const name = block.getFieldValue('NAME');
  return [`${name}.atSetpoint()`, Blockly.FRCJava.ORDER_MEMBER];
};

// Timer Generators
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

// Command Generators
Blockly.FRCJava['frc_command_init'] = function(block) {
  const name = block.getFieldValue('NAME');
  const steps = Blockly.FRCJava.statementToCode(block, 'STEPS') || '';
  return `public void initialize() {\n` +
    steps +
    `}\n\n`;
};

Blockly.FRCJava['frc_command_execute'] = function(block) {
  const name = block.getFieldValue('NAME');
  const steps = Blockly.FRCJava.statementToCode(block, 'STEPS') || '';
  return `public void execute() {\n` +
    steps +
    `}\n\n`;
};

Blockly.FRCJava['frc_command_is_finished'] = function(block) {
  const name = block.getFieldValue('NAME');
  const steps = Blockly.FRCJava.statementToCode(block, 'STEPS') || 'return false;';
  return [`public boolean isFinished() {\n` +
    steps +
    `}\n\n`, Blockly.FRCJava.ORDER_ATOMIC];
};

Blockly.FRCJava['frc_command_end'] = function(block) {
  const name = block.getFieldValue('NAME');
  const steps = Blockly.FRCJava.statementToCode(block, 'STEPS') || '';
  return `public void end(boolean interrupted) {\n` +
    steps +
    `}\n\n`;
};

// Variable Generators
Blockly.FRCJava['frc_variable_declaration'] = function(block) {
  const type = block.getFieldValue('TYPE');
  const name = block.getFieldValue('NAME');
  const value = Blockly.FRCJava.valueToCode(block, 'VALUE', Blockly.FRCJava.ORDER_ASSIGNMENT);
  
  let defaultValue = window.dataTypes.getDefaultValue(type) || 'null';
  const finalValue = value || defaultValue;

  // Handle FRC-specific types
  if (type === 'MotorController') {
    return `MotorController ${name} = new PWMSparkMax(0);\n` + 
           `${name}.set(${finalValue});\n`;
  } else if (type === 'Joystick') {
    return `Joystick ${name} = new Joystick(${finalValue || '0'});\n`;
  } else if (type === 'Encoder') {
    return `Encoder ${name} = new Encoder(${finalValue || '0, 1'});\n`;
  } else if (type === 'PIDController') {
    return `PIDController ${name} = new PIDController(${finalValue || '0.1, 0.0, 0.0'});\n`;
  } else if (type === 'Timer') {
    return `Timer ${name} = new Timer();\n`;
  }
  
  // Handle standard types
  return `${type} ${name} = ${finalValue};\n`;
};

Blockly.FRCJava['frc_variable_set'] = function(block) {
  const type = block.getFieldValue('TYPE');
  const name = block.getFieldValue('NAME');
  const value = Blockly.FRCJava.valueToCode(block, 'VALUE', Blockly.FRCJava.ORDER_ASSIGNMENT) || window.dataTypes.getDefaultValue(type);
  return `${name} = ${value};\n`;
};

Blockly.FRCJava['frc_variable_get'] = function(block) {
  const name = block.getFieldValue('NAME');
  return [name, Blockly.FRCJava.ORDER_ATOMIC];
};

// Function Generators
Blockly.FRCJava['frc_custom_function_declare'] = function(block) {
  const accessModifier = block.getFieldValue('ACCESS_MODIFIER');
  const staticModifier = block.getFieldValue('STATIC_MODIFIER');
  const returnType = block.getFieldValue('RETURN_TYPE');
  const functionName = block.getFieldValue('FUNCTION_NAME');
  const body = Blockly.FRCJava.statementToCode(block, 'FUNCTION_BODY') || '';
  
  const hasReturn = body.includes('return');
  const needsReturn = returnType !== 'void' && !hasReturn;
  
  let code = '';
  if (accessModifier && accessModifier !== '---') code += accessModifier + ' ';
  if (staticModifier && staticModifier !== '---') code += staticModifier + ' ';
  code += returnType + ' ' + functionName + '() {\n' +
          body;
  
  if (needsReturn) {
    const defaultValue = window.dataTypes.getDefaultValue(returnType) || 'null';
    code += '  return ' + defaultValue + ';\n';
  }
  
  code += '}\n\n';
  return code;
};

Blockly.FRCJava['frc_function_call_statement'] = function(block) {
  const functionName = block.getFieldValue('FUNCTION_NAME');
  return functionName + '();\n';
};

Blockly.FRCJava['frc_function_call_value'] = function(block) {
  const functionName = block.getFieldValue('FUNCTION_NAME');
  return [functionName + '()', Blockly.FRCJava.ORDER_FUNCTION_CALL];
};

Blockly.FRCJava['frc_function_return'] = function(block) {
  const value = Blockly.FRCJava.valueToCode(block, 'VALUE', Blockly.FRCJava.ORDER_NONE) || 'null';
  return 'return ' + value + ';\n';
};

// Logic Generators
Blockly.FRCJava['frc_logic_compare'] = function(block) {
  const a = Blockly.FRCJava.valueToCode(block, 'A', Blockly.FRCJava.ORDER_RELATIONAL) || '0';
  const op = block.getFieldValue('OP');
  const b = Blockly.FRCJava.valueToCode(block, 'B', Blockly.FRCJava.ORDER_RELATIONAL) || '0';
  
  const operators = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  
  return [`${a} ${operators[op]} ${b}`, Blockly.FRCJava.ORDER_RELATIONAL];
};

Blockly.FRCJava['frc_logic_operation'] = function(block) {
  const a = Blockly.FRCJava.valueToCode(block, 'A', Blockly.FRCJava.ORDER_LOGICAL_AND) || 'false';
  const op = block.getFieldValue('OP');
  const b = Blockly.FRCJava.valueToCode(block, 'B', Blockly.FRCJava.ORDER_LOGICAL_AND) || 'false';
  
  const operator = op === 'AND' ? '&&' : '||';
  return [`${a} ${operator} ${b}`, Blockly.FRCJava.ORDER_LOGICAL_AND];
};

Blockly.FRCJava['frc_logic_negate'] = function(block) {
  const bool = Blockly.FRCJava.valueToCode(block, 'BOOL', Blockly.FRCJava.ORDER_LOGICAL_NOT) || 'false';
  return [`!(${bool})`, Blockly.FRCJava.ORDER_LOGICAL_NOT];
};

Blockly.FRCJava['frc_logic_boolean'] = function(block) {
  return [block.getFieldValue('BOOL').toLowerCase(), Blockly.FRCJava.ORDER_ATOMIC];
};

// Math Generators
Blockly.FRCJava['frc_math_arithmetic'] = function(block) {
  const a = Blockly.FRCJava.valueToCode(block, 'A', Blockly.FRCJava.ORDER_ADDITION) || '0';
  const op = block.getFieldValue('OP');
  const b = Blockly.FRCJava.valueToCode(block, 'B', Blockly.FRCJava.ORDER_ADDITION) || '0';
  
  const operators = {
    'ADD': '+',
    'MINUS': '-',
    'MULTIPLY': '*',
    'DIVIDE': '/',
    'POWER': '**'
  };
  
  const order = op === 'POWER' ? Blockly.FRCJava.ORDER_EXPONENTIATION :
               (op === 'MULTIPLY' || op === 'DIVIDE') ? Blockly.FRCJava.ORDER_MULTIPLICATIVE :
               Blockly.FRCJava.ORDER_ADDITIVE;
  
  return [`${a} ${operators[op]} ${b}`, order];
};

Blockly.FRCJava['frc_math_single'] = function(block) {
  const op = block.getFieldValue('OP');
  const num = Blockly.FRCJava.valueToCode(block, 'NUM', Blockly.FRCJava.ORDER_NONE) || '0';
  
  const functions = {
    'ROOT': 'Math.sqrt',
    'ABS': 'Math.abs',
    'NEG': '-',
    'LN': 'Math.log',
    'LOG10': 'Math.log10',
    'EXP': 'Math.exp',
    'POW10': 'Math.pow(10,'
  };
  
  if (op === 'POW10') {
    return [`${functions[op]}${num})`, Blockly.FRCJava.ORDER_FUNCTION_CALL];
  }
  
  if (op === 'NEG') {
    return [`-${num}`, Blockly.FRCJava.ORDER_UNARY_NEGATION];
  }
  
  return [`${functions[op]}(${num})`, Blockly.FRCJava.ORDER_FUNCTION_CALL];
};

Blockly.FRCJava['frc_math_trig'] = function(block) {
  const op = block.getFieldValue('OP');
  const num = Blockly.FRCJava.valueToCode(block, 'NUM', Blockly.FRCJava.ORDER_NONE) || '0';
  
  // Convert degrees to radians for trig functions
  if (['SIN', 'COS', 'TAN'].includes(op)) {
    return [`Math.${op.toLowerCase()}(${num} * Math.PI / 180)`, Blockly.FRCJava.ORDER_FUNCTION_CALL];
  }
  
  // Convert result to degrees for inverse trig functions
  if (['ASIN', 'ACOS', 'ATAN'].includes(op)) {
    return [`Math.${op.toLowerCase()}(${num}) * 180 / Math.PI`, Blockly.FRCJava.ORDER_MULTIPLICATIVE];
  }
  
  return [`Math.${op.toLowerCase()}(${num})`, Blockly.FRCJava.ORDER_FUNCTION_CALL];
};

Blockly.FRCJava['frc_math_number'] = function(block) {
  return [block.getFieldValue('NUM'), Blockly.FRCJava.ORDER_ATOMIC];
};

// Control Generators
Blockly.FRCJava['frc_controls_if'] = function(block) {
  const condition = Blockly.FRCJava.valueToCode(block, 'CONDITION', 
    Blockly.FRCJava.ORDER_NONE) || 'false';
  const thenCode = Blockly.FRCJava.statementToCode(block, 'THEN_STATEMENT') || '';
  
  let code = '';
  code += 'if (' + condition + ') {\n';
  code += thenCode;
  code += '}\n';
  
  return code;
};

Blockly.FRCJava['frc_controls_ifelse'] = function(block) {
  const condition = Blockly.FRCJava.valueToCode(block, 'CONDITION', 
    Blockly.FRCJava.ORDER_NONE) || 'false';
  const thenCode = Blockly.FRCJava.statementToCode(block, 'THEN_STATEMENT') || '';
  const elseCode = Blockly.FRCJava.statementToCode(block, 'ELSE_STATEMENT') || '';
  
  let code = '';
  code += 'if (' + condition + ') {\n';
  code += thenCode;
  code += '} else {\n';
  code += elseCode;
  code += '}\n';
  
  return code;
};

// Comment Generator
Blockly.FRCJava['comment_block'] = function(block) {
  const text = block.getFieldValue('TEXT');
  return `// ${text}\n`;
};

// Helper function to generate proper indentation
Blockly.FRCJava.scrub_ = function(block, code) {
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  const nextCode = nextBlock ? Blockly.FRCJava.blockToCode(nextBlock) : '';
  return code + nextCode;
};

Blockly.ContextMenuRegistry.registry.register({
  displayText: 'Delete Block',
  preconditionFn: function(scope) {
    return scope.block.isDeletable() ? 'enabled' : 'disabled';
  },
  callback: function(scope) {
    scope.block.dispose();
  },
  scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
  id: 'deleteBlock',
  weight: 1
});

Blockly.ContextMenuRegistry.registry.register({
  displayText: 'Duplicate Block',
  preconditionFn: function(scope) {
    return scope.block.isDuplicatable() ? 'enabled' : 'disabled';
  },
  callback: function(scope) {
    Blockly.duplicate_(scope.block);
  },
  scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
  id: 'duplicateBlock',
  weight: 2
});