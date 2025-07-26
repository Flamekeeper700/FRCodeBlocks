document.addEventListener('DOMContentLoaded', function() {
  // Initialize dark mode from localStorage
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }

  // Initialize data types FIRST
  if (window.dataTypes && window.dataTypes.init) {
    try {
      window.dataTypes.init();
    } catch (e) {
      console.error('Error initializing data types:', e);
    }
  }

  // Create a safe tabManagement object if it doesn't exist
  if (!window.tabManagement) {
    window.tabManagement = {
      workspaces: {},
      tabs: [],
      coreTabs: []
    };
    console.warn('tabManagement not found, created fallback');
  }

  // Initialize core tabs
  window.tabManagement.coreTabs.forEach(tab => {
    window.tabManagement.tabs.push(tab);
    window.tabManagement.workspaces[tab.id] = window.tabManagement.createWorkspace(tab);
  });

  // Render tabs and switch to first tab
  window.tabManagement.renderTabs();
  if (window.tabManagement.coreTabs.length > 0) {
    window.tabManagement.switchTab(window.tabManagement.coreTabs[0].id);
    window.tabManagement.updateOutput();
  }

  // Setup event listeners
  window.eventHandlers.setupEventListeners();

  // Force another update of data types after everything is loaded
  setTimeout(() => {
    if (window.dataTypes && window.dataTypes.updateAllBlocks) {
      window.dataTypes.updateAllBlocks();
    }
  }, 500);
});