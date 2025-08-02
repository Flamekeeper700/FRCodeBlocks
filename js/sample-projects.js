window.sampleProjects = {
  tabPresets: {
    basicLogicBot: {
      robot: `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="frc_robot_init" x="50" y="50">
    <statement name="STEPS">
      <block type="frc_variable_declaration">
        <field name="TYPE">boolean</field>
        <field name="NAME">isAutonomous</field>
        <value name="VALUE">
          <block type="frc_logic_boolean">
            <field name="BOOL">TRUE</field>
          </block>
        </value>
      </block>
    </statement>
    <next>
      <block type="frc_robot_periodic">
        <statement name="STEPS">
          <block type="frc_controls_if">
            <value name="CONDITION">
              <block type="frc_variable_get">
                <field name="TYPE">boolean</field>
                <field name="NAME">isAutonomous</field>
              </block>
            </value>
            <statement name="THEN_STATEMENT">
              <block type="comment_block">
                <field name="TEXT">Autonomous logic here</field>
              </block>
            </statement>
          </block>
        </statement>
      </block>
    </next>
  </block>
</xml>
      `,
      robotContainer: `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="frc_robotcontainer_init" x="50" y="50">
    <statement name="STEPS">
      <block type="frc_variable_declaration">
        <field name="TYPE">Joystick</field>
        <field name="NAME">driverController</field>
        <value name="VALUE">
          <block type="frc_math_number">
            <field name="NUM">0</field>
          </block>
        </value>
      </block>
    </statement>
    <next>
      <block type="frc_robotcontainer_configurebuttonbindings">
        <statement name="BUTTON_BINDINGS">
          <block type="frc_controls_if">
            <value name="CONDITION">
              <block type="frc_joystick_getbutton">
                <field name="PORT">0</field>
                <field name="BUTTON">1</field>
              </block>
            </value>
            <statement name="THEN_STATEMENT">
              <block type="comment_block">
                <field name="TEXT">Button 1 pressed!</field>
              </block>
            </statement>
          </block>
        </statement>
      </block>
    </next>
  </block>
</xml>
      `
    }
  },
  sampleProjects: [
    { value: 'basicLogicBot', label: 'Basic Logic Bot' }
  ]
};