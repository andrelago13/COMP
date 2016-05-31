grammar EliminationOrder;

s : (manual SEMICOLON) | (auto SEMICOLON s1 );
s1 : EOF|s;
manual : INT (COMMA INT)*;
auto : type e;
type : STATIC | DYNAMIC;
e : t e1;
e1 : ((PLUS | MINUS) t e1)?;
t : f t1;
t1 : ((ASTERISK | SLASH) f t1)?;
f : v | RESERVED | INT | REAL | loop | (OPEN1 e CLOSE1);
loop : (SUM | MUL) OPEN1 IDENTIFIER COLON RESERVED CLOSE1 OPEN2 e CLOSE2;
v : IDENTIFIER (DOT IDENTIFIER)?;

WHITESPACE  : [ \t\r\n]+ -> skip;

STATIC 		: 'static';
DYNAMIC 	: 'dynamic';
SUM 		: 'sum';
MUL 		: 'mul';
OPEN1 		: '(';
CLOSE1 		: ')';
OPEN2 		: '{';
CLOSE2 		: '}';
COMMA 		: ',';
COLON 		: ':';
SEMICOLON 	: ';';
DOT			: '.';
PLUS		: '+';
MINUS		: '-';
ASTERISK	: '*';
SLASH		: '/';
INT			: [0-9]+;
REAL		: [0-9]* '.' [0-9]+;
IDENTIFIER 	: [a-zA-Z_]+ [a-zA-Z_0-9]*;
RESERVED	: '#' ('ins' | 'outs' | 'indeg' | 'outdeg' | 'ins_nl' | 'outs_nl' | 'indeg_nl' | 'outdeg_nl' | 'nloops');