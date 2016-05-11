// Generated from dsl/EliminationOrder.g4 by ANTLR 4.5.3
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by EliminationOrderParser.

function EliminationOrderVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

EliminationOrderVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
EliminationOrderVisitor.prototype.constructor = EliminationOrderVisitor;

// Visit a parse tree produced by EliminationOrderParser#s.
EliminationOrderVisitor.prototype.visitS = function(ctx) {
};


// Visit a parse tree produced by EliminationOrderParser#manual.
EliminationOrderVisitor.prototype.visitManual = function(ctx) {
};


// Visit a parse tree produced by EliminationOrderParser#auto.
EliminationOrderVisitor.prototype.visitAuto = function(ctx) {
};


// Visit a parse tree produced by EliminationOrderParser#type.
EliminationOrderVisitor.prototype.visitType = function(ctx) {
};


// Visit a parse tree produced by EliminationOrderParser#e.
EliminationOrderVisitor.prototype.visitE = function(ctx) {
};


// Visit a parse tree produced by EliminationOrderParser#e1.
EliminationOrderVisitor.prototype.visitE1 = function(ctx) {
};


// Visit a parse tree produced by EliminationOrderParser#loop.
EliminationOrderVisitor.prototype.visitLoop = function(ctx) {
};


// Visit a parse tree produced by EliminationOrderParser#v.
EliminationOrderVisitor.prototype.visitV = function(ctx) {
};



exports.EliminationOrderVisitor = EliminationOrderVisitor;