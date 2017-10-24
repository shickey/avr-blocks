/**
 * Generates AVR code from Scratch Blocks.
 * 
 */
'use strict';

goog.provide('Blockly.Avr');

goog.require('Blockly.Generator');


/**
 * AVR code generator.
 * @type {!Blockly.Generator}
 */
Blockly.Avr = new Blockly.Generator('Avr');

/**
 * List of illegal variable names.
 * Includes both C reserved words as well as names from avr-libc
 */
Blockly.Avr.addReservedWords(
  
  // TODO: Add reserved words
  
);

/**
 * Order of operation ENUMs.
 */

// TODO: Implement operator precedence.
// For now, use ORDER_ATOMIC for every call of valueToCode()
// and ORDER_NONE as the final return statement on every value block
// (Which should work as per https://developers.google.com/blockly/guides/create-custom-blocks/operator-precedence)

Blockly.Avr.ORDER_ATOMIC = 0;           // 0 "" ...
// Blockly.Javascript.ORDER_NEW = 1.1;            // new
// Blockly.JavaScript.ORDER_MEMBER = 1.2;         // . []
// Blockly.JavaScript.ORDER_FUNCTION_CALL = 2;    // ()
// Blockly.JavaScript.ORDER_INCREMENT = 3;        // ++
// Blockly.JavaScript.ORDER_DECREMENT = 3;        // --
// Blockly.JavaScript.ORDER_BITWISE_NOT = 4.1;    // ~
// Blockly.JavaScript.ORDER_UNARY_PLUS = 4.2;     // +
// Blockly.JavaScript.ORDER_UNARY_NEGATION = 4.3; // -
// Blockly.JavaScript.ORDER_LOGICAL_NOT = 4.4;    // !
// Blockly.JavaScript.ORDER_TYPEOF = 4.5;         // typeof
// Blockly.JavaScript.ORDER_VOID = 4.6;           // void
// Blockly.JavaScript.ORDER_DELETE = 4.7;         // delete
// Blockly.JavaScript.ORDER_DIVISION = 5.1;       // /
// Blockly.JavaScript.ORDER_MULTIPLICATION = 5.2; // *
// Blockly.JavaScript.ORDER_MODULUS = 5.3;        // %
// Blockly.JavaScript.ORDER_SUBTRACTION = 6.1;    // -
// Blockly.JavaScript.ORDER_ADDITION = 6.2;       // +
// Blockly.JavaScript.ORDER_BITWISE_SHIFT = 7;    // << >> >>>
// Blockly.JavaScript.ORDER_RELATIONAL = 8;       // < <= > >=
// Blockly.JavaScript.ORDER_IN = 8;               // in
// Blockly.JavaScript.ORDER_INSTANCEOF = 8;       // instanceof
// Blockly.JavaScript.ORDER_EQUALITY = 9;         // == != === !==
// Blockly.JavaScript.ORDER_BITWISE_AND = 10;     // &
// Blockly.JavaScript.ORDER_BITWISE_XOR = 11;     // ^
// Blockly.JavaScript.ORDER_BITWISE_OR = 12;      // |
// Blockly.JavaScript.ORDER_LOGICAL_AND = 13;     // &&
// Blockly.JavaScript.ORDER_LOGICAL_OR = 14;      // ||
// Blockly.JavaScript.ORDER_CONDITIONAL = 15;     // ?:
// Blockly.JavaScript.ORDER_ASSIGNMENT = 16;      // = += -= *= /= %= <<= >>= ...
// Blockly.JavaScript.ORDER_COMMA = 17;           // ,
Blockly.Avr.ORDER_NONE = 99;            // (...)

/**
 * List of outer-inner pairings that do NOT require parentheses.
 * @type {!Array.<!Array.<number>>}
 */
// Blockly.JavaScript.ORDER_OVERRIDES = [
//   // (foo()).bar -> foo().bar
//   // (foo())[0] -> foo()[0]
//   [Blockly.JavaScript.ORDER_FUNCTION_CALL, Blockly.JavaScript.ORDER_MEMBER],
//   // (foo())() -> foo()()
//   [Blockly.JavaScript.ORDER_FUNCTION_CALL, Blockly.JavaScript.ORDER_FUNCTION_CALL],
//   // (foo.bar).baz -> foo.bar.baz
//   // (foo.bar)[0] -> foo.bar[0]
//   // (foo[0]).bar -> foo[0].bar
//   // (foo[0])[1] -> foo[0][1]
//   [Blockly.JavaScript.ORDER_MEMBER, Blockly.JavaScript.ORDER_MEMBER],
//   // (foo.bar)() -> foo.bar()
//   // (foo[0])() -> foo[0]()
//   [Blockly.JavaScript.ORDER_MEMBER, Blockly.JavaScript.ORDER_FUNCTION_CALL],

//   // !(!foo) -> !!foo
//   [Blockly.JavaScript.ORDER_LOGICAL_NOT, Blockly.JavaScript.ORDER_LOGICAL_NOT],
//   // a * (b * c) -> a * b * c
//   [Blockly.JavaScript.ORDER_MULTIPLICATION, Blockly.JavaScript.ORDER_MULTIPLICATION],
//   // a + (b + c) -> a + b + c
//   [Blockly.JavaScript.ORDER_ADDITION, Blockly.JavaScript.ORDER_ADDITION],
//   // a && (b && c) -> a && b && c
//   [Blockly.JavaScript.ORDER_LOGICAL_AND, Blockly.JavaScript.ORDER_LOGICAL_AND],
//   // a || (b || c) -> a || b || c
//   [Blockly.JavaScript.ORDER_LOGICAL_OR, Blockly.JavaScript.ORDER_LOGICAL_OR]
// ];

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.Avr.init = function(workspace) {
  // Create a dictionary of definitions to be printed before the code.
  Blockly.Avr.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.Avr.functionNames_ = Object.create(null);

  if (!Blockly.Avr.variableDB_) {
    Blockly.Avr.variableDB_ =
        new Blockly.Names(Blockly.Avr.RESERVED_WORDS_);
  } else {
    Blockly.Avr.variableDB_.reset();
  }
  
  // TODO: Retrieve variables by type

  // var defvars = [];
  // var variables = workspace.getAllVariables();
  // if (variables.length) {
  //   for (var i = 0; i < variables.length; i++) {
  //     defvars[i] = Blockly.Avr.variableDB_.getName(variables[i].name,
  //         Blockly.Variables.NAME_TYPE);
  //   }
  //   Blockly.Avr.definitions_['variables'] =
  //       'var ' + defvars.join(', ') + ';';
  // }
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Avr.finish = function(code) {
  // // Convert the definitions dictionary into a list.
  // var definitions = [];
  // for (var name in Blockly.Avr.definitions_) {
  //   definitions.push(Blockly.Avr.definitions_[name]);
  // }
  // // Clean up temporary data.
  // delete Blockly.Avr.definitions_;
  // delete Blockly.Avr.functionNames_;
  // Blockly.Avr.variableDB_.reset();
  // return definitions.join('\n\n') + '\n\n\n' + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into anything.
 * For now, blocks that aren't connected to an AVR hat are ignored during code generation
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Avr.scrubNakedValue = function(line) {
  return '';
};

/**
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The JavaScript code created for this block.
 * @return {string} JavaScript code with comments and subsequent blocks added.
 * @private
 */
Blockly.Avr.scrub_ = function(block, code) {
  
};

