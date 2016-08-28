/**
 * @module Grammar
 * @class EO_AST
 */

var EvalResult = require('dsl/ast/EvalResult').EvalResult;

/**
 * This class represents a AST obtained by parsing the grammar expression.
 * 
 * All classes that extend this class have similar methods, with slightly different behaviors according to their placement in the grammar
 * 
 * @class EO_AST
 * @constructor
 */
function EO_AST() {
	this.root = null;
	
	return this;
}

EO_AST.prototype.constructor = EO_AST;

/**
 * Sets the root of the tree
 * 
 * @method setRoot
 */
EO_AST.prototype.setRoot = function(node) {
	this.root = node;
};

EO_AST.prototype.getRoot = function() {
	return this.root;
};

/**
 * Adds a child to a specified node in the tree
 * 
 * @param father node to which the child will be added
 * @param son child to be added
 * @method addChild
 */
EO_AST.prototype.addChild = function(father, son) {
	father.addChild(son);
};

/**
 * Evaluates the value represented by the expression, given a FA.
 * 
 * @param graph FA obtained using the FiniteAutomata module's classes
 * @return {EvalResult} result of the evaluation, with node scores and node elimination order
 * @method eval
 */
EO_AST.prototype.eval = function(graph) {
	var result = new EvalResult();
	
	this.root.eval(graph, result);
	
	return result;
};

exports.EO_AST = EO_AST;