// tab-management.js
// Handles tab creation, switching, saving/loading, and workspace management for Blockly

window.tabManagement = {
  // Default/core tabs that cannot be removed
  coreTabs: [
    { id: 'robot', title: 'Robot.java', type: 'robot', removable: false },
    { id: 'robotContainer', title: 'RobotContainer.java', type: 'robotContainer', removable: false },
    { id: 'constants', title: 'Constants.java', type: 'constants', removable: false }
  ],

  tabs: [],                  // List of all current tabs
  workspaces: {},            // Blockly workspaces by tab ID
  activeTabId: null,         // ID of the currently active tab
  tabCounter: 0,             // Counter to ensure unique tab IDs
  updateTimeout: null,       // Throttle timer for code regeneration
  isSaving: false,
  isLoading: false,

  /**
   * Creates and injects a Blockly workspace for the given tab.
   */
  createWorkspace(tab) {
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
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3
      }
    });

    // Listen for block changes to regenerate code
    workspace.addChangeListener(event => {
      const relevant = [
        Blockly.Events.BLOCK_CHANGE,
        Blockly.Events.BLOCK_CREATE,
        Blockly.Events.BLOCK_DELETE,
        Blockly.Events.BLOCK_MOVE
      ];
      if (relevant.includes(event.type)) {
        clearTimeout(this.updateTimeout);
        this.updateTimeout = setTimeout(() => this.updateOutput(), 300);
      }
    });

    workspace.getVariableMap().clear();

    setTimeout(() => {
      Blockly.svgResize(workspace);
      workspace.render();
    }, 100);

    return workspace;
  },

  /**
   * Renders tab buttons in the top tab bar.
   */
  renderTabs() {
    const { tabsContainer } = window.domElements;
    tabsContainer.innerHTML = '';
    this.tabs.forEach(tab => {
      const btn = this.createTabElement(tab);
      tabsContainer.appendChild(btn);
    });
  },

  /**
   * Switches view to the selected tab and refreshes output.
   */
  switchTab(tabId) {
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

  /**
   * Adds a new tab of the selected type.
   */
  addTab() {
    const { tabTypeSelector } = window.domElements;
    const type = tabTypeSelector.value;
    this.tabCounter++;

    let id, title;
    switch (type) {
      case 'command':
        title = `Command ${this.tabCounter}`;
        id = `cmd_${this.tabCounter}`;
        break;
      case 'subsystem':
        title = `Subsystem ${this.tabCounter}`;
        id = `sub_${this.tabCounter}`;
        break;
      case 'auto':
        title = `Autonomous ${this.tabCounter}`;
        id = `auto_${this.tabCounter}`;
        break;
      default:
        title = `${type.charAt(0).toUpperCase() + type.slice(1)} ${this.tabCounter}`;
        id = `${type}_${this.tabCounter}`;
    }

    const tab = { id, title, type, removable: true };
    this.tabs.push(tab);
    this.renderTabs();
    this.workspaces[id] = this.createWorkspace(tab);
    this.switchTab(id);
  },

  /**
   * Removes a tab and its associated workspace.
   */
  removeTab(tabId) {
    if (this.coreTabs.find(t => t.id === tabId)) {
      alert("Core tabs cannot be removed.");
      return;
    }

    const index = this.tabs.findIndex(t => t.id === tabId);
    if (index === -1) return;

    if (this.workspaces[tabId]) {
      this.workspaces[tabId].dispose();
      delete this.workspaces[tabId];
    }

    const div = document.getElementById(tabId);
    if (div) div.remove();

    this.tabs.splice(index, 1);
    if (this.activeTabId === tabId) {
      this.switchTab(this.coreTabs[0].id);
    }
    this.renderTabs();
  },

  /**
   * Allows user to rename a tab.
   */
  renameTab(tabId) {
    const tab = this.tabs.find(t => t.id === tabId);
    if (!tab) return;

    const newName = prompt('Enter new tab name:', tab.title);
    if (newName && newName.trim()) {
      tab.title = newName.trim();
      this.renderTabs();
      this.switchTab(tabId);
    }
  },

  /**
   * Generates Java code for the active tab.
   */
  updateOutput() {
    if (this.activeTabId && this.workspaces[this.activeTabId]) {
      const code = window.codeGeneration.generateJavaCode(this.activeTabId);
      window.domElements.outputArea.textContent = code;

      if (window.hljs) {
        window.hljs.highlightElement(window.domElements.outputArea);
      }
    }
  },

  /**
   * Loads a sample project by preset name.
   */
  loadSampleProject(selectedSample) {
    if (!selectedSample) throw new Error('No sample selected');

    const sample = window.sampleProjects.tabPresets[selectedSample];
    if (!sample) throw new Error('Sample not found');

    this.tabs = this.tabs.filter(tab => !tab.removable);
    this.renderTabs();

    let firstTab = null;

    for (const [tabType, xml] of Object.entries(sample)) {
      let tab = this.tabs.find(t => t.type === tabType);
      if (!tab && this.coreTabs.some(t => t.type === tabType)) {
        tab = { ...this.coreTabs.find(t => t.type === tabType) };
        this.tabs.push(tab);
        this.workspaces[tab.id] = this.createWorkspace(tab);
      }

      if (tab && this.workspaces[tab.id]) {
        try {
          this.workspaces[tab.id].clear();
          const dom = Blockly.Xml.textToDom(xml);
          Blockly.Xml.domToWorkspace(dom, this.workspaces[tab.id]);

          if (!firstTab) firstTab = tab.id;
        } catch (err) {
          console.error(`Failed to load ${tabType}:`, err);
        }
      }
    }

    this.switchTab(firstTab || this.coreTabs[0].id);
    this.updateOutput();
  },

  /**
   * Creates a DOM button element for a tab.
   */
  createTabElement(tab) {
    const btn = document.createElement('button');
    btn.id = `tabBtn_${tab.id}`;
    btn.className = 'tab-btn';
    btn.innerHTML = `
      <span class="tab-title">${tab.title}</span>
      <span class="rename-btn" title="Rename">Rename</span>
    `;

    btn.querySelector('.rename-btn').addEventListener('click', e => {
      e.stopPropagation();
      this.renameTab(tab.id);
    });

    btn.onclick = () => this.switchTab(tab.id);

    if (tab.removable) {
      const closeBtn = document.createElement('span');
      closeBtn.className = 'close-btn';
      closeBtn.textContent = '×';
      closeBtn.onclick = e => {
        e.stopPropagation();
        this.removeTab(tab.id);
      };
      btn.appendChild(closeBtn);
    }

    return btn;
  },

  /**
   * Serializes the current project and triggers a download.
   */
  saveProject() {
    if (this.isSaving) return false;
    this.isSaving = true;

    try {
      const project = {
        version: '1.0',
        tabs: [],
        activeTab: this.activeTabId
      };

      this.tabs.forEach(tab => {
        const workspace = this.workspaces[tab.id];
        if (workspace) {
          const xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
          project.tabs.push({ ...tab, xml });
        }
      });

      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(project));
      const anchor = document.createElement('a');
      anchor.setAttribute('href', dataStr);
      anchor.setAttribute('download', 'frc_blockly_project.json');
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      return true;
    } catch (err) {
      console.error('Save failed:', err);
      alert('Could not save project: ' + err.message);
      return false;
    } finally {
      this.isSaving = false;
    }
  },

  /**
   * Prompts user to load a saved project from file.
   */
  loadProject() {
    if (this.isLoading) return Promise.reject('Already loading');
    this.isLoading = true;

    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';

      input.onchange = e => {
        const file = e.target.files[0];
        if (!file) return reject('No file selected');

        const reader = new FileReader();
        reader.onload = event => {
          try {
            const project = JSON.parse(event.target.result);
            if (!Array.isArray(project.tabs)) throw new Error('Invalid file format');

            this.tabs = this.tabs.filter(t => !t.removable);
            this.renderTabs();

            project.tabs.forEach(t => {
              if (this.tabs.some(x => x.id === t.id)) return;
              const tab = {
                id: t.id,
                title: t.title,
                type: t.type,
                removable: t.removable !== false
              };
              this.tabs.push(tab);
              this.workspaces[tab.id] = this.createWorkspace(tab);

              if (t.xml) {
                try {
                  Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(t.xml), this.workspaces[tab.id]);
                } catch (e) {
                  console.error(`Error loading tab ${t.id}`, e);
                }
              }
            });

            this.switchTab(project.activeTab || this.tabs[0]?.id);
            this.updateOutput();
            resolve(true);
          } catch (err) {
            alert('Failed to load project: ' + err.message);
            reject(err);
          } finally {
            this.isLoading = false;
          }
        };

        reader.onerror = () => {
          this.isLoading = false;
          reject('Read error');
        };

        reader.readAsText(file);
      };

      input.oncancel = () => {
        this.isLoading = false;
        reject('File selection cancelled');
      };

      input.click();
    });
  }
};
