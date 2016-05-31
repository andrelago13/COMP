$( document ).ready(function() {
	$("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
	
	$("#menu-toggle2").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
	
	$("#menu-toggle3").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
	
	$("#menu-toggle4").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
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