$(function(){

	var attachProjects = {

		init:function()
		{
			
			this.getArticles();
			this.cloud_infrastructure_list = new Array();
			this.cloud_application_list = new Array();
		},


		getArticles:function()
		{
			console.log("This is entering here");

			$.get("../json/projects.json",function(data){

				attachProjects.json_data = data;

			})
			.done(function(){
				console.log(attachProjects.json_data)
				attachProjects.filterArticles(attachProjects.json_data)
			})
			

			
			
		},

		filterArticles:function($json_data){
			$.each($json_data , function(index , json_object){

					//For each json object
					//check whether they belong to the cloud infrastructure or cloud application
					//add it to the corresponding list
					if(json_object["type"] == "cloud_infrastructure")
					{
						attachProjects.cloud_infrastructure_list.push({
							image:json_object["image"],
							title:json_object["title"],
							group:json_object["group"],
							description:json_object["description"],
							content:json_object["content"],
							mails:json_object["mails"]
						})//this is the end of the push method
					}

					else if(json_object["type"] == "cloud_application")
					{
						attachProjects.cloud_application_list.push({
							image:json_object["image"],
							title:json_object["title"],
							group:json_object["group"],
							description:json_object["description"],
							content:json_object["content"],
							mails:json_object["mails"]
						})//this is the end of the push method
					}

				})//end of the each method
				
			attachProjects.attachToTemplate();

		},

		attachToTemplate:function()
		{
			Handlebars.registerHelper('mail',function(){
				return new Handlebars.SafeString(
					"<tr><td>" + this.name + "</td><td><span class=icon-envelope></span>&nbsp;&nbsp;" + this.email_id + "</td></tr>"				
				);
			});
			var template_1 = Handlebars.compile($("#cloud_infrastructure_project_template").html());
			var container_1 = $(".cloud_infrastructure_projects");
			var template_2 = Handlebars.compile($("#cloud_application_project_template").html());
			var container_2 = $(".cloud_application_projects");
			container_1.append(template_1(attachProjects.cloud_infrastructure_list));
			container_2.append(template_2(attachProjects.cloud_application_list));
			console.log("Done attaching everything");
			handle_click_more();

		}

	};


	attachProjects.init();

})

var $buttons = $(".project_types").find("div");

$buttons.on("click",function(){

	var button_clicked = $(this);

	//fetches the corresponding divs
	var div_to_show = $("."+button_clicked.attr("class")+"_projects")

	//before this is shown the other div has to be hidden
	//this is done by selecting the sibling divs and then hiding it
	var $div_to_hide = div_to_show.siblings('div')[1]

	$($div_to_hide).slideUp(1000 , function(){
			
		div_to_show.slideToggle(1000)

	})
	//This shows the div we want

});
//end of the on click of the buttons


function handle_click_more(){
	console.log($("span.read_more"));
	$('span.read_more').on('click',function(){

		console.log("This is getting clicked");
		var $this = $(this);

		// get the div of the read more that is getting button_clicked
		//this is the div getting clicked
		var div_getting_clicked = $this.closest('div');

		//get all the siblings of the div that is getting clicked
		var siblings_div = div_getting_clicked.siblings('div');

		//get the individual project that is to be displayed
		content_to_be_displayed = div_getting_clicked.find(".individual_project")

		//div to append to
		var container = div_getting_clicked.parent('div');


		div_getting_clicked.slideUp(700, function(){


			if(siblings_div.length)
			{
				siblings_div.slideUp(700 , function(){

				
				container.append(content_to_be_displayed);
				content_to_be_displayed.slideDown();
				});	
			}

			else
			{
				container.append(content_to_be_displayed);
				content_to_be_displayed.slideDown();
			}	
			
		})
		//end of the div getting clicked slide up

		$(".icon-undo").on('click', function(){

			give_everything_back(content_to_be_displayed,div_getting_clicked,container)
		})





	})
	//end of the read more getting clicked



	function give_everything_back($content_to_be_displayed , $div_getting_clicked , $container)
	{
		console.log($content_to_be_displayed);
		console.log($div_getting_clicked);
		console.log($container);

		$content_to_be_displayed.appendTo($div_getting_clicked);
		$content_to_be_displayed.hide();
		$container.children("div").slideDown();
	}
}