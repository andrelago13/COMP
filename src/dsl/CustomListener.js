var EliminationOrderListener = require('dsl/EliminationOrderListener').EliminationOrderListener;
var EO_AST = require('dsl/ast/EO_AST').EO_AST;
var EO_AST_Node = require('dsl/ast/EO_AST_Node').EO_AST_Node;
var EO_AST_NodeManual = require('dsl/ast/EO_AST_NodeManual').EO_AST_NodeManual;
var EO_AST_NodeAuto = require('dsl/ast/EO_AST_NodeAuto').EO_AST_NodeAuto;
var EO_AST_NodeE = require('dsl/ast/EO_AST_NodeE').EO_AST_NodeE;
var EO_AST_NodeE1 = require('dsl/ast/EO_AST_NodeE1').EO_AST_NodeE1;
var EliminationOrderParser = require('dsl/EliminationOrderParser').EliminationOrderParser;
var EO_AST_NodeV = require('dsl/ast/EO_AST_NodeV').EO_AST_NodeV;
var EO_AST_NodeLoop = require('dsl/ast/EO_AST_NodeLoop').EO_AST_NodeLoop;
var EO_AST_NodeF = require('dsl/ast/EO_AST_NodeF').EO_AST_NodeF;
var EO_AST_NodeT = require('dsl/ast/EO_AST_NodeT').EO_AST_NodeT;
var EO_AST_NodeT1 = require('dsl/ast/EO_AST_NodeT1').EO_AST_NodeT1;
var EO_AST_NodeTerminal = require('dsl/ast/EO_AST_NodeTerminal').EO_AST_NodeTerminal;
var EO_AST_NodeReserved = require('dsl/ast/EO_AST_NodeReserved').EO_AST_NodeReserved;
var Stack = require('js/Stack').Stack;

function CustomListener(symbolicNames, ruleNames) {
	EliminationOrderListener.call(this);
	this.ast = new EO_AST();
	var root = new EO_AST_Node();
	this.ast.setRoot(root);
	
	this.symbolicNames = symbolicNames;
	this.ruleNames = ruleNames;
	
	this.stack = new Stack();
	this.stack.push(root);
	
	return this;
}

CustomListener.prototype = Object.create(EliminationOrderListener.prototype);
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
	var node = new EO_AST_NodeManual(this.stack.top());
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
	var node = new EO_AST_NodeAuto(this.stack.top());
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
	
	var node = new EO_AST_NodeE(this.stack.top());
	this.stack.top();
	this.stack.push(node);
};

// Exit a parse tree produced by EliminationOrderParser#e.
CustomListener.prototype.exitE = function(ctx) {
	var me = this.stack.pop();
	
	if(me.children.length < 2) {
		// E1 was empty
		this.stack.top().removeChildIfExists(me);
		this.stack.top().addChild(me.children[0]);
		console.log(this.getTabbing() + "Lonely child replaced E.");
	}
	
	console.log(this.getTabbing() + "Exiting E");
};


// Enter a parse tree produced by EliminationOrderParser#e1.
CustomListener.prototype.enterE1 = function(ctx) {
	console.log(this.getTabbing() + "Entering E1");
	
	if(ctx.children === null) {
		console.log(this.getTabbing() + "IGNORED (exiting)");
		return;
	}
	
	var node = new EO_AST_NodeE1(this.stack.top());
	this.stack.push(node);
	
	var op = ctx.children[0].getText();
	console.log(this.getTabbing() + "Parsing operation \"" + op + "\" (" + this.symbolicNames[ctx.children[0].getSymbol().type] + ").");
	node.addChild(op);
};

// Exit a parse tree produced by EliminationOrderParser#e1.
CustomListener.prototype.exitE1 = function(ctx) {
	if(ctx.children === null)
		return;
	
	this.stack.pop();
	console.log(this.getTabbing() + "Exiting E1");
};

//Enter a parse tree produced by EliminationOrderParser#t.
CustomListener.prototype.enterT = function(ctx) {
	console.log(this.getTabbing() + "Entering T");
	
	var node = new EO_AST_NodeT(this.stack.top());
	this.stack.push(node);
};

// Exit a parse tree produced by EliminationOrderParser#t.
CustomListener.prototype.exitT = function(ctx) {
	var me = this.stack.pop();
	
	if(me.children.length < 2) {
		// T1 was empty
		this.stack.top().removeChildIfExists(me);
		this.stack.top().addChild(me.children[0]);
		console.log(this.getTabbing() + "Lonely child replaced E.");
	}
	
	console.log(this.getTabbing() + "Exiting T");
};


// Enter a parse tree produced by EliminationOrderParser#t1.
CustomListener.prototype.enterT1 = function(ctx) {
	console.log(this.getTabbing() + "Entering T1");
	
	if(ctx.children === null) {
		console.log(this.getTabbing() + "IGNORED (exiting)");
		return;		
	}
	
	var node = new EO_AST_NodeT1(this.stack.top());
	this.stack.push(node);
	
	var op = ctx.children[0].getText();
	console.log(this.getTabbing() + "Parsing operation \"" + op + "\" (" + this.symbolicNames[ctx.children[0].getSymbol().type] + ").");
	node.addChild(op);
};

// Exit a parse tree produced by EliminationOrderParser#t1.
CustomListener.prototype.exitT1 = function(ctx) {
	if(ctx.children === null) {
		return;		
	}
	this.stack.pop();
	console.log(this.getTabbing() + "Exiting T1");
};


// Enter a parse tree produced by EliminationOrderParser#f.
CustomListener.prototype.enterF = function(ctx) {
	console.log(this.getTabbing() + "Entering F");
	
	var children = ctx.children;
	var first_child = children[0];
	var first_child_rule = first_child.ruleIndex;
	
	var node = this.stack.top();
	
	if(typeof first_child_rule == 'undefined') {
		// INT, REAL, OPEN1, RESERVED
		var child_type = this.symbolicNames[first_child.getSymbol().type];
		
		switch (child_type) {
		case 'INT': {
			var value = parseInt(first_child.getText());
			console.log(this.getTabbing() + "Parsing INT \"" + value + "\"");
			node.addChild(new EO_AST_NodeTerminal(node, "INT", value));
			break;
		}
		case 'REAL': {
			var value = parseFloat(first_child.getText());
			console.log(this.getTabbing() + "Parsing REAL \"" + value + "\"");
			node.addChild(new EO_AST_NodeTerminal(node, "REAL", value));
			break;
		}
		case 'OPEN1': {
			console.log(this.getTabbing() + "Parsing OPEN1 \"" + first_child.getText() + "\"");
			console.log(this.getTabbing() + "Parsing E later...");
			console.log(this.getTabbing() + "Parsing CLOSE1 \"" + children[2].getText() + "\"");
			break;
		}
		case 'RESERVED': {
			node.addChild(new EO_AST_NodeReserved(node, first_child.getText()));
			break;
		}
		default: {
			console.error("Unknown node type \"" + child_type + "\".");
		}
		}
	} else {
		var ruleName = this.ruleNames[first_child_rule];
		if(ruleName === 'v' || ruleName === 'loop') {
			return;
		} else {
			console.log(this.getTabbing() + "Unknown descendant rule \"" + ruleName + "\" found.");
		}
	}
	
	//console.log("=> " + this.symbolicNames[first_child.getSymbol().type]);
	//console.log(this.ruleNames[first_child.ruleIndex]);
	//console.log(ctx.children[0] instanceof EliminationOrderParser.VContext);
};

// Exit a parse tree produced by EliminationOrderParser#f.
CustomListener.prototype.exitF = function(ctx) {
	//this.stack.pop();
	
	console.log(this.getTabbing() + "Exiting F");
};


// Enter a parse tree produced by EliminationOrderParser#loop.
CustomListener.prototype.enterLoop = function(ctx) {
	console.log(this.getTabbing() + "Entering Loop");
	
	var node = new EO_AST_NodeLoop(this.stack.top());
	this.stack.push(node);
	
	// SUM or MUL
	var loopType = ctx.children[0].getText();
	node.addChild(loopType);
	console.log(this.getTabbing() + "Parsing loop type \"" + loopType + "\".");
	
	// IDENTIFIER
	var loopIdentifier = ctx.children[2].getText();
	node.addChild(loopIdentifier);
	console.log(this.getTabbing() + "Parsing loop identifier \"" + loopIdentifier + "\".");	
	
	// RESERVED
	var reserved_name = ctx.children[4].getText();
	node.addChild(new EO_AST_NodeReserved(node, reserved_name));
	
	console.log(this.getTabbing() + "Parsing loop -> \"e\" later...");	
};

// Exit a parse tree produced by EliminationOrderParser#loop.
CustomListener.prototype.exitLoop = function(ctx) {
	this.stack.pop();
	
	console.log(this.getTabbing() + "Exiting Loop");
};


// Enter a parse tree produced by EliminationOrderParser#v.
CustomListener.prototype.enterV = function(ctx) {
	console.log(this.getTabbing() + "Entering V");
	
	var node;
	
	var major = ctx.children[0].getText();
	if(ctx.children.length > 1) {
		// MAJOR.MINOR
		var minor = ctx.children[2].getText();
		node = new EO_AST_NodeV(this.stack.top(), major, minor);
		console.log(this.getTabbing() + '\t' + "Parsing V \"" + major + "." + minor + "\".");
		if(minor != "weight") {
			errors.push("Unexpected MINOR atribute \"" + minor + "\ at \"" + major + "." + minor + "\". Must be \"weight\".");
		}
	} else {
		// MAJOR
		node = new EO_AST_NodeV(this.stack.top(), major);		
		console.log(this.getTabbing() + '\t' + "Parsing V \"" + major + "\".");
	}
};

// Exit a parse tree produced by EliminationOrderParser#v.
CustomListener.prototype.exitV = function(ctx) {
	console.log(this.getTabbing() + "Exiting V");
};

CustomListener.prototype.getTabbing = function() {
	var result = "";
	
	for(var i = 0; i < this.stack.size() - 1; ++i) {
		result += '\t';
	}
	
	return result;
};

exports.CustomListener = CustomListener;
