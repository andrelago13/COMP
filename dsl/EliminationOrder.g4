grammar EliminationOrder;

s : (manual SEMICOLON) | (auto SEMICOLON (s)? );
manual : INT (COMMA INT)*;
auto : type e;
type : STATIC | DYNAMIC;
e : e1 ((PLUS | ASTERISK) e1)*;
e1 : v | INT | REAL | loop | (OPEN1 e CLOSE1);
loop : (SUM | MUL) OPEN1 IDENTIFIER COLON v CLOSE1 OPEN2 e CLOSE2;
v : IDENTIFIER (DOT IDENTIFIER)?;

WHITESPACE  : [ \t\r\n]+ -> skip ;

STATIC 		: 'static';
DYNAMIC 	: 'dynamic';
SUM 		: 'sum';
MUL 		: 'mul';
OPEN1 		: '(';
CLOSE1 		: ')';
OPEN2 		: '{';
CLOSE2 		: '}';
IDENTIFIER 	: '#'? [a-zA-Z_]+ [a-zA-Z_0-9]*;
COMMA 		: ',';
COLON 		: ':';
SEMICOLON 	: ';';
DOT			: '.';
PLUS		: '+';
MINUS		: '-';
ASTERISK	: '*';
INT			: [0-9]+;
REAL		: [0-9]* '.' [0-9]+;