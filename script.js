const tabs = document.querySelector('#tabs');
const addTabBtn = document.getElementById('addTab');
const workspaceContainer = document.getElementById('workspaceContainer');
const output = document.getElementById('output');

const workspaces = {};
let tabCounter = 1;

function createTab(tabName, type) {
  // Create tab button
  const button = document.createElement('button');
  button.textContent = `${tabName} ✖`;
  button.dataset.tab = tabName;
  button.classList.add('tab');

  button.addEventListener('click', () => {
    // Switch to this tab
    switchTab(tabName);
  });

  // Remove tab on middle click
  button.addEventListener('auxclick', (e) => {
    if (e.button === 1) { removeTab(tabName, button); }
  });

  tabs.insertBefore(button, addTabBtn);

  // Create workspace div
  const div = document.createElement('div');
  div.id = tabName;
  div.className = 'blocklyDiv';
  div.style.height = '500px';
  workspaceContainer.appendChild(div);

  // Inject Blockly with preset content
  const workspace = Blockly.inject(div, {
    toolbox: document.getElementById('toolbox')
  });
  workspaces[tabName] = workspace;

  const preset = document.getElementById(`preset-${type}`);
  if (preset) {
    Blockly.Xml.domToWorkspace(preset, workspace);
  }

  switchTab(tabName);
}

function switchTab(tabName) {
  document.querySelectorAll('.blocklyDiv').forEach(div => div.style.display = 'none');
  document.querySelectorAll('#tabs .tab').forEach(btn => btn.classList.remove('active'));

  document.getElementById(tabName).style.display = 'block';
  document.querySelector(`#tabs [data-tab="${tabName}"]`).classList.add('active');

  workspaces[tabName].resize();
}

function removeTab(tabName, button) {
  workspaces[tabName].dispose();
  delete workspaces[tabName];

  document.getElementById(tabName).remove();
  button.remove();

  // Switch to any remaining tab
  const remaining = document.querySelector('#tabs .tab');
  if (remaining) switchTab(remaining.dataset.tab);
}

addTabBtn.addEventListener('click', () => {
  const type = prompt('Tab type? (robotContainer, commands, subsystem)').trim();
  if (!['robotContainer', 'commands', 'subsystem'].includes(type)) {
    alert('Invalid type');
    return;
  }
  const tabName = `${type}_${tabCounter++}`;
  createTab(tabName, type);
});

document.getElementById('generateJava').addEventListener('click', () => {
  const activeTab = document.querySelector('#tabs .tab.active').dataset.tab;
  const workspace = workspaces[activeTab];
  try {
    const code = Blockly.FRCJava.workspaceToCode(workspace);
    output.textContent = code || '// No code generated';
  } catch (e) {
    output.textContent = '// Error generating code:\n' + e;
  }
});

// Init default Robot tab
createTab('robot', 'robot');
