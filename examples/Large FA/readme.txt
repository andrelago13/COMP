This example proves that a good heuristic may sometimes give considerably worse results.

State Weight Heuristic:
((ac*b+b)(ac*b)*ac*c+ac*c)ac+(ac*b+b)(ac*b)*ca+(ac*b+b)(ac*b)*(ac*a+b)+ac*a

Ins + Outs:
((ac*b+b)(ac*b)*ac*c+ac*c)ac+(ac*b+b)(ac*b)*ca+(ac*b+b)(ac*b)*(ac*a+b)+ac*a

"static 1;" :
(ba+a)(ba+c)*(b(ca+b)+cac+a)+b(ca+b)