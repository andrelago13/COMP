function VarMap() {
	
	this.map = [];
	
	return this;
}

/*
 * This class represents a mapping of names and variables. This is essential because the DSL we defined allows the definition of variables.
 * Therefore, the node classes use VarMap objects to store variable values and pass them onto each other, also allowing the use of variable
 * scopes.
 */

VarMap.prototype.constructor = VarMap;

VarMap.prototype.getVar = function(name) {
	if(typeof name == 'undefined') {
		return;
	}
	
	return this.map[name];
};

VarMap.prototype.clone = function() {
	var cloned = new VarMap();
	
	for(var key in this.map) {
		cloned.map[key] = this.map[key];
	}
	
	return cloned;
}

VarMap.prototype.addVar = function(key, value) {
	this.map[key] = value;
}

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