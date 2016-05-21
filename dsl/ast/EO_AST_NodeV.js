var EO_AST_Node = require('dsl/ast/EO_AST_Node');

function EO_AST_NodeV(father, major, minor) {
	EO_AST_Node.EO_AST_Node.call(this, father);
	
	this.major = major;
	this.minor = minor;
	
	return this;
}

EO_AST_NodeV.prototype = Object.create(EO_AST_Node.EO_AST_Node.prototype);
EO_AST_NodeV.prototype.constructor = EO_AST_NodeV;

EO_AST_NodeV.prototype.major = function() {
	return major;
}

EO_AST_NodeV.prototype.minor = function() {
	return minor;
}

exports.EO_AST_NodeV = EO_AST_NodeV;