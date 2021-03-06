# Finite Automata to Regular Expression - State Elimination
##GROUP: 1FA2RE-SE
- André Lago - up201303313@fe.up.pt
- Carolina Moreira - up201303494@fe.up.pt
- Gustavo Silva - up201304143@fe.up.pt
- Leonardo Ferreira - up201305980@fe.up.pt


## SUMMARY
Framework to transform finite automata to regular expressions using the state elimination method. The main feature of this interface is the possibility to specify how states must be "ranked" when selecting which one should be removed at each stage.
The input of the framework is a graph representing the automata and a DSL defining the order of elimination of the states, which will affect the final regular expression.
The graph should be in DOT format and it must contain a node with ID "START" (the start state) and one or more final states. A state is considered final if it has "doublecircle" as the shape or 2 peripheries.
To specify the order in which to eliminate the states, the user must specify an expression (using our DSL) indicating how the "score" of each node is going to be calculated. The nodes will then be removed in decreasing order of "score". In addition to that, the user may also specify tie breakers or even a manual ordering by specifying the node IDs directly.


## USING THE API
The easiest way to learn how to use the API is to read the code examples in "js/main.js" in the following way:
- Parsing the automata file into a graph structure -> method "openAutomata"
- Parsing the DSL expression, watching for all sorts of errors -> method "parseDSL"
  - this might require running antlr4 first to generate the antlr class files
- Understand how to read errors generate by vis or our DSL parser -> method "displayErrors"
- Execute the conversion and display the steps of elimination -> method "tryStartingConverter"

## DEALING WITH SYNTACTIC ERRORS
Syntatic analysis is performed when our program visits the ANTLR4 CST to build our custom AST. This analysis doesn't stop at the first error, it simply adds a error message to a list of errors, displayed at the end.

## SEMANTIC ANALYSIS
Semantic analysis is performed when the AST of the program is evaluated. The semantic validation includes checking wether variables were declared (for example, inside loops) and wether sub-variables (such as "weight" in "in.weight") are valid.

## INTERMEDIATE REPRESENTATIONS (IRs)
The tool generates an Abstract Syntax Tree from the Concrete Syntax Tree generated by ANTLR4. The purpose of the AST is to simplify the processing of the specified language, so that node ranking can be easily calculated.
Also, the functions called when walking through the ANTLR4 CST allow to implement some early semantic analysis.

## OVERVIEW
The framework runs on a web browser, using JavaScript to do the conversion between the FA and the regular expression.
The lexical and syntatic analysis is done using ANTLR4.
The DOT file representing the finite automata is loaded using Vis.js. This library is also used for the visual display of the graph.

## TESTSUITE AND TEST INFRASTRUCTURE
The website includes 4 different pre-defined DSLs of known heuristics and their combinations for tie breaking.
In the /testsuite/ folder, 5 FA input examples are available to use for testing.

## TASK DISTRIBUTION
André Lago:
- Conversion of the CST to the AST.
- Syntatic and semantic analysis
- Calculation of the state elimination order for an iteration using the rules defined in the AST.

Carolina Moreira:
- About page;
- Result printing;
- Some HTML fixes.

Gustavo Silva:
- DOT file parsing (using vis.js)
- FA validation
- State elimination algorithm

Leonardo Ferreira:
- Output visualization (HTML, CSS and Javascript)
- Vis.js integration
