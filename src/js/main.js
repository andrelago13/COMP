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
var steps;
var regex;
var errors;

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
	errors = [];
	console.log("PARSING " + dslInput);
	var dslLoader = new DSLLoader($('<div/>').html(dslInput).text());
	ast = dslLoader.load();
	if(ast == null) {
		console.error("No ast returned.");

		// Display inline errors
		var compensationOffset = 0;
		for (var i = 0; i < errors.length; i++) {
			var error = errors[i];
			oldVal = dslInput;
			var newVal = oldVal.substr(0, error.offendingSymbol.start + compensationOffset);
			newVal += '<span class="text-error">' + oldVal.substr(error.offendingSymbol.start + compensationOffset, error.offendingSymbol.stop+1 - error.offendingSymbol.start) + '</span>';
			newVal += oldVal.substring(error.offendingSymbol.stop+1 + compensationOffset);
			console.log(error.recognizer, error.offendingSymbol, error.line, error.column, error.msg, error.e);
			$("#dsl_text").html(newVal);
			var newEl = $('<div class="error" style="display: none;">Ln. ' + error.line + ' Col. ' + error.column + ': ' + error.msg + '</div>');
			$(".errors").append(newEl);
			newEl.show("normal");
		}
		errors = [];

		return;
	} else {
		$("#success").show("fast");
		$("#success").css('display', 'inline-block');
	}
	tryStartingConverter();
}	

var tryStartingConverter = function() {
	if (!fa || !ast) return;
	var converter = new Converter(fa, ast);
	var result = converter.convert();
	steps = result.steps;
	regex = result.regex;
	console.log(regex);

	currStep = 0;

	$("#resultsre").text("Regex: " + regex);
	displayStep(steps, currStep);
}

function displayStep(steps, currStep) {
	var options = {
			nodes:{
				color: 'grey',
				shadow: true
			}
	};
	var container = document.getElementById('mynetwork2');
	var network = new vis.Network(container, steps[currStep].fa, options);
	$('#steps').text(currStep + "/" + (steps.length - 1));	
	$('#explanation').text(steps[currStep].explanation);
}

$(document).ready(function() {	
	dslInput = $('#dsl_text').html();
	$("#next").click(function(e) {
		if(currStep < steps.length - 1) {
			currStep++;
			displayStep(steps, currStep);
		}
		return false;
	});

	$("#previous").click(function(e) {
		if(currStep > 0) {
			currStep--;
			displayStep(steps, currStep);
		}
		return false;
	});

	$('#dsl_text').focus(function (evt) {
		if (typeof dslInput === 'undefined') {
			dslInput = $(this).html();
			return;
		}
		$(this).html(dslInput);
	});

	$('#dsl_text').change(function (evt) {
		dslInput = $(this).html();
	});
	$('#dsl_text').on('input', (function (evt) {
		dslInput = $(this).html();
	}));

	$('#dslButton').click(function (evt) {
		$(".errors").empty();
		$("#success").hide();
		$('#dsl_text').html(dslInput);
		parseDSL(evt);
	});
});

function toggleState(state) {
	document.getElementById('about').style.display = 'none';
	document.getElementById('results').style.display = 'none';
	document.getElementById('dotFile').style.display = 'none';
	document.getElementById('parseDSL').style.display = 'none';
	document.getElementById('intro').style.display = 'none';

	switch (state) {
	case 0:
		document.getElementById('intro').style.display = 'block';
		break;
	case 1:
		document.getElementById('dotFile').style.display = 'block';
		break;
	case 2:
		document.getElementById('parseDSL').style.display = 'block';
		break;
	case 3:
		document.getElementById('results').style.display = 'block';
		break;
	case 4:
		document.getElementById('about').style.display = 'block';
		break;
	}
}