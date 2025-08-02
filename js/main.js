document.addEventListener('DOMContentLoaded', function () {
  // 1. Initialize Theme Manager
  if (window.themeManager?.init) {
    try {
      window.themeManager.init();
    } catch (e) {
      console.error('Error initializing theme manager:', e);
    }
  }

  // 2. Initialize Data Types
  if (window.dataTypes?.init) {
    try {
      window.dataTypes.init();
    } catch (e) {
      console.error('Error initializing data types:', e);
    }
  }

  // 3. Setup tabManagement
  if (!window.tabManagement) {
    console.error('tabManagement not found');
    return;
  }

  // 4. Initialize Core Tabs
  try {
    window.tabManagement.coreTabs.forEach(tab => {
      window.tabManagement.tabs.push(tab);
      window.tabManagement.workspaces[tab.id] = window.tabManagement.createWorkspace(tab);
    });

    // 5. Render Tabs and Switch to First
    window.tabManagement.renderTabs();

    if (window.tabManagement.coreTabs.length > 0) {
      const firstTabId = window.tabManagement.coreTabs[0].id;
      window.tabManagement.switchTab(firstTabId);
      window.tabManagement.updateOutput();
    }
  } catch (e) {
    console.error('Error initializing tabs:', e);
  }

  // 6. Setup Event Listeners
  if (window.eventHandlers?.setupEventListeners) {
    window.eventHandlers.setupEventListeners();
  }

  // 7. Force Data Type Updates After Initial Load
  setTimeout(() => {
    if (window.dataTypes?.updateAllBlocks) {
      window.dataTypes.updateAllBlocks();
    }
  }, 500);
});