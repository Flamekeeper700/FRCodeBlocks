// data-types.js

// Global dataTypes object for managing custom and base types in Blockly
window.dataTypes = {
  // === Base Types ===
  // Common types used in general programming
  baseTypes: [
    { value: 'int', label: 'Integer (int)', default: '0' },
    { value: 'double', label: 'Decimal (double)', default: '0.0' },
    { value: 'boolean', label: 'True/False (boolean)', default: 'false' },
    { value: 'String', label: 'Text (String)', default: '""' }
  ],

  // === FRC-Specific Types ===
  // Custom types relevant to FRC robot programming
  frcTypes: [
    { value: 'Joystick', label: 'Joystick', default: '0' },
    { value: 'XboxController', label: 'Xbox Controller', default: '0' }
  ],

  // === Utility Methods ===

  // Returns all available types (base + frc)
  getAllTypes: function () {
    return [...this.baseTypes, ...this.frcTypes];
  },

  // Generates dropdown options as [label, value] pairs
  getDropdownOptions: function () {
    return this.getAllTypes().map(type => [type.label, type.value]);
  },

  // Returns default value for a given type
  getDefaultValue: function (type) {
    const found = this.getAllTypes().find(t => t.value === type);
    return found ? found.default : 'null';
  },

  // Adds a new FRC type
  addType: function (type) {
    if (!type.value || !type.label || !type.default) {
      throw new Error('Type must have value, label, and default properties');
    }

    if (this.getAllTypes().some(t => t.value === type.value)) {
      throw new Error(`Type '${type.value}' already exists`);
    }

    this.frcTypes.push(type);
    this.updateAllBlocks();
  },

  // Removes an FRC type by value
  removeType: function (typeValue) {
    const index = this.frcTypes.findIndex(t => t.value === typeValue);
    if (index !== -1) {
      this.frcTypes.splice(index, 1);
      this.updateAllBlocks();
    }
  },

  // Refreshes all blocks that use type dropdowns
  updateAllBlocks: function () {
    if (!window.tabManagement || !window.tabManagement.workspaces) {
      console.warn('tabManagement.workspaces not available yet');
      return;
    }

    Object.values(window.tabManagement.workspaces).forEach(workspace => {
      if (!workspace) return;

      workspace.getAllBlocks().forEach(block => {
        const shouldUpdate =
          block.type === 'frc_variable_declaration' ||
          block.type === 'frc_variable_set' ||
          block.type === 'frc_variable_get' ||
          block.type === 'frc_custom_function_declare';

        if (shouldUpdate) {
          this.updateBlockTypeDropdown(block);
        }
      });
    });
  },

  // Updates dropdown for a specific block instance
  updateBlockTypeDropdown: function (block) {
    const fieldName = block.type === 'frc_custom_function_declare' ? 'RETURN_TYPE' : 'TYPE';
    const field = block.getField(fieldName);
    if (!field) return;

    const options =
      block.type === 'frc_custom_function_declare'
        ? [['void', 'void'], ...this.getDropdownOptions()]
        : this.getDropdownOptions();

    if (options.length === 0) {
      options.push(['int', 'int']); // Fallback option
    }

    field.menuGenerator_ = options;
    field.setValue(options[0][1]); // Set to first valid option
  },

  // === Initialization ===

  // Set up dropdowns and modal behavior
  init: function () {
    this.updateAllBlocks();

    // Close modal when clicking outside
    document.addEventListener('click', function (e) {
      const modal = document.getElementById('dataTypesModal');
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });

    // Delay update in case blocks load late
    setTimeout(() => this.updateAllBlocks(), 100);
  }
};

// Initialize on load
window.dataTypes.init();
