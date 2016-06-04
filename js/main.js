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
	require('dsl/CustomErrorListener');
	require('js/Stack');
});

var fa;
var ast;
var stepsNumber;
var currStep = 0;

var openFile = function (event) {
	var input = event.target;

	var reader = new FileReader();
	reader.onload = function(){
		var text = reader.result;

		var faLoader = new FALoader(text);
		fa = faLoader.load();
		tryStartingConverter();

		// you can extend the options like a normal JSON variable:
		var options = {
				nodes:{
					color: 'grey',
					shadow: true
				}
		}
		// create a network
		var container = document.getElementById('mynetwork');
		var network = new vis.Network(container, fa, options);
	};
	reader.readAsText(input.files[0]);
};

var openDSL = function (event) {
	var input = event.srcElement.value;
	var dslLoader = new DSLLoader(input);
	ast = dslLoader.load();
	tryStartingConverter();
}

var parseDSL = function(event) {
	var input = $('#dsl_text')[0].value;
	var dslLoader = new DSLLoader(input);
	ast = dslLoader.load();
	if(ast == null) {
		console.error("No ast returned.");
		return;
	}
	tryStartingConverter();
	console.log(ast.eval(fa));
}	

var tryStartingConverter = function() {
	if (!fa || !ast) return;
	var converter = new Converter(fa, ast);
	var result = converter.convert();
	var steps = result.steps;
	var regex = result.regex;
	console.log(regex);
	stepsNumber = steps.length;
	
	// you can extend the options like a normal JSON variable:
	var options = {
			nodes:{
				color: 'grey',
				shadow: true
			}
	}
	
	
	$(document).ready(function() {	
		$("#resultsre").text("Regex: " + regex);
		$("#resultsre").css("font-weight", "bold");
		
		$("#stepbystep").click(function(e) {
			e.preventDefault();
			$("#previous").css("display", "inline");
			$("#next").css("display", "inline");
			$("#stepbystep").hide();
			$("#final").hide();
			
			fa = steps[currStep].fa;
			
			// create a network
			var container = document.getElementById('mynetwork2');
			var network = new vis.Network(container, fa, options);
		
			$('#steps').text(currStep + "/" + (stepsNumber - 1));	
		});
		
		$("#final").click(function(e) {
			e.preventDefault();
			$("#next").hide();
			$("#previous").hide();
			
			// Final fa
			fa = steps[steps.length - 1];
			
			// create a network
			var container = document.getElementById('mynetwork2');
			var network = new vis.Network(container, fa, options);
		});
		
		$("#next").click(function(e) {
			e.preventDefault();
			
			if(currStep < stepsNumber - 1)
			{
				currStep++;
				
				// Current fa
				fa = steps[currStep].fa;
			
				// create a network
				var container = document.getElementById('mynetwork2');
				var network = new vis.Network(container, fa, options);
			}
			
			$('#steps').text(currStep + "/" + (stepsNumber - 1));	
		});
		
		$("#previous").click(function(e) {
			e.preventDefault();
			
			if(currStep > 0)
			{
				// Current fa
				fa = steps[currStep-1].fa;
			
				// create a network
				var container = document.getElementById('mynetwork2');
				var network = new vis.Network(container, fa, options);
				currStep--;
			}
			
			$('#steps').text(currStep + "/" + (stepsNumber - 1));	
		});
});
}