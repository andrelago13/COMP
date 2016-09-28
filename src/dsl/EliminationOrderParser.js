// Generated from src/dsl/EliminationOrder.g4 by ANTLR 4.5.3
// jshint ignore: start
var antlr4 = require('antlr4/index');
var EliminationOrderListener = require('./EliminationOrderListener').EliminationOrderListener;
var grammarFileName = "EliminationOrder.g4";

var serializedATN = ["\u0003\u0430\ud6d1\u8206\uad2d\u4417\uaef1\u8d80\uaadd",
    "\u0003\u0018b\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0004",
    "\r\t\r\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003",
    "\u0002\u0003\u0002\u0003\u0002\u0005\u0002#\n\u0002\u0003\u0003\u0003",
    "\u0003\u0005\u0003\'\n\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0007",
    "\u0004,\n\u0004\f\u0004\u000e\u0004/\u000b\u0004\u0003\u0005\u0003\u0005",
    "\u0003\u0005\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0003\b\u0003\b\u0003\b\u0003\b\u0005\b=\n\b\u0003\t\u0003\t\u0003",
    "\t\u0003\n\u0003\n\u0003\n\u0003\n\u0005\nF\n\n\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0005\u000bQ\n\u000b\u0003\f\u0003\f\u0003\f\u0003\f\u0003",
    "\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\r\u0003\r\u0003\r\u0005",
    "\r`\n\r\u0003\r\u0002\u0002\u000e\u0002\u0004\u0006\b\n\f\u000e\u0010",
    "\u0012\u0014\u0016\u0018\u0002\u0006\u0003\u0002\u0005\u0006\u0003\u0002",
    "\u0011\u0012\u0003\u0002\u0013\u0014\u0003\u0002\u0007\ba\u0002\"\u0003",
    "\u0002\u0002\u0002\u0004&\u0003\u0002\u0002\u0002\u0006(\u0003\u0002",
    "\u0002\u0002\b0\u0003\u0002\u0002\u0002\n3\u0003\u0002\u0002\u0002\f",
    "5\u0003\u0002\u0002\u0002\u000e<\u0003\u0002\u0002\u0002\u0010>\u0003",
    "\u0002\u0002\u0002\u0012E\u0003\u0002\u0002\u0002\u0014P\u0003\u0002",
    "\u0002\u0002\u0016R\u0003\u0002\u0002\u0002\u0018\\\u0003\u0002\u0002",
    "\u0002\u001a\u001b\u0005\u0006\u0004\u0002\u001b\u001c\u0007\u000f\u0002",
    "\u0002\u001c#\u0003\u0002\u0002\u0002\u001d\u001e\u0005\b\u0005\u0002",
    "\u001e\u001f\u0007\u000f\u0002\u0002\u001f \u0005\u0004\u0003\u0002",
    " #\u0003\u0002\u0002\u0002!#\u0007\u0004\u0002\u0002\"\u001a\u0003\u0002",
    "\u0002\u0002\"\u001d\u0003\u0002\u0002\u0002\"!\u0003\u0002\u0002\u0002",
    "#\u0003\u0003\u0002\u0002\u0002$\'\u0007\u0002\u0002\u0003%\'\u0005",
    "\u0002\u0002\u0002&$\u0003\u0002\u0002\u0002&%\u0003\u0002\u0002\u0002",
    "\'\u0005\u0003\u0002\u0002\u0002(-\u0007\u0015\u0002\u0002)*\u0007\r",
    "\u0002\u0002*,\u0007\u0015\u0002\u0002+)\u0003\u0002\u0002\u0002,/\u0003",
    "\u0002\u0002\u0002-+\u0003\u0002\u0002\u0002-.\u0003\u0002\u0002\u0002",
    ".\u0007\u0003\u0002\u0002\u0002/-\u0003\u0002\u0002\u000201\u0005\n",
    "\u0006\u000212\u0005\f\u0007\u00022\t\u0003\u0002\u0002\u000234\t\u0002",
    "\u0002\u00024\u000b\u0003\u0002\u0002\u000256\u0005\u0010\t\u000267",
    "\u0005\u000e\b\u00027\r\u0003\u0002\u0002\u000289\t\u0003\u0002\u0002",
    "9:\u0005\u0010\t\u0002:;\u0005\u000e\b\u0002;=\u0003\u0002\u0002\u0002",
    "<8\u0003\u0002\u0002\u0002<=\u0003\u0002\u0002\u0002=\u000f\u0003\u0002",
    "\u0002\u0002>?\u0005\u0014\u000b\u0002?@\u0005\u0012\n\u0002@\u0011",
    "\u0003\u0002\u0002\u0002AB\t\u0004\u0002\u0002BC\u0005\u0014\u000b\u0002",
    "CD\u0005\u0012\n\u0002DF\u0003\u0002\u0002\u0002EA\u0003\u0002\u0002",
    "\u0002EF\u0003\u0002\u0002\u0002F\u0013\u0003\u0002\u0002\u0002GQ\u0005",
    "\u0018\r\u0002HQ\u0007\u0018\u0002\u0002IQ\u0007\u0015\u0002\u0002J",
    "Q\u0007\u0016\u0002\u0002KQ\u0005\u0016\f\u0002LM\u0007\t\u0002\u0002",
    "MN\u0005\f\u0007\u0002NO\u0007\n\u0002\u0002OQ\u0003\u0002\u0002\u0002",
    "PG\u0003\u0002\u0002\u0002PH\u0003\u0002\u0002\u0002PI\u0003\u0002\u0002",
    "\u0002PJ\u0003\u0002\u0002\u0002PK\u0003\u0002\u0002\u0002PL\u0003\u0002",
    "\u0002\u0002Q\u0015\u0003\u0002\u0002\u0002RS\t\u0005\u0002\u0002ST",
    "\u0007\t\u0002\u0002TU\u0007\u0017\u0002\u0002UV\u0007\u000e\u0002\u0002",
    "VW\u0007\u0018\u0002\u0002WX\u0007\n\u0002\u0002XY\u0007\u000b\u0002",
    "\u0002YZ\u0005\f\u0007\u0002Z[\u0007\f\u0002\u0002[\u0017\u0003\u0002",
    "\u0002\u0002\\_\u0007\u0017\u0002\u0002]^\u0007\u0010\u0002\u0002^`",
    "\u0007\u0017\u0002\u0002_]\u0003\u0002\u0002\u0002_`\u0003\u0002\u0002",
    "\u0002`\u0019\u0003\u0002\u0002\u0002\t\"&-<EP_"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, null, "'random'", "'static'", "'dynamic'", "'sum'", 
                     "'mul'", "'('", "')'", "'{'", "'}'", "','", "':'", 
                     "';'", "'.'", "'+'", "'-'", "'*'", "'/'" ];

var symbolicNames = [ null, "WHITESPACE", "RANDOM", "STATIC", "DYNAMIC", 
                      "SUM", "MUL", "OPEN1", "CLOSE1", "OPEN2", "CLOSE2", 
                      "COMMA", "COLON", "SEMICOLON", "DOT", "PLUS", "MINUS", 
                      "ASTERISK", "SLASH", "INT", "REAL", "IDENTIFIER", 
                      "RESERVED" ];

var ruleNames =  [ "s", "s1", "manual", "auto", "type", "e", "e1", "t", 
                   "t1", "f", "loop", "v" ];

function EliminationOrderParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

EliminationOrderParser.prototype = Object.create(antlr4.Parser.prototype);
EliminationOrderParser.prototype.constructor = EliminationOrderParser;

Object.defineProperty(EliminationOrderParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

EliminationOrderParser.EOF = antlr4.Token.EOF;
EliminationOrderParser.WHITESPACE = 1;
EliminationOrderParser.RANDOM = 2;
EliminationOrderParser.STATIC = 3;
EliminationOrderParser.DYNAMIC = 4;
EliminationOrderParser.SUM = 5;
EliminationOrderParser.MUL = 6;
EliminationOrderParser.OPEN1 = 7;
EliminationOrderParser.CLOSE1 = 8;
EliminationOrderParser.OPEN2 = 9;
EliminationOrderParser.CLOSE2 = 10;
EliminationOrderParser.COMMA = 11;
EliminationOrderParser.COLON = 12;
EliminationOrderParser.SEMICOLON = 13;
EliminationOrderParser.DOT = 14;
EliminationOrderParser.PLUS = 15;
EliminationOrderParser.MINUS = 16;
EliminationOrderParser.ASTERISK = 17;
EliminationOrderParser.SLASH = 18;
EliminationOrderParser.INT = 19;
EliminationOrderParser.REAL = 20;
EliminationOrderParser.IDENTIFIER = 21;
EliminationOrderParser.RESERVED = 22;

EliminationOrderParser.RULE_s = 0;
EliminationOrderParser.RULE_s1 = 1;
EliminationOrderParser.RULE_manual = 2;
EliminationOrderParser.RULE_auto = 3;
EliminationOrderParser.RULE_type = 4;
EliminationOrderParser.RULE_e = 5;
EliminationOrderParser.RULE_e1 = 6;
EliminationOrderParser.RULE_t = 7;
EliminationOrderParser.RULE_t1 = 8;
EliminationOrderParser.RULE_f = 9;
EliminationOrderParser.RULE_loop = 10;
EliminationOrderParser.RULE_v = 11;

function SContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = EliminationOrderParser.RULE_s;
    return this;
}

SContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
SContext.prototype.constructor = SContext;

SContext.prototype.manual = function() {
    return this.getTypedRuleContext(ManualContext,0);
};

SContext.prototype.SEMICOLON = function() {
    return this.getToken(EliminationOrderParser.SEMICOLON, 0);
};

SContext.prototype.auto = function() {
    return this.getTypedRuleContext(AutoContext,0);
};

SContext.prototype.s1 = function() {
    return this.getTypedRuleContext(S1Context,0);
};

SContext.prototype.RANDOM = function() {
    return this.getToken(EliminationOrderParser.RANDOM, 0);
};

SContext.prototype.enterRule = function(listener) {
    if(listener instanceof EliminationOrderListener ) {
        listener.enterS(this);
	}
};

SContext.prototype.exitRule = function(listener) {
    if(listener instanceof EliminationOrderListener ) {
        listener.exitS(this);
	}
};




EliminationOrderParser.SContext = SContext;

EliminationOrderParser.prototype.s = function() {

    var localctx = new SContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, EliminationOrderParser.RULE_s);
    try {
        this.state = 32;
        switch(this._input.LA(1)) {
        case EliminationOrderParser.INT:
            this.enterOuterAlt(localctx, 1);
            this.state = 24;
            this.manual();
            this.state = 25;
            this.match(EliminationOrderParser.SEMICOLON);
            break;
        case EliminationOrderParser.STATIC:
        case EliminationOrderParser.DYNAMIC:
            this.enterOuterAlt(localctx, 2);
            this.state = 27;
            this.auto();
            this.state = 28;
            this.match(EliminationOrderParser.SEMICOLON);
            this.state = 29;
            this.s1();
            break;
        case EliminationOrderParser.RANDOM:
            this.enterOuterAlt(localctx, 3);
            this.state = 31;
            this.match(EliminationOrderParser.RANDOM);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function S1Context(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = EliminationOrderParser.RULE_s1;
    return this;
}

S1Context.prototype = Object.create(antlr4.ParserRuleContext.prototype);
S1Context.prototype.constructor = S1Context;

S1Context.prototype.EOF = function() {
    return this.getToken(EliminationOrderParser.EOF, 0);
};

S1Context.prototype.s = function() {
    return this.getTypedRuleContext(SContext,0);
};

S1Context.prototype.enterRule = function(listener) {
    if(listener instanceof EliminationOrderListener ) {
        listener.enterS1(this);
	}
};

S1Context.prototype.exitRule = function(listener) {
    if(listener instanceof EliminationOrderListener ) {
        listener.exitS1(this);
	}
};




EliminationOrderParser.S1Context = S1Context;

EliminationOrderParser.prototype.s1 = function() {

    var localctx = new S1Context(this, this._ctx, this.state);
    this.enterRule(localctx, 2, EliminationOrderParser.RULE_s1);
    try {
        this.state = 36;
        switch(this._input.LA(1)) {
        case EliminationOrderParser.EOF:
            this.enterOuterAlt(localctx, 1);
            this.state = 34;
            this.match(EliminationOrderParser.EOF);
            break;
        case EliminationOrderParser.RANDOM:
        case EliminationOrderParser.STATIC:
        case EliminationOrderParser.DYNAMIC:
        case EliminationOrderParser.INT:
            this.enterOuterAlt(localctx, 2);
            this.state = 35;
            this.s();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ManualContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = EliminationOrderParser.RULE_manual;
    return this;
}

ManualContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ManualContext.prototype.constructor = ManualContext;

ManualContext.prototype.INT = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(EliminationOrderParser.INT);
    } else {
        return this.getToken(EliminationOrderParser.INT, i);
    }
};


ManualContext.prototype.COMMA = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(EliminationOrderParser.COMMA);
    } else {
        return this.getToken(EliminationOrderParser.COMMA, i);
    }
};


ManualContext.prototype.enterRule = function(listener) {
    if(listener instanceof EliminationOrderListener ) {
        listener.enterManual(this);
	}
};

ManualContext.prototype.exitRule = function(listener) {
    if(listener instanceof EliminationOrderListener ) {
        listener.exitManual(this);
	}
};




EliminationOrderParser.ManualContext = ManualContext;

EliminationOrderParser.prototype.manual = function() {

    var localctx = new ManualContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, EliminationOrderParser.RULE_manual);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 38;
        this.match(EliminationOrderParser.INT);
        this.state = 43;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===EliminationOrderParser.COMMA) {
            this.state = 39;
            this.match(EliminationOrderParser.COMMA);
            this.state = 40;
            this.match(EliminationOrderParser.INT);
            this.state = 45;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function AutoContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = EliminationOrderParser.RULE_auto;
    return this;
}

AutoContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AutoContext.prototype.constructor = AutoContext;

AutoContext.prototype.type = function() {
    return this.getTypedRuleContext(TypeContext,0);
};

AutoContext.prototype.e = function() {
    return this.getTypedRuleContext(EContext,0);
};

AutoContext.prototype.enterRule = function(listener) {
    if(listener instanceof EliminationOrderListener ) {
        listener.enterAuto(this);
	}
};

AutoContext.prototype.exitRule = function(listener) {
    if(listener instanceof EliminationOrderListener ) {
        listener.exitAuto(this);
	}
};




EliminationOrderParser.AutoContext = AutoContext;

EliminationOrderParser.prototype.auto = function() {

    var localctx = new AutoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, EliminationOrderParser.RULE_auto);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 46;
        this.type();
        this.state = 47;
        this.e();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function TypeContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = EliminationOrderParser.RULE_type;
    return this;
}

TypeContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
TypeContext.prototype.constructor = TypeContext;

TypeContext.prototype.STATIC = function() {
    return this.getToken(EliminationOrderParser.STATIC, 0);
};

TypeContext.prototype.DYNAMIC = function() {
    return this.getToken(EliminationOrderParser.DYNAMIC, 0);
};

TypeContext.prototype.enterRule = function(listener) {
    if(listener instanceof EliminationOrderListener ) {
        listener.enterType(this);
	}
};

TypeContext.prototype.exitRule = function(listener) {
    if(listener instanceof EliminationOrderListener ) {
        listener.exitType(this);
	}
};




EliminationOrderParser.TypeContext = TypeContext;

EliminationOrderParser.prototype.type = function() {

    var localctx = new TypeContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, EliminationOrderParser.RULE_type);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 49;
        _la = this._input.LA(1);
        if(!(_la===EliminationOrderParser.STATIC || _la===EliminationOrderParser.DYNAMIC)) {
        this._errHandler.recoverInline(this);
        }
        else {
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function EContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = EliminationOrderParser.RULE_e;
    return this;
}

EContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EContext.prototype.constructor = EContext;

EContext.prototype.t = function() {
    return this.getTypedRuleContext(TContext,0);
};

EContext.prototype.e1 = function() {
    return this.getTypedRuleContext(E1Context,0);
};

EContext.prototype.enterRule = function(listener) {
    if(listener instanceof EliminationOrderListener ) {
        listener.enterE(this);
	}
};

EContext.prototype.exitRule = function(listener) {
    if(listener instanceof EliminationOrderListener ) {
        listener.exitE(this);
	}
};




EliminationOrderParser.EContext = EContext;

EliminationOrderParser.prototype.e = function() {

    var localctx = new EContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, EliminationOrderParser.RULE_e);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 51;
        this.t();
        this.state = 52;
        this.e1();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function E1Context(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = EliminationOrderParser.RULE_e1;
    return this;
}

E1Context.prototype = Object.create(antlr4.ParserRuleContext.prototype);
E1Context.prototype.constructor = E1Context;

E1Context.prototype.t = function() {
    return this.getTypedRuleContext(TContext,0);
};

E1Context.prototype.e1 = function() {
    return this.getTypedRuleContext(E1Context,0);
};

E1Context.prototype.PLUS = function() {
    return this.getToken(EliminationOrderParser.PLUS, 0);
};

E1Context.prototype.MINUS = function() {
    return this.getToken(EliminationOrderParser.MINUS, 0);
};

E1Context.prototype.enterRule = function(listener) {
    if(listener instanceof EliminationOrderListener ) {
        listener.enterE1(this);
	}
};

E1Context.prototype.exitRule = function(listener) {
    if(listener instanceof EliminationOrderListener ) {
        listener.exitE1(this);
	}
};




EliminationOrderParser.E1Context = E1Context;

EliminationOrderParser.prototype.e1 = function() {

    var localctx = new E1Context(this, this._ctx, this.state);
    this.enterRule(localctx, 12, EliminationOrderParser.RULE_e1);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 58;
        _la = this._input.LA(1);
        if(_la===EliminationOrderParser.PLUS || _la===EliminationOrderParser.MINUS) {
            this.state = 54;
            _la = this._input.LA(1);
            if(!(_la===EliminationOrderParser.PLUS || _la===EliminationOrderParser.MINUS)) {
            this._errHandler.recoverInline(this);
            }
            else {
                this.consume();
            }
            this.state = 55;
            this.t();
            this.state = 56;
            this.e1();
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function TContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = EliminationOrderParser.RULE_t;
    return this;
}

TContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
TContext.prototype.constructor = TContext;

TContext.prototype.f = function() {
    return this.getTypedRuleContext(FContext,0);
};

TContext.prototype.t1 = function() {
    return this.getTypedRuleContext(T1Context,0);
};

TContext.prototype.enterRule = function(listener) {
    if(listener instanceof EliminationOrderListener ) {
        listener.enterT(this);
	}
};

TContext.prototype.exitRule = function(listener) {
    if(listener instanceof EliminationOrderListener ) {
        listener.exitT(this);
	}
};




EliminationOrderParser.TContext = TContext;

EliminationOrderParser.prototype.t = function() {

    var localctx = new TContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, EliminationOrderParser.RULE_t);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 60;
        this.f();
        this.state = 61;
        this.t1();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function T1Context(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = EliminationOrderParser.RULE_t1;
    return this;
}

T1Context.prototype = Object.create(antlr4.ParserRuleContext.prototype);
T1Context.prototype.constructor = T1Context;

T1Context.prototype.f = function() {
    return this.getTypedRuleContext(FContext,0);
};

T1Context.prototype.t1 = function() {
    return this.getTypedRuleContext(T1Context,0);
};

T1Context.prototype.ASTERISK = function() {
    return this.getToken(EliminationOrderParser.ASTERISK, 0);
};

T1Context.prototype.SLASH = function() {
    return this.getToken(EliminationOrderParser.SLASH, 0);
};

T1Context.prototype.enterRule = function(listener) {
    if(listener instanceof EliminationOrderListener ) {
        listener.enterT1(this);
	}
};

T1Context.prototype.exitRule = function(listener) {
    if(listener instanceof EliminationOrderListener ) {
        listener.exitT1(this);
	}
};




EliminationOrderParser.T1Context = T1Context;

EliminationOrderParser.prototype.t1 = function() {

    var localctx = new T1Context(this, this._ctx, this.state);
    this.enterRule(localctx, 16, EliminationOrderParser.RULE_t1);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 67;
        _la = this._input.LA(1);
        if(_la===EliminationOrderParser.ASTERISK || _la===EliminationOrderParser.SLASH) {
            this.state = 63;
            _la = this._input.LA(1);
            if(!(_la===EliminationOrderParser.ASTERISK || _la===EliminationOrderParser.SLASH)) {
            this._errHandler.recoverInline(this);
            }
            else {
                this.consume();
            }
            this.state = 64;
            this.f();
            this.state = 65;
            this.t1();
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function FContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = EliminationOrderParser.RULE_f;
    return this;
}

FContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FContext.prototype.constructor = FContext;

FContext.prototype.v = function() {
    return this.getTypedRuleContext(VContext,0);
};

FContext.prototype.RESERVED = function() {
    return this.getToken(EliminationOrderParser.RESERVED, 0);
};

FContext.prototype.INT = function() {
    return this.getToken(EliminationOrderParser.INT, 0);
};

FContext.prototype.REAL = function() {
    return this.getToken(EliminationOrderParser.REAL, 0);
};

FContext.prototype.loop = function() {
    return this.getTypedRuleContext(LoopContext,0);
};

FContext.prototype.OPEN1 = function() {
    return this.getToken(EliminationOrderParser.OPEN1, 0);
};

FContext.prototype.e = function() {
    return this.getTypedRuleContext(EContext,0);
};

FContext.prototype.CLOSE1 = function() {
    return this.getToken(EliminationOrderParser.CLOSE1, 0);
};

FContext.prototype.enterRule = function(listener) {
    if(listener instanceof EliminationOrderListener ) {
        listener.enterF(this);
	}
};

FContext.prototype.exitRule = function(listener) {
    if(listener instanceof EliminationOrderListener ) {
        listener.exitF(this);
	}
};




EliminationOrderParser.FContext = FContext;

EliminationOrderParser.prototype.f = function() {

    var localctx = new FContext(this, this._ctx, this.state);
    this.enterRule(localctx, 18, EliminationOrderParser.RULE_f);
    try {
        this.state = 78;
        switch(this._input.LA(1)) {
        case EliminationOrderParser.IDENTIFIER:
            this.enterOuterAlt(localctx, 1);
            this.state = 69;
            this.v();
            break;
        case EliminationOrderParser.RESERVED:
            this.enterOuterAlt(localctx, 2);
            this.state = 70;
            this.match(EliminationOrderParser.RESERVED);
            break;
        case EliminationOrderParser.INT:
            this.enterOuterAlt(localctx, 3);
            this.state = 71;
            this.match(EliminationOrderParser.INT);
            break;
        case EliminationOrderParser.REAL:
            this.enterOuterAlt(localctx, 4);
            this.state = 72;
            this.match(EliminationOrderParser.REAL);
            break;
        case EliminationOrderParser.SUM:
        case EliminationOrderParser.MUL:
            this.enterOuterAlt(localctx, 5);
            this.state = 73;
            this.loop();
            break;
        case EliminationOrderParser.OPEN1:
            this.enterOuterAlt(localctx, 6);
            this.state = 74;
            this.match(EliminationOrderParser.OPEN1);
            this.state = 75;
            this.e();
            this.state = 76;
            this.match(EliminationOrderParser.CLOSE1);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function LoopContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = EliminationOrderParser.RULE_loop;
    return this;
}

LoopContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
LoopContext.prototype.constructor = LoopContext;

LoopContext.prototype.OPEN1 = function() {
    return this.getToken(EliminationOrderParser.OPEN1, 0);
};

LoopContext.prototype.IDENTIFIER = function() {
    return this.getToken(EliminationOrderParser.IDENTIFIER, 0);
};

LoopContext.prototype.COLON = function() {
    return this.getToken(EliminationOrderParser.COLON, 0);
};

LoopContext.prototype.RESERVED = function() {
    return this.getToken(EliminationOrderParser.RESERVED, 0);
};

LoopContext.prototype.CLOSE1 = function() {
    return this.getToken(EliminationOrderParser.CLOSE1, 0);
};

LoopContext.prototype.OPEN2 = function() {
    return this.getToken(EliminationOrderParser.OPEN2, 0);
};

LoopContext.prototype.e = function() {
    return this.getTypedRuleContext(EContext,0);
};

LoopContext.prototype.CLOSE2 = function() {
    return this.getToken(EliminationOrderParser.CLOSE2, 0);
};

LoopContext.prototype.SUM = function() {
    return this.getToken(EliminationOrderParser.SUM, 0);
};

LoopContext.prototype.MUL = function() {
    return this.getToken(EliminationOrderParser.MUL, 0);
};

LoopContext.prototype.enterRule = function(listener) {
    if(listener instanceof EliminationOrderListener ) {
        listener.enterLoop(this);
	}
};

LoopContext.prototype.exitRule = function(listener) {
    if(listener instanceof EliminationOrderListener ) {
        listener.exitLoop(this);
	}
};




EliminationOrderParser.LoopContext = LoopContext;

EliminationOrderParser.prototype.loop = function() {

    var localctx = new LoopContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, EliminationOrderParser.RULE_loop);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 80;
        _la = this._input.LA(1);
        if(!(_la===EliminationOrderParser.SUM || _la===EliminationOrderParser.MUL)) {
        this._errHandler.recoverInline(this);
        }
        else {
            this.consume();
        }
        this.state = 81;
        this.match(EliminationOrderParser.OPEN1);
        this.state = 82;
        this.match(EliminationOrderParser.IDENTIFIER);
        this.state = 83;
        this.match(EliminationOrderParser.COLON);
        this.state = 84;
        this.match(EliminationOrderParser.RESERVED);
        this.state = 85;
        this.match(EliminationOrderParser.CLOSE1);
        this.state = 86;
        this.match(EliminationOrderParser.OPEN2);
        this.state = 87;
        this.e();
        this.state = 88;
        this.match(EliminationOrderParser.CLOSE2);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function VContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = EliminationOrderParser.RULE_v;
    return this;
}

VContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
VContext.prototype.constructor = VContext;

VContext.prototype.IDENTIFIER = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(EliminationOrderParser.IDENTIFIER);
    } else {
        return this.getToken(EliminationOrderParser.IDENTIFIER, i);
    }
};


VContext.prototype.DOT = function() {
    return this.getToken(EliminationOrderParser.DOT, 0);
};

VContext.prototype.enterRule = function(listener) {
    if(listener instanceof EliminationOrderListener ) {
        listener.enterV(this);
	}
};

VContext.prototype.exitRule = function(listener) {
    if(listener instanceof EliminationOrderListener ) {
        listener.exitV(this);
	}
};




EliminationOrderParser.VContext = VContext;

EliminationOrderParser.prototype.v = function() {

    var localctx = new VContext(this, this._ctx, this.state);
    this.enterRule(localctx, 22, EliminationOrderParser.RULE_v);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 90;
        this.match(EliminationOrderParser.IDENTIFIER);
        this.state = 93;
        _la = this._input.LA(1);
        if(_la===EliminationOrderParser.DOT) {
            this.state = 91;
            this.match(EliminationOrderParser.DOT);
            this.state = 92;
            this.match(EliminationOrderParser.IDENTIFIER);
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


exports.EliminationOrderParser = EliminationOrderParser;
