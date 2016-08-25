/**
 * @module Grammar
 * @class EvalResult
 */

/**
 * Type of the evaluation (either STATIC or DYNAMIC)
 * 
 * @property Type
 */
EvalResult.Type = {
    STATIC : 'STATIC',
    DYNAMIC : 'DYNAMIC'
}

/**
 * Type of a operation (either ADD, SUB, MUL or DIV)
 * 
 * @property Operation
 */
EvalResult.Operation = {
	ADD : 0,
	SUB : 1,
	MUL : 2,
	DIV : 3
}

/**
 * This class represents the result of an eval call to a graph. It's type represents either "static" or "dynamic", and the content is the order by which nodes must be removed
 * 
 * @class EvalResult
 * @constructor
 */
function EvalResult() {
	this.type = null;
	this.order = [];
	this.scores = [];
	
	return this;
}

EvalResult.prototype.constructor = EvalResult;

/**
 * Returns the type of the evaluation
 * 
 * @method getType
 * @return {EvalResult.Type} type
 */
EvalResult.prototype.getType = function() {
	return this.type;
}

EvalResult.prototype.setType = function(type) {
	this.type = type;
}

/**
 * Returns the order for state elimination
 * 
 * @method getOrder
 * @return {Array} array of indices, in the order for node removal
 */
EvalResult.prototype.getOrder = function() {
	return this.order;
}

EvalResult.prototype.setOrder = function(order) {
	this.order = order;
}

EvalResult.prototype.getScores = function() {
	return this.scores;
}

EvalResult.prototype.setScores = function(scores) {
	this.scores = scores;
}

/**
 * Initiates the score to zero for every node (assumes given size)
 * 
 * @method init
 * @param size number of nodes in the graph
 */
EvalResult.prototype.init = function(size) {
	for(var i = 0; i < size; ++i) {
		this.scores.push(0);
		this.order.push(i);
	}
}

/**
 * Performs an operation on the current result, with another EvalResult
 * 
 * @method operation
 * @param new_values values to perform operation
 * @param operation one of EvalResult.Operation
 */
EvalResult.prototype.operation = function(new_values, operation) {
	switch(operation) {
	case EvalResult.Operation.ADD:
	case EvalResult.Operation.SUB:
		var signal = 1;
		if(operation === EvalResult.Operation.SUB) {
			signal = -1;
		}

		for(var i = 0; i < new_values.length; ++i) {
			this.scores[i] += signal * new_values[i];
		}
		break;
	case EvalResult.Operation.MUL:
		for(var i = 0; i < new_values.length; ++i) {
			this.scores[i] = this.scores[i]*new_values[i];
		}
		break;
	case EvalResult.Operation.DIV:
		for(var i = 0; i < new_values.length; ++i) {
			this.scores[i] = this.scores[i]/new_values[i];
		}
		break;
	}
}

exports.EvalResult = EvalResult;