**PROJECT TITLE: FA2RE-SE
**GROUP: 1FA2RE-SE
(Names, numbers, self assessment, and contribution of the members of the group according to:)
NAME: André Lago, NR: <number>, GRADE1: <0 to 20 value>, CONTRIBUTION: <0 to 100 %)
NAME: Carolina Moreira, NR: <number>, GRADE: <0 to 20 value>, CONTRIBUTION: <0 to 100 %)
NAME: Gustavo Silva, NR: 201304143, GRADE2: <0 to 20 value>, CONTRIBUTION: <0 to 100 %)
NAME: Leonardo Ferreira, NR: 201305980, GRADE: <0 to 20 value>, CONTRIBUTION: <0 to 100 %)
(Note: consider that the sum of the individual contributions of the members should not exceed 100%)


** SUMMARY: (Describe what your tool does and its main features.)
Framework to transform finite automata to regular expressions using the state elimination method. The main feature of this interface is the possibility to specify how states must be "ranked" when selecting which one should be removed at each stage.
The input of the framework is a graph representing the automata and a DSL defining the order of elimination of the states, which will affect the final regular expression.
The graph should be in DOT format and it must contain a node with ID "START" (the start state) and it must contain one or more final states. A state is considered final if it has "doublecircle" as the shape or 2 peripheries.
To specify the order in which to eliminate the states, the user must specify an expression (using our DSL) indicating how the "score" of each node is going to be calculated. The nodes will then be removed in decreasing order of "score". In addition to that, the user may also specify tie breakers or even a manual ordering by specifying the state IDs directly.


**DEALING WITH SYNTACTIC ERRORS: (Describe how the syntactic error recovery of your tool does work. Does it exit after the first error?)


**SEMANTIC ANALYSIS: (Refer the possible semantic rules implemented by your tool.)


**INTERMEDIATE REPRESENTATIONS (IRs): (for example, when applicable, describe the HLIR (high-level IR) and the LLIR (low-level IR) used, if your tool includes an LLIR with structure different from the HLIR)


**CODE GENERATION: (when applicable, describe how the code generation of your tool works and identify the possible problems your tool has regarding code generation.)


**OVERVIEW: (refer the approach used in your tool, the main algorithms, the third-party tools and/or packages, etc.)


**TESTSUITE AND TEST INFRASTRUCTURE: (Describe the content of your testsuite regarding the number of examples, the approach to automate the test, etc.)


**TASK DISTRIBUTION: (Identify the set of tasks done by each member of the project.)


**PROS: (Identify the most positive aspects of your tool)


**CONS: (Identify the most negative aspects of your tool)