$(function(){
	var mapString = [];
	$("#mapSubmit").submit(function(e) {
		e.preventDefault();
		
		var file = document.getElementById("mapFile").files[0];

		readFile(file, function(evt) {	
			var mapString = evt.target.result;
			file2 = document.getElementById("parcelFile").files[0];
			readFile(file2, function(evt2) {	
				var parcelObj = $.parseJSON(evt2.target.result);




				// call algo after here
				var algoResult = optimizeDelivery(mapString, parcelObj);

				$("#inGuild").css("display", "block");
				$("#mapGuild").css("display", "block");
				$("#inText").text(JSON.stringify(parcelObj));
				$("#mapText").text(mapString);

				if (algoResult.error) {
					alert(JSON.stringify(algoResult.error));
				} else {
					$("#outGuild").css("display", "block");
					$("#outText").html(JSON.stringify(algoResult));

					// var sumObj = GetAuditFunction(algoResult);
					console.log(algoResult);

				}

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