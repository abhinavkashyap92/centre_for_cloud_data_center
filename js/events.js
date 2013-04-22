(function(){
	$.get('../json/events_gallery.json',function(data){
				var template = Handlebars.compile($("#template").html())
				$(".gallery-container ul").append(template(eval(data)))
				// console.log(template(data))
	}).done(function(){

		$(".gallery-container ul li").on('click',function(event){

			$(".event_details_container").slideUp(100)
			build_details_div($(this).find("#event-name").html()+".json")
			$(".event_details_container").slideDown(50,function(){
				$('html,body').animate({
           		 scrollTop: $(".event_details_container").offset().top},
            	'slow');
			})
			
		})
		
	})
	

	function build_details_div(json_file_name)
	{	
		$.get("../json/"+json_file_name,function(data){
			
			if($(".event_details_container").find(".event-contents"))
			{
				$(".event-contents").remove()
				// console.log($(".event-contents"))	
			}
			var template = Handlebars.compile($("#template-event").html())
			$(".event_details_container").append(template(eval(data)))
			
		}).done(function(){
			$(".photo-collection").orbit({fluid: true,advanceSpeed:"3000"})
			// $(".orbit").css({"height":"300px","width":"60%"})
			// console.log($(".orbit"))
			
		})
	}
	Handlebars.registerHelper('photo', function() {
		return new Handlebars.SafeString(this);
	})
	Handlebars.registerHelper('guest', function() {
		return new Handlebars.SafeString(this);
	})
})();