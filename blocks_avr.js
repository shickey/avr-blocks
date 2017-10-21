'use strict';

goog.provide('Blockly.Blocks.avr');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['avr_helloworld'] = {
  /**
   * Hello World block.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "hello avr world!",
      // "args0": [
      //   {
      //     "type": "input_value",
      //     "name": "MESSAGE"
      //   },
      //   {
      //     "type": "input_value",
      //     "name": "SECS"
      //   }
      // ],
      "category": Blockly.Categories.avr,
      "extensions": ["colours_more", "shape_statement"]
    });
  }
};
