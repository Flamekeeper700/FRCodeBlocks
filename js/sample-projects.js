window.sampleProjects = {
  tabPresets: {
    basicRobot: {
      robot: `<xml xmlns="https://developers.google.com/blockly/xml">
        <block type="frc_robot_init" x="50" y="50">
          <statement name="STEPS">
            <block type="frc_motorcontroller_set">
              <field name="MOTOR_TYPE">PWMSparkMax</field>
              <field name="CHANNEL">0</field>
              <value name="SPEED">
                <block type="frc_math_number">
                  <field name="NUM">0.5</field>
                </block>
              </value>
            </block>
          </statement>
          <next>
            <block type="frc_robot_periodic">
              <statement name="STEPS">
                <block type="frc_joystick_getaxis">
                  <field name="PORT">0</field>
                  <field name="AXIS">1</field>
                </block>
              </statement>
            </block>
          </next>
        </block>
      </xml>`
    },
    pidControllerDemo: {
      robot: `<xml xmlns="https://developers.google.com/blockly/xml">
        <block type="frc_robot_init" x="50" y="50">
          <statement name="STEPS">
            <block type="frc_pidcontroller_create">
              <field name="NAME">armPID</field>
              <value name="P">
                <block type="frc_math_number">
                  <field name="NUM">0.1</field>
                </block>
              </value>
              <value name="I">
                <block type="frc_math_number">
                  <field name="NUM">0.0</field>
                </block>
              </value>
              <value name="D">
                <block type="frc_math_number">
                  <field name="NUM">0.0</field>
                </block>
              </value>
            </block>
            <block type="frc_encoder_create">
              <field name="NAME">armEncoder</field>
              <field name="CHANNEL_A">0</field>
              <field name="CHANNEL_B">1</field>
            </block>
          </statement>
          <next>
            <block type="frc_robot_periodic">
              <statement name="STEPS">
                <block type="frc_motorcontroller_set">
                  <field name="MOTOR_TYPE">PWMSparkMax</field>
                  <field name="CHANNEL">1</field>
                  <value name="SPEED">
                    <block type="frc_pidcontroller_calculate">
                      <field name="NAME">armPID</field>
                      <value name="SETPOINT">
                        <block type="frc_math_number">
                          <field name="NUM">10</field>
                        </block>
                      </value>
                      <value name="MEASUREMENT">
                        <block type="frc_encoder_getdistance">
                          <field name="CHANNEL">0</field>
                        </block>
                      </value>
                    </block>
                  </value>
                </block>
              </statement>
            </block>
          </next>
        </block>
      </xml>`
    },
    tankDriveTemplate: {
      robot: `<xml xmlns="https://developers.google.com/blockly/xml">
        <block type="frc_robot_init" x="50" y="50">
          <statement name="STEPS">
            <block type="frc_constants_motorports">
              <field name="LEFT_MOTOR_PORT">0</field>
              <field name="RIGHT_MOTOR_PORT">1</field>
            </block>
          </statement>
        </block>
      </xml>`,
      robotContainer: `<xml xmlns="https://developers.google.com/blockly/xml">
        <block type="frc_robotcontainer_init" x="50" y="50">
          <statement name="STEPS">
            <block type="frc_joystick_getaxis">
              <field name="PORT">0</field>
              <field name="AXIS">1</field>
            </block>
            <next>
              <block type="frc_robotcontainer_configurebuttonbindings">
                <statement name="BUTTON_BINDINGS">
                  <block type="frc_bind_tankdrive">
                    <field name="CONTROLLER_PORT">0</field>
                    <field name="LEFT_AXIS">1</field>
                    <field name="RIGHT_AXIS">3</field>
                  </block>
                </statement>
              </block>
            </next>
          </statement>
        </block>
      </xml>`,
      driveSubsystem: `<xml xmlns="https://developers.google.com/blockly/xml">
        <block type="frc_subsystem_init" x="50" y="50">
          <field name="SUBSYSTEM_TYPE">DriveSubsystem</field>
          <statement name="STEPS">
            <block type="frc_motorcontroller_set">
              <field name="MOTOR_TYPE">PWMSparkMax</field>
              <field name="CHANNEL">0</field>
              <value name="SPEED">
                <block type="frc_math_number">
                  <field name="NUM">0</field>
                </block>
              </value>
            </block>
            <next>
              <block type="frc_subsystem_periodic"></block>
              <next>
                <block type="frc_subsystem_tankdrive">
                  <value name="LEFT_SPEED">
                    <block type="frc_math_number">
                      <field name="NUM">0</field>
                    </block>
                  </value>
                  <value name="RIGHT_SPEED">
                    <block type="frc_math_number">
                      <field name="NUM">0</field>
                    </block>
                  </value>
                </block>
              </next>
            </next>
          </statement>
        </block>
      </xml>`
    }
  },
  sampleProjects: [
    { value: 'basicRobot', label: 'Basic Robot' },
    { value: 'pidControllerDemo', label: 'PID Controller Demo' },
    { value: 'tankDriveTemplate', label: 'Tank Drive Template' }
  ]
};