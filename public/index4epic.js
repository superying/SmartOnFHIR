$(document).ready(function(){
	
	//smart on fhir authorization
	// get the URL parameters received from the authorization server
        //var serviceUri = getUrlParameter("fhirServiceUrl");  // session key
        //var patientId = getUrlParameter("patientId");    // authorization code
	//console.log(serviceUri);	
       
	var serviceUri = "https://open-ic.epic.com/FHIR/api/FHIR/DSTU2";
	var patientId;
 
	var url;
	
	//store the patient name and ids
	var patients = {
		"James Kirk": "ToHDIzZiIn5MNomO309q0f7TCmnOq6fbqOAWQHA1FRjkB",
		"Emily Williams": "TwncfOQytqCYtmJKvdpDOSU7U1upj6s9crg-PFHQgSO0B",
		"Jason Argonaut": "Tbt3KuCY0B5PSrJvCu2j-PlK.aiHsu2xUjUM8bWpetXoB",
		"Parfait Ragsdale": "Tj3ASWM6fYfjPJ8IMdK4vrLvyd8vR1crSY1EYPap14hMB",
		"George A. Eros": "TjCjF-tnRjUTB4LE.iDJUsNHYATLKtDUSAurMUsjaqIAB",
	};
	//store the information types
	var info_types = [
		"Patient",
		"MedicationOrder",
		"Immunization",
		"AllergyIntolerance"
	];
	
	
	//store user choice
	var data_type;
	var dtype;
	var all_datas;
	

  var currentData = [];

	 $('#download_button').on('click',function(){
		$('.submit_form').addClass('active');
		$('.modal-overlay').addClass('active');

		//console.log('submitted 0000000');
		$('#paraData').css("display","block");
		$('#collapse1').hide();
		$('#collapse2').hide();
		$('#collapse3').hide();
		$('#collapse4').hide();
	});


   $('.submit_form  #close').on('click',function(){
   		$('.submit_form').removeClass('active');
		$('.modal-overlay').removeClass('active');
		//console.log('submitted 111111');
   });

   //$("#download_button").on("click",function(){
   //   $("#pannel_body").text(currentData);
   //})

   $('#Submit').on('click',function(){
   		$('.submit_form').removeClass('active');
		$('.modal-overlay').removeClass('active');
		var select_info = $('#selectpicker').val();
		var input_info = $('#selectPatient').val();
		  
		data_type = select_info;
		patientId = patients[input_info];
        
		//console.log(select_info);
		//console.log(input_info);

        $('#pannel_head').text("Data information - " + "Data Type : " + select_info + " ; " 
        	+ "Patient ID : " + patientId);

        $('#pannel_head').append($("<button id= 'save' class='btn btn-success btn-xs'><span class ='glyphicon glyphicon-briefcase'></span> Save</button> "));
        //console.log("insert 2222222");

        $('#download_button').addClass("disabled");
        $('#blue').hide();
        $('#blue').removeClass('col-md-2');
        $('#progress').css("display","block");
        $('#progress').addClass('col-md-2');
		
		
		
		if(data_type == "All") {
			url = serviceUri + "/Patient/" + patientId;
			$.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                headers: {
					"Accept": "application/json+fhir",
                },
            }).done(function(pt){
				//$("#pannel_body").text("");
				//$("#pannel_body").append(
				//	"<div class='header'>Patient Information:</div><div><pre>" + JSON.stringify(pt, null, 4) + "</pre></div>");
				
				$('#paraData').hide();
				$("#collapse1").css("display","block");
				$("#colpre1").text(JSON.stringify(pt, null, 4));
				
				currentData.push(JSON.stringify(pt));
				
				
				url = serviceUri + "/MedicationOrder?patient=" + patientId;
				$.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                headers: {
					"Accept": "application/json+fhir",
                },
				}).done(function(pt){
					//$('#pannel_container').append($("<div class='panel-body' id='pannel_MedicationOrder'></div>"));
					//$("#pannel_MedicationOrder").append(
					//	"<div class='header'>MedicationOrder:</div><div><pre>" + JSON.stringify(pt, null, 4) + "</pre></div>");
					
					$("#collapse2").css("display","block");
				    $("#colpre2").text(JSON.stringify(pt, null, 4));
					
					currentData.push(JSON.stringify(pt));
					
					
					url = serviceUri + "/Immunization?patient=" + patientId;
					$.ajax({
					url: url,
					type: "GET",
					dataType: "json",
					headers: {
						"Accept": "application/json+fhir",
					},
					}).done(function(pt){
						//$('#pannel_container').append($("<div class='panel-body' id='pannel_Immunization'></div>"));
						//$("#pannel_Immunization").append(
						//	"<div class='header'>Immunization:</div><div><pre>" + JSON.stringify(pt, null, 4) + "</pre></div>");
						
						$("#collapse3").css("display","block");
				        $("#colpre3").text(JSON.stringify(pt, null, 4));
					
						
						currentData.push(JSON.stringify(pt));
					
					
						url = serviceUri + "/AllergyIntolerance?patient=" + patientId;
						$.ajax({
						url: url,
						type: "GET",
						dataType: "json",
						headers: {
							"Accept": "application/json+fhir",
						},
						}).done(function(pt){
							//$('#pannel_container').append($("<div class='panel-body' id='pannel_AllergyIntolerance'></div>"));
							//$("#pannel_AllergyIntolerance").append(
							//	"<div class='header'>AllergyIntolerance:</div><div><pre>" + JSON.stringify(pt, null, 4) + "</pre></div>");
							
							$("#collapse4").css("display","block");
				            $("#colpre4").text(JSON.stringify(pt, null, 4));
					
							
							currentData.push(JSON.stringify(pt));
							$('#download_button').removeClass("disabled");
							$('#progress').hide();
							$('#progress').removeClass('col-md-2');
							$('#blue').css("display","block");
							$('#blue').addClass('col-md-2');
						});
					});
				});
            });
		} else {
		    
		    var colnum;
		    var clnpre;
		
			if(data_type == "Patient") {
				url = serviceUri + "/Patient/" + patientId;
				colnum = "#collapse1";
				clnpre = "#colpre1";
			} else if(data_type == "MedicationOrder"){
				url = serviceUri + "/" + data_type + "?patient=" + patientId;
				colnum = "#collapse2";
				clnpre = "#colpre2";
			} else if(data_type == "Immunization"){
				url = serviceUri + "/" + data_type + "?patient=" + patientId;
				colnum = "#collapse3";
				clnpre = "#colpre3";
			} else if(data_type == "AllergyIntolerance"){
				url = serviceUri + "/" + data_type + "?patient=" + patientId;
				colnum = "#collapse4";
				clnpre = "#colpre4";
			}	
		
            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                headers: {
					"Accept": "application/json+fhir",
                },
            }).done(function(pt){
				//$("#pannel_body").text("");
				//$("#pannel_body").append(
				//	"<div class='header'>Patient Information:</div><div><pre>" + JSON.stringify(pt, null, 4) + "</pre></div>");
				
				$('#paraData').hide();
				$(colnum).css("display","block");
				$(clnpre).text(JSON.stringify(pt, null, 4));
				
				//for test demo, add patientID information to table
				var fname = pt.name[0].given[0];
				var lname = pt.name[0].family[0];
				var birth = pt.birthDate;
				$('#tb1').append('<table><tr><th>Given Name</th><th>Family Name</th><th>BirthDate</th></tr><tr><td>'+ fname +'</td><td>' + lname + '</td><td>' + birth + '</td></tr></table>');
				
				currentData.push(JSON.stringify(pt));
				$('#download_button').removeClass("disabled");
				$('#progress').hide();
				$('#progress').removeClass('col-md-2');
				$('#blue').css("display","block");
				$('#blue').addClass('col-md-2');
            });
		}
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









// Convenience function for parsing of URL parameters
        // based on http://www.jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html
        function getUrlParameter(sParam)
        {
            var sPageURL = window.location.search.substring(1);
            var sURLVariables = sPageURL.split('&');
            for (var i = 0; i < sURLVariables.length; i++) 
            {
                var sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] == sParam) {
                    var res = sParameterName[1].replace(/\+/g, '%20');
                    return decodeURIComponent(res);
                }
            }
        }

});

