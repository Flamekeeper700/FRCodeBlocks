document.addEventListener('DOMContentLoaded', function() {
  // Initialize dark mode from localStorage
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
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
});