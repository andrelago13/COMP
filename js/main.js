$( document ).ready(function() {

});

var openFile = function (event) {
	var input = event.target;

	var reader = new FileReader();
	reader.onload = function(){
		var text = reader.result;

		var faLoader = new FALoader(text);
		var data = faLoader.load();

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