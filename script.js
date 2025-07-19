const tabs = document.querySelectorAll('.tab-button');
const workspacesDivs = document.querySelectorAll('.workspace-container');

const workspaces = {};
const toolboxXml = `
<xml>
  <category name="Logic" colour="#5C81A6">
    <block type="controls_if"></block>
    <block type="logic_compare"></block>
  </category>
  <category name="Loops" colour="#5CA65C">
    <block type="controls_repeat_ext"></block>
  </category>
  <category name="Math" colour="#5C68A6">
    <block type="math_number"></block>
  </category>
  <category name="Text" colour="#5CA68C">
    <block type="text"></block>
  </category>
  <!-- Add custom FRC blocks here -->
</xml>
`;

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Show the selected workspace and hide others
    const selected = tab.getAttribute('data-tab');
    workspacesDivs.forEach(div => {
      div.style.display = div.id === selected ? 'block' : 'none';
    });

    // Highlight active tab
    tabs.forEach(t => t.style.background = '');
    tab.style.background = '#ddd';
  });
});

// Initialize Blockly workspaces for each tab
workspacesDivs.forEach(div => {
  workspaces[div.id] = Blockly.inject(div.id, {
    toolbox: toolboxXml,
    scrollbars: true,
    trashcan: true,
  });
});

// Select the first tab by default
tabs[0].click();

document.getElementById('generate-code').addEventListener('click', () => {
  let fullCode = '';
  for (const [tabName, workspace] of Object.entries(workspaces)) {
    const code = Blockly.Java['robot'] ? Blockly.Java.workspaceToCode(workspace) : '// Java generator not defined\n';
    fullCode += `// --- ${tabName.toUpperCase()} ---\n`;
    fullCode += code + '\n\n';
  }
  document.getElementById('output').textContent = fullCode;
});
