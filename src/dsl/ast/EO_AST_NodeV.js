var EO_AST_Node = require('dsl/ast/EO_AST_Node');
var FAutils = require('js/FAutils');

/*
 * Usage example:
 * 
 * 		["MAJOR" (, "MINOR") ]
 * 
 * 	As identifier is either MAJOR or MAJOR.MINOR
 */

EO_AST_NodeV.MinorType = {
	WEIGHT : "weight"
};

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

	var scores = result.getScores();
	
	if(typeof minor == 'undefined') {	// MAJOR
		for(var i = 0; i < vars.length; ++i) {
			var value = vars[i].getVar(major);
			if(typeof value != 'undefined') {
				scores[i] = value;
			} else {
				errors.push("Undefined variable \"" + major + "\".");
			}
		}
	} else {							// MAJOR.MINOR
		for(var i = 0; i < vars.length; ++i) {
			var value = vars[i].getVar(major);
			if(typeof value != 'undefined') {
				switch(minor) {
				case EO_AST_NodeV.MinorType.WEIGHT:
					var weight = calculateWeight(value.label);
					scores[i] = weight;
					break;
				default:
					errors.push("Unexpected MINOR value at: " + major + "." + minor + " . Only \"weight\" is allowed.");
					break;
				}
			} else {
				errors.push("Undefined variable \"" + major + "\" at \"" + major + "." + minor + "\".");
			}
		}
	}
}

exports.EO_AST_NodeV = EO_AST_NodeV;