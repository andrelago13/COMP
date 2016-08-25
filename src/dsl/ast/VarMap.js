/**
 * @module Utils
 * @class VarMap
 */

/**
 * This class represents a mapping of names and variables. This is essential because the DSL we defined allows the definition of variables.
 * Therefore, the node classes use VarMap objects to store variable values and pass them onto each other, also allowing the use of variable
 * scopes.
 * 
 * @class VarMap
 * @constructor
 */
function VarMap() {
	
	this.map = [];
	
	return this;
}

VarMap.prototype.constructor = VarMap;

/**
 * Retrieves a variable
 * 
 * @method getVar
 * @param name name of the variable
 * @return value of the variable, or 'undefined' if it doesn't exist
 */
VarMap.prototype.getVar = function(name) {
	if(typeof name == 'undefined') {
		return;
	}
	
	return this.map[name];
};

/**
 * Retrieves a variable
 * 
 * @method clone
 * @return {VarMap} cloned VarMap
 */
VarMap.prototype.clone = function() {
	var cloned = new VarMap();
	
	for(var key in this.map) {
		cloned.map[key] = this.map[key];
	}
	
	return cloned;
}

/**
 * Adds a variable
 * 
 * @method addVar
 * @param key name of the variable
 * @param value value of the variable
 */
VarMap.prototype.addVar = function(key, value) {
	this.map[key] = value;
}

/**
 * Deletes all variables
 * 
 * @method clear
 */
VarMap.prototype.clear = function() {
	this.map = [];
}

VarMap.clearSet = function(set) {
	for(var i = 0; i < set.length; ++i) {
		set[i].clear();
	}
}

VarMap.cloneSet = function(set) {
	var result = [];
	
	for(var i = 0; i < set.length; ++i) {
		result.push(set[i].clone());
	}
	
	return result;
}

exports.VarMap = VarMap;