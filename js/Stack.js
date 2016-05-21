function Stack() {
	this.array = [];
	
	return this;
}

Stack.prototype.constructor = Stack;

Stack.prototype.push = function(element) {
	this.array.push(element);
}

Stack.prototype.top = function() {
	return this.array[this.array.length - 1];
}

Stack.prototype.pop = function() {
	var ret = this.front();
	this.array = this.array.slice(0, -1);
	return ret;
}

exports.Stack = Stack;