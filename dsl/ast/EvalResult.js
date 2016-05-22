/*
 * This class represents the result of an eval call to a graph. It's type represents either "static" or "dynamic", and the content is the order by which nodes must be removed
 */

EvalResult.Type = {
    STATIC : 'STATIC',
    DYNAMIC : 'DYNAMIC'
}

function EvalResult() {
	this.type = null;
	this.order = [];
	
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

exports.EvalResult = EvalResult;