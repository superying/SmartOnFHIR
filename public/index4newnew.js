$(document).ready(function(){

  var currentData = [{"name":"hahahahahahah"},{"name":"xixixixixixixix"},{"name": "hehehehhehehehehhehehe"}];

	 $('#download_button').on('click',function(){
		$('.submit_form').addClass('active');
		$('.modal-overlay').addClass('active');

		console.log('submitted 0000000');
	});


   $('.submit_form  #close').on('click',function(){
   		$('.submit_form').removeClass('active');
		$('.modal-overlay').removeClass('active');
		console.log('submitted 111111');
   });

   $("#download_button").on("click",function(){
      $("#pannel_body").text(currentData);
   })

   $('#Submit').on('click',function(){
   		$('.submit_form').removeClass('active');
		  $('.modal-overlay').removeClass('active');
		  var select_info = $('#selectpicker').val();
		  var input_info = $('#input_id').val();
        
		console.log(select_info);
		console.log(input_info);

        $('#pannel_head').text("Data information - " + "Data Type : " + select_info + " ; " 
        	+ "Patient ID : " + input_info);

        $('#pannel_head').append($("<button id= 'save' class='btn btn-success btn-xs'><span class ='glyphicon glyphicon-briefcase'></span> Save</button> "));
        console.log("insert 2222222");

        $('#download_button').addClass("disabled");
        $('#blue').hide();
        $('#blue').removeClass('col-md-2');
        $('#progress').css("display","block");
        $('#progress').addClass('col-md-2');
   });






$("#pannel_head").on('click','#save',function(){
	console.log("button worked.");
	$.ajax
	({
		type: "POST",
		url: "http://52.54.75.123/", 
		contentType: "application/json",
		dataType: "json",
		data:JSON.stringify({'myArray' : currentData})
	}).done(function ( data ) {
		console.log("ajax callback response:"+JSON.stringify(data));
	}).fail(function(err) {
		console.log("ajax fail: " + err.status);
	});
});









});

