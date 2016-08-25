/**
 * Utilities for the application
 * 
 * @module Utils
 * @class Stack
 */

/**
 * Provides a simple "stack" class, useful for AST creation
 * 
 * @class Stack
 * @constructor
 */
function Stack() {
	this.array = [];
	
	return this;
}

Stack.prototype.constructor = Stack;

/**
 * Inserts an element to the top of the stack
 * 
 * @method push
 * @param element element to insert
 */
Stack.prototype.push = function(element) {
	this.array.push(element);
}

/**
 * Gets the element on top of the stack without removing it
 * 
 * @method top
 * @return element on top of the stack (last element pushed)
 */
Stack.prototype.top = function() {
	return this.array[this.array.length - 1];
}

/**
 * Gets the element on top of the stack, removing it
 * 
 * @method pop
 * @return element on top of the stack (last element pushed)
 */
Stack.prototype.pop = function() {
	var ret = this.top();
	this.array = this.array.slice(0, -1);
	return ret;
}

/**
 * Gets the size of the stack
 * 
 * @method size
 * @return number of elements in the stack
 */
Stack.prototype.size = function() {
	return this.array.length;
}

exports.Stack = Stack;