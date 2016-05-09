Converter.prototype = Object.create(Converter.prototype);
Converter.prototype.constructor = Converter;

function Converter(fa, ast) {
	this.fa = fa;
	this.ast = ast;
}

Converter.prototype.convert = function() {
	this.fixStartingState();
	this.fixFinalState();
	return this.fa;
	// TODO
	// return regex;
}

Converter.prototype.fixStartingState = function() {
	if (isNodeFinal(this.fa.nodes[0]) || this.fa.nodes[0].inEdges.length > 0) {
		this.fa.nodes.push({
			id: this.fa.nodes.length,
			inEdges: [],
			label: "START",
			outEdges: [this.fa.edges.length],
			shape: "circle"
		});
		console.log(this.fa);
		this.fa.edges.push({
			arrows: "to",
			from: this.fa.nodes[this.fa.nodes.length - 1].id,
			fromID: length - 1,
			id: (this.fa.edges.length - 1) + "",
			to: this.fa.nodes[0].id,
			toID: 0
		})
	}
}

Converter.prototype.fixFinalState = function() {
	
}

Converter.prototype.eliminateState = function(fa, stateID) {
	// TODO
	// return newFA;
}