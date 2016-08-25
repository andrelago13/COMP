DSLLoader.prototype = Object.create(DSLLoader.prototype);
DSLLoader.prototype.constructor = DSLLoader;

/**
 * Classes to help parsing, validating and evaluating expressions under the DSL we defined in the "About" page
 * 
 *  @class DSLLoader
 *  @module Grammar
 */

/**
 * This class uses Antlr4 as well as our own custom classes to read and validate an expression according to the DSL we defined in the "About" page
 * 
 * @class DSLLoader
 * @constructor
 * @param dslString String with the string to analyze
 */
function DSLLoader(dslString) {
	this.dslString = dslString;
}

/**
 * Loads the expression into an AST, performing lexical, syntatic and some semantic validation. If errors are found, they are placed in the global "errors" array
 * 
 * @method load
 * @return {EO_AST} generated AST, null if errors occurred
 */
DSLLoader.prototype.load = function() {
	var antlr4 = require('antlr4/index');
	var EliminationOrderLexer = require('dsl/EliminationOrderLexer');
	var EliminationOrderParser = require('dsl/EliminationOrderParser');
	var CustomListener = require('dsl/CustomListener');
	var chars = new antlr4.InputStream(this.dslString);
	var lexer = new EliminationOrderLexer.EliminationOrderLexer(chars);
	var tokens  = new antlr4.CommonTokenStream(lexer);
	var parser = new EliminationOrderParser.EliminationOrderParser(tokens);
	var listener = new CustomListener.CustomListener(parser.symbolicNames, parser.ruleNames);
	parser.buildParseTrees = true;
	
	var CustomErrorListener = require('dsl/CustomErrorListener').CustomErrorListener;
	var err_listener = new CustomErrorListener();
	parser._listeners = [];
	parser._listeners.push(err_listener);
	
	// if the next line gives errors, antlr was not executed
	// run "java -jar antlr-4.5.3-complete.jar dsl/EliminationOrder.g4 -o dsl -listener -Dlanguage=JavaScript" on root folder
	var tree = parser.s();

	if(err_listener.hasError) {
		return null;
	}
	
	antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, tree);

	var EO_AST = require('dsl/ast/EO_AST');
	var ast = listener.ast;
	console.log("AST:");
	console.log(ast);
	
	return ast;
}