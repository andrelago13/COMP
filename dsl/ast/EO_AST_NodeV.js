var EO_AST_Node = require('dsl/ast/EO_AST_Node');

/*
 * Usage example:
 * 
 * 		["MAJOR" (, "MINOR") ]
 * 
 * 	As identifier is either MAJOR or MAJOR.MINOR
 */

function EO_AST_NodeV(father, major, minor) {
	EO_AST_Node.EO_AST_Node.call(this, father);
	
	this.addChild(major);
	if(typeof minor != 'undefined') {
		this.addChild(minor);
	}
	
	return this;
}

EO_AST_NodeV.prototype = Object.create(EO_AST_Node.EO_AST_Node.prototype);
EO_AST_NodeV.prototype.constructor = EO_AST_NodeV;

EO_AST_NodeV.prototype.major = function() {
	return this.children[0];
}

EO_AST_NodeV.prototype.minor = function() {
	return this.children[1];
}

exports.EO_AST_NodeV = EO_AST_NodeV;