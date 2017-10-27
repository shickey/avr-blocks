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
  
  'auto,break,case,char,const,continue,default,do,double,else,' +
  'enum,extern,float,for,goto,if,inline,int,long,register,restrict,' +
  'return,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,' +
  'void,volatile,while,_Alignas,_Alignof,_Atomic,_Bool,_Complex,_Generic,'+
  '_Imaginary,_Noreturn,_Static_assert,_Thread_local,alignas,alignof,atomic_bool,'+
  'bool,complex,imaginary,noreturn,static_assert,thread_local,if,elif,else,endif,'+
  'defined,ifdef,ifndef,define,undef,include,line,error,pragma,_Pragma,asm,fortran'
  
);

/**
 * Order of operation ENUMs.
 * As per http://en.cppreference.com/w/c/language/operator_precedence
 */

Blockly.Avr.ORDER_ATOMIC = 0;           // 0 "" ...
Blockly.Avr.ORDER_POSTINC = 1;          // ++
Blockly.Avr.ORDER_POSTDEC = 1;          // --
Blockly.Avr.ORDER_FUNCTION_CALL = 1;    // ()
Blockly.Avr.ORDER_ARRAY_SUBSRIPT = 1;   // []
Blockly.Avr.ORDER_DOT_ACCESS = 1;       // .
Blockly.Avr.ORDER_ARROW_ACCESS = 1;     // ->
Blockly.Avr.ORDER_COMPOUND_LITERAL = 1; // (type){list}
Blockly.Avr.ORDER_PREINC = 2;           // ++
Blockly.Avr.ORDER_PREDEC = 2;           // --
Blockly.Avr.ORDER_UNARY_PLUS = 2;       // +
Blockly.Avr.ORDER_UNARY_MINUS = 2;      // -
Blockly.Avr.ORDER_LOGICAL_NOT = 2;      // !
Blockly.Avr.ORDER_BITWISE_NOT = 2;      // ~
Blockly.Avr.ORDER_TYPECAST = 2;         // (type)
Blockly.Avr.ORDER_DEREFERENCE = 2;      // *
Blockly.Avr.ORDER_ADDRESS_OF = 2;       // &
Blockly.Avr.ORDER_SIZE_OF = 2;          // sizeof
Blockly.Avr.ORDER_ALIGNMENT_OF = 2;     // _Alignof
Blockly.Avr.ORDER_MULTIPLICATION = 3;   // *
Blockly.Avr.ORDER_DIVISION = 3;         // /
Blockly.Avr.ORDER_MODULUS = 3;          // %
Blockly.Avr.ORDER_ADDITION = 4;         // +
Blockly.Avr.ORDER_SUBTRACTION = 4;      // -
Blockly.Avr.ORDER_BITSHIFT = 5;         // << >>
Blockly.Avr.ORDER_RELATIONAL = 6;       // < <= > >=
Blockly.Avr.ORDER_EQUALITY = 7;         // == !=
Blockly.Avr.ORDER_BITWISE_AND = 8;      // &
Blockly.Avr.ORDER_BITWISE_XOR = 9;      // ^
Blockly.Avr.ORDER_BITWISE_OR = 10;      // |
Blockly.Avr.ORDER_LOGICAL_AND = 11;     // &&
Blockly.Avr.ORDER_LOGICAL_OR = 12;      // ||
Blockly.Avr.ORDER_TERNARY_IF = 13;      // ?:
Blockly.Avr.ORDER_ASSIGNMENT = 14;      // = += -= *= /= %= <<= >>= &= ^= |=
Blockly.Avr.ORDER_COMMA = 15;           // ,
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
 * Generate code for all blocks in the workspace to the specified language.
 * @param {Blockly.Workspace} workspace Workspace to generate code from.
 * @return {string} Generated code.
 */
Blockly.Avr.workspaceToCode = function(workspace) {
  if (!workspace) {
    // Backwards compatibility from before there could be multiple workspaces.
    console.warn('No workspace specified in workspaceToCode call.  Guessing.');
    workspace = Blockly.getMainWorkspace();
  }


  this.init(workspace);

  var varDecls = [];
  var setupCode = [];
  var mainLoopCode = [];

  var blocks = workspace.getTopBlocks(true);
  for (var x = 0, block; block = blocks[x]; x++) {
    if (block.type !== 'avr_whenchipstartsup' && block.type !== 'avr_everyloop') {
      // TODO: Handle avr_whenpin block. Maybe use interrupts?
      continue; // Only code included under a setup or main loop hat gets included in the executable
    }
    var line = this.blockToCode(block);
    if (goog.isArray(line)) {
      // Value blocks return tuples of code and operator order.
      // Top-level blocks don't care about operator order.
      line = line[0];
    }
    if (line) {
      if (block.outputConnection && this.scrubNakedValue) {
        // This block is a naked value.  Ask the language's code generator if
        // it wants to append a semicolon, or something.
        line = this.scrubNakedValue(line);
      }
      if (block.type === 'avr_whenchipstartsup') {
        setupCode.push(line);
      }
      else if (block.type === 'avr_everyloop') {
        mainLoopCode.push(line);
      }
      else {
        // Invalid
      }
    }
  }

  var varStr = varDecls.join('\n');
  var setupCodeStr = setupCode.join('\n');
  var mainLoopCodeStr = mainLoopCode.join('\n');

  var code = this.programTemplate
              .replace(/\/\*= VARS =\*\//, varStr)
              .replace(/\/\*= SETUP =\*\//, setupCodeStr)
              .replace(/\/\*= MAIN =\*\//, mainLoopCodeStr);

  code = this.finish(code);
  return code;
};

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
  return code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into anything.
 * For now, blocks that aren't connected to an AVR hat are ignored during code generation
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Avr.scrubNakedValue = function(line) {
  // This doesn't really matter in our case since we ignore blocks not attached to an AVR hat
  return line;
};

/**
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The JavaScript code created for this block.
 * @return {string} JavaScript code with comments and subsequent blocks added.
 * @private
 */
Blockly.Avr.scrub_ = function(block, code) {
  return code;
};

Blockly.Avr.programTemplate = [
  '#include <avr/io.h>',
  '#include <util/delay.h>',
  '#include <avr/pgmspace.h>',
  '',
  '#define output(directions,pin) (directions |= pin)',
  '#define input(directions,pin) (directions &= (~pin))',
  '#define set(port,pin) (port |= pin)',
  '#define clear(port,pin) (port &= (~pin))',
  '#define pin_test(pins,pin) (pins & pin)',
  '#define bit_test(byte,bit) (byte & (1 << bit))',
  '',
  '',
  '/*= VARS =*/',
  '',
  '',
  'int main(void) {',
  '   //',
  '   // set clock divider to /1',
  '   //',
  '   CLKPR = (1 << CLKPCE);',
  '   CLKPR = (0 << CLKPS3) | (0 << CLKPS2) | (0 << CLKPS1) | (0 << CLKPS0);',
  '',
  '   // Setup',
  '   /*= SETUP =*/',
  '',
  '   //',
  '   // main loop',
  '   //',
  '   while (1) {',
  '',
  '      /*= MAIN =*/',
  '',
  '   }',
  '}'
].join('\n');
