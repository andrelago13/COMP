$( document ).ready(function() {
	require('dsl/EliminationOrderLexer');
	require('dsl/EliminationOrderParser');
	require('dsl/CustomListener');
	require('dsl/ast/VarMap');
	require('dsl/ast/EO_AST');
	require('dsl/ast/EO_AST_Node');
	require('dsl/ast/EO_AST_NodeManual');
	require('dsl/ast/EO_AST_NodeAuto');
	require('dsl/ast/EO_AST_NodeE');
	require('dsl/ast/EO_AST_NodeE1');
	require('dsl/ast/EO_AST_NodeV');
	require('dsl/ast/EO_AST_NodeLoop');
	require('dsl/ast/EO_AST_NodeF');
	require('dsl/ast/EO_AST_NodeT');
	require('dsl/ast/EO_AST_NodeT1');
	require('dsl/ast/EO_AST_NodeTerminal');
	require('dsl/ast/EO_AST_NodeReserved');
	require('dsl/ast/EvalResult');
	require('js/Stack');
});

var fa_graph;

var openFile = function (event) {
	var input = event.target;

	var reader = new FileReader();
	reader.onload = function(){
		var text = reader.result;

		var faLoader = new FALoader(text);
		var fa = faLoader.load();
		var converter = new Converter(fa, null);
		var data = converter.convert();
		
		fa_graph = data;
		
		var options = data.options;

		// you can extend the options like a normal JSON variable:
		var options = {
				nodes:{
					color: 'grey',
					shadow: true
				}
		}
		// create a network
		var container = document.getElementById('mynetwork');
		var network = new vis.Network(container, data, options);	
	};
	reader.readAsText(input.files[0]);
};

var openDSL = function (event) {
	var input = event.srcElement.value;
	var dslLoader = new DSLLoader(input);
	var ast = dslLoader.load();
}

var parseDSL = function(event) {
	var input = $('#dsl_text')[0].value;
	var dslLoader = new DSLLoader(input);
	var ast = dslLoader.load();
	//console.log(ast.eval(fa_graph));
	
	/*var N = require('dsl/ast/EO_AST_Node').EO_AST_Node;
	var temp = new N();
	var a1 = [null, 1, 1,1,5,5];
	var a2 = ['c','a','b','d','x','y'];
	var res = temp.solveTies(a1, a2, [3,1,2,3,3,3], ['a','b','c','d','x','y']);
	console.log(a1);
	console.log(a2);*/
}