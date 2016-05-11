var EliminationOrderListener = require('dsl/EliminationOrderListener');
var EO_AST = require('dsl/ast/EO_AST');
var EO_AST_NodeManual = require('dsl/ast/EO_AST_NodeManual');
var Stack = require('js/Stack');

function CustomListener() {
	EliminationOrderListener.EliminationOrderListener.call(this);
	this.ast = new EO_AST.EO_AST();
	
	this.tempNode = null;
	this.stack = new Stack.Stack();
	this.stack.push(1);
	this.stack.push(2);
	console.log(this.stack.array);
	console.log(this.stack.pop());
	console.log(this.stack.array);
	
	return this;
}

CustomListener.prototype = Object.create(EliminationOrderListener.EliminationOrderListener.prototype);
CustomListener.prototype.constructor = CustomListener;

// Enter a parse tree produced by EliminationOrderParser#s.
CustomListener.prototype.enterS = function(ctx) {
};

// Exit a parse tree produced by EliminationOrderParser#s.
CustomListener.prototype.exitS = function(ctx) {
};


// Enter a parse tree produced by EliminationOrderParser#manual.
CustomListener.prototype.enterManual = function(ctx) {
	console.log("manual");
	console.log(ctx);
	this.tempNode = EO_AST_NodeManual.EO_AST_NodeManual();
	this.ast.setRoot(this.tempNode);
};

// Exit a parse tree produced by EliminationOrderParser#manual.
CustomListener.prototype.exitManual = function(ctx) {
};


// Enter a parse tree produced by EliminationOrderParser#auto.
CustomListener.prototype.enterAuto = function(ctx) {
};

// Exit a parse tree produced by EliminationOrderParser#auto.
CustomListener.prototype.exitAuto = function(ctx) {
};


// Enter a parse tree produced by EliminationOrderParser#type.
CustomListener.prototype.enterType = function(ctx) {
};

// Exit a parse tree produced by EliminationOrderParser#type.
CustomListener.prototype.exitType = function(ctx) {
};


// Enter a parse tree produced by EliminationOrderParser#e.
CustomListener.prototype.enterE = function(ctx) {
};

// Exit a parse tree produced by EliminationOrderParser#e.
CustomListener.prototype.exitE = function(ctx) {
};


// Enter a parse tree produced by EliminationOrderParser#e1.
CustomListener.prototype.enterE1 = function(ctx) {
};

// Exit a parse tree produced by EliminationOrderParser#e1.
CustomListener.prototype.exitE1 = function(ctx) {
};


// Enter a parse tree produced by EliminationOrderParser#loop.
CustomListener.prototype.enterLoop = function(ctx) {
};

// Exit a parse tree produced by EliminationOrderParser#loop.
CustomListener.prototype.exitLoop = function(ctx) {
};


// Enter a parse tree produced by EliminationOrderParser#v.
CustomListener.prototype.enterV = function(ctx) {
};

// Exit a parse tree produced by EliminationOrderParser#v.
CustomListener.prototype.exitV = function(ctx) {
};



exports.CustomListener = CustomListener;