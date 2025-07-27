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
  updateTimeout: null,
  isSaving: false,
  isLoading: false,

  createWorkspace: function(tab) {
    let div = document.getElementById(tab.id);
    if (!div) {
      div = document.createElement('div');
      div.id = tab.id;
      div.className = 'blocklyDiv';
      document.getElementById('workspaceContainer').appendChild(div);
    }

    // Clear existing workspace if it exists
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

    // Add workspace change listener for real-time updates
    workspace.addChangeListener((event) => {
      const relevantEvents = [
        Blockly.Events.BLOCK_CHANGE,
        Blockly.Events.BLOCK_CREATE,
        Blockly.Events.BLOCK_DELETE,
        Blockly.Events.BLOCK_MOVE
      ];
      
      if (relevantEvents.includes(event.type)) {
        if (this.updateTimeout) {
          clearTimeout(this.updateTimeout);
        }
        
        this.updateTimeout = setTimeout(() => {
          this.updateOutput();
        }, 300);
      }
    });

    // Initialize variables and procedures
    workspace.getVariableMap().clear();

    // Schedule a resize after a small delay
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
    
    let id, title;
    
    switch(type) {
      case 'command':
        title = 'Command' + (this.tabCounter > 1 ? ' ' + this.tabCounter : '');
        id = 'cmd_' + this.tabCounter;
        break;
      case 'subsystem':
        title = 'Subsystem' + (this.tabCounter > 1 ? ' ' + this.tabCounter : '');
        id = 'sub_' + this.tabCounter;
        break;
      case 'auto':
        title = 'Autonomous' + (this.tabCounter > 1 ? ' ' + this.tabCounter : '');
        id = 'auto_' + this.tabCounter;
        break;
      default:
        title = type.charAt(0).toUpperCase() + type.slice(1) + ' ' + this.tabCounter;
        id = type + '_' + this.tabCounter;
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
    if (this.activeTabId && this.workspaces[this.activeTabId]) {
      const code = window.codeGeneration.generateJavaCode(this.activeTabId);
      window.domElements.outputArea.textContent = code;
      
      if (window.hljs) {
        window.hljs.highlightElement(window.domElements.outputArea);
      }
    }
  },

  loadSampleProject: function(selectedSample) {
    if (!selectedSample) {
      throw new Error('No sample project selected');
    }

    const sample = window.sampleProjects.tabPresets[selectedSample];
    if (!sample) {
      throw new Error('Selected sample not found');
    }

    this.tabs = this.tabs.filter(tab => !tab.removable);
    this.renderTabs();

    let firstLoadedTab = null;
    for (const [tabType, xml] of Object.entries(sample)) {
      let tab = this.tabs.find(t => t.type === tabType);
      
      if (!tab && this.coreTabs.some(t => t.type === tabType)) {
        tab = {...this.coreTabs.find(t => t.type === tabType)};
        this.tabs.push(tab);
        this.workspaces[tab.id] = this.createWorkspace(tab);
      }

      if (tab && this.workspaces[tab.id]) {
        try {
          this.workspaces[tab.id].clear();
          const dom = Blockly.Xml.textToDom(xml);
          Blockly.Xml.domToWorkspace(dom, this.workspaces[tab.id]);
          
          if (!firstLoadedTab) {
            firstLoadedTab = tab.id;
          }
        } catch (error) {
          console.error(`Error loading ${tabType} content:`, error);
          throw new Error(`Failed to load ${tabType} content`);
        }
      }
    }

    if (firstLoadedTab) {
      this.switchTab(firstLoadedTab);
    } else {
      this.switchTab(this.coreTabs[0].id);
    }

    this.updateOutput();
  },

  createTabElement: function(tab) {
    const btn = document.createElement('button');
    btn.id = `tabBtn_${tab.id}`;
    btn.textContent = tab.title;
    btn.className = 'tab-btn';
    btn.onclick = () => this.switchTab(tab.id);

    if (tab.removable) {
      const closeBtn = document.createElement('span');
      closeBtn.className = 'close-btn';
      closeBtn.innerHTML = '&times;';
      closeBtn.onclick = (e) => {
        e.stopPropagation();
        this.removeTab(tab.id);
      };
      btn.appendChild(closeBtn);
    }

    return btn;
  },

  saveProject: function() {
    if (this.isSaving) return false;
    this.isSaving = true;
    
    try {
      const projectData = {
        version: '1.0',
        tabs: [],
        activeTab: this.activeTabId
      };

      // Save each tab's workspace XML
      this.tabs.forEach(tab => {
        if (this.workspaces[tab.id]) {
          const xml = Blockly.Xml.workspaceToDom(this.workspaces[tab.id]);
          const xmlText = Blockly.Xml.domToText(xml);
          projectData.tabs.push({
            id: tab.id,
            title: tab.title,
            type: tab.type,
            removable: tab.removable,
            xml: xmlText
          });
        }
      });

      // Create download
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(projectData));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute('href', dataStr);
      downloadAnchorNode.setAttribute('download', 'frc_blockly_project.json');
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      document.body.removeChild(downloadAnchorNode);

      return true;
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project: ' + error.message);
      return false;
    } finally {
      this.isSaving = false;
    }
  },

  loadProject: function() {
    if (this.isLoading) return Promise.reject('Already loading');
    this.isLoading = true;
    
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';

      input.onchange = e => {
        const file = e.target.files[0];
        if (!file) {
          this.isLoading = false;
          reject('No file selected');
          return;
        }

        const reader = new FileReader();
        reader.onload = event => {
          try {
            const projectData = JSON.parse(event.target.result);
            
            if (!projectData.tabs || !Array.isArray(projectData.tabs)) {
              throw new Error('Invalid project file format');
            }

            // Clear existing tabs (except core tabs)
            this.tabs = this.tabs.filter(tab => !tab.removable);
            this.renderTabs();

            // Load each tab
            projectData.tabs.forEach(tabData => {
              if (this.tabs.some(t => t.id === tabData.id)) return;

              const tab = {
                id: tabData.id,
                title: tabData.title,
                type: tabData.type,
                removable: tabData.removable !== false
              };

              this.tabs.push(tab);
              this.workspaces[tab.id] = this.createWorkspace(tab);

              if (tabData.xml) {
                try {
                  const dom = Blockly.Xml.textToDom(tabData.xml);
                  Blockly.Xml.domToWorkspace(dom, this.workspaces[tab.id]);
                } catch (xmlError) {
                  console.error(`Error loading tab ${tab.id} content:`, xmlError);
                }
              }
            });

            const activeTab = projectData.activeTab && this.tabs.some(t => t.id === projectData.activeTab) 
              ? projectData.activeTab 
              : this.tabs[0]?.id;
            
            if (activeTab) {
              this.switchTab(activeTab);
            }

            this.updateOutput();
            resolve(true);
          } catch (parseError) {
            console.error('Error parsing project file:', parseError);
            alert('Failed to load project: ' + parseError.message);
            reject(parseError);
          } finally {
            this.isLoading = false;
          }
        };

        reader.onerror = () => {
          this.isLoading = false;
          reject('Error reading file');
        };

        reader.readAsText(file);
      };

      input.oncancel = () => {
        this.isLoading = false;
        reject('File selection canceled');
      };

      input.click();
    });
  }
};