grammar EliminationOrder;

s : (manual SEMICOLON) | (auto SEMICOLON s1 );
s1 : EOF|s;
manual : INT (COMMA INT)*;
auto : type e;
type : STATIC | DYNAMIC;
e : (e (PLUS | MINUS) e1) | e1;
e1 : (e (ASTERISK | SLASH) e2) | e2;
e2 : v | INT | REAL | loop | (OPEN1 e CLOSE1);
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
SLASH		: '/';
INT			: [0-9]+;
REAL		: [0-9]* '.' [0-9]+;