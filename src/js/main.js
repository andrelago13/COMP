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

/**
 * This module initializes the page and performs the on-page actions,
 * then calling the rest of the API to perform the intended actions.
 * Please consult the documentation of the methods in this file for more details
 * 
 * @module Main
 */

var fa = null;
var ast = null;
var stepsNumber;
var currStep = 0;
var steps;
var regex;
/*
 * This global variable is used by the API to place errors. It makes them easier to reach and track.
 */
var errors;

/*
 * Initializes the page, setting the click listeners for the buttons,
 * and the listeners for changes in the DSL input text
 */
var initPage = function() {
	
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

	$("#results_available").css("display", "none");
}

/*
 * Open the automata's dot file, performing required validations
 */
var openAutomata = function (event) {
	$("#results_available").css("display", "none");
	$("#results_unavailable").css("display", "block");
	$("#error_dot").css("display", "block");

	fa = null;

	var input = event.target;

	var reader = new FileReader();
	// Action performed when the automata loads
	reader.onload = function(){
		var text = reader.result;

		// Use FALoader to load the automata
		var faLoader = new FALoader(text);
		fa = faLoader.load();
		tryStartingConverter();

		var options = {
				nodes:{
					color: 'grey',
					shadow: true
				}
		}
		// create a network to visualize in the page with "vis"
		var container = document.getElementById('mynetwork');
		var network = new vis.Network(container, fa, options);

		$("#error_dot").css("display", "none");
		if(ast !== null) {
			$("#error_dsl").css("display", "none");
			$("#results_available").css("display", "block");
			$("#results_unavailable").css("display", "none");
		}
	};
	reader.readAsText(input.files[0]);
};

/*
 * Read and validate the DSL expression
 */
var parseDSL = function(event) {
	$("#results_available").css("display", "none");
	$("#results_unavailable").css("display", "block");
	$("#error_dsl").css("display", "block");
	ast = null;

	errors = [];
	console.log("PARSING " + $('<div/>').html(dslInput).text());
	var dslLoader = new DSLLoader($('<div/>').html(dslInput).text());
	
	// Load the DSL expression using DSLLoader, returning the ast
	ast = dslLoader.load();
	// If parsing the DSL expression resulted in errors, they will be in the "errors" array
	if (errors.length > 0) ast = null;
	if(ast == null) {
		console.error("No ast returned.");

		// Display errors in a user friendly way
		displayErrors();
		errors = [];

		return;
	} else {
		$("#success").show("fast");
		$("#success").css('display', 'inline-block');
	}
	errors = [];
	tryStartingConverter();
	displayErrors();

	if(errors.length == 0 && ast != null) {
		$("#error_dsl").css("display", "none");
		if(fa != null) {
			$("#error_dot").css("display", "none");
			$("#results_available").css("display", "block");
			$("#results_unavailable").css("display", "none");
		}
	}

	errors = [];
}

/*
 * Display errors found in the DSL in a user-friendly and understandable way
 */
var displayErrors = function() {
	var compensationOffset = 0;
	for (var i = 0; i < errors.length; i++) {
		var error = errors[i];

		// Display inline error for the first one only
		if (i == 0) {
			oldVal = dslInput;
			var newVal = oldVal.substr(0, error.offendingSymbol.start + compensationOffset);
			var erroredText = oldVal.substr(error.offendingSymbol.start + compensationOffset, error.offendingSymbol.stop+1 - error.offendingSymbol.start);
			newVal += '<span class="text-error">' + erroredText + '</span>';
			newVal += oldVal.substring(error.offendingSymbol.stop+1 + compensationOffset);
			compensationOffset += newVal.length - erroredText.length;
			console.log(error.recognizer, error.offendingSymbol, error.line, error.column, error.msg, error.e);
			$("#dsl_text").html(newVal);
		}

		var newEl;
		if (typeof error.line !== 'undefined' && typeof error.column !== 'undefined')
			newEl = $('<div class="error" style="display: none;">Ln. ' + error.line + ' Col. ' + error.column + ': ' + error.msg + '</div>');
		else
			newEl = $('<div class="error" style="display: none;">' + error.msg + '</div>');
		$(".errors").append(newEl);
		newEl.show("normal");
	}
}

/*
 * Tries to start the FA to RE converter. This is only done if there is a parsed AST and an automata, and if there are no errors.
 * If both conditions check, then everything is ready to start the conversion
 */
var tryStartingConverter = function() {
	if (!fa || !ast) return;
	var converter = new Converter(fa, ast);
	// The converter returns all the steps of the conversion, so that we can understand how states were eliminated from the automata
	var result = converter.convert();
	steps = result.steps;
	regex = result.regex;
	console.log(regex);

	currStep = 0;

	$("#resultsre").text("Regex: " + regex);
	$("#resultsNumSymbols").text("Number of Symbols: " + calculateWeight(regex, Metrics.numSymbols));
	$("#resultsLength").text("Length: " + calculateWeight(regex, Metrics.length));
	displayStep(steps, currStep);
}

/*
 * Display a specific step of the elimination steps of removing states from the automata
 */
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

/*
 * Switch to a state (section) of the page
 */
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

$(document).ready(initPage);
