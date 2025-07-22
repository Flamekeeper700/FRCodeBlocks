// sample-projects.js
window.sampleProjects = {
  tabPresets: {
    basicRobot: {
      robot: `<xml xmlns="https://developers.google.com/blockly/xml">
        <block type="frc_robot_init" x="50" y="50">
          <next>
            <block type="frc_robot_periodic"></block>
          </next>
        </block>
      </xml>`
    },
    robotContainer: {
      robotContainer: `<xml xmlns="https://developers.google.com/blockly/xml">
        <block type="frc_robotcontainer_init" x="50" y="50">
          <next>
            <block type="frc_robotcontainer_configurebuttonbindings"></block>
          </next>
        </block>
        <block type="frc_robotcontainer_getautonomouscommand" x="50" y="200"></block>
      </xml>`
    },
    driveSubsystem: {
      driveSubsystem: `<xml xmlns="https://developers.google.com/blockly/xml">
        <block type="frc_subsystem_init" x="50" y="50">
          <field name="SUBSYSTEM_TYPE">DriveSubsystem</field>
          <next>
            <block type="frc_subsystem_periodic"></block>
          </next>
        </block>
        <block type="frc_subsystem_arcadedrive" x="50" y="200">
          <value name="SPEED">
            <block type="math_number">
              <field name="NUM">0</field>
            </block>
          </value>
          <value name="ROTATION">
            <block type="math_number">
              <field name="NUM">0</field>
            </block>
          </value>
        </block>
      </xml>`
    },
    tankDriveTemplate: {
      robot: `<xml xmlns="https://developers.google.com/blockly/xml">
        <block type="frc_robot_init" x="50" y="50">
          <next>
            <block type="frc_robot_periodic"></block>
          </next>
        </block>
      </xml>`,
      robotContainer: `<xml xmlns="https://developers.google.com/blockly/xml">
        <block type="frc_robotcontainer_init" x="50" y="50">
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
        </block>
      </xml>`,
      driveSubsystem: `<xml xmlns="https://developers.google.com/blockly/xml">
        <block type="frc_subsystem_init" x="50" y="50">
          <field name="SUBSYSTEM_TYPE">DriveSubsystem</field>
          <next>
            <block type="frc_subsystem_periodic"></block>
            <block type="frc_subsystem_tankdrive">
              <value name="LEFT_SPEED">
                <block type="math_number">
                  <field name="NUM">0</field>
                </block>
              </value>
              <value name="RIGHT_SPEED">
                <block type="math_number">
                  <field name="NUM">0</field>
                </block>
              </value>
            </block>
          </next>
        </block>
      </xml>`,
      constants: `<xml xmlns="https://developers.google.com/blockly/xml">
        <block type="frc_constants_motorports" x="50" y="50">
          <field name="LEFT_MOTOR_PORT">0</field>
          <field name="RIGHT_MOTOR_PORT">1</field>
        </block>
      </xml>`
    }
  },
  sampleProjects: [
    { value: 'basicRobot', label: 'Basic Robot' },
    { value: 'robotContainer', label: 'Robot Container' },
    { value: 'driveSubsystem', label: 'Drive Subsystem' },
    { value: 'tankDriveTemplate', label: 'Tank Drive Template' }
  ]
};