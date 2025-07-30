window.eventHandlers = {
  isSaving: false,
  isLoading: false,

  setupEventListeners: function() {
    this.removeEventListeners();

    const { 
      addTabBtn, 
      downloadJavaBtn, 
      copyCodeBtn, 
      saveProjectBtn, 
      loadProjectBtn, 
      helpBtn, 
      helpModal, 
      closeModal, 
      sampleProjects, 
      loadSampleBtn,
      openCreditsBtn,
      manageDataTypesBtn,
      addDataTypeBtn,
      themeSelector,
      editThemeBtn
    } = window.domElements;

    const { 
      addTab, 
      removeTab, 
      switchTab, 
      saveProject, 
      loadProject, 
      loadSampleProject 
    } = window.tabManagement;

    // Theme selector
    if (themeSelector) {
      themeSelector.addEventListener('change', (e) => {
        window.themeManager.applyTheme(e.target.value);
      });
    }

    // Theme editor
    if (editThemeBtn) {
      editThemeBtn.addEventListener('click', () => {
        if (window.themeManager && window.themeManager.showThemeEditor) {
          window.themeManager.showThemeEditor();
        }
      });
    }

    // Core functionality event listeners
    addTabBtn.addEventListener('click', () => addTab.call(window.tabManagement));
    downloadJavaBtn.addEventListener('click', window.codeGeneration.downloadJavaFile);
    copyCodeBtn.addEventListener('click', window.codeGeneration.copyCodeToClipboard);
    saveProjectBtn.addEventListener('click', this.handleSaveProject.bind(this));
    loadProjectBtn.addEventListener('click', this.handleLoadProject.bind(this));
    
    helpBtn.addEventListener('click', () => helpModal.style.display = 'flex');
    closeModal.addEventListener('click', () => helpModal.style.display = 'none');
    
    // Sample projects handling
loadSampleBtn.addEventListener('click', () => {
  const selectedSample = sampleProjects.value;
  if (!selectedSample) {
    alert('Please select a sample project first');
    return;
  }
  
  if (!window.sampleProjects?.tabPresets?.[selectedSample]) {
    alert('Selected sample project not found');
    return;
  }

  loadSampleBtn.disabled = true;
  loadSampleBtn.textContent = 'Loading...';
  
  try {
    window.tabManagement.loadSampleProject(selectedSample);
    sampleProjects.value = '';
  } catch (error) {
    console.error('Error loading sample:', error);
    alert(`Failed to load sample: ${error.message}`);
  } finally {
    loadSampleBtn.disabled = false;
    loadSampleBtn.textContent = 'Load Selected';
  }
});

    sampleProjects.addEventListener('change', (e) => {
      loadSampleBtn.disabled = !e.target.value;
    });
    
    // Credits tab handling
    openCreditsBtn.addEventListener('click', () => {
      let creditsTab = window.tabManagement.tabs.find(tab => tab.id === 'credits');
      
      if (!creditsTab) {
        creditsTab = {
          id: 'credits',
          title: 'Credits',
          type: 'credits',
          removable: true
        };
        window.tabManagement.tabs.push(creditsTab);
        window.tabManagement.workspaces[creditsTab.id] = window.tabManagement.createWorkspace(creditsTab);
        window.tabManagement.renderTabs();
        
        const workspace = window.tabManagement.workspaces[creditsTab.id];
        
        const versionBlock = workspace.newBlock('comment_block');
        versionBlock.setFieldValue('FRC Blockly IDE v1.0.0', 'TEXT');
        
        const creditsBlock = workspace.newBlock('comment_block');
        creditsBlock.setFieldValue('Developed by: Your Name | Powered by Blockly', 'TEXT');
        
        const dateBlock = workspace.newBlock('comment_block');
        dateBlock.setFieldValue('Created: ' + new Date().toLocaleDateString(), 'TEXT');
        
        versionBlock.nextConnection.connect(creditsBlock.previousConnection);
        creditsBlock.nextConnection.connect(dateBlock.previousConnection);
        
        versionBlock.setEditable(false);
        creditsBlock.setEditable(false);
        dateBlock.setEditable(false);
        
        versionBlock.initSvg();
        versionBlock.render();
        creditsBlock.initSvg();
        creditsBlock.render();
        dateBlock.initSvg();
        dateBlock.render();
        
        versionBlock.moveBy(50, 50);
      }
      
      window.tabManagement.switchTab('credits');
    });

    // Data types management
    if (manageDataTypesBtn) {
      manageDataTypesBtn.addEventListener('click', this.handleManageDataTypesClick.bind(this));
    }

    if (addDataTypeBtn) {
      addDataTypeBtn.addEventListener('click', this.handleAddDataTypeClick.bind(this));
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
      if (e.target === helpModal) {
        helpModal.style.display = 'none';
      }
      if (e.target === document.getElementById('dataTypesModal')) {
        document.getElementById('dataTypesModal').style.display = 'none';
      }
    });

    // Window resize handling
    window.addEventListener('resize', () => {
      if (window.tabManagement.activeTabId && window.tabManagement.workspaces[window.tabManagement.activeTabId]) {
        Blockly.svgResize(window.tabManagement.workspaces[window.tabManagement.activeTabId]);
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        this.handleSaveProject();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
        e.preventDefault();
        this.handleLoadProject();
      }
      if (e.key === 'Enter' && document.activeElement === sampleProjects) {
        loadSampleBtn.click();
      }
    });

    // Close modal buttons
    document.querySelectorAll('.modal .close-modal').forEach(btn => {
      btn.addEventListener('click', function() {
        this.closest('.modal').style.display = 'none';
      });
    });
  },

  removeEventListeners: function() {
    const { saveProjectBtn, loadProjectBtn } = window.domElements;
    
    if (saveProjectBtn) {
      const newSaveBtn = saveProjectBtn.cloneNode(true);
      saveProjectBtn.parentNode.replaceChild(newSaveBtn, saveProjectBtn);
      window.domElements.saveProjectBtn = newSaveBtn;
    }
    
    if (loadProjectBtn) {
      const newLoadBtn = loadProjectBtn.cloneNode(true);
      loadProjectBtn.parentNode.replaceChild(newLoadBtn, loadProjectBtn);
      window.domElements.loadProjectBtn = newLoadBtn;
    }
  },

  handleSaveProject: function() {
    if (this.isSaving) return;
    this.isSaving = true;
    
    try {
      window.tabManagement.saveProject();
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      this.isSaving = false;
    }
  },

  handleLoadProject: function() {
    if (this.isLoading) return;
    this.isLoading = true;
    
    window.tabManagement.loadProject()
      .then(success => {
        if (success && window.dataTypes && window.dataTypes.updateAllBlocks) {
          window.dataTypes.updateAllBlocks();
        }
      })
      .catch(error => {
        console.error('Load error:', error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  },

  handleManageDataTypesClick: function() {
    const dataTypesModal = document.getElementById('dataTypesModal');
    const dataTypesList = document.getElementById('dataTypesList');
    
    if (!dataTypesModal || !dataTypesList) return;
    
    // Populate the list
    dataTypesList.innerHTML = '';
    window.dataTypes.getAllTypes().forEach(type => {
      const div = document.createElement('div');
      div.className = 'data-type-item';
      div.innerHTML = `
        <span>${type.label} (default: ${type.default})</span>
        ${type.value === 'int' || type.value === 'double' || type.value === 'boolean' || type.value === 'String' ? 
          '<span class="base-type">Base Type</span>' : 
          '<button class="remove-type-btn" data-type="${type.value}">Remove</button>'}
      `;
      dataTypesList.appendChild(div);
    });
    
    // Add event listeners for remove buttons
    document.querySelectorAll('.remove-type-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const typeValue = this.getAttribute('data-type');
        try {
          window.dataTypes.removeType(typeValue);
          // Refresh the list
          this.closest('.data-type-item').remove();
        } catch (error) {
          alert(error.message);
        }
      });
    });
    
    dataTypesModal.style.display = 'flex';
  },

  handleAddDataTypeClick: function() {
    const typeName = prompt('Enter the type name (e.g., "ColorSensor"):');
    if (!typeName) return;
    
    const typeLabel = prompt('Enter the display label (e.g., "Color Sensor"):', typeName);
    if (!typeLabel) return;
    
    const defaultValue = prompt('Enter the default value (e.g., "0"):', 'null');
    if (defaultValue === null) return;
    
    try {
      window.dataTypes.addType({
        value: typeName,
        label: typeLabel,
        default: defaultValue
      });
      
      // Refresh the list
      this.handleManageDataTypesClick();
    } catch (error) {
      alert(error.message);
    }
  }
};