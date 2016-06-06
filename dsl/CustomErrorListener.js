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
	
	var oldVal = $("#dsl_text").html();
	var newVal = oldVal.substr(0, offendingSymbol.start);
	newVal += '<span class="error">' + oldVal.substr(offendingSymbol.start, offendingSymbol.stop+1 - offendingSymbol.start) + '</span>';
	newVal += oldVal.substring(offendingSymbol.stop+1);
	console.log(recognizer, offendingSymbol, line, column, msg, e);
	$("#dsl_text").html(newVal);
};

exports.CustomErrorListener = CustomErrorListener;