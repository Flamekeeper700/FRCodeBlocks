Blockly.defineBlocksWithJsonArray([
  // Robot Base Blocks (unchanged)
  {
    "type": "frc_robot_init",
    "message0": "robotInit %1",
    "args0": [{
      "type": "input_statement",
      "name": "STATEMENTS"
    }],
    "colour": 160,
    "tooltip": "Called when the robot first starts up",
    "previousStatement": null,
    "nextStatement": null
  },
  {
    "type": "frc_robot_periodic",
    "message0": "robotPeriodic %1",
    "args0": [{
      "type": "input_statement",
      "name": "STATEMENTS"
    }],
    "colour": 160,
    "tooltip": "Called periodically during all robot modes",
    "previousStatement": null,
    "nextStatement": null
  },
  {
    "type": "frc_autonomous_init",
    "message0": "autonomousInit %1",
    "args0": [{
      "type": "input_statement",
      "name": "STATEMENTS"
    }],
    "colour": 200,
    "tooltip": "Called when autonomous mode starts",
    "previousStatement": null,
    "nextStatement": null
  },
  {
    "type": "frc_teleop_init",
    "message0": "teleopInit %1",
    "args0": [{
      "type": "input_statement",
      "name": "STATEMENTS"
    }],
    "colour": 200,
    "tooltip": "Called when teleop mode starts",
    "previousStatement": null,
    "nextStatement": null
  },

  // Subsystem Blocks (updated)
  {
    "type": "frc_subsystem",
    "message0": "subsystem %1 initialize %2 periodic %3",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "DriveTrain"
      },
      {
        "type": "input_statement",
        "name": "INIT"
      },
      {
        "type": "input_statement",
        "name": "PERIODIC"
      }
    ],
    "output": "Subsystem",
    "colour": 120,
    "tooltip": "Defines a subsystem with initialization and periodic code",
    "mutator": "frc_subsystem_mutator"
  },

  // Command Blocks (updated)
  {
    "type": "frc_command",
    "message0": "command %1 initialize %2 execute %3 end %4 isFinished? %5",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "AutoCommand"
      },
      {
        "type": "input_statement",
        "name": "INIT"
      },
      {
        "type": "input_statement",
        "name": "EXECUTE"
      },
      {
        "type": "input_statement",
        "name": "END"
      },
      {
        "type": "input_value",
        "name": "FINISHED",
        "check": "Boolean",
        "align": "RIGHT"
      }
    ],
    "output": "Command",
    "colour": 60,
    "tooltip": "Defines a complete command with all lifecycle methods",
    "mutator": "frc_command_mutator"
  },

  // Command Runner Block (new)
  {
    "type": "frc_run_command",
    "message0": "run command %1",
    "args0": [
      {
        "type": "input_value",
        "name": "COMMAND",
        "check": "Command"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 60,
    "tooltip": "Schedule a command to run"
  },

{
  "type": "frc_motor_set",
  "message0": "set motor %1 speed to %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "MOTOR",
      "options": [
        ["left", "LEFT"],
        ["right", "RIGHT"]
      ]
    },
    {
      "type": "input_value",
      "name": "SPEED",
      "check": "Number"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "Set the speed of the selected motor."
}
]);

// Command Block Mutator
Blockly.Extensions.registerMutator('frc_command_mutator',
  function() {
    if (!this.getInput('FINISHED')) {
      this.appendValueInput('FINISHED')
        .setCheck('Boolean')
        .appendField('isFinished?');
    }
  }
);

// Subsystem Block Mutator
Blockly.Extensions.registerMutator('frc_subsystem_mutator',
  function() {
    // Future subsystem customization
  }
);

// Define custom connection checks
Blockly.Blocks['frc_command'].updateShape_ = function() {
  // Update block shape based on mutator
};