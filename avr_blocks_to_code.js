/*
 * AVR Blocks
 */

Blockly.Avr['avr_whenchipstartsup'] = function(block) {
	if (block.nextConnection && block.nextConnection.targetBlock()) {
		return Blockly.Avr.blockToCode(block.nextConnection.targetBlock());
	}
	else {
		return ['', Blockly.Avr.ORDER_ATOMIC];
	}
}

Blockly.Avr['avr_whenpin'] = function(block) {
	if (block.nextConnection && block.nextConnection.targetBlock()) {
		return Blockly.Avr.blockToCode(block.nextConnection.targetBlock());
	}
	else {
		return ['', Blockly.Avr.ORDER_ATOMIC];
	}
}

Blockly.Avr['avr_everyloop'] = function(block) {
	var targetBlock = block.getInputTargetBlock('SUBSTACK');
	return Blockly.Avr.blockToCode(targetBlock);
}

Blockly.Avr['avr_logicmenu'] = function(block) {
	var fieldValue = block.getFieldValue('LOGIC');
	return [fieldValue, Blockly.Avr.ORDER_ATOMIC];
}

Blockly.Avr['avr_pinmenu'] = function(block) {
	var fieldValue = block.getFieldValue('PIN');
	return [fieldValue, Blockly.Avr.ORDER_ATOMIC];
}

Blockly.Avr['avr_pindirection'] = function(block) {
	var fieldValue = block.getFieldValue('PIN_DIRECTION');
	return [fieldValue, Blockly.Avr.ORDER_ATOMIC];
}

Blockly.Avr['avr_waitms'] = function(block) {
	var duration = Blockly.Avr.valueToCode(block, 'DURATION', Blockly.Avr.ORDER_ATOMIC);
	var code = '_delay_ms(' + duration + ');';
	
	if (block.nextConnection && block.nextConnection.targetBlock()) {
		code += "\n" + Blockly.Avr.blockToCode(block.nextConnection.targetBlock())[0];
	}
	return [code, Blockly.Avr.ORDER_NONE];
}

Blockly.Avr['avr_configpin'] = function(block) {
	var pin = Blockly.Avr.valueToCode(block, 'PIN', Blockly.Avr.ORDER_ATOMIC);
	var directionPort = "DDR" + pin.match(/^P(\w)\d$/)[1];
	var direction = Blockly.Avr.valueToCode(block, 'PIN_DIRECTION', Blockly.Avr.ORDER_ATOMIC);
	
	var pinShifted = '(1 << ' + pin + ')';

	var code = '';
	if (direction == "OUTPUT") {
		code += 'output';
	}
	else if (direction == "INPUT") {
		code = 'input';
	}
	else {
		//TODO: Handle bad values
	}

	code += '(' + directionPort + ', ' + pinShifted + ');';

	if (block.nextConnection && block.nextConnection.targetBlock()) {
		code += "\n" + Blockly.Avr.blockToCode(block.nextConnection.targetBlock())[0];
	}

	return [code, Blockly.Avr.ORDER_NONE];
}

Blockly.Avr['avr_setpin'] = function(block) {
	var pin = Blockly.Avr.valueToCode(block, 'PIN', Blockly.Avr.ORDER_ATOMIC);
	var port = "PORT" + pin.match(/^P(\w)\d$/)[1];
	var logicLevel = Blockly.Avr.valueToCode(block, 'LOGIC_LEVEL', Blockly.Avr.ORDER_ATOMIC);
	
	code = ''
	if (logicLevel == "HIGH") {
		var code = 'set(' + port + ', (1 << ' + pin + '));';
	}
	else if (logicLevel == "LOW") {
		var code = 'clear(' + port + ', (1 << ' + pin + '));';
	}
	else {
		//TODO: Handle bad values
	}

	if (block.nextConnection && block.nextConnection.targetBlock()) {
		code += "\n" + Blockly.Avr.blockToCode(block.nextConnection.targetBlock())[0];
	}

	return [code, Blockly.Avr.ORDER_NONE];
}

Blockly.Avr['avr_pinvalue'] = function(block) {

	//TODO: Implement this properly

	var pin = Blockly.Avr.valueToCode(block, 'PIN', Blockly.Avr.ORDER_ATOMIC);
	var valueCode = '(1 << ' + pin + ')';

	return [valueCode, Blockly.Avr.ORDER_NONE];
}

/*
 * Math
 */

function mathVal(math_block) {
	var fieldValue = math_block.getFieldValue('NUM');
	return [fieldValue, Blockly.Avr.ORDER_ATOMIC];
}

Blockly.Avr['math_number'] = function(block) { return mathVal(block); }
Blockly.Avr['math_integer'] = function(block) { return mathVal(block); }
Blockly.Avr['math_whole_number'] = function(block) { return mathVal(block); }
Blockly.Avr['math_positive_number'] = function(block) { return mathVal(block); }
Blockly.Avr['math_angle'] = function(block) { return mathVal(block); }

