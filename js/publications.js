(function(){
	$.get("../json/publications.json",function(data){
		console.log(typeof data)
		var template = Handlebars.compile($("#publication-template").html());
		$(".publication_wrapper").append(template(eval(data)))
		

	})

})();