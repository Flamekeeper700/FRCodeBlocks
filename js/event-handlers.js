window.eventHandlers = {
  setupEventListeners: function() {
    const { 
      addTabBtn, 
      downloadJavaBtn, 
      copyCodeBtn, 
      saveProjectBtn, 
      loadProjectBtn, 
      darkModeToggle, 
      helpBtn, 
      helpModal, 
      closeModal, 
      sampleProjects, 
      loadSampleBtn,
      openCreditsBtn,
      zoomIn,
      zoomOut,
      zoomReset,
      toggleToolboxBtn
    } = window.domElements;

    const { 
      addTab, 
      removeTab, 
      switchTab, 
      saveProject, 
      loadProject, 
      toggleDarkMode, 
      loadSampleProject 
    } = window.tabManagement;

    // Tab management
    addTabBtn.addEventListener('click', () => addTab.call(window.tabManagement));
    
    // Code actions
    downloadJavaBtn.addEventListener('click', window.codeGeneration.downloadJavaFile);
    copyCodeBtn.addEventListener('click', window.codeGeneration.copyCodeToClipboard);
    
    // Project actions
    saveProjectBtn.addEventListener('click', () => saveProject.call(window.tabManagement));
    loadProjectBtn.addEventListener('click', () => loadProject.call(window.tabManagement));
    
    // UI controls
    darkModeToggle.addEventListener('click', toggleDarkMode);
    
    // Help modal
    helpBtn.addEventListener('click', () => helpModal.style.display = 'flex');
    closeModal.addEventListener('click', () => helpModal.style.display = 'none');
    
    // Sample projects
    loadSampleBtn.addEventListener('click', () => {
      const selectedSample = sampleProjects.value;
      if (!selectedSample) {
        alert('Please select a sample project first');
        return;
      }
      
      loadSampleBtn.disabled = true;
      loadSampleBtn.textContent = 'Loading...';
      loadSampleBtn.classList.add('loading');
      
      try {
        window.tabManagement.loadSampleProject(selectedSample);
      } catch (error) {
        console.error('Error loading sample:', error);
        alert('Failed to load sample project');
      } finally {
        loadSampleBtn.disabled = false;
        loadSampleBtn.textContent = 'Load Selected';
        loadSampleBtn.classList.remove('loading');
        sampleProjects.value = '';
      }
    });

    sampleProjects.addEventListener('change', (e) => {
      loadSampleBtn.disabled = !e.target.value;
    });
    
    // Navigation
openCreditsBtn.addEventListener('click', () => {
  let creditsTab = window.tabManagement.tabs.find(tab => tab.id === 'credits');
  
  if (!creditsTab) {
    creditsTab = {
      id: 'credits',
      title: 'Credits',
      type: 'credits',
      removable: true  // Changed to true to allow closing
    };
    window.tabManagement.tabs.push(creditsTab);
    window.tabManagement.workspaces[creditsTab.id] = window.tabManagement.createWorkspace(creditsTab);
    window.tabManagement.renderTabs();
    
    const workspace = window.tabManagement.workspaces[creditsTab.id];
    
    // Create and connect all blocks
    const versionBlock = workspace.newBlock('comment_block');
    versionBlock.setFieldValue('FRC Blockly IDE v1.0.0', 'TEXT');
    
    const creditsBlock = workspace.newBlock('comment_block');
    creditsBlock.setFieldValue('Developed by: Your Name | Powered by Blockly', 'TEXT');
    
    const dateBlock = workspace.newBlock('comment_block');
    dateBlock.setFieldValue('Created: ' + new Date().toLocaleDateString(), 'TEXT');
    
    // Connect blocks
    versionBlock.nextConnection.connect(creditsBlock.previousConnection);
    creditsBlock.nextConnection.connect(dateBlock.previousConnection);
    
    // Make blocks uneditable
    versionBlock.setEditable(false);
    creditsBlock.setEditable(false);
    dateBlock.setEditable(false);
    
    // Render all blocks
    versionBlock.initSvg();
    versionBlock.render();
    creditsBlock.initSvg();
    creditsBlock.render();
    dateBlock.initSvg();
    dateBlock.render();
    
    // Position the first block
    versionBlock.moveBy(50, 50);
  }
  
  window.tabManagement.switchTab('credits');
});

    // Modal close when clicking outside
    window.addEventListener('click', (e) => {
      if (e.target === helpModal) {
        helpModal.style.display = 'none';
      }
    });

    // Window resize handler
    window.addEventListener('resize', () => {
      if (window.tabManagement.activeTabId && window.tabManagement.workspaces[window.tabManagement.activeTabId]) {
        Blockly.svgResize(window.tabManagement.workspaces[window.tabManagement.activeTabId]);
      }
    });

    // Zoom controls
    zoomIn.addEventListener('click', () => {
      if (window.tabManagement.activeTabId && window.tabManagement.workspaces[window.tabManagement.activeTabId]) {
        window.tabManagement.workspaces[window.tabManagement.activeTabId].zoomCenter(1);
      }
    });

    zoomOut.addEventListener('click', () => {
      if (window.tabManagement.activeTabId && window.tabManagement.workspaces[window.tabManagement.activeTabId]) {
        window.tabManagement.workspaces[window.tabManagement.activeTabId].zoomCenter(-1);
      }
    });

    zoomReset.addEventListener('click', () => {
      if (window.tabManagement.activeTabId && window.tabManagement.workspaces[window.tabManagement.activeTabId]) {
        window.tabManagement.workspaces[window.tabManagement.activeTabId].setScale(1.0);
        window.tabManagement.workspaces[window.tabManagement.activeTabId].scrollCenter();
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveProject.call(window.tabManagement);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
        e.preventDefault();
        loadProject.call(window.tabManagement);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        toggleDarkMode();
      }
      if (e.key === 'Enter' && document.activeElement === sampleProjects) {
        loadSampleBtn.click();
      }
    });
  }
};