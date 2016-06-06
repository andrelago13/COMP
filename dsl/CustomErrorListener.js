var ConsoleErrorListener = require('antlr4/error/ErrorListener').ConsoleErrorListener;

function CustomErrorListener(father) {
	ConsoleErrorListener.call(this, father);
	
	this.hasError = false;
	this.errorMessage = "";
	
	return this;
}

CustomErrorListener.prototype = Object.create(ConsoleErrorListener.prototype);
CustomErrorListener.prototype.constructor = CustomErrorListener;

CustomErrorListener.prototype.syntaxError = function(recognizer, offendingSymbol, line, column, msg, e) {
	this.hasError = true;
	this.errorMessage = "Syntax error: line " + line + ":" + column + " " + msg;
	console.error(this.errorMessage);
	
	errors.push({
		recognizer: recognizer,
		offendingSymbol: offendingSymbol,
		line: line,
		column: column,
		msg: msg,
		e: e
	});
};

exports.CustomErrorListener = CustomErrorListener;