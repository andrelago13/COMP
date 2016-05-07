FALoader.prototype = Object.create(FALoader.prototype);
FALoader.prototype.constructor = FALoader;

function FALoader(dotString) {
	this.dotString = dotString;
}

FALoader.prototype.load = function() {
	var parsedData = vis.network.convertDot(this.dotString);

	var data = {
			nodes: parsedData.nodes,
			edges: parsedData.edges
			}
	console.log(data);
	console.log("Validation result: " + this.validate(data));
	return data;
}

FALoader.prototype.validate = function(fa) {
	return this.validateSingleStart(fa)
		&& this.validateFinalExistence(fa)
		&& this.validateNoUnreachable(fa)
		&& this.validateTransitions(fa);
}

FALoader.prototype.validateSingleStart = function(fa) {
	return fa.nodes.length > 0;
}

FALoader.prototype.validateFinalExistence = function(fa) {
	// TODO
	return true;
}

FALoader.prototype.validateNoUnreachable = function(fa) {
	// TODO
	return true;
}

FALoader.prototype.validateTransitions = function(fa) {
	// TODO
	return true;
}