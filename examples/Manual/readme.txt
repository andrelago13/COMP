The DSL used to define the elimination order allows the manual definition of states to eliminate.

Examples:

Input: 0, 1, 2, 3, 4, 5, 6, 7;
Output: (ba+a)(ba+c)*(b(ca+b)+cac+a)+b(ca+b)

Input: 7, 6, 5, 4, 3, 2, 1, 0;
Output: (ac*b+b)(ac*b)*ca+((ac*b+b)(ac*b)*ac*c+ac*c)ac+(ac*b+b)(ac*b)*(ac*a+b)+ac*a