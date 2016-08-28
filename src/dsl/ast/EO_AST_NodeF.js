/**
 * Represents node "F" of the grammar.
 * Should never be an actual part of the AST, but is used to track errors
 * 
 * Usage example:
 * 
 * 		EO_AST_NodeV | EO_AST_NodeTerminal | EO_AST_NodeLoop | EO_AST_NodeE | EO_AST_NodeReserved
 * 
 * 	"INT" and "REAL" are actual values
 * 
 * @module Grammar
 * @class EO_AST_NodeF
 */

var EO_AST_Node = require('dsl/ast/EO_AST_Node');
var EO_AST_NodeV = require('dsl/ast/EO_AST_NodeV').EO_AST_NodeV;
var EO_AST_NodeLoop = require('dsl/ast/EO_AST_NodeLoop').EO_AST_NodeLoop;
var EO_AST_NodeE = require('dsl/ast/EO_AST_NodeE').EO_AST_NodeE;

function EO_AST_NodeF(father) {
	EO_AST_Node.EO_AST_Node.call(this, father);
	return this;
}

EO_AST_NodeF.prototype = Object.create(EO_AST_Node.EO_AST_Node.prototype);
EO_AST_NodeF.prototype.constructor = EO_AST_NodeF;

EO_AST_NodeF.prototype.eval = function(graph, result, vars) {
	console.error("Unexcepted F eval called.");
}

exports.EO_AST_NodeF = EO_AST_NodeF;