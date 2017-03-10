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
	setTimeout(function(){
		$(".homeTitle").animate({
			fontSize: "65px",
			color: "rgb(80,81,96)",
			backgroundColor: "rgba(0,0,0,0)",
			marginTop: 0,
			paddingTop: 0
		}, 2000);
	}, 1000);

	$("#homeDown").on("click", function(){
		$("#info").animatescroll();
	})

	$(".homeDown").mouseenter(function(){
		$(this).animate({
			color: "black",
			borderColor: "rgba(0,0,0,0)",
			backgroundColor: "white"
		}, 500);
	}).mouseout(function(){
		$(this).animate({
			color: "white",
			borderColor: "white",
			backgroundColor: "rgba(0,0,0,0)"
		}, 500);
	})

	$("#profileDown").on("click", function(){
		$("#info").animatescroll({scrollSpeed: 1000});
	})
	
	$(".profileDown").mouseenter(function(){
		$(this).animate({
			color: "#c9c9c9",
			borderColor: "#c9c9c9",
			backgroundColor: "#505160"
		}, 500);
	}).mouseout(function(){
		$(this).animate({
			color: "#505160",
			borderColor: "#505160",
			backgroundColor: "#c9c9c9"
		}, 500);
	})
	
});