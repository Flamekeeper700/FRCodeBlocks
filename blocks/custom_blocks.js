Blockly.defineBlocksWithJsonArray([
  {
    "type": "set_motor_speed",
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
    "tooltip": "Set the speed of the selected motor.",
    "helpUrl": ""
  }
]);
