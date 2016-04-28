DSLLoader.prototype = Object.create(DSLLoader.prototype);
DSLLoader.prototype.constructor = DSLLoader;

function DSLLoader(dslString) {
	this.dslString = dslString;
}

DSLLoader.prototype.load = function() {
	var antlr4 = require('antlr4/index');
	var EliminationOrderLexer = require('dsl/EliminationOrderLexer');
	var EliminationOrderParser = require('dsl/EliminationOrderParser');
	var chars = new antlr4.InputStream(this.dslString);
	var lexer = new EliminationOrderLexer.EliminationOrderLexer(chars);
	var tokens  = new antlr4.CommonTokenStream(lexer);
	var parser = new EliminationOrderParser.EliminationOrderParser(tokens);
	parser.buildParseTrees = true;
	var tree = parser.s();
	
	// TODO AST
	// return ast;
}