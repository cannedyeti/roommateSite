$(function(){
	console.log("shit linked");
	$(".delete-int").on("click", function(e) {
		e.preventDefault();
		var intElement = $(this);
		var intURL = intElement.attr("href");
		$.ajax({
			method: "DELETE",
			url: intURL
		}).done(function(data){
			intElement.remove();
			window.location = '/profile';
		});
	});
});