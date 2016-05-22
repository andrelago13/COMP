$( document ).ready(function() {
	require('dsl/ast/EO_AST');
	require('dsl/ast/EO_AST_Node');
	require('dsl/ast/EO_AST_NodeManual');
	require('dsl/ast/EO_AST_NodeAuto');
	require('dsl/ast/EO_AST_NodeE');
	require('dsl/ast/EO_AST_NodeE1');
	require('dsl/EliminationOrderParser');
	require('dsl/ast/EO_AST_NodeV');
	require('dsl/ast/EO_AST_NodeLoop');
	require('dsl/ast/EO_AST_NodeF');
	require('dsl/ast/EO_AST_NodeT');
	require('dsl/ast/EO_AST_NodeT1');
	require('dsl/EliminationOrderLexer');
	require('dsl/CustomListener');
	require('js/Stack');
});

var openFile = function (event) {
	var input = event.target;

	var reader = new FileReader();
	reader.onload = function(){
		var text = reader.result;

		var faLoader = new FALoader(text);
		var fa = faLoader.load();
		var converter = new Converter(fa, null);
		var data = converter.convert();

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
}