'use strict';

goog.provide('Blockly.Blocks.avr');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['avr_whenchipstartsup'] = {
  /**
   * Block for when chip boots.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "avr_whenchipstartsup",
      "message0": "when chip starts up",
      "category": Blockly.Categories.avr,
      "extensions": ["colours_more", "shape_hat"]
    });
  }
};

Blockly.Blocks['avr_whenpin'] = {
  /**
   * Block for detecting rising or falling logic of pin.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "avr_whenpin",
      "message0": "when pin %1 goes %2",
      "args0": [
        {
          "type": "input_value",
          "name": "PIN"
        },
        {
          "type": "input_value",
          "name": "LOGIC_LEVEL"
        }
      ],
      "category": Blockly.Categories.avr,
      "extensions": ["colours_more", "shape_hat"]
    });
  }
};

Blockly.Blocks['avr_logicmenu'] = {
  /**
   * Logic level drop-down menu.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit(
      {
        "message0": "%1",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "LOGIC",
            "options": [
              ['HIGH', '_high_'],
              ['LOW', '_low_'],
            ]
          }
        ],
        "extensions": ["output_string"]
      });
  }
};

Blockly.Blocks['avr_pinmenu'] = {
  /**
   * Logic level drop-down menu.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit(
      {
        "message0": "%1",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "PIN",
            "options": [
              ['PA0', '_pa0_'],
              ['PA1', '_pa1_'],
              ['PA2', '_pa2_'],
              ['PA3', '_pa3_'],
              ['PA4', '_pa4_'],
              ['PA5', '_pa5_'],
              ['PA6', '_pa6_'],
              ['PA7', '_pa7_'],
              ['PB0', '_pb0_'],
              ['PB1', '_pb1_'],
              ['PB2', '_pb2_'],
              ['PB3', '_pb3_'],
            ]
          }
        ],
        "extensions": ["output_string"]
      });
  }
};

Blockly.Blocks['avr_waitms'] = {
  /**
   * Block to insert delay into instruction stream.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "avr_waitms",
      "message0": "wait %1 msecs",
      "args0": [
        {
          "type": "input_value",
          "name": "DURATION"
        }
      ],
      "category": Blockly.Categories.avr,
      "extensions": ["colours_more", "shape_statement"]
    });
  }
};

Blockly.Blocks['avr_setpin'] = {
  /**
   * Block to set logic level of pin.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "avr_setpin",
      "message0": "set pin %1 to %2",
      "args0": [
        {
          "type": "input_value",
          "name": "PIN"
        },
        {
          "type": "input_value",
          "name": "LOGIC_LEVEL"
        }
      ],
      "category": Blockly.Categories.avr,
      "extensions": ["colours_more", "shape_statement"]
    });
  }
};

Blockly.Blocks['avr_pinvalue'] = {
  /**
   * Block to report the current value of a pin.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "pin %1",
      "args0": [
        {
          "type": "input_value",
          "name": "PIN"
        }
      ],
      "category": Blockly.Categories.avr,
      "checkboxInFlyout": true,
      "extensions": ["colours_more", "output_string"]
    });
  }
};
