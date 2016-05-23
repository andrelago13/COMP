/*
 * This class represents the result of an eval call to a graph. It's type represents either "static" or "dynamic", and the content is the order by which nodes must be removed
 */

EvalResult.Type = {
    STATIC : 'STATIC',
    DYNAMIC : 'DYNAMIC'
}

EvalResult.Operation = {
	ADD : 0,
	SUB : 1,
	MUL : 2,
	DIV : 3
}

function EvalResult() {
	this.type = null;
	this.order = [];
	this.scores = [];
	
	return this;
}

EvalResult.prototype.constructor = EvalResult;

EvalResult.prototype.getType = function() {
	return this.type;
}

EvalResult.prototype.setType = function(type) {
	this.type = type;
}

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

EvalResult.prototype.init = function(size) {
	for(var i = 0; i < size; ++i) {
		this.scores.push(0);
		this.order.push(i);
	}
}

/*
 * operation is one of EvalResult.Operation
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
			this.order[i] = this.order[i]*new_values[i];
		}
		break;
	case EvalResult.Operation.DIV:
		for(var i = 0; i < new_values.length; ++i) {
			this.order[i] = this.order[i]/new_values[i];
		}
		break;
	}
}

exports.EvalResult = EvalResult;