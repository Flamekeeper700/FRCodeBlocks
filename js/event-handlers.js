/**
 * window.eventHandlers - Centralized event management for UI interactions.
 * Includes tab controls, data type management, project saving/loading, and modals.
 */

window.eventHandlers = {
  isSaving: false,
  isLoading: false,

  /** ==============================
   * Setup All Event Listeners
   * ============================== */
  setupEventListeners: function () {
    this.removeEventListeners(); // Prevent double bindings

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
      loadSampleProject
    } = window.tabManagement;

    /** -----------------------------
     * Theme Management
     * ----------------------------- */
    themeSelector?.addEventListener('change', (e) => {
      window.themeManager.applyTheme(e.target.value);
    });

    editThemeBtn?.addEventListener('click', () => {
      window.themeManager?.showThemeEditor?.();
    });

    /** -----------------------------
     * Core Tab Actions
     * ----------------------------- */
    addTabBtn.addEventListener('click', () => addTab.call(window.tabManagement));
    downloadJavaBtn.addEventListener('click', window.codeGeneration.downloadJavaFile);
    copyCodeBtn.addEventListener('click', window.codeGeneration.copyCodeToClipboard);
    saveProjectBtn.addEventListener('click', this.handleSaveProject.bind(this));
    loadProjectBtn.addEventListener('click', this.handleLoadProject.bind(this));

    /** -----------------------------
     * Help Modal
     * ----------------------------- */
    helpBtn.addEventListener('click', () => helpModal.style.display = 'flex');
    closeModal.addEventListener('click', () => helpModal.style.display = 'none');

    /** -----------------------------
     * Load Sample Project
     * ----------------------------- */
    loadSampleBtn.addEventListener('click', () => {
      const selectedSample = sampleProjects.value;

      if (!selectedSample) {
        alert('Please select a sample project first');
        return;
      }

      const sampleData = window.sampleProjects?.tabPresets?.[selectedSample];
      if (!sampleData) {
        alert('Selected sample project not found');
        return;
      }

      loadSampleBtn.disabled = true;
      loadSampleBtn.textContent = 'Loading...';

      try {
        loadSampleProject(selectedSample);
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

    /** -----------------------------
     * Open Credits Tab
     * ----------------------------- */
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

        const blocks = [
          { text: 'FRCodeBlocks v0.1.0' },
          { text: 'Developed by: Flamekeeper700' },
          { text: 'Released: July 30th 2025'}
        ];

        let previousBlock = null;
        blocks.forEach((b, i) => {
          const block = workspace.newBlock('comment_block');
          block.setFieldValue(b.text, 'TEXT');
          block.setEditable(false);
          block.initSvg();
          block.render();
          if (i === 0) block.moveBy(50, 50);
          if (previousBlock) previousBlock.nextConnection.connect(block.previousConnection);
          previousBlock = block;
        });
      }

      window.tabManagement.switchTab('credits');
    });

    /** -----------------------------
     * Data Types Management
     * ----------------------------- */
    manageDataTypesBtn?.addEventListener('click', this.handleManageDataTypesClick.bind(this));
    addDataTypeBtn?.addEventListener('click', this.handleAddDataTypeClick.bind(this));

    /** -----------------------------
     * Close Modals When Clicking Outside
     * ----------------------------- */
    window.addEventListener('click', (e) => {
      if (e.target === helpModal) helpModal.style.display = 'none';
      if (e.target === document.getElementById('dataTypesModal')) {
        document.getElementById('dataTypesModal').style.display = 'none';
      }
    });

    /** -----------------------------
     * Resize Blockly on Window Resize
     * ----------------------------- */
    window.addEventListener('resize', () => {
      const activeId = window.tabManagement.activeTabId;
      const workspace = window.tabManagement.workspaces[activeId];
      if (workspace) Blockly.svgResize(workspace);
    });

    /** -----------------------------
     * Keyboard Shortcuts
     * ----------------------------- */
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

    /** -----------------------------
     * Modal Close Buttons
     * ----------------------------- */
    document.querySelectorAll('.modal .close-modal').forEach(btn => {
      btn.addEventListener('click', function () {
        this.closest('.modal').style.display = 'none';
      });
    });
  },

  /** ==============================
   * Clean up Previous Listeners
   * ============================== */
  removeEventListeners: function () {
    const { saveProjectBtn, loadProjectBtn } = window.domElements;

    // Clone and replace buttons to remove all listeners
    if (saveProjectBtn) {
      const newSave = saveProjectBtn.cloneNode(true);
      saveProjectBtn.parentNode.replaceChild(newSave, saveProjectBtn);
      window.domElements.saveProjectBtn = newSave;
    }

    if (loadProjectBtn) {
      const newLoad = loadProjectBtn.cloneNode(true);
      loadProjectBtn.parentNode.replaceChild(newLoad, loadProjectBtn);
      window.domElements.loadProjectBtn = newLoad;
    }
  },

  /** ==============================
   * Save Project Handler
   * ============================== */
  handleSaveProject: function () {
    if (this.isSaving) return;
    this.isSaving = true;

    try {
      window.tabManagement.saveProject();
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      this.isSaving = false;
    }
  },

  /** ==============================
   * Load Project Handler
   * ============================== */
  handleLoadProject: function () {
    if (this.isLoading) return;
    this.isLoading = true;

    window.tabManagement.loadProject()
      .then(success => {
        if (success) {
          window.dataTypes?.updateAllBlocks?.();
        }
      })
      .catch(err => {
        console.error('Load error:', err);
      })
      .finally(() => {
        this.isLoading = false;
      });
  },

  /** ==============================
   * Manage Data Types Modal
   * ============================== */
  handleManageDataTypesClick: function () {
    const modal = document.getElementById('dataTypesModal');
    const list = document.getElementById('dataTypesList');
    if (!modal || !list) return;

    list.innerHTML = '';

    window.dataTypes.getAllTypes().forEach(type => {
      const div = document.createElement('div');
      div.className = 'data-type-item';
      div.innerHTML = `
        <span>${type.label} (default: ${type.default})</span>
        ${['int', 'double', 'boolean', 'String'].includes(type.value)
          ? '<span class="base-type">Base Type</span>'
          : `<button class="remove-type-btn" data-type="${type.value}">Remove</button>`}
      `;
      list.appendChild(div);
    });

    // Remove handlers
    document.querySelectorAll('.remove-type-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const typeValue = this.getAttribute('data-type');
        try {
          window.dataTypes.removeType(typeValue);
          this.closest('.data-type-item').remove();
        } catch (err) {
          alert(err.message);
        }
      });
    });

    modal.style.display = 'flex';
  },

  /** ==============================
   * Add New Data Type
   * ============================== */
  handleAddDataTypeClick: function () {
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

      this.handleManageDataTypesClick(); // Refresh modal
    } catch (err) {
      alert(err.message);
    }
  }
};
