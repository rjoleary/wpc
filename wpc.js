$(function(){
	var mapString = [];
	$("#mapSubmit").submit(function(e) {
		e.preventDefault();
		
		var file = document.getElementById("mapFile").files[0];

		readFile(file, function(evt) {	
			var mapString = evt.target.result;
			file2 = document.getElementById("parcelFile").files[0];
			readFile(file2, function(evt2) {	
				var parcelFile = evt2.target.result;
				var obj = $.parseJSON(parcelFile);




				// call function after here


				// console.log(mapString);
				// console.log(obj);


				// Assume in here, algo is done
				


			});
		});
	});

});

function readFile(file, onLoadCallback){
    var reader = new FileReader();
    reader.onload = onLoadCallback;
    reader.readAsText(file, "utf-8");
}