Blockly.defineBlocksWithJsonArray([
    // Drivetrain
    {
      "type": "drive_forward",
      "message0": "Drive forward at speed %1",
      "args0": [
        {
          "type": "field_number",
          "name": "SPEED",
          "value": 0.5,
          "min": -1,
          "max": 1,
          "precision": 0.1
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 0,  // Overwritten by category
      "tooltip": "Drives the robot forward.",
      "helpUrl": ""
    },
  
    // DIO/PWM example
    {
      "type": "dio_pwm_example",
      "message0": "Set DIO pin %1 to %2",
      "args0": [
        {
          "type": "field_number",
          "name": "PIN",
          "value": 0,
          "min": 0,
          "max": 9,
          "precision": 1
        },
        {
          "type": "field_dropdown",
          "name": "STATE",
          "options": [["HIGH", "HIGH"], ["LOW", "LOW"]]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "tooltip": "Set DIO pin high or low.",
      "helpUrl": ""
    },
  
    // TalonFX example
    {
      "type": "talonfx_example",
      "message0": "Set TalonFX %1 speed to %2",
      "args0": [
        {
          "type": "field_number",
          "name": "ID",
          "value": 1,
          "min": 0
        },
        {
          "type": "field_number",
          "name": "SPEED",
          "value": 0.5,
          "min": -1,
          "max": 1,
          "precision": 0.1
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "tooltip": "Set speed of a TalonFX motor.",
      "helpUrl": ""
    },
  
    // SparkMax example
    {
      "type": "sparkmax_example",
      "message0": "Set SparkMax %1 speed to %2",
      "args0": [
        {
          "type": "field_number",
          "name": "ID",
          "value": 2,
          "min": 0
        },
        {
          "type": "field_number",
          "name": "SPEED",
          "value": 0.5,
          "min": -1,
          "max": 1,
          "precision": 0.1
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "tooltip": "Set speed of a SparkMax motor.",
      "helpUrl": ""
    },
  
    // LED Strip example
    {
      "type": "ledstrip_example",
      "message0": "Set LED strip on PWM %1 to color %2",
      "args0": [
        {
          "type": "field_number",
          "name": "PORT",
          "value": 0,
          "min": 0
        },
        {
          "type": "field_colour",
          "name": "COLOR",
          "colour": "#ffffff"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "tooltip": "Set the color of a PWM-based LED strip.",
      "helpUrl": ""
    },
  
    // PhotonVision example
    {
      "type": "photonvision_example",
      "message0": "Get target yaw from camera %1",
      "args0": [
        {
          "type": "field_input",
          "name": "CAM_NAME",
          "text": "photonCam"
        }
      ],
      "output": "Number",
      "tooltip": "Returns target yaw from PhotonVision.",
      "helpUrl": ""
    }
  ]);
  