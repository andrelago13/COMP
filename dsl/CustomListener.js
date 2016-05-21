var EliminationOrderListener = require('dsl/EliminationOrderListener');
var EO_AST = require('dsl/ast/EO_AST');
var EO_AST_Node = require('dsl/ast/EO_AST_Node');
var EO_AST_NodeManual = require('dsl/ast/EO_AST_NodeManual');
var EO_AST_NodeAuto = require('dsl/ast/EO_AST_NodeAuto');
var EO_AST_NodeE = require('dsl/ast/EO_AST_NodeE');
var EO_AST_NodeE1 = require('dsl/ast/EO_AST_NodeE1');
var Stack = require('js/Stack');

function CustomListener() {
	EliminationOrderListener.EliminationOrderListener.call(this);
	this.ast = new EO_AST.EO_AST();
	var root = new EO_AST_Node.EO_AST_Node();
	this.ast.setRoot(root);
	
	this.stack = new Stack.Stack();
	this.stack.push(root);
	
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
	console.log(this.getTabbing() + "Entering Manual");
	var node = new EO_AST_NodeManual.EO_AST_NodeManual();
	this.stack.top().addChild(node);
	this.stack.push(node);
	
	var children = ctx.children;
	for(var i = 0; i < children.length; i += 2) {
		console.log("" + '\t' + "Parsing integer \"" + parseInt(children[i].getText()) + "\"");
		node.addChild(parseInt(children[i].getText()));
	}
};

// Exit a parse tree produced by EliminationOrderParser#manual.
CustomListener.prototype.exitManual = function(ctx) {
	this.stack.pop();

	console.log(this.getTabbing() + "Exiting Manual");
};


// Enter a parse tree produced by EliminationOrderParser#auto.
CustomListener.prototype.enterAuto = function(ctx) {
	console.log(this.getTabbing() + "Entering Auto");
	var node = new EO_AST_NodeAuto.EO_AST_NodeAuto();
	this.stack.top().addChild(node);
	this.stack.push(node);
};

// Exit a parse tree produced by EliminationOrderParser#auto.
CustomListener.prototype.exitAuto = function(ctx) {
	this.stack.pop();
	
	console.log(this.getTabbing() + "Exiting Auto");
};


// Enter a parse tree produced by EliminationOrderParser#type.
CustomListener.prototype.enterType = function(ctx) {
	console.log(this.getTabbing() + "Entering Type");
	
	var children = ctx.children;
	this.stack.top().addChild(children[0].getText());
	console.log(this.getTabbing() + '\t' + "Parsing type \"" + this.stack.top().children[0] + "\"");
};

// Exit a parse tree produced by EliminationOrderParser#type.
CustomListener.prototype.exitType = function(ctx) {
	console.log(this.getTabbing() + "Exiting Type");
};


// Enter a parse tree produced by EliminationOrderParser#e.
CustomListener.prototype.enterE = function(ctx) {
	console.log(this.getTabbing() + "Entering E");
	
	var node = new EO_AST_NodeE.EO_AST_NodeE();
	this.stack.top().addChild(node);
	this.stack.push(node);
	
	var children = ctx.children
	
	for(var i = 1; i < children.length; i+=2) {
		node.addOperator(children[i].getText());
	}
};

// Exit a parse tree produced by EliminationOrderParser#e.
CustomListener.prototype.exitE = function(ctx) {
	this.stack.top().process();
	this.stack.pop();
	
	console.log(this.getTabbing() + "Exiting E");
};


// Enter a parse tree produced by EliminationOrderParser#e1.
CustomListener.prototype.enterE1 = function(ctx) {
	console.log(this.getTabbing() + "Entering E1");
	
	var node = new EO_AST_NodeE1.EO_AST_NodeE1();
	this.stack.top().addChild(node);
	this.stack.push(node);
};

// Exit a parse tree produced by EliminationOrderParser#e1.
CustomListener.prototype.exitE1 = function(ctx) {
	this.stack.pop();

	console.log(this.getTabbing() + "Exiting E1");
};


// Enter a parse tree produced by EliminationOrderParser#loop.
CustomListener.prototype.enterLoop = function(ctx) {
	//console.log(this.getTabbing() + "Entering Loop");
};

// Exit a parse tree produced by EliminationOrderParser#loop.
CustomListener.prototype.exitLoop = function(ctx) {
	//console.log(this.getTabbing() + "Exiting Loop");
};


// Enter a parse tree produced by EliminationOrderParser#v.
CustomListener.prototype.enterV = function(ctx) {
	//console.log(this.getTabbing() + "Entering V");
};

// Exit a parse tree produced by EliminationOrderParser#v.
CustomListener.prototype.exitV = function(ctx) {
	//console.log(this.getTabbing() + "Exiting V");
};

CustomListener.prototype.getTabbing = function() {
	var result = "";
	
	for(var i = 0; i < this.stack.size() - 1; ++i) {
		result += '\t';
	}
	
	return result;
};

exports.CustomListener = CustomListener;