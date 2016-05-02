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
	return data;
}

FALoader.prototype.validate = function(fa) {
	return validateSingleStart(fa)
		&& validateFinalExistence(fa)
		&& validateNoUnreachable(fa)
		&& validateTransitions(fa);
}

FALoader.prototype.validateSingleStart = function(fa) {
	// TODO
	return true;
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