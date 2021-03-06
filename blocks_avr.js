'use strict';

goog.provide('Blockly.Blocks.avr');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


/**
 * Extension to make a block be shaped as a hat block, but with an end.
 * This is useful for creating the hat forever block.
 * That means the block should have a previous connection and have
 * inline inputs, but have no next connection.
 * @this {Blockly.Block}
 * @readonly
 */
Blockly.ScratchBlocks.VerticalExtensions.SHAPE_HATEND = function() {
  this.setInputsInline(true);
  // this.setPreviousStatement(true, null);
};

Blockly.Extensions.register('shape_hatend',
      Blockly.ScratchBlocks.VerticalExtensions.SHAPE_HATEND);


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

Blockly.Blocks['avr_everyloop'] = {
  /**
   * Block main chip execution loop.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "avr_everyloop",
      "message0": "every loop",
      "message1": "%1",
      "args1": [
        {
          "type": "input_statement",
          "name": "SUBSTACK"
        }
      ],
      "category": Blockly.Categories.avr,
      "extensions": ["colours_more", "shape_hatend"]
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
              ['HIGH', 'HIGH'],
              ['LOW', 'LOW'],
            ]
          }
        ],
        "extensions": ["output_string"]
      });
  }
};

Blockly.Blocks['avr_pinmenu'] = {
  /**
   * Pins drop-down menu.
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
              ['PA0', 'PA0'],
              ['PA1', 'PA1'],
              ['PA2', 'PA2'],
              ['PA3', 'PA3'],
              ['PA4', 'PA4'],
              ['PA5', 'PA5'],
              ['PA6', 'PA6'],
              ['PA7', 'PA7'],
              ['PB0', 'PB0'],
              ['PB1', 'PB1'],
              ['PB2', 'PB2'],
              ['PB3', 'PB3'],
            ]
          }
        ],
        "extensions": ["output_string"]
      });
  }
};

Blockly.Blocks['avr_pindirection'] = {
  /**
   * Pin direction drop-down menu.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit(
      {
        "message0": "%1",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "PIN_DIRECTION",
            "options": [
              ['INPUT', 'INPUT'],
              ['OUTPUT', 'OUTPUT'],
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

Blockly.Blocks['avr_configpin'] = {
  /**
   * Block to configure pin as input or output.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "avr_configpin",
      "message0": "configure pin %1 as %2",
      "args0": [
        {
          "type": "input_value",
          "name": "PIN"
        },
        {
          "type": "input_value",
          "name": "PIN_DIRECTION"
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
