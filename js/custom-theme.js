// custom-theme.js
window.themeManager = {
  VARIABLE_DESCRIPTIONS: {
    '--bg-color': 'App BG',
    '--text-color': 'Text',
    '--tab-bg': 'Tab BG',
    '--tab-border': 'Tab Border',
    '--tab-active-bg': 'Active Tab',
    '--tab-active-border': 'Active Border',
    '--toolbox-bg': 'Toolbox BG',
    '--toolbox-border': 'Tool Edge',
    '--controls-bg': 'Controls',
    '--output-bg': 'Output BG',
    '--output-text': 'Output Text',
    '--button-bg': 'Button',
    '--button-text': 'Btn Text',
    '--button-hover': 'Btn Hover',
    '--button-border': 'Btn Edge',
    '--modal-bg': 'Popup BG',
    '--modal-text': 'Popup Text',
    '--blockly-bg': 'Workspace',
    '--blockly-text': 'Block Text',
    '--blockly-toolbox': 'Block Tools',
    '--blockly-path': 'Connectors',
    '--blockly-scrollbar': 'Scrollbar',
    '--input-field-bg': 'Input Field BG'
  },

  // Built-in themes
  themes: {
    default: {
      name: "Default Light",
      variables: {
        '--bg-color': '#f5f5f5',
        '--text-color': '#333',
        '--tab-bg': '#f5f5f5',
        '--tab-border': '#ccc',
        '--tab-active-bg': '#fff',
        '--tab-active-border': '#0066cc',
        '--toolbox-bg': '#f5f5f5',
        '--toolbox-border': '#ccc',
        '--controls-bg': '#eee',
        '--output-bg': '#111',
        '--output-text': '#0f0',
        '--button-bg': '#4CAF50',
        '--button-text': 'white',
        '--button-hover': '#45a049',
        '--button-border': '#4CAF50',
        '--modal-bg': 'white',
        '--modal-text': '#333',
        '--blockly-bg': '#fff',
        '--blockly-text': '#333',
        '--blockly-toolbox': '#f5f5f5',
        '--blockly-path': '#444',
        '--blockly-scrollbar': '#555',
        '--input-field-bg': '#ffffff'  // White for light text
      }
    },
    dark: {
      name: "Dark Mode",
      variables: {
        '--bg-color': '#1a1a1a',
        '--text-color': '#e0e0e0',
        '--tab-bg': '#2d2d2d',
        '--tab-border': '#444',
        '--tab-active-bg': '#3a3a3a',
        '--tab-active-border': '#4a90e2',
        '--toolbox-bg': '#2d2d2d',
        '--toolbox-border': '#444',
        '--controls-bg': '#333',
        '--output-bg': '#121212',
        '--output-text': '#4af24a',
        '--button-bg': '#444',
        '--button-text': '#e0e0e0',
        '--button-hover': '#555',
        '--button-border': '#555',
        '--modal-bg': '#333',
        '--modal-text': '#e0e0e0',
        '--blockly-bg': '#252525',
        '--blockly-text': '#e0e0e0',
        '--blockly-toolbox': '#2d2d2d',
        '--blockly-path': '#666',
        '--blockly-scrollbar': '#777',
        '--input-field-bg': '#333333'  // Dark gray for light text
      }
    },
    highContrast: {
      name: "High Contrast",
      variables: {
        '--bg-color': '#121212',
        '--text-color': '#ffffff',
        '--tab-bg': '#1e1e1e',
        '--tab-border': '#ffffff',
        '--tab-active-bg': '#2a2a2a',
        '--tab-active-border': '#ffff00',
        '--toolbox-bg': '#1e1e1e',
        '--toolbox-border': '#ffffff',
        '--controls-bg': '#1e1e1e',
        '--output-bg': '#000000',
        '--output-text': '#00ff00',
        '--button-bg': '#ffffff',
        '--button-text': '#000000',
        '--button-hover': '#ffff00',
        '--button-border': '#ffffff',
        '--modal-bg': '#1e1e1e',
        '--modal-text': '#ffffff',
        '--blockly-bg': '#121212',
        '--blockly-text': '#ffffff',
        '--blockly-toolbox': '#1e1e1e',
        '--blockly-path': '#ffff00',
        '--blockly-scrollbar': '#ffffff',
        '--input-field-bg': '#000000'  // Pure black for maximum contrast
      }
    },
    solarizedLight: {
      name: "Solarized Light",
      variables: {
        '--bg-color': '#fdf6e3',
        '--text-color': '#586e75',
        '--tab-bg': '#eee8d5',
        '--tab-border': '#93a1a1',
        '--tab-active-bg': '#fdf6e3',
        '--tab-active-border': '#268bd2',
        '--toolbox-bg': '#eee8d5',
        '--toolbox-border': '#93a1a1',
        '--controls-bg': '#eee8d5',
        '--output-bg': '#073642',
        '--output-text': '#839496',
        '--button-bg': '#268bd2',
        '--button-text': '#fdf6e3',
        '--button-hover': '#2aa198',
        '--button-border': '#268bd2',
        '--modal-bg': '#fdf6e3',
        '--modal-text': '#586e75',
        '--blockly-bg': '#fdf6e3',
        '--blockly-text': '#586e75',
        '--blockly-toolbox': '#eee8d5',
        '--blockly-path': '#586e75',
        '--blockly-scrollbar': '#93a1a1',
        '--input-field-bg': '#fdf6e3'  // Matching background
      }
    },
    solarizedDark: {
      name: "Solarized Dark",
      variables: {
        '--bg-color': '#002b36',
        '--text-color': '#839496',
        '--tab-bg': '#073642',
        '--tab-border': '#586e75',
        '--tab-active-bg': '#002b36',
        '--tab-active-border': '#2aa198',
        '--toolbox-bg': '#073642',
        '--toolbox-border': '#586e75',
        '--controls-bg': '#073642',
        '--output-bg': '#073642',
        '--output-text': '#93a1a1',
        '--button-bg': '#2aa198',
        '--button-text': '#002b36',
        '--button-hover': '#268bd2',
        '--button-border': '#2aa198',
        '--modal-bg': '#002b36',
        '--modal-text': '#839496',
        '--blockly-bg': '#002b36',
        '--blockly-text': '#839496',
        '--blockly-toolbox': '#073642',
        '--blockly-path': '#839496',
        '--blockly-scrollbar': '#586e75',
        '--input-field-bg': '#073642'  // Darker background for contrast
      }
    },
    dracula: {
      name: "Dracula",
      variables: {
        '--bg-color': '#282a36',
        '--text-color': '#f8f8f2',
        '--tab-bg': '#44475a',
        '--tab-border': '#6272a4',
        '--tab-active-bg': '#343746',
        '--tab-active-border': '#ff79c6',
        '--toolbox-bg': '#44475a',
        '--toolbox-border': '#6272a4',
        '--controls-bg': '#44475a',
        '--output-bg': '#21222c',
        '--output-text': '#50fa7b',
        '--button-bg': '#ff79c6',
        '--button-text': '#282a36',
        '--button-hover': '#bd93f9',
        '--button-border': '#ff79c6',
        '--modal-bg': '#282a36',
        '--modal-text': '#f8f8f2',
        '--blockly-bg': '#282a36',
        '--blockly-text': '#f8f8f2',
        '--blockly-toolbox': '#44475a',
        '--blockly-path': '#ff79c6',
        '--blockly-scrollbar': '#6272a4',
        '--input-field-bg': '#343746'  // Slightly darker than background
      }
    },
    nord: {
      name: "Nord",
      variables: {
        '--bg-color': '#2e3440',
        '--text-color': '#d8dee9',
        '--tab-bg': '#3b4252',
        '--tab-border': '#4c566a',
        '--tab-active-bg': '#434c5e',
        '--tab-active-border': '#81a1c1',
        '--toolbox-bg': '#3b4252',
        '--toolbox-border': '#4c566a',
        '--controls-bg': '#3b4252',
        '--output-bg': '#3b4252',
        '--output-text': '#a3be8c',
        '--button-bg': '#5e81ac',
        '--button-text': '#eceff4',
        '--button-hover': '#81a1c1',
        '--button-border': '#5e81ac',
        '--modal-bg': '#2e3440',
        '--modal-text': '#d8dee9',
        '--blockly-bg': '#2e3440',
        '--blockly-text': '#d8dee9',
        '--blockly-toolbox': '#3b4252',
        '--blockly-path': '#81a1c1',
        '--blockly-scrollbar': '#4c566a',
        '--input-field-bg': '#3b4252'  // Matching toolbox color
      }
    },
    monokai: {
      name: "Monokai",
      variables: {
        '--bg-color': '#2d2a2e',
        '--text-color': '#fcfcfa',
        '--tab-bg': '#3c3a3e',
        '--tab-border': '#727072',
        '--tab-active-bg': '#2d2a2e',
        '--tab-active-border': '#ff6188',
        '--toolbox-bg': '#3c3a3e',
        '--toolbox-border': '#727072',
        '--controls-bg': '#3c3a3e',
        '--output-bg': '#3c3a3e',
        '--output-text': '#a9dc76',
        '--button-bg': '#ff6188',
        '--button-text': '#2d2a2e',
        '--button-hover': '#ffd866',
        '--button-border': '#ff6188',
        '--modal-bg': '#2d2a2e',
        '--modal-text': '#fcfcfa',
        '--blockly-bg': '#2d2a2e',
        '--blockly-text': '#fcfcfa',
        '--blockly-toolbox': '#3c3a3e',
        '--blockly-path': '#ff6188',
        '--blockly-scrollbar': '#727072',
        '--input-field-bg': '#3c3a3e'  // Matching toolbox color
      }
    },
    github: {
      name: "GitHub",
      variables: {
        '--bg-color': '#ffffff',
        '--text-color': '#24292e',
        '--tab-bg': '#f6f8fa',
        '--tab-border': '#e1e4e8',
        '--tab-active-bg': '#ffffff',
        '--tab-active-border': '#0366d6',
        '--toolbox-bg': '#f6f8fa',
        '--toolbox-border': '#e1e4e8',
        '--controls-bg': '#f6f8fa',
        '--output-bg': '#24292e',
        '--output-text': '#f6f8fa',
        '--button-bg': '#2ea44f',
        '--button-text': '#ffffff',
        '--button-hover': '#2c974b',
        '--button-border': '#2ea44f',
        '--modal-bg': '#ffffff',
        '--modal-text': '#24292e',
        '--blockly-bg': '#ffffff',
        '--blockly-text': '#24292e',
        '--blockly-toolbox': '#f6f8fa',
        '--blockly-path': '#24292e',
        '--blockly-scrollbar': '#e1e4e8',
        '--input-field-bg': '#ffffff'  // Pure white background
      }
    }
  },

  // Storage for custom themes
  customThemes: {},

  init: function() {
    this.loadCustomThemes();
    const savedTheme = localStorage.getItem('currentTheme');
    this.applyTheme(savedTheme || 'default');
    this.updateThemeSelector();
    this.setupThemeEditor();
  },

  loadCustomThemes: function() {
    const savedThemes = localStorage.getItem('customThemes');
    if (savedThemes) {
      try {
        this.customThemes = JSON.parse(savedThemes);
      } catch (e) {
        console.error('Error loading custom themes:', e);
        this.customThemes = {};
      }
    }
  },

  saveCustomThemes: function() {
    localStorage.setItem('customThemes', JSON.stringify(this.customThemes));
  },

  applyTheme: function(themeName) {
    let theme = this.themes[themeName] || this.customThemes[themeName];
    if (!theme) {
      console.warn(`Theme "${themeName}" not found, using default`);
      themeName = 'default';
      theme = this.themes[themeName];
    }

    for (const [varName, value] of Object.entries(theme.variables)) {
      document.documentElement.style.setProperty(varName, value);
    }

    localStorage.setItem('currentTheme', themeName);
    this.updateThemeSelector(themeName);

    if (window.tabManagement && window.tabManagement.activeTabId) {
      setTimeout(() => {
        const workspace = window.tabManagement.workspaces[window.tabManagement.activeTabId];
        if (workspace) {
          Blockly.svgResize(workspace);
        }
      }, 100);
    }
  },

  updateThemeSelector: function(selectedTheme) {
    const { themeSelector } = window.domElements;
    if (!themeSelector) return;

    themeSelector.innerHTML = '';

    const builtInGroup = document.createElement('optgroup');
    builtInGroup.label = "Built-in Themes";
    Object.entries(this.themes).forEach(([id, theme]) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = theme.name;
      builtInGroup.appendChild(option);
    });
    themeSelector.appendChild(builtInGroup);

    if (Object.keys(this.customThemes).length > 0) {
      const customGroup = document.createElement('optgroup');
      customGroup.label = "Custom Themes";
      Object.entries(this.customThemes).forEach(([id, theme]) => {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = theme.name + " (Custom)";
        customGroup.appendChild(option);
      });
      themeSelector.appendChild(customGroup);
    }

    if (selectedTheme) {
      themeSelector.value = selectedTheme;
    }
  },

  showThemeEditor: function() {
    const { themeEditorModal } = window.domElements;
    if (!themeEditorModal) return;

    this.populateThemeEditor();
    themeEditorModal.style.display = 'flex';
  },

  populateThemeEditor: function() {
    const { themeVariablesEditor } = window.domElements;
    if (!themeVariablesEditor) return;

    themeVariablesEditor.innerHTML = '';

    const currentTheme = this.getCurrentTheme();
    const variables = currentTheme?.variables || this.themes.default.variables;

    for (const [varName, value] of Object.entries(variables)) {
      const div = document.createElement('div');
      div.className = 'theme-variable-editor';

      const label = document.createElement('label');
      label.textContent = this.VARIABLE_DESCRIPTIONS[varName] || varName;
      label.htmlFor = `var-${varName.replace(/[^a-z0-9]/gi, '-')}`;
      label.title = varName;

      const input = document.createElement('input');
      input.type = 'color';
      input.id = `var-${varName.replace(/[^a-z0-9]/gi, '-')}`;
      input.value = this.isValidColor(value) ? value : '#ffffff';
      input.dataset.varName = varName;

      const valueDisplay = document.createElement('span');
      valueDisplay.className = 'variable-value';
      valueDisplay.textContent = value;

      input.addEventListener('input', (e) => {
        valueDisplay.textContent = e.target.value;
      });

      div.appendChild(label);
      div.appendChild(input);
      div.appendChild(valueDisplay);
      themeVariablesEditor.appendChild(div);
    }
  },

  isValidColor: function(str) {
    const s = new Option().style;
    s.color = str;
    return s.color !== '';
  },

  getCurrentTheme: function() {
    const currentThemeName = localStorage.getItem('currentTheme') || 'default';
    return this.themes[currentThemeName] || this.customThemes[currentThemeName];
  },

  saveCurrentThemeAsCustom: function(name) {
    if (!name || typeof name !== 'string' || name.trim() === '') {
      alert('Please enter a valid theme name');
      return null;
    }

    const themeId = name.toLowerCase().replace(/\s+/g, '-');
    if (this.themes[themeId] || this.customThemes[themeId]) {
      alert('Theme name already exists');
      return null;
    }

    const newTheme = {
      name: name.trim(),
      variables: {}
    };

    document.querySelectorAll('#themeVariablesEditor input').forEach(input => {
      newTheme.variables[input.dataset.varName] = input.value;
    });

    this.customThemes[themeId] = newTheme;
    this.saveCustomThemes();

    return themeId;
  },

  setupThemeEditor: function() {
    const { saveCustomTheme, deleteCustomTheme, themeEditorModal, newThemeName } = window.domElements;
    if (!saveCustomTheme || !themeEditorModal) return;

    saveCustomTheme.addEventListener('click', () => {
      const name = newThemeName.value.trim();
      if (!name) {
        alert('Please enter a theme name');
        return;
      }

      const themeId = this.saveCurrentThemeAsCustom(name);
      if (themeId) {
        this.applyTheme(themeId);
        this.updateThemeSelector();
        newThemeName.value = '';
      }
    });

    deleteCustomTheme.addEventListener('click', () => {
      this.deleteCurrentTheme();
    });

    const editThemeBtn = document.getElementById('editThemeBtn');
    if (editThemeBtn) {
      editThemeBtn.addEventListener('click', () => {
        newThemeName.value = '';
      });
    }
  },

  deleteCurrentTheme: function() {
    const currentThemeName = localStorage.getItem('currentTheme');
    if (this.customThemes[currentThemeName]) {
      if (confirm(`Are you sure you want to delete the "${this.customThemes[currentThemeName].name}" theme?`)) {
        delete this.customThemes[currentThemeName];
        this.saveCustomThemes();

        // Switch to default theme if deleted theme was active
        if (localStorage.getItem('currentTheme') === currentThemeName) {
          this.applyTheme('default');
        }

        this.updateThemeSelector();
        this.themeEditorModal.style.display = 'none';
        return true;
      }
    } else {
      alert("You can only delete custom themes, not built-in ones.");
    }
    return false;
  }

};
