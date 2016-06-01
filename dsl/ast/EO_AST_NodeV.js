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

EO_AST_NodeV.prototype.eval = function(graph, result, vars) {
	var major = this.children[0];
	var minor = this.children[1];
	
	// TODO must be fixed
	/*var major_var = vars.getVar(major);
	
	if(typeof major_var == 'undefined') {
		console.log("Variable \"" + major + "\" is undefined.");
		return 0;
	}
	
	if(typeof minor == 'undefined') {
		return major_var;
	}
	
	var minor_var = major_var.getVar(minor);
	
	if(typeof minor_var == 'undefined') {
		console.log("Variable \"" + major + "." + minor + "\" is undefined.");
		return 0;
	}
	
	return minor_var;*/
}

exports.EO_AST_NodeV = EO_AST_NodeV;