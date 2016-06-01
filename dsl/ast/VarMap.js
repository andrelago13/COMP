function VarMap() {
	
	this.map = [];
	
	return this;
}

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

exports.VarMap = VarMap;