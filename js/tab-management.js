window.tabManagement = {
  coreTabs: [
    { id: 'robot', title: 'Robot.java', type: 'robot', removable: false },
    { id: 'robotContainer', title: 'RobotContainer.java', type: 'robotContainer', removable: false },
    { id: 'constants', title: 'Constants.java', type: 'constants', removable: false }
  ],
  tabs: [],
  workspaces: {},
  activeTabId: null,
  tabCounter: 0,

  createTabElement: function(tab) {
    const btn = document.createElement('button');
    btn.textContent = tab.title;
    btn.id = 'tabBtn_' + tab.id;
    btn.dataset.tabId = tab.id;
    if (tab.removable) {
      const closeBtn = document.createElement('span');
      closeBtn.textContent = '×';
      closeBtn.className = 'close-btn';
      closeBtn.addEventListener('click', e => {
        e.stopPropagation();
        this.removeTab(tab.id);
      });
      btn.appendChild(closeBtn);
    }
    btn.addEventListener('click', () => this.switchTab(tab.id));
    return btn;
  },

  createWorkspace: function(tab) {
    let div = document.getElementById(tab.id);
    if (!div) {
      div = document.createElement('div');
      div.id = tab.id;
      div.className = 'blocklyDiv';
      document.getElementById('workspaceContainer').appendChild(div);
    }

    if (this.workspaces[tab.id]) {
      this.workspaces[tab.id].dispose();
      delete this.workspaces[tab.id];
    }

    const workspace = Blockly.inject(div, {
      toolbox: document.getElementById('toolbox'),
      trashcan: true,
      scrollbars: true,
      move: { scrollbars: true, drag: true, wheel: true },
      zoom: { controls: true, wheel: true, startScale: 1.0, maxScale: 3, minScale: 0.3 }
    });

    workspace.addChangeListener((event) => {
      if (event.type === Blockly.Events.UI && event.element === 'selected') {
        Blockly.Events.setGroup(event.group);
        workspace.getBlockById(event.blockId)?.select();
        Blockly.Events.setGroup(false);
      }
    });

    workspace.getVariableMap().clear();

    workspace.addChangeListener((e) => {
      if ([
        Blockly.Events.VAR_CREATE,
        Blockly.Events.VAR_DELETE,
        Blockly.Events.VAR_RENAME,
        Blockly.Events.PROCEDURE_CREATE,
        Blockly.Events.PROCEDURE_DELETE,
        Blockly.Events.PROCEDURE_RENAME
      ].includes(e.type)) {
        Blockly.DropDownDiv.hideIfOwner();
      }
      this.updateOutput();
    });

    setTimeout(() => {
      Blockly.svgResize(workspace);
      workspace.render();
    }, 100);

    return workspace;
  },

  renderTabs: function() {
    const { tabsContainer } = window.domElements;
    tabsContainer.innerHTML = '';
    this.tabs.forEach(tab => {
      const btn = this.createTabElement(tab);
      tabsContainer.appendChild(btn);
    });
  },

  switchTab: function(tabId) {
    this.activeTabId = tabId;
    const { tabsContainer } = window.domElements;

    this.tabs.forEach(tab => {
      const div = document.getElementById(tab.id);
      const btn = document.getElementById(`tabBtn_${tab.id}`);
      const isActive = tab.id === tabId;

      if (div) div.style.display = isActive ? 'block' : 'none';
      if (btn) btn.classList.toggle('active', isActive);

      if (isActive && this.workspaces[tab.id]) {
        setTimeout(() => {
          Blockly.svgResize(this.workspaces[tab.id]);
          this.workspaces[tab.id].render();
          this.updateOutput();
        }, 10);
      }
    });
  },

  addTab: function() {
    const { tabTypeSelector } = window.domElements;
    const type = tabTypeSelector.value;
    this.tabCounter++;
    const id = type + '_' + this.tabCounter;
    let title = type.charAt(0).toUpperCase() + type.slice(1);
    
    if (type === 'command') {
      title = 'Command' + (this.tabCounter > 1 ? ' ' + this.tabCounter : '');
    } else if (type === 'subsystem') {
      title = 'Subsystem' + (this.tabCounter > 1 ? ' ' + this.tabCounter : '');
    } else if (type === 'auto') {
      title = 'Autonomous' + (this.tabCounter > 1 ? ' ' + this.tabCounter : '');
    } else {
      title += ' ' + this.tabCounter;
    }
    
    const tab = { id, title, type, removable: true };
    this.tabs.push(tab);
    this.renderTabs();
    this.workspaces[id] = this.createWorkspace(tab);
    this.switchTab(id);
  },

  removeTab: function(tabId) {
    if (this.coreTabs.find(t => t.id === tabId)) {
      alert("Core tabs cannot be removed.");
      return;
    }
    const tabIndex = this.tabs.findIndex(t => t.id === tabId);
    if (tabIndex === -1) return;

    if (this.workspaces[tabId]) {
      this.workspaces[tabId].dispose();
      delete this.workspaces[tabId];
    }
    const div = document.getElementById(tabId);
    if (div) div.remove();
    this.tabs.splice(tabIndex, 1);

    if (this.activeTabId === tabId) {
      this.switchTab(this.coreTabs[0].id);
    }
    this.renderTabs();
  },

  updateOutput: function() {
    const { outputArea } = window.domElements;
    const code = window.codeGeneration.generateJavaCode();
    outputArea.textContent = code;
  },

  loadSampleProject: function(selectedSample) {
    if (!selectedSample) {
      throw new Error('No sample project selected');
    }

    const sample = window.sampleProjects.tabPresets[selectedSample];
    if (!sample) {
      throw new Error('Selected sample not found');
    }

    // Clear existing custom tabs (keep core tabs)
    this.tabs = this.tabs.filter(tab => !tab.removable);
    this.renderTabs();

    // Load sample content for each tab
    let firstLoadedTab = null;
    for (const [tabType, xml] of Object.entries(sample)) {
      // Find or create the tab
      let tab = this.tabs.find(t => t.type === tabType);
      
      if (!tab && this.coreTabs.some(t => t.type === tabType)) {
        // Create the tab if it's a core tab that doesn't exist yet
        tab = {...this.coreTabs.find(t => t.type === tabType)};
        this.tabs.push(tab);
        this.workspaces[tab.id] = this.createWorkspace(tab);
      }

      if (tab && this.workspaces[tab.id]) {
        try {
          // Clear existing blocks
          this.workspaces[tab.id].clear();
          
          // Load new blocks
          const dom = Blockly.Xml.textToDom(xml);
          Blockly.Xml.domToWorkspace(dom, this.workspaces[tab.id]);
          
          // Track first loaded tab for switching
          if (!firstLoadedTab) {
            firstLoadedTab = tab.id;
          }
        } catch (error) {
          console.error(`Error loading ${tabType} content:`, error);
          throw new Error(`Failed to load ${tabType} content`);
        }
      }
    }

    // Switch to first loaded tab if any
    if (firstLoadedTab) {
      this.switchTab(firstLoadedTab);
    } else {
      this.switchTab(this.coreTabs[0].id);
    }

    // Update code output
    this.updateOutput();
  }
};