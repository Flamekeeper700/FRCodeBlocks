/**
 * main.js - Entry point for initializing the Blockly environment
 * 
 * Initializes theme manager, data types, tab management, and event listeners.
 * Designed to load cleanly and provide graceful fallbacks for missing components.
 */

document.addEventListener('DOMContentLoaded', function () {

  /** -------------------------------
   *  1. Initialize Theme Manager
   * ------------------------------- */
  if (window.themeManager?.init) {
    try {
      window.themeManager.init();
    } catch (e) {
      console.error('Error initializing theme manager:', e);
    }
  }

  /** -------------------------------
   *  2. Initialize Data Types
   * ------------------------------- */
  if (window.dataTypes?.init) {
    try {
      window.dataTypes.init();
    } catch (e) {
      console.error('Error initializing data types:', e);
    }
  }

  /** ------------------------------------------------
   *  3. Setup tabManagement (fallback if not defined)
   * ------------------------------------------------ */
  if (!window.tabManagement) {
    window.tabManagement = {
      workspaces: {},
      tabs: [],
      coreTabs: [],
      // Optional: Define createWorkspace, renderTabs, switchTab, updateOutput here if needed
    };
    console.warn('tabManagement not found, created fallback');
  }

  /** -------------------------------
   *  4. Initialize Core Tabs
   * ------------------------------- */
  window.tabManagement.coreTabs.forEach(tab => {
    window.tabManagement.tabs.push(tab);
    window.tabManagement.workspaces[tab.id] = window.tabManagement.createWorkspace(tab);
  });

  /** -------------------------------
   *  5. Render Tabs and Switch to First
   * ------------------------------- */
  window.tabManagement.renderTabs();

  if (window.tabManagement.coreTabs.length > 0) {
    const firstTabId = window.tabManagement.coreTabs[0].id;
    window.tabManagement.switchTab(firstTabId);
    window.tabManagement.updateOutput();
  }

  /** -------------------------------
   *  6. Setup Event Listeners
   * ------------------------------- */
  if (window.eventHandlers?.setupEventListeners) {
    window.eventHandlers.setupEventListeners();
  }

  /** -------------------------------------------------
   *  7. Force Data Type Updates After Initial Load
   * ------------------------------------------------- */
  setTimeout(() => {
    if (window.dataTypes?.updateAllBlocks) {
      window.dataTypes.updateAllBlocks();
    }
  }, 500);

});
