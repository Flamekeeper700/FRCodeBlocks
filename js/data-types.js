
// data-types.js
window.dataTypes = {
  // Base data types that will be used across the application
  baseTypes: [
    { value: 'int', label: 'Integer (int)', default: '0' },
    { value: 'double', label: 'Decimal (double)', default: '0.0' },
    { value: 'boolean', label: 'True/False (boolean)', default: 'false' },
    { value: 'String', label: 'Text (String)', default: '""' }
  ],

  // FRC-specific data types
  frcTypes: [
    { value: 'MotorController', label: 'MotorController', default: '0.0' },
    { value: 'Joystick', label: 'Joystick', default: '0' },
    { value: 'Encoder', label: 'Encoder', default: '0, 1' },
    { value: 'PIDController', label: 'PIDController', default: '0.1, 0.0, 0.0' },
    { value: 'Timer', label: 'Timer', default: '0.0' }
  ],

  // Get all available types
  getAllTypes: function() {
    return [...this.baseTypes, ...this.frcTypes];
  },

  // Get options for dropdown menus
  getDropdownOptions: function() {
    return this.getAllTypes().map(type => [type.label, type.value]);
  },

  // Get default value for a type
  getDefaultValue: function(type) {
    const foundType = this.getAllTypes().find(t => t.value === type);
    return foundType ? foundType.default : 'null';
  },

  // Add a new data type
  addType: function(type) {
    if (!type.value || !type.label || !type.default) {
      throw new Error('Type must have value, label, and default properties');
    }
    
    // Check if type already exists
    if (this.getAllTypes().some(t => t.value === type.value)) {
      throw new Error(`Type '${type.value}' already exists`);
    }
    
    this.frcTypes.push(type);
    this.updateAllBlocks();
  },

  // Remove a data type
  removeType: function(typeValue) {
    const index = this.frcTypes.findIndex(t => t.value === typeValue);
    if (index !== -1) {
      this.frcTypes.splice(index, 1);
      this.updateAllBlocks();
    }
  },

  // Update all blocks that use data types
  updateAllBlocks: function() {
  // Check if tabManagement exists and has workspaces
  if (!window.tabManagement || !window.tabManagement.workspaces) {
    console.warn('tabManagement.workspaces not available yet');
    return;
  }
  
  // Refresh all workspaces
  Object.values(window.tabManagement.workspaces).forEach(workspace => {
    if (!workspace) return;
    
    workspace.getAllBlocks().forEach(block => {
      if (block.type === 'frc_variable_declaration' || 
          block.type === 'frc_variable_set' || 
          block.type === 'frc_variable_get' ||
          block.type === 'frc_custom_function_declare') {
        this.updateBlockTypeDropdown(block);
      }
    });
  });
},

  // Update type dropdown for a specific block
  updateBlockTypeDropdown: function(block) {
    const fieldName = block.type === 'frc_custom_function_declare' ? 'RETURN_TYPE' : 'TYPE';
    const field = block.getField(fieldName);
    if (field) {
      const options = block.type === 'frc_custom_function_declare' 
        ? [['void', 'void'], ...this.getDropdownOptions()]
        : this.getDropdownOptions();
        
      // Make sure options are never empty
      if (options.length === 0) {
        options.push(['int', 'int']);
      }
      
      field.menuGenerator_ = options;
      field.setValue(options[0][1]); // Set to first valid option
    }
  },

  // Initialize the type system
  init: function() {
    // Initialize dropdown options for all relevant blocks
    this.updateAllBlocks();
    
    // Add event listener for the data types modal
    document.addEventListener('click', function(e) {
      if (e.target === document.getElementById('dataTypesModal')) {
        document.getElementById('dataTypesModal').style.display = 'none';
      }
    });

    // Force update of all blocks immediately
    setTimeout(() => this.updateAllBlocks(), 100);
  }
};

// Initialize immediately when loaded
window.dataTypes.init();