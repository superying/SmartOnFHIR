$(document).ready(function(){
	
	$('[data-toggle="tooltip"]').tooltip();//bootstrap mouse hover tool
	
	//smart on fhir authorization
	// get the URL parameters received from the authorization server
        var state = getUrlParameter("state");  // session key
        var code = getUrlParameter("code");    // authorization code
        
        // load the app parameters stored in the session
        var params = JSON.parse(sessionStorage[state]);  // load app session
        var tokenUri = params.tokenUri;
        var clientId = params.clientId;
        var secret = params.secret;
        var serviceUri = params.serviceUri;
        var redirectUri = params.redirectUri;
		
		//for epic non-auth test
		var epicUri = "https://open-ic.epic.com/FHIR/api/FHIR/DSTU2";
		//var epicID = "ToHDIzZiIn5MNomO309q0f7TCmnOq6fbqOAWQHA1FRjkB";
		var epicID = "Tbt3KuCY0B5PSrJvCu2j-PlK.aiHsu2xUjUM8bWpetXoB";
		
		
	var accessToken;
        var patientId;
        
        
		
	var url;
	
	// Prep the token exchange call parameters
        var data = {
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: redirectUri
        };
        var options;
        if (!secret) {
            data['client_id'] = clientId;
        }
        options = {
            url: tokenUri,
            type: 'POST',
            data: data
        };
        if (secret) {
            options['headers'] = {'Authorization': 'Basic ' + btoa(clientId + ':' + secret)};
        }
        
        // obtain authorization token from the authorization service using the authorization code
        $.ajax(options).done(function(res){
            // should get back the access token and the patient ID
            accessToken = res.access_token;
            patientId = res.patient;
		});
	
	
	//store the patient name and ids
	var patients = {
		"SMART, Wilma": 4342008,
		"SMART, Nancy": 4342009,
		"SMART, Joe": 4342010,
		"SMART, Hailey": 4342011,
		"SMART, Timmy": 4342012,
		"SMART, FRED RICK": 4478007,
		"PETERS, TIMOTHY": 1316024,
		"Test Robot": 4342008,//add for epic non-auth test
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
		$('#paraData2').css("display","block");
		$('#paraData3').css("display","block");
		$('#collapse1').hide();
		$('#collapse2').hide();
		$('#collapse3').hide();
		$('#collapse4').hide();
		$('#collapse5').hide();
		$('#collapse6').hide();
		$('#collapse7').hide();
		$('#collapse8').hide();
		$('#collapse9').hide();
		$('#collapse10').hide();
		$('#collapse11').hide();
		$('#collapse12').hide();
		
		$('#collapse21').hide();
		$('#collapse22').hide();
		$('#collapse23').hide();
		$('#collapse24').hide();
		$('#collapse25').hide();
		$('#collapse26').hide();
		$('#collapse27').hide();
		
		$('#collapse31').hide();
		$('#collapse32').hide();
		$('#collapse33').hide();
		$('#collapse34').hide();
		$('#collapse35').hide();
		$('#collapse36').hide();
		$('#collapse37').hide();
		
		$("#colpre1").empty();
		$("#colpre2").empty();
		$("#colpre3").empty();
		$("#colpre4").empty();
		$("#colpre5").empty();
		$("#colpre6").empty();
		$("#colpre7").empty();
		
		$("#colpre21").empty();
		$("#colpre22").empty();
		$("#colpre23").empty();
		$("#colpre24").empty();
		$("#colpre25").empty();
		$("#colpre26").empty();
		$("#colpre27").empty();
		
		$("#colpre31").empty();
		$("#colpre32").empty();
		$("#colpre33").empty();
		$("#colpre34").empty();
		$("#colpre35").empty();
		$("#colpre36").empty();
		$("#colpre37").empty();

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
		//patientId = patients[input_info];
		
		
		patientId = 4342008;
		
		if(input_info == '002') {
		    patientId = 4342009;
		    //epicID = "ToHDIzZiIn5MNomO309q0f7TCmnOq6fbqOAWQHA1FRjkB";
		}
		
        
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
		$('#blue2').hide();
        $('#blue2').removeClass('col-md-2');
		$('#progress2').css("display","block");
        $('#progress2').addClass('col-md-2');
		
		
		//add epic non-auth test
		//if(input_info == "Test Robot") {
		if(input_info == '001') {
		    if(data_type == "All"){
		    	var data1;
                var data2;
                var tmp1;
                var tmp2;
		    
                url = serviceUri + "/Patient/" + patientId;
                $.ajax({
                    url: url,
                    type: "GET",
                    dataType: "json",
                    headers: {
                        "Accept": "application/json+fhir",
                        "Authorization": "Bearer " + accessToken
                    },
                }).done(function(pt){
                    $("#paraData").hide();
					$("#collapse1").css("display","block");
					data1 = JSON.parse(JSON.stringify(pt));
						
					$("#colpre1").append("<div class='row'><div class = 'col-md-3'><img src='./face1.jpg' /></div></div><br><div>" + data1.text.div + "</div>");
					
					
                    url = epicUri + "/Patient/" + epicID;
                    $.ajax({
                        url: url,
                        type: "GET",
                        dataType: "json",
                        headers: {
                            "Accept": "application/json+fhir",
                        },
                    }).done(function(pt){
						$("#paraData2").hide();
						$("#collapse21").css("display","block");
						
						data2 = JSON.parse(JSON.stringify(pt));
						
						var tmp = "<div><p><b>Name: </b>" + data2.name[0].given[0] + " " + data2.name[0].family[0];
						tmp = tmp + "<br>" + "<b>Gender: </b>" + data2.gender;
						tmp = tmp + "<br>" + "<b>BirthDate: </b>" + data2.birthDate;
						tmp = tmp + "</p></div>";
						
						$("#colpre21").append("<div class='row'><div class = 'col-md-3'><img src='./face2.jpg' /></div></div><br>" + tmp);
						
						
						
						$("#paraData3").hide();
						$("#collapse31").css("display","block");
						$("#colpre31").append("<div class='row'><div class = 'col-md-3'><img src='./face1.jpg' /></div><div class = 'col-md-3 col-md-offset-2'><img src='./face2.jpg' /></div></div><br><div>" + data1.text.div + "</div>");
						
						
                        
                        
                        url = serviceUri + "/MedicationOrder?patient=" + patientId;
                        $.ajax({
                            url: url,
                            type: "GET",
                            dataType: "json",
                            headers: {
                                "Accept": "application/json+fhir",
                                "Authorization": "Bearer " + accessToken
                            },
                        }).done(function(pt){

							$("#collapse2").css("display","block");
							data1 = JSON.parse(JSON.stringify(pt));
						
							tmp1 = "";
							
							data1.entry.sort(function(a,b) { 
								if(b.resource.dateWritten && a.resource.dateWritten) {
									return new Date(b.resource.dateWritten).getTime() - new Date(a.resource.dateWritten).getTime();
								} else if (a.resource.dateWritten) {
									return -1;
								} else {
									return 1;
								}
							});
							
						
							var len = data1.entry.length;
							for(var i=0; i<len; i++) {
								tmp1 = tmp1 + "<p><b>Date: </b>" + data1.entry[i].resource.dateWritten + "<br>";
								tmp1 = tmp1 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data1.entry[i].resource.medicationCodeableConcept.text + "</a>";
								tmp1 = tmp1 + "<br>" + "<b>Dosage Instructions: </b>" + data1.entry[i].resource.dosageInstruction[0].text;
								tmp1 = tmp1 + "<br></p>";	
							}
						
							$("#colpre2").append(tmp1);
                            
                            
                            url = epicUri + "/MedicationOrder?patient=" + epicID;
                            $.ajax({
                                url: url,
                                type: "GET",
                                dataType: "json",
                                headers: {
                                    "Accept": "application/json+fhir",
                                },
                            }).done(function(pt){
                                $("#collapse22").css("display","block");
							
								data2 = JSON.parse(JSON.stringify(pt));
							
								tmp2 = "";
								
								data2.entry.sort(function(a,b) { 
									if(b.resource.dateWritten && a.resource.dateWritten) {
										return new Date(b.resource.dateWritten).getTime() - new Date(a.resource.dateWritten).getTime();
									} else if (a.resource.dateWritten) {
										return -1;
									} else {
										return 1;
									}
								});
							
								var len = data2.entry.length;
								for(var i=0; i<len; i++) {
									tmp2 = tmp2 + "<p><b>Date: </b>" + data2.entry[i].resource.dateWritten + "<br>";
									tmp2 = tmp2 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data2.entry[i].resource.medicationReference.display + "</a>";
									tmp2 = tmp2 + "<br>" + "<b>Dosage Instructions: </b>" + data2.entry[i].resource.dosageInstruction[0].text;
									tmp2 = tmp2 + "<br></p>";				
								}
							
								$("#colpre22").append(tmp2);
							

								$("#collapse32").css("display","block");
								
								
								
								var tmp3="";
							
								var len1=0;
								var len2=0;
								
								while(len1<data1.entry.length && len2<data2.entry.length) {
									if(data1.entry[len1].resource.dateWritten && data2.entry[len2].resource.dateWritten) {
										if(new Date(data1.entry[len1].resource.dateWritten).getTime() - new Date(data2.entry[len2].resource.dateWritten).getTime() < 0) {
											tmp3 = tmp3 + "<div style='color:#0000FF'>";
											tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.dateWritten + "<br>";
											tmp3 = tmp3 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data2.entry[len2].resource.medicationReference.display + "</a>";
											tmp3 = tmp3 + "<br>" + "<b>Dosage Instructions: </b>" + data2.entry[len2].resource.dosageInstruction[0].text;
											tmp3 = tmp3 + "<br></p></div>";
											len2++;
										} else {
											tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.dateWritten + "<br>";
											tmp3 = tmp3 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data1.entry[len1].resource.medicationCodeableConcept.text + "</a>";
											tmp3 = tmp3 + "<br>" + "<b>Dosage Instructions: </b>" + data1.entry[len1].resource.dosageInstruction[0].text;
											tmp3 = tmp3 + "<br></p>";
											len1++;
										}
									} else if(data1.entry[len1].resource.dateWritten) {
										tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.dateWritten + "<br>";
										tmp3 = tmp3 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data1.entry[len1].resource.medicationCodeableConcept.text + "</a>";
										tmp3 = tmp3 + "<br>" + "<b>Dosage Instructions: </b>" + data1.entry[len1].resource.dosageInstruction[0].text;
										tmp3 = tmp3 + "<br></p>";
										len1++;
									} else {
										tmp3 = tmp3 + "<div style='color:#0000FF'>";
										tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.dateWritten + "<br>";
										tmp3 = tmp3 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data2.entry[len2].resource.medicationReference.display + "</a>";
										tmp3 = tmp3 + "<br>" + "<b>Dosage Instructions: </b>" + data2.entry[len2].resource.dosageInstruction[0].text;
										tmp3 = tmp3 + "<br></p></div>";
										len2++;
									}
								}
								
								while(len1<data1.entry.length) {
									tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.dateWritten + "<br>";
									tmp3 = tmp3 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data1.entry[len1].resource.medicationCodeableConcept.text + "</a>";
									tmp3 = tmp3 + "<br>" + "<b>Dosage Instructions: </b>" + data1.entry[len1].resource.dosageInstruction[0].text;
									tmp3 = tmp3 + "<br></p>";
									len1++;
								}
								
								while(len2<data2.entry.length) {
									tmp3 = tmp3 + "<div style='color:#0000FF'>";
									tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.dateWritten + "<br>";
									tmp3 = tmp3 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data2.entry[len2].resource.medicationReference.display + "</a>";
									tmp3 = tmp3 + "<br>" + "<b>Dosage Instructions: </b>" + data2.entry[len2].resource.dosageInstruction[0].text;
									tmp3 = tmp3 + "<br></p></div>";
									len2++;
								}
								
								$("#colpre32").append(tmp3);
                                
                                
                                
                                url = serviceUri + "/Immunization?patient=" + 4342009;
                                $.ajax({
                                    url: url,
                                    type: "GET",
                                    dataType: "json",
                                    headers: {
                                        "Accept": "application/json+fhir",
                                        "Authorization": "Bearer " + accessToken
                                    },
                                }).done(function(pt){
									$("#collapse3").css("display","block");
									data1 = JSON.parse(JSON.stringify(pt));
						
									tmp1 = "";
									
									data1.entry.sort(function(a,b) { 
										return new Date(b.resource.date).getTime() - new Date(a.resource.date).getTime() 
									});
						
									var len = data1.entry.length;
									for(var i=0; i<len; i++) {
										if(data1.entry[i].resource.resourceType == "Immunization") {
											tmp1 = tmp1 + "<p><b>Date: </b>" + data1.entry[i].resource.date + "<br>";
											tmp1 = tmp1 + "<b>Vaccine Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data1.entry[i].resource.vaccineCode.text + "</a>";
											tmp1 = tmp1 + "<br></p>";
										}					
									}
						
									$("#colpre3").append(tmp1);
                            
                                    url = epicUri + "/Immunization?patient=" + epicID;
                                    $.ajax({
                                        url: url,
                                        type: "GET",
                                        dataType: "json",
                                        headers: {
                                            "Accept": "application/json+fhir",
                                        },
                                    }).done(function(pt){
										$("#collapse23").css("display","block");

										data2 = JSON.parse(JSON.stringify(pt));
							
										tmp2 = "";
										
										data2.entry.sort(function(a,b) { 
											return new Date(b.resource.date).getTime() - new Date(a.resource.date).getTime() 
										});
							
										var len = data2.entry.length;
							
										for(var i=0; i<len; i++) {
											if(data2.entry[i].resource.resourceType == "Immunization") {
												tmp2 = tmp2 + "<p><b>Date: </b>" + data2.entry[i].resource.date + "<br>";
												tmp2 = tmp2 + "<b>Vaccine Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data2.entry[i].resource.vaccineCode.text + "</a>";
												tmp2 = tmp2 + "<br></p>";
											}
										}
							
										$("#colpre23").append(tmp2);
							
							
										$("#collapse33").css("display","block");
										
										var tmp3="";
							
										var len1=0;
										var len2=0;
										
										while(len1<data1.entry.length && len2<data2.entry.length) {
											if(new Date(data1.entry[len1].resource.date).getTime() - new Date(data2.entry[len2].resource.date).getTime() < 0) {
												if(data2.entry[len2].resource.resourceType == "Immunization") {
													tmp3 = tmp3 + "<div style='color:#0000FF'>";
													tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.date + "<br>";
												tmp3 = tmp3 + "<b>Vaccine Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data2.entry[len2].resource.vaccineCode.text + "</a>";
													tmp3 = tmp3 + "<br></p></div>";
												}
												len2++;
											} else {
												if(data1.entry[len1].resource.resourceType == "Immunization") {
													tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.date + "<br>";
													tmp3 = tmp3 + "<b>Vaccine Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data1.entry[len1].resource.vaccineCode.text + "</a>";
													tmp3 = tmp3 + "<br></p>";
												}
												len1++;
											}
										}
										
										while(len1<data1.entry.length) {
											if(data1.entry[len1].resource.resourceType == "Immunization") {
												tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.date + "<br>";
												tmp3 = tmp3 + "<b>Vaccine Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data1.entry[len1].resource.vaccineCode.text + "</a>";
												tmp3 = tmp3 + "<br></p>";
											}
											len1++;
										}
										
										while(len2<data2.entry.length) {
											if(data2.entry[len2].resource.resourceType == "Immunization") {
												tmp3 = tmp3 + "<div style='color:#0000FF'>";
												tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.date + "<br>";
												tmp3 = tmp3 + "<b>Vaccine Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data2.entry[len2].resource.vaccineCode.text + "</a>";
												tmp3 = tmp3 + "<br></p></div>";
											}
											len2++;
										}
										
										
                    					$("#colpre33").append(tmp3);
                                
                                
                                
                                
                                
                                        url = serviceUri + "/AllergyIntolerance?patient=" + patientId;
                                        $.ajax({
                                            url: url,
                                            type: "GET",
                                            dataType: "json",
                                            headers: {
                                                "Accept": "application/json+fhir",
                                                "Authorization": "Bearer " + accessToken
                                            },
                                        }).done(function(pt){
											$("#collapse4").css("display","block");
											data1 = JSON.parse(JSON.stringify(pt));
						
											tmp1 = "";
											
											data1.entry.sort(function(a,b) { 
												return new Date(b.resource.recordedDate).getTime() - new Date(a.resource.recordedDate).getTime() 
											});
						
											var len = data1.entry.length;
											for(var i=0; i<len; i++) {
												tmp1 = tmp1 + "<p><b>Date: </b>" + data1.entry[i].resource.recordedDate + "<br>";
												tmp1 = tmp1 + "<b>Substance: </b>" + data1.entry[i].resource.substance.text + "<br>";
												if(data1.entry[i].resource.reaction) {
													tmp1 = tmp1 + "<b>Reaction: </b>" + data1.entry[i].resource.reaction[0].manifestation[0].text;
												}
												tmp1 = tmp1 + "<br></p>";
											}
						
											$("#colpre4").append(tmp1);
                    
                            
                                            url = epicUri + "/AllergyIntolerance?patient=" + epicID;
                                            $.ajax({
                                                url: url,
                                                type: "GET",
                                                dataType: "json",
                                                headers: {
                                                    "Accept": "application/json+fhir",
                                                },
                                            }).done(function(pt){
												$("#collapse24").css("display","block");
									
							
												data2 = JSON.parse(JSON.stringify(pt));
							
												tmp2 = "";
												
												data2.entry.sort(function(a,b) { 
													return new Date(b.resource.recordedDate).getTime() - new Date(a.resource.recordedDate).getTime() 
												});
							
												var len = data2.entry.length;
							
												for(var i=0; i<len; i++) {
													tmp2 = tmp2 + "<p><b>Date: </b>" + data2.entry[i].resource.recordedDate + "<br>";
													tmp2 = tmp2 + "<b>Substance: </b>" + data2.entry[i].resource.substance.text + "<br>";
													tmp2 = tmp2 + "<b>Reaction: </b>" + data2.entry[i].resource.reaction[0].manifestation[0].text;
													tmp2 = tmp2 + "<br></p>";
												}
							
												$("#colpre24").append(tmp2);
							
							
												$("#collapse34").css("display","block");
												
												var tmp3="";
							
												var len1=0;
												var len2=0;
												
												while(len1<data1.entry.length && len2<data2.entry.length) {
													if(new Date(data1.entry[len1].resource.recordedDate).getTime() - new Date(data2.entry[len2].resource.recordedDate).getTime() < 0) {
														tmp3 = tmp3 + "<div style='color:#0000FF'>";
														tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.recordedDate + "<br>";
														tmp3 = tmp3 + "<b>Substance: </b>" + data2.entry[len2].resource.substance.text + "<br>";
														tmp3 = tmp3 + "<b>Reaction: </b>" + data2.entry[len2].resource.reaction[0].manifestation[0].text;
														tmp3 = tmp3 + "<br></p></div>";
														len2++;
													} else {
														tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.recordedDate + "<br>";
														tmp3 = tmp3 + "<b>Substance: </b>" + data1.entry[len1].resource.substance.text + "<br>";
														if(data1.entry[len1].resource.reaction) {
															tmp3 = tmp3 + "<b>Reaction: </b>" + data1.entry[len1].resource.reaction[0].manifestation[0].text;
														}
														tmp3 = tmp3 + "<br></p>";
														len1++;
													}
												}
												
												while(len1<data1.entry.length) {
													tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.recordedDate + "<br>";
													tmp3 = tmp3 + "<b>Substance: </b>" + data1.entry[len1].resource.substance.text + "<br>";
													if(data1.entry[len1].resource.reaction) {
														tmp3 = tmp3 + "<b>Reaction: </b>" + data1.entry[len1].resource.reaction[0].manifestation[0].text;
													}
													tmp3 = tmp3 + "<br></p>";
													len1++;
												}
												
												while(len2<data2.entry.length) {
													tmp3 = tmp3 + "<div style='color:#0000FF'>";
													tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.recordedDate + "<br>";
													tmp3 = tmp3 + "<b>Substance: </b>" + data2.entry[len2].resource.substance.text + "<br>";
													tmp3 = tmp3 + "<b>Reaction: </b>" + data2.entry[len2].resource.reaction[0].manifestation[0].text;
													tmp3 = tmp3 + "<br></p></div>";
													len2++;
												}
												
												
												$("#colpre34").append(tmp3);
													
												
												
												
												
												
												url = serviceUri + "/Condition?patient=" + patientId;
												$.ajax({
													url: url,
													type: "GET",
													dataType: "json",
													headers: {
														"Accept": "application/json+fhir",
														"Authorization": "Bearer " + accessToken
													},
												}).done(function(pt){
													$("#collapse5").css("display","block");
													data1 = JSON.parse(JSON.stringify(pt));
						
													tmp1 = "";
													
													data1.entry.sort(function(a,b) { 
														if(a.resource.onsetDateTime && b.resource.onsetDateTime) {
															return new Date(b.resource.onsetDateTime).getTime() - new Date(a.resource.onsetDateTime).getTime() 
														} else if(a.resource.onsetDateTime) {
															return -1;
														} else {
															return 1;
														}
													});
						
													var len = data1.entry.length;
													for(var i=0; i<len; i++) {
														tmp1 = tmp1 + "<p><b>" + data1.entry[i].resource.category.text + ": </b>" + data1.entry[i].resource.code.text + "<br>";
														tmp1 = tmp1 + "<b>ClinicalStatus: </b>" + data1.entry[i].resource.clinicalStatus + "<br>";
														tmp1 = tmp1 + "<b>VerificationStatus: </b>" + data1.entry[i].resource.verificationStatus + "<br>";
														tmp1 = tmp1 + "<b>Onset: </b>" + data1.entry[i].resource.onsetDateTime;
														tmp1 = tmp1 + "<br></p>";					
													}
						
													$("#colpre5").append(tmp1);
					
							
													url = epicUri + "/Condition?patient=" + epicID;
													$.ajax({
														url: url,
														type: "GET",
														dataType: "json",
														headers: {
															"Accept": "application/json+fhir",
														},
													}).done(function(pt){
														$("#collapse25").css("display","block");
									
							
														data2 = JSON.parse(JSON.stringify(pt));
							
														tmp2 = "";
														
														data2.entry.sort(function(a,b) { 
															if(a.resource.onsetDateTime && b.resource.onsetDateTime) {
																return new Date(b.resource.onsetDateTime).getTime() - new Date(a.resource.onsetDateTime).getTime() 
															} else if(a.resource.onsetDateTime) {
																return -1;
															} else {
																return 1;
															}
														});
							
														var len = data2.entry.length;
							
														for(var i=0; i<len; i++) {
															tmp2 = tmp2 + "<p><b>" + data2.entry[i].resource.category.text + ": </b>" + data2.entry[i].resource.code.text + "<br>";
															tmp2 = tmp2 + "<b>ClinicalStatus: </b>" + data2.entry[i].resource.clinicalStatus + "<br>";
															tmp2 = tmp2 + "<b>VerificationStatus: </b>" + data2.entry[i].resource.verificationStatus + "<br>";
															tmp2 = tmp2 + "<b>Onset: </b>" + data2.entry[i].resource.onsetDateTime;
															tmp2 = tmp2 + "<br></p>";
														}
							
														$("#colpre25").append(tmp2);
							
							
														$("#collapse35").css("display","block");
														
														var tmp3="";
							
														var len1=0;
														var len2=0;
														
														while(len1<data1.entry.length && len2<data2.entry.length) {
															if(data1.entry[len1].resource.onsetDateTime && data2.entry[len2].resource.onsetDateTime) {
																if(new Date(data1.entry[len1].resource.onsetDateTime).getTime() - new Date(data2.entry[len2].resource.onsetDateTime).getTime() < 0) {
																	tmp3 = tmp3 + "<div style='color:#0000FF'>";
																	tmp3 = tmp3 + "<p><b>" + data2.entry[len2].resource.category.text + ": </b>" + data2.entry[len2].resource.code.text + "<br>";
																	tmp3 = tmp3 + "<b>ClinicalStatus: </b>" + data2.entry[len2].resource.clinicalStatus + "<br>";
																	tmp3 = tmp3 + "<b>VerificationStatus: </b>" + data2.entry[len2].resource.verificationStatus + "<br>";
																	tmp3 = tmp3 + "<b>Onset: </b>" + data2.entry[len2].resource.onsetDateTime;
																	tmp3 = tmp3 + "<br></p></div>";
																	len2++;
																} else {
																	tmp3 = tmp3 + "<p><b>" + data1.entry[len1].resource.category.text + ": </b>" + data1.entry[len1].resource.code.text + "<br>";
																	tmp3 = tmp3 + "<b>ClinicalStatus: </b>" + data1.entry[len1].resource.clinicalStatus + "<br>";
																	tmp3 = tmp3 + "<b>VerificationStatus: </b>" + data1.entry[len1].resource.verificationStatus + "<br>";
																	tmp3 = tmp3 + "<b>Onset: </b>" + data1.entry[len1].resource.onsetDateTime;
																	tmp3 = tmp3 + "<br></p>";	
																	len1++;
																}
															} else if(data1.entry[len1].resource.onsetDateTime) {
																tmp3 = tmp3 + "<p><b>" + data1.entry[len1].resource.category.text + ": </b>" + data1.entry[len1].resource.code.text + "<br>";
																tmp3 = tmp3 + "<b>ClinicalStatus: </b>" + data1.entry[len1].resource.clinicalStatus + "<br>";
																tmp3 = tmp3 + "<b>VerificationStatus: </b>" + data1.entry[len1].resource.verificationStatus + "<br>";
																tmp3 = tmp3 + "<b>Onset: </b>" + data1.entry[len1].resource.onsetDateTime;
																tmp3 = tmp3 + "<br></p>";	
																len1++;
															} else {
																tmp3 = tmp3 + "<div style='color:#0000FF'>";
																tmp3 = tmp3 + "<p><b>" + data2.entry[len2].resource.category.text + ": </b>" + data2.entry[len2].resource.code.text + "<br>";
																tmp3 = tmp3 + "<b>ClinicalStatus: </b>" + data2.entry[len2].resource.clinicalStatus + "<br>";
																tmp3 = tmp3 + "<b>VerificationStatus: </b>" + data2.entry[len2].resource.verificationStatus + "<br>";
																tmp3 = tmp3 + "<b>Onset: </b>" + data2.entry[len2].resource.onsetDateTime;
																tmp3 = tmp3 + "<br></p></div>";
																len2++;
															}
														}
														
														while(len1<data1.entry.length) {
															tmp3 = tmp3 + "<p><b>" + data1.entry[len1].resource.category.text + ": </b>" + data1.entry[len1].resource.code.text + "<br>";
															tmp3 = tmp3 + "<b>ClinicalStatus: </b>" + data1.entry[len1].resource.clinicalStatus + "<br>";
															tmp3 = tmp3 + "<b>VerificationStatus: </b>" + data1.entry[len1].resource.verificationStatus + "<br>";
															tmp3 = tmp3 + "<b>Onset: </b>" + data1.entry[len1].resource.onsetDateTime;
															tmp3 = tmp3 + "<br></p>";	
															len1++;
														}
														
														while(len2<data2.entry.length) {
															tmp3 = tmp3 + "<div style='color:#0000FF'>";
															tmp3 = tmp3 + "<p><b>" + data2.entry[len2].resource.category.text + ": </b>" + data2.entry[len2].resource.code.text + "<br>";
															tmp3 = tmp3 + "<b>ClinicalStatus: </b>" + data2.entry[len2].resource.clinicalStatus + "<br>";
															tmp3 = tmp3 + "<b>VerificationStatus: </b>" + data2.entry[len2].resource.verificationStatus + "<br>";
															tmp3 = tmp3 + "<b>Onset: </b>" + data2.entry[len2].resource.onsetDateTime;
															tmp3 = tmp3 + "<br></p></div>";
															len2++;
														}
														
														$("#colpre35").append(tmp3);
													
												
												
												
												
														url = serviceUri + "/Observation?patient=" + patientId;
														$.ajax({
															url: url,
															type: "GET",
															dataType: "json",
															headers: {
																"Accept": "application/json+fhir",
																"Authorization": "Bearer " + accessToken
															},
														}).done(function(pt){
															$("#collapse6").css("display","block");
															data1 = JSON.parse(JSON.stringify(pt));
						
															tmp1 = "";
						
															data1.entry.sort(function(a,b) { 
																return new Date(b.resource.effectiveDateTime).getTime() - new Date(a.resource.effectiveDateTime).getTime() 
															});
						
															var len = data1.entry.length;
															for(var i=0; i<len; i++) {
																tmp1 = tmp1 + "<p><b>Date: </b>" + data1.entry[i].resource.effectiveDateTime + "<br>";
																tmp1 = tmp1 + "<b>Status: </b>" + data1.entry[i].resource.status + "<br>";
																tmp1 = tmp1 + "<b>Type: </b>" + data1.entry[i].resource.code.text + "<br>";
																if(data1.entry[i].resource.valueCodeableConcept) {
																	tmp1 = tmp1 + "<b>Result: </b>" + data1.entry[i].resource.valueCodeableConcept.text + "<br>";
																}
																if(data1.entry[i].resource.valueQuantity) {
																	tmp1 = tmp1 + "<b>Result: </b>" + data1.entry[i].resource.valueQuantity.value + " " + data1.entry[i].resource.valueQuantity.unit + "<br>";
																}
																tmp1 = tmp1 + "</p>";						
															}
						
															$("#colpre6").append(tmp1);
					
							
															url = epicUri + "/Observation?patient=" + epicID + "&code=8310-5";
															$.ajax({
																url: url,
																type: "GET",
																dataType: "json",
																headers: {
																	"Accept": "application/json+fhir",
																},
															}).done(function(pt){
																$("#collapse26").css("display","block");
									
							
																data2 = JSON.parse(JSON.stringify(pt));
							
																tmp2 = "";
																
																data2.entry.sort(function(a,b) { 
																	return new Date(b.resource.effectiveDateTime).getTime() - new Date(a.resource.effectiveDateTime).getTime() 
																});
							
																var len = data2.entry.length;
							
																for(var i=0; i<len; i++) {
																	tmp2 = tmp2 + "<p><b>Date: </b>" + data2.entry[i].resource.effectiveDateTime + "<br>";
																	tmp2 = tmp2 + "<b>Status: </b>" + data2.entry[i].resource.status + "<br>";
																	tmp2 = tmp2 + "<b>Type: </b>" + data2.entry[i].resource.code.coding[0].display + "<br>";
																	tmp2 = tmp2 + "<b>Result: </b>" + data2.entry[i].resource.valueQuantity.value + " " + data2.entry[i].resource.valueQuantity.unit;
																	tmp2 = tmp2 + "<br></p>";
																}
							
																$("#colpre26").append(tmp2);
							
							
																$("#collapse36").css("display","block");
																
																var tmp3="";
							
																var len1=0;
																var len2=0;
																
																while(len1<data1.entry.length && len2<data2.entry.length) {
																	if(new Date(data1.entry[len1].resource.effectiveDateTime).getTime() - new Date(data2.entry[len2].resource.effectiveDateTime).getTime() < 0) {
																		tmp3 = tmp3 + "<div style='color:#0000FF'>";
																		tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.effectiveDateTime + "<br>";
																		tmp3 = tmp3 + "<b>Status: </b>" + data2.entry[len2].resource.status + "<br>";
																		tmp3 = tmp3 + "<b>Type: </b>" + data2.entry[len2].resource.code.coding[0].display + "<br>";
																		tmp3 = tmp3 + "<b>Result: </b>" + data2.entry[len2].resource.valueQuantity.value + " " + data2.entry[len2].resource.valueQuantity.unit;
																		tmp3 = tmp3 + "<br></p></div>";
																		len2++;
																	} else {
																		tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.effectiveDateTime + "<br>";
																		tmp3 = tmp3 + "<b>Status: </b>" + data1.entry[len1].resource.status + "<br>";
																		tmp3 = tmp3 + "<b>Type: </b>" + data1.entry[len1].resource.code.text + "<br>";
																		if(data1.entry[len1].resource.valueCodeableConcept) {
																			tmp3 = tmp3 + "<b>Result: </b>" + data1.entry[len1].resource.valueCodeableConcept.text + "<br>";
																		}
																		if(data1.entry[len1].resource.valueQuantity) {
																			tmp3 = tmp3 + "<b>Result: </b>" + data1.entry[len1].resource.valueQuantity.value + " " + data1.entry[len1].resource.valueQuantity.unit + "<br>";
																		}
																		tmp3 = tmp3 + "<br></p>";
																		len1++;
																	}
																}
																
																while(len1<data1.entry.length) {
																	tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.effectiveDateTime + "<br>";
																	tmp3 = tmp3 + "<b>Status: </b>" + data1.entry[len1].resource.status + "<br>";
																	tmp3 = tmp3 + "<b>Type: </b>" + data1.entry[len1].resource.code.text + "<br>";
																	if(data1.entry[len1].resource.valueCodeableConcept) {
																		tmp3 = tmp3 + "<b>Result: </b>" + data1.entry[len1].resource.valueCodeableConcept.text + "<br>";
																	}
																	if(data1.entry[len1].resource.valueQuantity) {
																		tmp3 = tmp3 + "<b>Result: </b>" + data1.entry[len1].resource.valueQuantity.value + " " + data1.entry[len1].resource.valueQuantity.unit + "<br>";
																	}
																	tmp3 = tmp3 + "<br></p>";
																	len1++;
																}
																
																while(len2<data2.entry.length) {
																	tmp3 = tmp3 + "<div style='color:#0000FF'>";
																	tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.effectiveDateTime + "<br>";
																	tmp3 = tmp3 + "<b>Status: </b>" + data2.entry[len2].resource.status + "<br>";
																	tmp3 = tmp3 + "<b>Type: </b>" + data2.entry[len2].resource.code.coding[0].display + "<br>";
																	tmp3 = tmp3 + "<b>Result: </b>" + data2.entry[len2].resource.valueQuantity.value + " " + data2.entry[len2].resource.valueQuantity.unit;
																	tmp3 = tmp3 + "<br></p></div>";
																	len2++;
																}
																
																$("#colpre36").append(tmp3);
													
												
												
												
												
												
																url = serviceUri + "/DiagnosticReport?patient=" + patientId;
																$.ajax({
																	url: url,
																	type: "GET",
																	dataType: "json",
																	headers: {
																		"Accept": "application/json+fhir",
																		"Authorization": "Bearer " + accessToken
																	},
																}).done(function(pt){
																	$("#collapse7").css("display","block");
																	data1 = JSON.parse(JSON.stringify(pt));
						
																	tmp1 = "";
																	
																	data1.entry.sort(function(a,b) { 
																		return new Date(b.resource.issued).getTime() - new Date(a.resource.issued).getTime() 
																	});
						
																	var len = data1.entry.length;
																	for(var i=0; i<len; i++) {
																		tmp1 = tmp1 + "<p><b>Date: </b>" + data1.entry[i].resource.issued + "<br>";
																		tmp1 = tmp1 + "<b>Code: </b>" + data1.entry[i].resource.code.text + "<br>";
																		tmp1 = tmp1 + "<b>Performer: </b>" + data1.entry[i].resource.performer.display + "<br>";
																		tmp1 = tmp1 + "<b>Status: </b>" + data1.entry[i].resource.status + "<br>";
																		tmp1 = tmp1 + "</p>";				
																	}
						
																	$("#colpre7").append(tmp1);
					
							
																	url = epicUri + "/DiagnosticReport?patient=" + epicID;
																	$.ajax({
																		url: url,
																		type: "GET",
																		dataType: "json",
																		headers: {
																			"Accept": "application/json+fhir",
																		},
																	}).done(function(pt){
																		$("#collapse27").css("display","block");
									
							
																		data2 = JSON.parse(JSON.stringify(pt));
							
																		tmp2 = "";
																		
																		data2.entry.sort(function(a,b) { 
																			return new Date(b.resource.issued).getTime() - new Date(a.resource.issued).getTime() 
																		});
							
																		var len = data2.entry.length;
							
																		for(var i=0; i<len; i++) {
																			tmp2 = tmp2 + "<p><b>Date: </b>" + data2.entry[i].resource.issued + "<br>";
																			tmp2 = tmp2 + "<b>Code: </b>" + data2.entry[i].resource.code.text + "<br>";
																			tmp2 = tmp2 + "<b>Performer: </b>" + data2.entry[i].resource.performer.display + "<br>";
																			tmp2 = tmp2 + "<b>Status: </b>" + data2.entry[i].resource.status + "<br>";
								
																			var tmps = "";
								
																			tmp2 = tmp2 + tmps;
																			tmp2 = tmp2 + "<br></p>";
																		}
							
																		$("#colpre27").append(tmp2);
							
							
																		$("#collapse37").css("display","block");
																		
																		var tmp3="";
							
																		var len1=0;
																		var len2=0;
																		
																		while(len1<data1.entry.length && len2<data2.entry.length) {
																			if(new Date(data1.entry[len1].resource.issued).getTime() - new Date(data2.entry[len2].resource.issued).getTime() < 0) {
																				tmp3 = tmp3 + "<div style='color:#0000FF'>";
																				tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.issued + "<br>";
																				tmp3 = tmp3 + "<b>Code: </b>" + data2.entry[len2].resource.code.text + "<br>";
																				tmp3 = tmp3 + "<b>Performer: </b>" + data2.entry[len2].resource.performer.display + "<br>";
																				tmp3 = tmp3 + "<b>Status: </b>" + data2.entry[len2].resource.status + "<br>";
																				
																				var tmps = "";
																			
																				tmp3 = tmp3 + tmps;
																				tmp3 = tmp3 + "<br></p></div>";
																				len2++;
																			} else {
																				tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.issued + "<br>";
																				tmp3 = tmp3 + "<b>Code: </b>" + data1.entry[len1].resource.code.text + "<br>";
																				tmp3 = tmp3 + "<b>Performer: </b>" + data1.entry[len1].resource.performer.display + "<br>";
																				tmp3 = tmp3 + "<b>Status: </b>" + data1.entry[len1].resource.status + "<br>";
																				tmp3 = tmp3 + "<br></p>";
																				len1++;
																			}
																		}
																		
																		while(len1<data1.entry.length) {
																			tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.issued + "<br>";
																			tmp3 = tmp3 + "<b>Code: </b>" + data1.entry[len1].resource.code.text + "<br>";
																			tmp3 = tmp3 + "<b>Performer: </b>" + data1.entry[len1].resource.performer.display + "<br>";
																			tmp3 = tmp3 + "<b>Status: </b>" + data1.entry[len1].resource.status + "<br>";
																			tmp3 = tmp3 + "<br></p>";
																			len1++;
																		}
																		
																		while(len2<data2.entry.length) {
																			tmp3 = tmp3 + "<div style='color:#0000FF'>";
																			tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.issued + "<br>";
																			tmp3 = tmp3 + "<b>Code: </b>" + data2.entry[len2].resource.code.text + "<br>";
																			tmp3 = tmp3 + "<b>Performer: </b>" + data2.entry[len2].resource.performer.display + "<br>";
																			tmp3 = tmp3 + "<b>Status: </b>" + data2.entry[len2].resource.status + "<br>";
																			
																			var tmps = "";
																			var lens = data2.entry[len2].resource.result.length;
																			for(var j=0; j<lens; j++) {
																				tmps = tmps + "<b>Result: </b>" + data2.entry[len2].resource.result[j].display + "<br>";
																			}
																			
																			tmp3 = tmp3 + tmps;
																			tmp3 = tmp3 + "<br></p></div>";
																			len2++;
																		}
																		
																		
																		$("#colpre37").append(tmp3);
													
												
												
												
																		$('#download_button').removeClass("disabled");
																		$('#progress').hide();
																		$('#progress').removeClass('col-md-2');
																		$('#blue').css("display","block");
																		$('#blue').addClass('col-md-2');
																		$('#progress2').hide();
																		$('#progress2').removeClass('col-md-2');
																		$('#blue2').css("display","block");
																		$('#blue2').addClass('col-md-2');
												
												
												
												
												
												
												

																	});
																});

															});
														});

													});
												});

                                            });
                                        });
                
                                    });
                                });
                
                            });
                
                        });

                    });
                });
			} else {
			    var colnum1;
                var clnpre1;
                var colnum2;
                var clnpre2;
                var colnum3;
                var clnpre3;
                var url1;
                var url2;
                var data1;
                var data2;
                var tmp1;
                var tmp2;
        
                if(data_type == "Patient") {
                    url1 = serviceUri + "/Patient/" + patientId;
                    url2 = epicUri + "/Patient/" + epicID;
                    colnum1 = "#collapse1";
                    clnpre1 = "#colpre1";
                    colnum2 = "#collapse21";
                    clnpre2 = "#colpre21";
                    colnum3 = "#collapse31";
                    clnpre3 = "#colpre31";
                    
                    
                    $.ajax({
                    url: url1,
                    type: "GET",
                    dataType: "json",
                    headers: {
					    "Accept": "application/json+fhir",
                        "Authorization": "Bearer " + accessToken
                    },
					}).done(function(pt){
						$('#paraData').hide();
						$(colnum1).css("display","block");
						data1 = JSON.parse(JSON.stringify(pt));
						
						$(clnpre1).append("<div class='row'><div class = 'col-md-3'><img src='./face1.jpg' /></div></div><br><div>" + data1.text.div + "</div>");
						
					
						$.ajax({
							url: url2,
							type: "GET",
							dataType: "json",
							headers: {
								"Accept": "application/json+fhir",
							},
						}).done(function(pt){
							$('#paraData2').hide();
							$(colnum2).css("display","block");
							
							data2 = JSON.parse(JSON.stringify(pt));
							
							var tmp = "<div><p><b>Name: </b>" + data2.name[0].given[0] + " " + data2.name[0].family[0];
							tmp = tmp + "<br>" + "<b>Gender: </b>" + data2.gender;
							tmp = tmp + "<br>" + "<b>BirthDate: </b>" + data2.birthDate;
							tmp = tmp + "</p></div>";
							
							$(clnpre2).append("<div class='row'><div class = 'col-md-3'><img src='./face2.jpg' /></div></div><br>" + tmp);
							
							
							
							$('#paraData3').hide();
							$(colnum3).css("display","block");
                    		$(clnpre3).append("<div class='row'><div class = 'col-md-3'><img src='./face1.jpg' /></div><div class = 'col-md-3 col-md-offset-2'><img src='./face2.jpg' /></div></div><br><div>" + data1.text.div + "</div>");
                    		
						
						
							$('#download_button').removeClass("disabled");
							$('#progress').hide();
							$('#progress').removeClass('col-md-2');
							$('#blue').css("display","block");
							$('#blue').addClass('col-md-2');
							$('#progress2').hide();
							$('#progress2').removeClass('col-md-2');
							$('#blue2').css("display","block");
							$('#blue2').addClass('col-md-2');
				
						});
				
					});
                    
                    
                    
                    
                    
                } else if(data_type == "MedicationOrder"){
                    url1 = serviceUri + "/" + data_type + "?patient=" + patientId;
                    url2 = epicUri + "/" + data_type + "?patient=" + epicID;
                    colnum1 = "#collapse2";
                    clnpre1 = "#colpre2";
                    colnum2 = "#collapse22";
                    clnpre2 = "#colpre22";
                    colnum3 = "#collapse32";
                    clnpre3 = "#colpre32";
                    
                    
                    
                    $.ajax({
                    url: url1,
                    type: "GET",
                    dataType: "json",
                    headers: {
					    "Accept": "application/json+fhir",
                        "Authorization": "Bearer " + accessToken
                    },
					}).done(function(pt){
						$('#paraData').hide();
						$(colnum1).css("display","block");
						data1 = JSON.parse(JSON.stringify(pt));
						
						tmp1 = "";
						
						data1.entry.sort(function(a,b) { 
							if(b.resource.dateWritten && a.resource.dateWritten) {
								return new Date(b.resource.dateWritten).getTime() - new Date(a.resource.dateWritten).getTime();
							} else if (a.resource.dateWritten) {
								return -1;
							} else {
								return 1;
							}
						});
						
						var len = data1.entry.length;
						for(var i=0; i<len; i++) {
							tmp1 = tmp1 + "<p><b>Date: </b>" + data1.entry[i].resource.dateWritten + "<br>";
							tmp1 = tmp1 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data1.entry[i].resource.medicationCodeableConcept.text + "</a>";
							tmp1 = tmp1 + "<br>" + "<b>Dosage Instructions: </b>" + data1.entry[i].resource.dosageInstruction[0].text;
							tmp1 = tmp1 + "<br></p>";								
						}
						
						$(clnpre1).append(tmp1);
					
						$.ajax({
							url: url2,
							type: "GET",
							dataType: "json",
							headers: {
								"Accept": "application/json+fhir",
							},
						}).done(function(pt){
							$('#paraData2').hide();
							$(colnum2).css("display","block");
							
							
							
							data2 = JSON.parse(JSON.stringify(pt));
							
							tmp2="";
							
							data2.entry.sort(function(a,b) { 
								if(b.resource.dateWritten && a.resource.dateWritten) {
									return new Date(b.resource.dateWritten).getTime() - new Date(a.resource.dateWritten).getTime();
								} else if (a.resource.dateWritten) {
									return -1;
								} else {
									return 1;
								} 
							});
							
							var len = data2.entry.length;
							for(var i=0; i<len; i++) {
								tmp2 = tmp2 + "<p><b>Date: </b>" + data2.entry[i].resource.dateWritten + "<br>";
								tmp2 = tmp2 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data2.entry[i].resource.medicationReference.display + "</a>";
								tmp2 = tmp2 + "<br>" + "<b>Dosage Instructions: </b>" + data2.entry[i].resource.dosageInstruction[0].text;
								tmp2 = tmp2 + "<br></p>";				
							}
							
							$(clnpre2).append(tmp2);
							
							
							
							$('#paraData3').hide();
							$(colnum3).css("display","block");
							
							var tmp3="";
							
							var len1=0;
							var len2=0;
							
							while(len1<data1.entry.length && len2<data2.entry.length) {
								if(data1.entry[len1].resource.dateWritten && data2.entry[len2].resource.dateWritten) {
									if(new Date(data1.entry[len1].resource.dateWritten).getTime() - new Date(data2.entry[len2].resource.dateWritten).getTime() < 0) {
										tmp3 = tmp3 + "<div style='color:#0000FF'>";
										tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.dateWritten + "<br>";
										tmp3 = tmp3 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data2.entry[len2].resource.medicationReference.display + "</a>";
										tmp3 = tmp3 + "<br>" + "<b>Dosage Instructions: </b>" + data2.entry[len2].resource.dosageInstruction[0].text;
										tmp3 = tmp3 + "<br></p></div>";
										len2++;
									} else {
										tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.dateWritten + "<br>";
										tmp3 = tmp3 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data1.entry[len1].resource.medicationCodeableConcept.text + "</a>";
										tmp3 = tmp3 + "<br>" + "<b>Dosage Instructions: </b>" + data1.entry[len1].resource.dosageInstruction[0].text;
										tmp3 = tmp3 + "<br></p>";
										len1++;
									}
								} else if(data1.entry[len1].resource.dateWritten) {
									tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.dateWritten + "<br>";
									tmp3 = tmp3 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data1.entry[len1].resource.medicationCodeableConcept.text + "</a>";
									tmp3 = tmp3 + "<br>" + "<b>Dosage Instructions: </b>" + data1.entry[len1].resource.dosageInstruction[0].text;
									tmp3 = tmp3 + "<br></p>";
									len1++;
								} else {
									tmp3 = tmp3 + "<div style='color:#0000FF'>";
									tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.dateWritten + "<br>";
									tmp3 = tmp3 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data2.entry[len2].resource.medicationReference.display + "</a>";
									tmp3 = tmp3 + "<br>" + "<b>Dosage Instructions: </b>" + data2.entry[len2].resource.dosageInstruction[0].text;
									tmp3 = tmp3 + "<br></p></div>";
									len2++;
								}
							}
							
							while(len1<data1.entry.length) {
								tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.dateWritten + "<br>";
								tmp3 = tmp3 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data1.entry[len1].resource.medicationCodeableConcept.text + "</a>";
								tmp3 = tmp3 + "<br>" + "<b>Dosage Instructions: </b>" + data1.entry[len1].resource.dosageInstruction[0].text;
								tmp3 = tmp3 + "<br></p>";
								len1++;
							}
							
							while(len2<data2.entry.length) {
								tmp3 = tmp3 + "<div style='color:#0000FF'>";
								tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.dateWritten + "<br>";
								tmp3 = tmp3 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data2.entry[len2].resource.medicationReference.display + "</a>";
								tmp3 = tmp3 + "<br>" + "<b>Dosage Instructions: </b>" + data2.entry[len2].resource.dosageInstruction[0].text;
								tmp3 = tmp3 + "<br></p></div>";
								len2++;
							}
							
                    		$(clnpre3).append(tmp3);
						
						
						
							$('#download_button').removeClass("disabled");
							$('#progress').hide();
							$('#progress').removeClass('col-md-2');
							$('#blue').css("display","block");
							$('#blue').addClass('col-md-2');
							$('#progress2').hide();
							$('#progress2').removeClass('col-md-2');
							$('#blue2').css("display","block");
							$('#blue2').addClass('col-md-2');
				
						});
				
					});
                    
                    
                    
                    
                } else if(data_type == "Immunization"){
                    url1 = serviceUri + "/" + data_type + "?patient=" + 4342009;
                    url2 = epicUri + "/" + data_type + "?patient=" + epicID;
                    colnum1 = "#collapse3";
                    clnpre1 = "#colpre3";
                    colnum2 = "#collapse23";
                    clnpre2 = "#colpre23";
                    colnum3 = "#collapse33";
                    clnpre3 = "#colpre33";
                    
                    
                    
                    $.ajax({
                    url: url1,
                    type: "GET",
                    dataType: "json",
                    headers: {
					    "Accept": "application/json+fhir",
                        "Authorization": "Bearer " + accessToken
                    },
					}).done(function(pt){
						$('#paraData').hide();
						$(colnum1).css("display","block");
						data1 = JSON.parse(JSON.stringify(pt));
						
						tmp1 = "";
						
						data1.entry.sort(function(a,b) { 
							return new Date(b.resource.date).getTime() - new Date(a.resource.date).getTime() 
						});
						
						var len = data1.entry.length;
						for(var i=0; i<len; i++) {
							if(data1.entry[i].resource.resourceType == "Immunization") {
								tmp1 = tmp1 + "<p><b>Date: </b>" + data1.entry[i].resource.date + "<br>";
								tmp1 = tmp1 + "<b>Vaccine Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data1.entry[i].resource.vaccineCode.text + "</a>";
								tmp1 = tmp1 + "<br></p>";
							}					
						}
						
						$(clnpre1).append(tmp1);
						
						
						$.ajax({
							url: url2,
							type: "GET",
							dataType: "json",
							headers: {
								"Accept": "application/json+fhir",
							},
						}).done(function(pt){
							$('#paraData2').hide();
							$(colnum2).css("display","block");
							
							
							
							data2 = JSON.parse(JSON.stringify(pt));
							
							tmp2 = "";
							
							data2.entry.sort(function(a,b) { 
								return new Date(b.resource.date).getTime() - new Date(a.resource.date).getTime() 
							});
							
							var len = data2.entry.length;
							
							for(var i=0; i<len; i++) {
								if(data2.entry[i].resource.resourceType == "Immunization") {
									tmp2 = tmp2 + "<p><b>Date: </b>" + data2.entry[i].resource.date + "<br>";
									tmp2 = tmp2 + "<b>Vaccine Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data2.entry[i].resource.vaccineCode.text + "</a>";
									tmp2 = tmp2 + "<br></p>";
								}
							}
							
							$(clnpre2).append(tmp2);
							
							
							
							$('#paraData3').hide();
							$(colnum3).css("display","block");
							
							var tmp3="";
							
							var len1=0;
							var len2=0;
							
							while(len1<data1.entry.length && len2<data2.entry.length) {
								if(new Date(data1.entry[len1].resource.date).getTime() - new Date(data2.entry[len2].resource.date).getTime() < 0) {
									if(data2.entry[len2].resource.resourceType == "Immunization") {
										tmp3 = tmp3 + "<div style='color:#0000FF'>";
										tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.date + "<br>";
										tmp3 = tmp3 + "<b>Vaccine Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data2.entry[len2].resource.vaccineCode.text + "</a>";
										tmp3 = tmp3 + "<br></p></div>";
									}
									len2++;
								} else {
									if(data1.entry[len1].resource.resourceType == "Immunization") {
										tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.date + "<br>";
										tmp3 = tmp3 + "<b>Vaccine Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data1.entry[len1].resource.vaccineCode.text + "</a>";
										tmp3 = tmp3 + "<br></p>";
									}
									len1++;
								}
							}
							
							while(len1<data1.entry.length) {
								if(data1.entry[len1].resource.resourceType == "Immunization") {
									tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.date + "<br>";
									tmp3 = tmp3 + "<b>Vaccine Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data1.entry[len1].resource.vaccineCode.text + "</a>";
									tmp3 = tmp3 + "<br></p>";
								}
								len1++;
							}
							
							while(len2<data2.entry.length) {
								if(data2.entry[len2].resource.resourceType == "Immunization") {
									tmp3 = tmp3 + "<div style='color:#0000FF'>";
									tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.date + "<br>";
									tmp3 = tmp3 + "<b>Vaccine Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data2.entry[len2].resource.vaccineCode.text + "</a>";
									tmp3 = tmp3 + "<br></p></div>";
								}
								len2++;
							}
							
                    		$(clnpre3).append(tmp3);
							
							
						
						
						
							$('#download_button').removeClass("disabled");
							$('#progress').hide();
							$('#progress').removeClass('col-md-2');
							$('#blue').css("display","block");
							$('#blue').addClass('col-md-2');
							$('#progress2').hide();
							$('#progress2').removeClass('col-md-2');
							$('#blue2').css("display","block");
							$('#blue2').addClass('col-md-2');
				
						});
				
					});
                    
                    
                    
                    
                } else if(data_type == "AllergyIntolerance"){
                    url1 = serviceUri + "/" + data_type + "?patient=" + patientId;
                    url2 = epicUri + "/" + data_type + "?patient=" + epicID;
                    colnum1 = "#collapse4";
                    clnpre1 = "#colpre4";
                    colnum2 = "#collapse24";
                    clnpre2 = "#colpre24";
                    colnum3 = "#collapse34";
                    clnpre3 = "#colpre34";
                    
                    
                    $.ajax({
                    url: url1,
                    type: "GET",
                    dataType: "json",
                    headers: {
					    "Accept": "application/json+fhir",
                        "Authorization": "Bearer " + accessToken
                    },
					}).done(function(pt){
						$('#paraData').hide();
						$(colnum1).css("display","block");
						data1 = JSON.parse(JSON.stringify(pt));
						
						tmp1 = "";
						
						data1.entry.sort(function(a,b) { 
							return new Date(b.resource.recordedDate).getTime() - new Date(a.resource.recordedDate).getTime() 
						});
						
						var len = data1.entry.length;
						for(var i=0; i<len; i++) {
							tmp1 = tmp1 + "<p><b>Date: </b>" + data1.entry[i].resource.recordedDate + "<br>";
							tmp1 = tmp1 + "<b>Substance: </b>" + data1.entry[i].resource.substance.text + "<br>";
							if(data1.entry[i].resource.reaction) {
								tmp1 = tmp1 + "<b>Reaction: </b>" + data1.entry[i].resource.reaction[0].manifestation[0].text;
							}
							tmp1 = tmp1 + "<br></p>";
						}
						
						$(clnpre1).append(tmp1);
					
						$.ajax({
							url: url2,
							type: "GET",
							dataType: "json",
							headers: {
								"Accept": "application/json+fhir",
							},
						}).done(function(pt){
							$('#paraData2').hide();
							$(colnum2).css("display","block");
							
							
							data2 = JSON.parse(JSON.stringify(pt));
							
							tmp2 = "";
							
							data2.entry.sort(function(a,b) { 
								return new Date(b.resource.recordedDate).getTime() - new Date(a.resource.recordedDate).getTime() 
							});
							
							var len = data2.entry.length;
							
							for(var i=0; i<len; i++) {
								tmp2 = tmp2 + "<p><b>Date: </b>" + data2.entry[i].resource.recordedDate + "<br>";
								tmp2 = tmp2 + "<b>Substance: </b>" + data2.entry[i].resource.substance.text + "<br>";
								tmp2 = tmp2 + "<b>Reaction: </b>" + data2.entry[i].resource.reaction[0].manifestation[0].text;
								tmp2 = tmp2 + "<br></p>";
							}
							
							$(clnpre2).append(tmp2);
							
							
							
							$('#paraData3').hide();
							$(colnum3).css("display","block");
							
							
							var tmp3="";
							
							var len1=0;
							var len2=0;
							
							while(len1<data1.entry.length && len2<data2.entry.length) {
								if(new Date(data1.entry[len1].resource.recordedDate).getTime() - new Date(data2.entry[len2].resource.recordedDate).getTime() < 0) {
									tmp3 = tmp3 + "<div style='color:#0000FF'>";
									tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.recordedDate + "<br>";
									tmp3 = tmp3 + "<b>Substance: </b>" + data2.entry[len2].resource.substance.text + "<br>";
									tmp3 = tmp3 + "<b>Reaction: </b>" + data2.entry[len2].resource.reaction[0].manifestation[0].text;
									tmp3 = tmp3 + "<br></p></div>";
									len2++;
								} else {
									tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.recordedDate + "<br>";
									tmp3 = tmp3 + "<b>Substance: </b>" + data1.entry[len1].resource.substance.text + "<br>";
									if(data1.entry[len1].resource.reaction) {
										tmp3 = tmp3 + "<b>Reaction: </b>" + data1.entry[len1].resource.reaction[0].manifestation[0].text;
									}
									tmp3 = tmp3 + "<br></p>";
									len1++;
								}
							}
							
							while(len1<data1.entry.length) {
								tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.recordedDate + "<br>";
								tmp3 = tmp3 + "<b>Substance: </b>" + data1.entry[len1].resource.substance.text + "<br>";
								if(data1.entry[len1].resource.reaction) {
									tmp3 = tmp3 + "<b>Reaction: </b>" + data1.entry[len1].resource.reaction[0].manifestation[0].text;
								}
								tmp3 = tmp3 + "<br></p>";
								len1++;
							}
							
							while(len2<data2.entry.length) {
								tmp3 = tmp3 + "<div style='color:#0000FF'>";
								tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.recordedDate + "<br>";
								tmp3 = tmp3 + "<b>Substance: </b>" + data2.entry[len2].resource.substance.text + "<br>";
								tmp3 = tmp3 + "<b>Reaction: </b>" + data2.entry[len2].resource.reaction[0].manifestation[0].text;
								tmp3 = tmp3 + "<br></p></div>";
								len2++;
							}
							
                    		$(clnpre3).append(tmp3);
						
						
						
						
							$('#download_button').removeClass("disabled");
							$('#progress').hide();
							$('#progress').removeClass('col-md-2');
							$('#blue').css("display","block");
							$('#blue').addClass('col-md-2');
							$('#progress2').hide();
							$('#progress2').removeClass('col-md-2');
							$('#blue2').css("display","block");
							$('#blue2').addClass('col-md-2');
				
						});
				
					});
                    
                    
                    
                    
                } else if(data_type == "Condition"){
                    url1 = serviceUri + "/" + data_type + "?patient=" + patientId;
                    url2 = epicUri + "/" + data_type + "?patient=" + epicID;
                    colnum1 = "#collapse5";
                    clnpre1 = "#colpre5";
                    colnum2 = "#collapse25";
                    clnpre2 = "#colpre25";
                    colnum3 = "#collapse35";
                    clnpre3 = "#colpre35";
                    
                    
                    $.ajax({
                    url: url1,
                    type: "GET",
                    dataType: "json",
                    headers: {
					    "Accept": "application/json+fhir",
                        "Authorization": "Bearer " + accessToken
                    },
					}).done(function(pt){
						$('#paraData').hide();
						$(colnum1).css("display","block");
						data1 = JSON.parse(JSON.stringify(pt));
						
						tmp1 = "";
						
						data1.entry.sort(function(a,b) { 
							if(a.resource.onsetDateTime && b.resource.onsetDateTime) {
								return new Date(b.resource.onsetDateTime).getTime() - new Date(a.resource.onsetDateTime).getTime() 
							} else if(a.resource.onsetDateTime) {
								return -1;
							} else {
								return 1;
							}
						});
						
						var len = data1.entry.length;
						for(var i=0; i<len; i++) {
							tmp1 = tmp1 + "<p><b>" + data1.entry[i].resource.category.text + ": </b>" + data1.entry[i].resource.code.text + "<br>";
							tmp1 = tmp1 + "<b>ClinicalStatus: </b>" + data1.entry[i].resource.clinicalStatus + "<br>";
							tmp1 = tmp1 + "<b>VerificationStatus: </b>" + data1.entry[i].resource.verificationStatus + "<br>";
							tmp1 = tmp1 + "<b>Onset: </b>" + data1.entry[i].resource.onsetDateTime;
							tmp1 = tmp1 + "<br></p>";				
						}
						
						$(clnpre1).append(tmp1);
					
						$.ajax({
							url: url2,
							type: "GET",
							dataType: "json",
							headers: {
								"Accept": "application/json+fhir",
							},
						}).done(function(pt){
							$('#paraData2').hide();
							$(colnum2).css("display","block");
							
							data2 = JSON.parse(JSON.stringify(pt));
							
							tmp2 = "";
							
							data2.entry.sort(function(a,b) { 
								if(a.resource.onsetDateTime && b.resource.onsetDateTime) {
									return new Date(b.resource.onsetDateTime).getTime() - new Date(a.resource.onsetDateTime).getTime() 
								} else if(a.resource.onsetDateTime) {
									return -1;
								} else {
									return 1;
								}
							});
							
							var len = data2.entry.length;
							
							for(var i=0; i<len; i++) {
								tmp2 = tmp2 + "<p><b>" + data2.entry[i].resource.category.text + ": </b>" + data2.entry[i].resource.code.text + "<br>";
								tmp2 = tmp2 + "<b>ClinicalStatus: </b>" + data2.entry[i].resource.clinicalStatus + "<br>";
								tmp2 = tmp2 + "<b>VerificationStatus: </b>" + data2.entry[i].resource.verificationStatus + "<br>";
								tmp2 = tmp2 + "<b>Onset: </b>" + data2.entry[i].resource.onsetDateTime;
								tmp2 = tmp2 + "<br></p>";
							}
							
							$(clnpre2).append(tmp2);
							
							
							
							$('#paraData3').hide();
							$(colnum3).css("display","block");
							
							var tmp3="";
							
							var len1=0;
							var len2=0;
							
							while(len1<data1.entry.length && len2<data2.entry.length) {
								if(data1.entry[len1].resource.onsetDateTime && data2.entry[len2].resource.onsetDateTime) {
									if(new Date(data1.entry[len1].resource.onsetDateTime).getTime() - new Date(data2.entry[len2].resource.onsetDateTime).getTime() < 0) {
										tmp3 = tmp3 + "<div style='color:#0000FF'>";
										tmp3 = tmp3 + "<p><b>" + data2.entry[len2].resource.category.text + ": </b>" + data2.entry[len2].resource.code.text + "<br>";
										tmp3 = tmp3 + "<b>ClinicalStatus: </b>" + data2.entry[len2].resource.clinicalStatus + "<br>";
										tmp3 = tmp3 + "<b>VerificationStatus: </b>" + data2.entry[len2].resource.verificationStatus + "<br>";
										tmp3 = tmp3 + "<b>Onset: </b>" + data2.entry[len2].resource.onsetDateTime;
										tmp3 = tmp3 + "<br></p></div>";
										len2++;
									} else {
										tmp3 = tmp3 + "<p><b>" + data1.entry[len1].resource.category.text + ": </b>" + data1.entry[len1].resource.code.text + "<br>";
										tmp3 = tmp3 + "<b>ClinicalStatus: </b>" + data1.entry[len1].resource.clinicalStatus + "<br>";
										tmp3 = tmp3 + "<b>VerificationStatus: </b>" + data1.entry[len1].resource.verificationStatus + "<br>";
										tmp3 = tmp3 + "<b>Onset: </b>" + data1.entry[len1].resource.onsetDateTime;
										tmp3 = tmp3 + "<br></p>";	
										len1++;
									}
								} else if(data1.entry[len1].resource.onsetDateTime) {
									tmp3 = tmp3 + "<p><b>" + data1.entry[len1].resource.category.text + ": </b>" + data1.entry[len1].resource.code.text + "<br>";
									tmp3 = tmp3 + "<b>ClinicalStatus: </b>" + data1.entry[len1].resource.clinicalStatus + "<br>";
									tmp3 = tmp3 + "<b>VerificationStatus: </b>" + data1.entry[len1].resource.verificationStatus + "<br>";
									tmp3 = tmp3 + "<b>Onset: </b>" + data1.entry[len1].resource.onsetDateTime;
									tmp3 = tmp3 + "<br></p>";	
									len1++;
								} else {
									tmp3 = tmp3 + "<div style='color:#0000FF'>";
									tmp3 = tmp3 + "<p><b>" + data2.entry[len2].resource.category.text + ": </b>" + data2.entry[len2].resource.code.text + "<br>";
									tmp3 = tmp3 + "<b>ClinicalStatus: </b>" + data2.entry[len2].resource.clinicalStatus + "<br>";
									tmp3 = tmp3 + "<b>VerificationStatus: </b>" + data2.entry[len2].resource.verificationStatus + "<br>";
									tmp3 = tmp3 + "<b>Onset: </b>" + data2.entry[len2].resource.onsetDateTime;
									tmp3 = tmp3 + "<br></p></div>";
									len2++;
								}
							}
							
							while(len1<data1.entry.length) {
								tmp3 = tmp3 + "<p><b>" + data1.entry[len1].resource.category.text + ": </b>" + data1.entry[len1].resource.code.text + "<br>";
								tmp3 = tmp3 + "<b>ClinicalStatus: </b>" + data1.entry[len1].resource.clinicalStatus + "<br>";
								tmp3 = tmp3 + "<b>VerificationStatus: </b>" + data1.entry[len1].resource.verificationStatus + "<br>";
								tmp3 = tmp3 + "<b>Onset: </b>" + data1.entry[len1].resource.onsetDateTime;
								tmp3 = tmp3 + "<br></p>";	
								len1++;
							}
							
							while(len2<data2.entry.length) {
								tmp3 = tmp3 + "<div style='color:#0000FF'>";
								tmp3 = tmp3 + "<p><b>" + data2.entry[len2].resource.category.text + ": </b>" + data2.entry[len2].resource.code.text + "<br>";
								tmp3 = tmp3 + "<b>ClinicalStatus: </b>" + data2.entry[len2].resource.clinicalStatus + "<br>";
								tmp3 = tmp3 + "<b>VerificationStatus: </b>" + data2.entry[len2].resource.verificationStatus + "<br>";
								tmp3 = tmp3 + "<b>Onset: </b>" + data2.entry[len2].resource.onsetDateTime;
								tmp3 = tmp3 + "<br></p></div>";
								len2++;
							}
							
                    		$(clnpre3).append(tmp3);
							
							
						
							$('#download_button').removeClass("disabled");
							$('#progress').hide();
							$('#progress').removeClass('col-md-2');
							$('#blue').css("display","block");
							$('#blue').addClass('col-md-2');
							$('#progress2').hide();
							$('#progress2').removeClass('col-md-2');
							$('#blue2').css("display","block");
							$('#blue2').addClass('col-md-2');
				
						});
				
					});
                    
                    
                    
                } else if(data_type == "Observation"){
                    url1 = serviceUri + "/" + data_type + "?patient=" + patientId;
                    url2 = epicUri + "/" + data_type + "?patient=" + epicID + "&code=8310-5";
                    colnum1 = "#collapse6";
                    clnpre1 = "#colpre6";
                    colnum2 = "#collapse26";
                    clnpre2 = "#colpre26";
                    colnum3 = "#collapse36";
                    clnpre3 = "#colpre36";
                    
                    
                    $.ajax({
                    url: url1,
                    type: "GET",
                    dataType: "json",
                    headers: {
					    "Accept": "application/json+fhir",
                        "Authorization": "Bearer " + accessToken
                    },
					}).done(function(pt){
						$('#paraData').hide();
						$(colnum1).css("display","block");
						data1 = JSON.parse(JSON.stringify(pt));
						
						tmp1 = "";
						
						data1.entry.sort(function(a,b) { 
							return new Date(b.resource.effectiveDateTime).getTime() - new Date(a.resource.effectiveDateTime).getTime() 
						});
						
						var len = data1.entry.length;
						for(var i=0; i<len; i++) {
							tmp1 = tmp1 + "<p><b>Date: </b>" + data1.entry[i].resource.effectiveDateTime + "<br>";
							tmp1 = tmp1 + "<b>Status: </b>" + data1.entry[i].resource.status + "<br>";
							tmp1 = tmp1 + "<b>Type: </b>" + data1.entry[i].resource.code.text + "<br>";
							if(data1.entry[i].resource.valueCodeableConcept) {
								tmp1 = tmp1 + "<b>Result: </b>" + data1.entry[i].resource.valueCodeableConcept.text + "<br>";
							}
							if(data1.entry[i].resource.valueQuantity) {
								tmp1 = tmp1 + "<b>Result: </b>" + data1.entry[i].resource.valueQuantity.value + " " + data1.entry[i].resource.valueQuantity.unit + "<br>";
							}
							tmp1 = tmp1 + "</p>";
						}
						
						$(clnpre1).append(tmp1);
					
						$.ajax({
							url: url2,
							type: "GET",
							dataType: "json",
							headers: {
								"Accept": "application/json+fhir",
							},
						}).done(function(pt){
							$('#paraData2').hide();
							$(colnum2).css("display","block");
							data2 = JSON.parse(JSON.stringify(pt));
							
							tmp2 = "";
							
							data2.entry.sort(function(a,b) { 
								return new Date(b.resource.effectiveDateTime).getTime() - new Date(a.resource.effectiveDateTime).getTime() 
							});
							
							var len = data2.entry.length;
							
							for(var i=0; i<len; i++) {
								tmp2 = tmp2 + "<p><b>Date: </b>" + data2.entry[i].resource.effectiveDateTime + "<br>";
								tmp2 = tmp2 + "<b>Status: </b>" + data2.entry[i].resource.status + "<br>";
								tmp2 = tmp2 + "<b>Type: </b>" + data2.entry[i].resource.code.coding[0].display + "<br>";
								tmp2 = tmp2 + "<b>Result: </b>" + data2.entry[i].resource.valueQuantity.value + " " + data2.entry[i].resource.valueQuantity.unit;
								tmp2 = tmp2 + "<br></p>";
							}
							
							$(clnpre2).append(tmp2);
							
							
							
							$('#paraData3').hide();
							$(colnum3).css("display","block");
							
							
                    		var tmp3="";
							
							var len1=0;
							var len2=0;
							
							while(len1<data1.entry.length && len2<data2.entry.length) {
								if(new Date(data1.entry[len1].resource.effectiveDateTime).getTime() - new Date(data2.entry[len2].resource.effectiveDateTime).getTime() < 0) {
									tmp3 = tmp3 + "<div style='color:#0000FF'>";
									tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.effectiveDateTime + "<br>";
									tmp3 = tmp3 + "<b>Status: </b>" + data2.entry[len2].resource.status + "<br>";
									tmp3 = tmp3 + "<b>Type: </b>" + data2.entry[len2].resource.code.coding[0].display + "<br>";
									tmp3 = tmp3 + "<b>Result: </b>" + data2.entry[len2].resource.valueQuantity.value + " " + data2.entry[len2].resource.valueQuantity.unit;
									tmp3 = tmp3 + "<br></p></div>";
									len2++;
								} else {
									tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.effectiveDateTime + "<br>";
									tmp3 = tmp3 + "<b>Status: </b>" + data1.entry[len1].resource.status + "<br>";
									tmp3 = tmp3 + "<b>Type: </b>" + data1.entry[len1].resource.code.text + "<br>";
									if(data1.entry[len1].resource.valueCodeableConcept) {
										tmp3 = tmp3 + "<b>Result: </b>" + data1.entry[len1].resource.valueCodeableConcept.text + "<br>";
									}
									if(data1.entry[len1].resource.valueQuantity) {
										tmp3 = tmp3 + "<b>Result: </b>" + data1.entry[len1].resource.valueQuantity.value + " " + data1.entry[len1].resource.valueQuantity.unit + "<br>";
									}
									tmp3 = tmp3 + "<br></p>";
									len1++;
								}
							}
							
							while(len1<data1.entry.length) {
								tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.effectiveDateTime + "<br>";
								tmp3 = tmp3 + "<b>Status: </b>" + data1.entry[len1].resource.status + "<br>";
								tmp3 = tmp3 + "<b>Type: </b>" + data1.entry[len1].resource.code.text + "<br>";
								if(data1.entry[len1].resource.valueCodeableConcept) {
									tmp3 = tmp3 + "<b>Result: </b>" + data1.entry[len1].resource.valueCodeableConcept.text + "<br>";
								}
								if(data1.entry[len1].resource.valueQuantity) {
									tmp3 = tmp3 + "<b>Result: </b>" + data1.entry[len1].resource.valueQuantity.value + " " + data1.entry[len1].resource.valueQuantity.unit + "<br>";
								}
								tmp3 = tmp3 + "<br></p>";
								len1++;
							}
							
							while(len2<data2.entry.length) {
								tmp3 = tmp3 + "<div style='color:#0000FF'>";
								tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.effectiveDateTime + "<br>";
								tmp3 = tmp3 + "<b>Status: </b>" + data2.entry[len2].resource.status + "<br>";
								tmp3 = tmp3 + "<b>Type: </b>" + data2.entry[len2].resource.code.coding[0].display + "<br>";
								tmp3 = tmp3 + "<b>Result: </b>" + data2.entry[len2].resource.valueQuantity.value + " " + data2.entry[len2].resource.valueQuantity.unit;
								tmp3 = tmp3 + "<br></p></div>";
								len2++;
							}
							
                    		$(clnpre3).append(tmp3);
							
						
						
							$('#download_button').removeClass("disabled");
							$('#progress').hide();
							$('#progress').removeClass('col-md-2');
							$('#blue').css("display","block");
							$('#blue').addClass('col-md-2');
							$('#progress2').hide();
							$('#progress2').removeClass('col-md-2');
							$('#blue2').css("display","block");
							$('#blue2').addClass('col-md-2');
				
						});
				
					});
                    
                    
                    
                    
                } else if(data_type == "DiagnosticReport"){
                    url1 = serviceUri + "/" + data_type + "?patient=" + patientId;
                    url2 = epicUri + "/" + data_type + "?patient=" + epicID;
                    colnum1 = "#collapse7";
                    clnpre1 = "#colpre7";
                    colnum2 = "#collapse27";
                    clnpre2 = "#colpre27";
                    colnum3 = "#collapse37";
                    clnpre3 = "#colpre37";
                    
                    
                    
                    
                    $.ajax({
                    url: url1,
                    type: "GET",
                    dataType: "json",
                    headers: {
					    "Accept": "application/json+fhir",
                        "Authorization": "Bearer " + accessToken
                    },
					}).done(function(pt){
						$('#paraData').hide();
						$(colnum1).css("display","block");
						data1 = JSON.parse(JSON.stringify(pt));
						
						tmp1 = "";
						
						data1.entry.sort(function(a,b) { 
							return new Date(b.resource.issued).getTime() - new Date(a.resource.issued).getTime() 
						});
						
						var len = data1.entry.length;
						for(var i=0; i<len; i++) {
							tmp1 = tmp1 + "<p><b>Date: </b>" + data1.entry[i].resource.issued + "<br>";
							tmp1 = tmp1 + "<b>Code: </b>" + data1.entry[i].resource.code.text + "<br>";
							tmp1 = tmp1 + "<b>Performer: </b>" + data1.entry[i].resource.performer.display + "<br>";
							tmp1 = tmp1 + "<b>Status: </b>" + data1.entry[i].resource.status + "<br>";
							tmp1 = tmp1 + "</p>";
						}
						
						$(clnpre1).append(tmp1);
					
						$.ajax({
							url: url2,
							type: "GET",
							dataType: "json",
							headers: {
								"Accept": "application/json+fhir",
							},
						}).done(function(pt){
							$('#paraData2').hide();
							$(colnum2).css("display","block");
							data2 = JSON.parse(JSON.stringify(pt));
							
							tmp2 = "";
							
							data2.entry.sort(function(a,b) { 
								return new Date(b.resource.issued).getTime() - new Date(a.resource.issued).getTime() 
							});
							
							var len = data2.entry.length;
							
							for(var i=0; i<len; i++) {
								tmp2 = tmp2 + "<p><b>Date: </b>" + data2.entry[i].resource.issued + "<br>";
								tmp2 = tmp2 + "<b>Code: </b>" + data2.entry[i].resource.code.text + "<br>";
								tmp2 = tmp2 + "<b>Performer: </b>" + data2.entry[i].resource.performer.display + "<br>";
								tmp2 = tmp2 + "<b>Status: </b>" + data2.entry[i].resource.status + "<br>";
								
								var tmps = "";
								var lens = data2.entry[i].resource.result.length;
								for(var j=0; j<lens; j++) {
									tmps = tmps + "<b>Result: </b>" + data2.entry[i].resource.result[j].display + "<br>";
								}
								
								tmp2 = tmp2 + tmps;
								tmp2 = tmp2 + "<br></p>";
							}
							
							$(clnpre2).append(tmp2);
							
							
							
							$('#paraData3').hide();
							$(colnum3).css("display","block");
                    		
							
							
							var tmp3="";
							
							var len1=0;
							var len2=0;
							
							while(len1<data1.entry.length && len2<data2.entry.length) {
								if(new Date(data1.entry[len1].resource.issued).getTime() - new Date(data2.entry[len2].resource.issued).getTime() < 0) {
									tmp3 = tmp3 + "<div style='color:#0000FF'>";
									tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.issued + "<br>";
									tmp3 = tmp3 + "<b>Code: </b>" + data2.entry[len2].resource.code.text + "<br>";
									tmp3 = tmp3 + "<b>Performer: </b>" + data2.entry[len2].resource.performer.display + "<br>";
									tmp3 = tmp3 + "<b>Status: </b>" + data2.entry[len2].resource.status + "<br>";
									
									var tmps = "";
									var lens = data2.entry[len2].resource.result.length;
									for(var j=0; j<lens; j++) {
										tmps = tmps + "<b>Result: </b>" + data2.entry[len2].resource.result[j].display + "<br>";
									}
								
									tmp3 = tmp3 + tmps;
									tmp3 = tmp3 + "<br></p></div>";
									len2++;
								} else {
									tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.issued + "<br>";
									tmp3 = tmp3 + "<b>Code: </b>" + data1.entry[len1].resource.code.text + "<br>";
									tmp3 = tmp3 + "<b>Performer: </b>" + data1.entry[len1].resource.performer.display + "<br>";
									tmp3 = tmp3 + "<b>Status: </b>" + data1.entry[len1].resource.status + "<br>";
									tmp3 = tmp3 + "<br></p>";
									len1++;
								}
							}
							
							while(len1<data1.entry.length) {
								tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.issued + "<br>";
								tmp3 = tmp3 + "<b>Code: </b>" + data1.entry[len1].resource.code.text + "<br>";
								tmp3 = tmp3 + "<b>Performer: </b>" + data1.entry[len1].resource.performer.display + "<br>";
								tmp3 = tmp3 + "<b>Status: </b>" + data1.entry[len1].resource.status + "<br>";
								tmp3 = tmp3 + "<br></p>";
								len1++;
							}
							
							while(len2<data2.entry.length) {
								tmp3 = tmp3 + "<div style='color:#0000FF'>";
								tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.issued + "<br>";
								tmp3 = tmp3 + "<b>Code: </b>" + data2.entry[len2].resource.code.text + "<br>";
								tmp3 = tmp3 + "<b>Performer: </b>" + data2.entry[len2].resource.performer.display + "<br>";
								tmp3 = tmp3 + "<b>Status: </b>" + data2.entry[len2].resource.status + "<br>";
								
								var tmps = "";
								var lens = data2.entry[len2].resource.result.length;
								for(var j=0; j<lens; j++) {
									tmps = tmps + "<b>Result: </b>" + data2.entry[len2].resource.result[j].display + "<br>";
								}
								
								tmp3 = tmp3 + tmps;
								tmp3 = tmp3 + "<br></p></div>";
								len2++;
							}
							
                    		$(clnpre3).append(tmp3);
							
						
						
							$('#download_button').removeClass("disabled");
							$('#progress').hide();
							$('#progress').removeClass('col-md-2');
							$('#blue').css("display","block");
							$('#blue').addClass('col-md-2');
							$('#progress2').hide();
							$('#progress2').removeClass('col-md-2');
							$('#blue2').css("display","block");
							$('#blue2').addClass('col-md-2');
				
						});
				
					});
                    
                    
                    
                }
			    
			    
			
			
			}
			
		}else if(input_info == '002') {
		    if(data_type == "All"){
		    	var data1;
                var data2;
                var tmp1;
                var tmp2;
		    
                url = serviceUri + "/Patient/" + patientId;
                $.ajax({
                    url: url,
                    type: "GET",
                    dataType: "json",
                    headers: {
                        "Accept": "application/json+fhir",
                        "Authorization": "Bearer " + accessToken
                    },
                }).done(function(pt){
                    $("#paraData").hide();
					$("#collapse1").css("display","block");
					data1 = JSON.parse(JSON.stringify(pt));
						
					$("#colpre1").append("<div class='row'><div class = 'col-md-3'><img src='./face3.jpg' /></div></div><br><div>" + data1.text.div + "</div>");
					
					
                    url = epicUri + "/Patient/" + epicID;
                    $.ajax({
                        url: url,
                        type: "GET",
                        dataType: "json",
                        headers: {
                            "Accept": "application/json+fhir",
                        },
                    }).done(function(pt){
						$("#paraData2").hide();
						$("#collapse21").css("display","block");
						
						data2 = JSON.parse(JSON.stringify(pt));
						
						var tmp = "<div><p><b>Name: </b>" + data2.name[0].given[0] + " " + data2.name[0].family[0];
						tmp = tmp + "<br>" + "<b>Gender: </b>" + data2.gender;
						tmp = tmp + "<br>" + "<b>BirthDate: </b>" + data2.birthDate;
						tmp = tmp + "</p></div>";
						
						$("#colpre21").append("<div class='row'><div class = 'col-md-3'><img src='./face4.jpg' /></div></div><br>" + tmp);
						
						
						
						$("#paraData3").hide();
						$("#collapse31").css("display","block");
						$("#colpre31").append("<div class='row'><div class = 'col-md-3'><img src='./face3.jpg' /></div><div class = 'col-md-3 col-md-offset-2'><img src='./face4.jpg' /></div></div><br><div>" + data1.text.div + "</div>");
						
						
                        
                        
                        url = serviceUri + "/MedicationOrder?patient=" + 4342008;
                        $.ajax({
                            url: url,
                            type: "GET",
                            dataType: "json",
                            headers: {
                                "Accept": "application/json+fhir",
                                "Authorization": "Bearer " + accessToken
                            },
                        }).done(function(pt){

							$("#collapse2").css("display","block");
							data1 = JSON.parse(JSON.stringify(pt));
						
							tmp1 = "";
							
							data1.entry.sort(function(a,b) { 
								if(b.resource.dateWritten && a.resource.dateWritten) {
									return new Date(b.resource.dateWritten).getTime() - new Date(a.resource.dateWritten).getTime();
								} else if (a.resource.dateWritten) {
									return -1;
								} else {
									return 1;
								} 
							});
							
						
							var len = data1.entry.length;
							for(var i=0; i<len; i++) {
								tmp1 = tmp1 + "<p><b>Date: </b>" + data1.entry[i].resource.dateWritten + "<br>";
								tmp1 = tmp1 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data1.entry[i].resource.medicationCodeableConcept.text + "</a>";
								tmp1 = tmp1 + "<br>" + "<b>Dosage Instructions: </b>" + data1.entry[i].resource.dosageInstruction[0].text;
								tmp1 = tmp1 + "<br></p>";	
							}
						
							$("#colpre2").append(tmp1);
                            
                            
                            url = epicUri + "/MedicationOrder?patient=" + epicID;
                            $.ajax({
                                url: url,
                                type: "GET",
                                dataType: "json",
                                headers: {
                                    "Accept": "application/json+fhir",
                                },
                            }).done(function(pt){
                                $("#collapse22").css("display","block");
							
								data2 = JSON.parse(JSON.stringify(pt));
							
								tmp2 = "";
								
								data2.entry.sort(function(a,b) { 
									if(b.resource.dateWritten && a.resource.dateWritten) {
										return new Date(b.resource.dateWritten).getTime() - new Date(a.resource.dateWritten).getTime();
									} else if (a.resource.dateWritten) {
										return -1;
									} else {
										return 1;
									} 
								});
							
								var len = data2.entry.length;
								for(var i=0; i<len; i++) {
									tmp2 = tmp2 + "<p><b>Date: </b>" + data2.entry[i].resource.dateWritten + "<br>";
									tmp2 = tmp2 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data2.entry[i].resource.medicationReference.display + "</a>";
									tmp2 = tmp2 + "<br>" + "<b>Dosage Instructions: </b>" + data2.entry[i].resource.dosageInstruction[0].text;
									tmp2 = tmp2 + "<br></p>";				
								}
							
								$("#colpre22").append(tmp2);
							

								$("#collapse32").css("display","block");
								
								
								
								var tmp3="";
							
								var len1=0;
								var len2=0;
								
								while(len1<data1.entry.length && len2<data2.entry.length) {
									if(data1.entry[len1].resource.dateWritten && data2.entry[len2].resource.dateWritten) {
										if(new Date(data1.entry[len1].resource.dateWritten).getTime() - new Date(data2.entry[len2].resource.dateWritten).getTime() < 0) {
											tmp3 = tmp3 + "<div style='color:#0000FF'>";
											tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.dateWritten + "<br>";
											tmp3 = tmp3 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data2.entry[len2].resource.medicationReference.display + "</a>";
											tmp3 = tmp3 + "<br>" + "<b>Dosage Instructions: </b>" + data2.entry[len2].resource.dosageInstruction[0].text;
											tmp3 = tmp3 + "<br></p></div>";
											len2++;
										} else {
											tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.dateWritten + "<br>";
											tmp3 = tmp3 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data1.entry[len1].resource.medicationCodeableConcept.text + "</a>";
											tmp3 = tmp3 + "<br>" + "<b>Dosage Instructions: </b>" + data1.entry[len1].resource.dosageInstruction[0].text;
											tmp3 = tmp3 + "<br></p>";
											len1++;
										}
									} else if(data1.entry[len1].resource.dateWritten) {
										tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.dateWritten + "<br>";
										tmp3 = tmp3 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data1.entry[len1].resource.medicationCodeableConcept.text + "</a>";
										tmp3 = tmp3 + "<br>" + "<b>Dosage Instructions: </b>" + data1.entry[len1].resource.dosageInstruction[0].text;
										tmp3 = tmp3 + "<br></p>";
										len1++;
									} else {
										tmp3 = tmp3 + "<div style='color:#0000FF'>";
										tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.dateWritten + "<br>";
										tmp3 = tmp3 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data2.entry[len2].resource.medicationReference.display + "</a>";
										tmp3 = tmp3 + "<br>" + "<b>Dosage Instructions: </b>" + data2.entry[len2].resource.dosageInstruction[0].text;
										tmp3 = tmp3 + "<br></p></div>";
										len2++;
									}
								}
								
								while(len1<data1.entry.length) {
									tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.dateWritten + "<br>";
									tmp3 = tmp3 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data1.entry[len1].resource.medicationCodeableConcept.text + "</a>";
									tmp3 = tmp3 + "<br>" + "<b>Dosage Instructions: </b>" + data1.entry[len1].resource.dosageInstruction[0].text;
									tmp3 = tmp3 + "<br></p>";
									len1++;
								}
								
								while(len2<data2.entry.length) {
									tmp3 = tmp3 + "<div style='color:#0000FF'>";
									tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.dateWritten + "<br>";
									tmp3 = tmp3 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data2.entry[len2].resource.medicationReference.display + "</a>";
									tmp3 = tmp3 + "<br>" + "<b>Dosage Instructions: </b>" + data2.entry[len2].resource.dosageInstruction[0].text;
									tmp3 = tmp3 + "<br></p></div>";
									len2++;
								}
								
								$("#colpre32").append(tmp3);
                                
                                
                                
                                url = serviceUri + "/Immunization?patient=" + 4342009;
                                $.ajax({
                                    url: url,
                                    type: "GET",
                                    dataType: "json",
                                    headers: {
                                        "Accept": "application/json+fhir",
                                        "Authorization": "Bearer " + accessToken
                                    },
                                }).done(function(pt){
									$("#collapse3").css("display","block");
									data1 = JSON.parse(JSON.stringify(pt));
						
									tmp1 = "";
									
									data1.entry.sort(function(a,b) { 
										return new Date(b.resource.date).getTime() - new Date(a.resource.date).getTime() 
									});
						
									var len = data1.entry.length;
									for(var i=0; i<len; i++) {
										if(data1.entry[i].resource.resourceType == "Immunization") {
											tmp1 = tmp1 + "<p><b>Date: </b>" + data1.entry[i].resource.date + "<br>";
											tmp1 = tmp1 + "<b>Vaccine Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data1.entry[i].resource.vaccineCode.text + "</a>";
											tmp1 = tmp1 + "<br></p>";
										}					
									}
						
									$("#colpre3").append(tmp1);
                            
                                    url = epicUri + "/Immunization?patient=" + epicID;
                                    $.ajax({
                                        url: url,
                                        type: "GET",
                                        dataType: "json",
                                        headers: {
                                            "Accept": "application/json+fhir",
                                        },
                                    }).done(function(pt){
										$("#collapse23").css("display","block");

										data2 = JSON.parse(JSON.stringify(pt));
							
										tmp2 = "";
										
										data2.entry.sort(function(a,b) { 
											return new Date(b.resource.date).getTime() - new Date(a.resource.date).getTime() 
										});
							
										var len = data2.entry.length;
							
										for(var i=0; i<len; i++) {
											if(data2.entry[i].resource.resourceType == "Immunization") {
												tmp2 = tmp2 + "<p><b>Date: </b>" + data2.entry[i].resource.date + "<br>";
												tmp2 = tmp2 + "<b>Vaccine Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data2.entry[i].resource.vaccineCode.text + "</a>";
												tmp2 = tmp2 + "<br></p>";
											}
										}
							
										$("#colpre23").append(tmp2);
							
							
										$("#collapse33").css("display","block");
										
										var tmp3="";
							
										var len1=0;
										var len2=0;
										
										while(len1<data1.entry.length && len2<data2.entry.length) {
											if(new Date(data1.entry[len1].resource.date).getTime() - new Date(data2.entry[len2].resource.date).getTime() < 0) {
												if(data2.entry[len2].resource.resourceType == "Immunization") {
													tmp3 = tmp3 + "<div style='color:#0000FF'>";
													tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.date + "<br>";
												tmp3 = tmp3 + "<b>Vaccine Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data2.entry[len2].resource.vaccineCode.text + "</a>";
													tmp3 = tmp3 + "<br></p></div>";
												}
												len2++;
											} else {
												if(data1.entry[len1].resource.resourceType == "Immunization") {
													tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.date + "<br>";
													tmp3 = tmp3 + "<b>Vaccine Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data1.entry[len1].resource.vaccineCode.text + "</a>";
													tmp3 = tmp3 + "<br></p>";
												}
												len1++;
											}
										}
										
										while(len1<data1.entry.length) {
											if(data1.entry[len1].resource.resourceType == "Immunization") {
												tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.date + "<br>";
												tmp3 = tmp3 + "<b>Vaccine Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data1.entry[len1].resource.vaccineCode.text + "</a>";
												tmp3 = tmp3 + "<br></p>";
											}
											len1++;
										}
										
										while(len2<data2.entry.length) {
											if(data2.entry[len2].resource.resourceType == "Immunization") {
												tmp3 = tmp3 + "<div style='color:#0000FF'>";
												tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.date + "<br>";
												tmp3 = tmp3 + "<b>Vaccine Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data2.entry[len2].resource.vaccineCode.text + "</a>";
												tmp3 = tmp3 + "<br></p></div>";
											}
											len2++;
										}
										
										
                    					$("#colpre33").append(tmp3);
                                
                                
                                
                                
                                
                                        url = serviceUri + "/AllergyIntolerance?patient=" + 4342008;
                                        $.ajax({
                                            url: url,
                                            type: "GET",
                                            dataType: "json",
                                            headers: {
                                                "Accept": "application/json+fhir",
                                                "Authorization": "Bearer " + accessToken
                                            },
                                        }).done(function(pt){
											$("#collapse4").css("display","block");
											data1 = JSON.parse(JSON.stringify(pt));
						
											tmp1 = "";
											
											data1.entry.sort(function(a,b) { 
												return new Date(b.resource.recordedDate).getTime() - new Date(a.resource.recordedDate).getTime() 
											});
						
											var len = data1.entry.length;
											for(var i=0; i<len; i++) {
												tmp1 = tmp1 + "<p><b>Date: </b>" + data1.entry[i].resource.recordedDate + "<br>";
												tmp1 = tmp1 + "<b>Substance: </b>" + data1.entry[i].resource.substance.text + "<br>";
												if(data1.entry[i].resource.reaction) {
													tmp1 = tmp1 + "<b>Reaction: </b>" + data1.entry[i].resource.reaction[0].manifestation[0].text;
												}
												tmp1 = tmp1 + "<br></p>";
											}
						
											$("#colpre4").append(tmp1);
                    
                            
                                            url = epicUri + "/AllergyIntolerance?patient=" + epicID;
                                            $.ajax({
                                                url: url,
                                                type: "GET",
                                                dataType: "json",
                                                headers: {
                                                    "Accept": "application/json+fhir",
                                                },
                                            }).done(function(pt){
												$("#collapse24").css("display","block");
									
							
												data2 = JSON.parse(JSON.stringify(pt));
							
												tmp2 = "";
												
												data2.entry.sort(function(a,b) { 
													return new Date(b.resource.recordedDate).getTime() - new Date(a.resource.recordedDate).getTime() 
												});
							
												var len = data2.entry.length;
							
												for(var i=0; i<len; i++) {
													tmp2 = tmp2 + "<p><b>Date: </b>" + data2.entry[i].resource.recordedDate + "<br>";
													tmp2 = tmp2 + "<b>Substance: </b>" + data2.entry[i].resource.substance.text + "<br>";
													tmp2 = tmp2 + "<b>Reaction: </b>" + data2.entry[i].resource.reaction[0].manifestation[0].text;
													tmp2 = tmp2 + "<br></p>";
												}
							
												$("#colpre24").append(tmp2);
							
							
												$("#collapse34").css("display","block");
												
												var tmp3="";
							
												var len1=0;
												var len2=0;
												
												while(len1<data1.entry.length && len2<data2.entry.length) {
													if(new Date(data1.entry[len1].resource.recordedDate).getTime() - new Date(data2.entry[len2].resource.recordedDate).getTime() < 0) {
														tmp3 = tmp3 + "<div style='color:#0000FF'>";
														tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.recordedDate + "<br>";
														tmp3 = tmp3 + "<b>Substance: </b>" + data2.entry[len2].resource.substance.text + "<br>";
														tmp3 = tmp3 + "<b>Reaction: </b>" + data2.entry[len2].resource.reaction[0].manifestation[0].text;
														tmp3 = tmp3 + "<br></p></div>";
														len2++;
													} else {
														tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.recordedDate + "<br>";
														tmp3 = tmp3 + "<b>Substance: </b>" + data1.entry[len1].resource.substance.text + "<br>";
														if(data1.entry[len1].resource.reaction) {
															tmp3 = tmp3 + "<b>Reaction: </b>" + data1.entry[len1].resource.reaction[0].manifestation[0].text;
														}
														tmp3 = tmp3 + "<br></p>";
														len1++;
													}
												}
												
												while(len1<data1.entry.length) {
													tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.recordedDate + "<br>";
													tmp3 = tmp3 + "<b>Substance: </b>" + data1.entry[len1].resource.substance.text + "<br>";
													if(data1.entry[len1].resource.reaction) {
														tmp3 = tmp3 + "<b>Reaction: </b>" + data1.entry[len1].resource.reaction[0].manifestation[0].text;
													}
													tmp3 = tmp3 + "<br></p>";
													len1++;
												}
												
												while(len2<data2.entry.length) {
													tmp3 = tmp3 + "<div style='color:#0000FF'>";
													tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.recordedDate + "<br>";
													tmp3 = tmp3 + "<b>Substance: </b>" + data2.entry[len2].resource.substance.text + "<br>";
													tmp3 = tmp3 + "<b>Reaction: </b>" + data2.entry[len2].resource.reaction[0].manifestation[0].text;
													tmp3 = tmp3 + "<br></p></div>";
													len2++;
												}
												
												
												$("#colpre34").append(tmp3);
													
												
												
												
												
												
												url = serviceUri + "/Condition?patient=" + 4342008;
												$.ajax({
													url: url,
													type: "GET",
													dataType: "json",
													headers: {
														"Accept": "application/json+fhir",
														"Authorization": "Bearer " + accessToken
													},
												}).done(function(pt){
													$("#collapse5").css("display","block");
													data1 = JSON.parse(JSON.stringify(pt));
						
													tmp1 = "";
													
													data1.entry.sort(function(a,b) { 
														if(a.resource.onsetDateTime && b.resource.onsetDateTime) {
															return new Date(b.resource.onsetDateTime).getTime() - new Date(a.resource.onsetDateTime).getTime() 
														} else if(a.resource.onsetDateTime) {
															return -1;
														} else {
															return 1;
														}
													});
						
													var len = data1.entry.length;
													for(var i=0; i<len; i++) {
														tmp1 = tmp1 + "<p><b>" + data1.entry[i].resource.category.text + ": </b>" + data1.entry[i].resource.code.text + "<br>";
														tmp1 = tmp1 + "<b>ClinicalStatus: </b>" + data1.entry[i].resource.clinicalStatus + "<br>";
														tmp1 = tmp1 + "<b>VerificationStatus: </b>" + data1.entry[i].resource.verificationStatus + "<br>";
														tmp1 = tmp1 + "<b>Onset: </b>" + data1.entry[i].resource.onsetDateTime;
														tmp1 = tmp1 + "<br></p>";					
													}
						
													$("#colpre5").append(tmp1);
					
							
													url = epicUri + "/Condition?patient=" + epicID;
													$.ajax({
														url: url,
														type: "GET",
														dataType: "json",
														headers: {
															"Accept": "application/json+fhir",
														},
													}).done(function(pt){
														$("#collapse25").css("display","block");
									
							
														data2 = JSON.parse(JSON.stringify(pt));
							
														tmp2 = "";
														
														data2.entry.sort(function(a,b) { 
															if(a.resource.onsetDateTime && b.resource.onsetDateTime) {
																return new Date(b.resource.onsetDateTime).getTime() - new Date(a.resource.onsetDateTime).getTime() 
															} else if(a.resource.onsetDateTime) {
																return -1;
															} else {
																return 1;
															}
														});
							
														var len = data2.entry.length;
							
														for(var i=0; i<len; i++) {
															tmp2 = tmp2 + "<p><b>" + data2.entry[i].resource.category.text + ": </b>" + data2.entry[i].resource.code.text + "<br>";
															tmp2 = tmp2 + "<b>ClinicalStatus: </b>" + data2.entry[i].resource.clinicalStatus + "<br>";
															tmp2 = tmp2 + "<b>VerificationStatus: </b>" + data2.entry[i].resource.verificationStatus + "<br>";
															tmp2 = tmp2 + "<b>Onset: </b>" + data2.entry[i].resource.onsetDateTime;
															tmp2 = tmp2 + "<br></p>";
														}
							
														$("#colpre25").append(tmp2);
							
							
														$("#collapse35").css("display","block");
														
														var tmp3="";
							
														var len1=0;
														var len2=0;
														
														while(len1<data1.entry.length && len2<data2.entry.length) {
															if(data1.entry[len1].resource.onsetDateTime && data2.entry[len2].resource.onsetDateTime) {
																if(new Date(data1.entry[len1].resource.onsetDateTime).getTime() - new Date(data2.entry[len2].resource.onsetDateTime).getTime() < 0) {
																	tmp3 = tmp3 + "<div style='color:#0000FF'>";
																	tmp3 = tmp3 + "<p><b>" + data2.entry[len2].resource.category.text + ": </b>" + data2.entry[len2].resource.code.text + "<br>";
																	tmp3 = tmp3 + "<b>ClinicalStatus: </b>" + data2.entry[len2].resource.clinicalStatus + "<br>";
																	tmp3 = tmp3 + "<b>VerificationStatus: </b>" + data2.entry[len2].resource.verificationStatus + "<br>";
																	tmp3 = tmp3 + "<b>Onset: </b>" + data2.entry[len2].resource.onsetDateTime;
																	tmp3 = tmp3 + "<br></p></div>";
																	len2++;
																} else {
																	tmp3 = tmp3 + "<p><b>" + data1.entry[len1].resource.category.text + ": </b>" + data1.entry[len1].resource.code.text + "<br>";
																	tmp3 = tmp3 + "<b>ClinicalStatus: </b>" + data1.entry[len1].resource.clinicalStatus + "<br>";
																	tmp3 = tmp3 + "<b>VerificationStatus: </b>" + data1.entry[len1].resource.verificationStatus + "<br>";
																	tmp3 = tmp3 + "<b>Onset: </b>" + data1.entry[len1].resource.onsetDateTime;
																	tmp3 = tmp3 + "<br></p>";	
																	len1++;
																}
															} else if(data1.entry[len1].resource.onsetDateTime) {
																tmp3 = tmp3 + "<p><b>" + data1.entry[len1].resource.category.text + ": </b>" + data1.entry[len1].resource.code.text + "<br>";
																tmp3 = tmp3 + "<b>ClinicalStatus: </b>" + data1.entry[len1].resource.clinicalStatus + "<br>";
																tmp3 = tmp3 + "<b>VerificationStatus: </b>" + data1.entry[len1].resource.verificationStatus + "<br>";
																tmp3 = tmp3 + "<b>Onset: </b>" + data1.entry[len1].resource.onsetDateTime;
																tmp3 = tmp3 + "<br></p>";	
																len1++;
															} else {
																tmp3 = tmp3 + "<div style='color:#0000FF'>";
																tmp3 = tmp3 + "<p><b>" + data2.entry[len2].resource.category.text + ": </b>" + data2.entry[len2].resource.code.text + "<br>";
																tmp3 = tmp3 + "<b>ClinicalStatus: </b>" + data2.entry[len2].resource.clinicalStatus + "<br>";
																tmp3 = tmp3 + "<b>VerificationStatus: </b>" + data2.entry[len2].resource.verificationStatus + "<br>";
																tmp3 = tmp3 + "<b>Onset: </b>" + data2.entry[len2].resource.onsetDateTime;
																tmp3 = tmp3 + "<br></p></div>";
																len2++;
															}
														}
														
														while(len1<data1.entry.length) {
															tmp3 = tmp3 + "<p><b>" + data1.entry[len1].resource.category.text + ": </b>" + data1.entry[len1].resource.code.text + "<br>";
															tmp3 = tmp3 + "<b>ClinicalStatus: </b>" + data1.entry[len1].resource.clinicalStatus + "<br>";
															tmp3 = tmp3 + "<b>VerificationStatus: </b>" + data1.entry[len1].resource.verificationStatus + "<br>";
															tmp3 = tmp3 + "<b>Onset: </b>" + data1.entry[len1].resource.onsetDateTime;
															tmp3 = tmp3 + "<br></p>";	
															len1++;
														}
														
														while(len2<data2.entry.length) {
															tmp3 = tmp3 + "<div style='color:#0000FF'>";
															tmp3 = tmp3 + "<p><b>" + data2.entry[len2].resource.category.text + ": </b>" + data2.entry[len2].resource.code.text + "<br>";
															tmp3 = tmp3 + "<b>ClinicalStatus: </b>" + data2.entry[len2].resource.clinicalStatus + "<br>";
															tmp3 = tmp3 + "<b>VerificationStatus: </b>" + data2.entry[len2].resource.verificationStatus + "<br>";
															tmp3 = tmp3 + "<b>Onset: </b>" + data2.entry[len2].resource.onsetDateTime;
															tmp3 = tmp3 + "<br></p></div>";
															len2++;
														}
														
														$("#colpre35").append(tmp3);
													
												
												
												
												
														url = serviceUri + "/Observation?patient=" + patientId;
														$.ajax({
															url: url,
															type: "GET",
															dataType: "json",
															headers: {
																"Accept": "application/json+fhir",
																"Authorization": "Bearer " + accessToken
															},
														}).done(function(pt){
															$("#collapse6").css("display","block");
															data1 = JSON.parse(JSON.stringify(pt));
						
															tmp1 = "";
						
															data1.entry.sort(function(a,b) { 
																if(b.resource.effectiveDateTime && a.resource.effectiveDateTime) {
																	return new Date(b.resource.effectiveDateTime).getTime() - new Date(a.resource.effectiveDateTime).getTime() 
																} else if (a.resource.effectiveDateTime) {
																	return -1;
																} else {
																	return 1;
																}
															});
						
															var len = data1.entry.length;
															for(var i=0; i<len; i++) {
																tmp1 = tmp1 + "<p><b>Date: </b>" + data1.entry[i].resource.effectiveDateTime + "<br>";
																tmp1 = tmp1 + "<b>Status: </b>" + data1.entry[i].resource.status + "<br>";
																tmp1 = tmp1 + "<b>Type: </b>" + data1.entry[i].resource.code.text + "<br>";
																if(data1.entry[i].resource.valueCodeableConcept) {
																	tmp1 = tmp1 + "<b>Result: </b>" + data1.entry[i].resource.valueCodeableConcept.text + "<br>";
																}
																if(data1.entry[i].resource.valueQuantity) {
																	tmp1 = tmp1 + "<b>Result: </b>" + data1.entry[i].resource.valueQuantity.value + " " + data1.entry[i].resource.valueQuantity.unit + "<br>";
																}
																tmp1 = tmp1 + "</p>";						
															}
						
															$("#colpre6").append(tmp1);
					
							
															url = epicUri + "/Observation?patient=" + epicID + "&code=8310-5";
															$.ajax({
																url: url,
																type: "GET",
																dataType: "json",
																headers: {
																	"Accept": "application/json+fhir",
																},
															}).done(function(pt){
																$("#collapse26").css("display","block");
									
							
																data2 = JSON.parse(JSON.stringify(pt));
							
																tmp2 = "";
																
																data2.entry.sort(function(a,b) { 
																	if(b.resource.effectiveDateTime && a.resource.effectiveDateTime) {
																		return new Date(b.resource.effectiveDateTime).getTime() - new Date(a.resource.effectiveDateTime).getTime() 
																	} else if (a.resource.effectiveDateTime) {
																		return -1;
																	} else {
																		return 1;
																	}
																});
							
																var len = data2.entry.length;
							
																for(var i=0; i<len; i++) {
																	tmp2 = tmp2 + "<p><b>Date: </b>" + data2.entry[i].resource.effectiveDateTime + "<br>";
																	tmp2 = tmp2 + "<b>Status: </b>" + data2.entry[i].resource.status + "<br>";
																	tmp2 = tmp2 + "<b>Type: </b>" + data2.entry[i].resource.code.coding[0].display + "<br>";
																	tmp2 = tmp2 + "<b>Result: </b>" + data2.entry[i].resource.valueQuantity.value + " " + data2.entry[i].resource.valueQuantity.unit;
																	tmp2 = tmp2 + "<br></p>";
																}
							
																$("#colpre26").append(tmp2);
							
							
																$("#collapse36").css("display","block");
																
																var tmp3="";
							
																var len1=0;
																var len2=0;
																
																while(len1<data1.entry.length && len2<data2.entry.length) {
																	if(data1.entry[len1].resource.effectiveDateTime && data2.entry[len2].resource.effectiveDateTime) {
																		if(new Date(data1.entry[len1].resource.effectiveDateTime).getTime() - new Date(data2.entry[len2].resource.effectiveDateTime).getTime() < 0) {
																			tmp3 = tmp3 + "<div style='color:#0000FF'>";
																			tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.effectiveDateTime + "<br>";
																			tmp3 = tmp3 + "<b>Status: </b>" + data2.entry[len2].resource.status + "<br>";
																			tmp3 = tmp3 + "<b>Type: </b>" + data2.entry[len2].resource.code.coding[0].display + "<br>";
																			tmp3 = tmp3 + "<b>Result: </b>" + data2.entry[len2].resource.valueQuantity.value + " " + data2.entry[len2].resource.valueQuantity.unit;
																			tmp3 = tmp3 + "<br></p></div>";
																			len2++;
																		} else {
																			tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.effectiveDateTime + "<br>";
																			tmp3 = tmp3 + "<b>Status: </b>" + data1.entry[len1].resource.status + "<br>";
																			tmp3 = tmp3 + "<b>Type: </b>" + data1.entry[len1].resource.code.text + "<br>";
																			if(data1.entry[len1].resource.valueCodeableConcept) {
																				tmp3 = tmp3 + "<b>Result: </b>" + data1.entry[len1].resource.valueCodeableConcept.text + "<br>";
																			}
																			if(data1.entry[len1].resource.valueQuantity) {
																				tmp3 = tmp3 + "<b>Result: </b>" + data1.entry[len1].resource.valueQuantity.value + " " + data1.entry[len1].resource.valueQuantity.unit + "<br>";
																			}
																			tmp3 = tmp3 + "<br></p>";
																			len1++;
																		}
																	} else if (data1.entry[len1].resource.effectiveDateTime) {
																		tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.effectiveDateTime + "<br>";
																		tmp3 = tmp3 + "<b>Status: </b>" + data1.entry[len1].resource.status + "<br>";
																		tmp3 = tmp3 + "<b>Type: </b>" + data1.entry[len1].resource.code.text + "<br>";
																		if(data1.entry[len1].resource.valueCodeableConcept) {
																			tmp3 = tmp3 + "<b>Result: </b>" + data1.entry[len1].resource.valueCodeableConcept.text + "<br>";
																		}
																		if(data1.entry[len1].resource.valueQuantity) {
																			tmp3 = tmp3 + "<b>Result: </b>" + data1.entry[len1].resource.valueQuantity.value + " " + data1.entry[len1].resource.valueQuantity.unit + "<br>";
																		}
																		tmp3 = tmp3 + "<br></p>";
																		len1++;
																	} else {
																		tmp3 = tmp3 + "<div style='color:#0000FF'>";
																		tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.effectiveDateTime + "<br>";
																		tmp3 = tmp3 + "<b>Status: </b>" + data2.entry[len2].resource.status + "<br>";
																		tmp3 = tmp3 + "<b>Type: </b>" + data2.entry[len2].resource.code.coding[0].display + "<br>";
																		tmp3 = tmp3 + "<b>Result: </b>" + data2.entry[len2].resource.valueQuantity.value + " " + data2.entry[len2].resource.valueQuantity.unit;
																		tmp3 = tmp3 + "<br></p></div>";
																		len2++;
																	}
																}
																
																while(len1<data1.entry.length) {
																	tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.effectiveDateTime + "<br>";
																	tmp3 = tmp3 + "<b>Status: </b>" + data1.entry[len1].resource.status + "<br>";
																	tmp3 = tmp3 + "<b>Type: </b>" + data1.entry[len1].resource.code.text + "<br>";
																	if(data1.entry[len1].resource.valueCodeableConcept) {
																		tmp3 = tmp3 + "<b>Result: </b>" + data1.entry[len1].resource.valueCodeableConcept.text + "<br>";
																	}
																	if(data1.entry[len1].resource.valueQuantity) {
																		tmp3 = tmp3 + "<b>Result: </b>" + data1.entry[len1].resource.valueQuantity.value + " " + data1.entry[len1].resource.valueQuantity.unit + "<br>";
																	}
																	tmp3 = tmp3 + "<br></p>";
																	len1++;
																}
																
																while(len2<data2.entry.length) {
																	tmp3 = tmp3 + "<div style='color:#0000FF'>";
																	tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.effectiveDateTime + "<br>";
																	tmp3 = tmp3 + "<b>Status: </b>" + data2.entry[len2].resource.status + "<br>";
																	tmp3 = tmp3 + "<b>Type: </b>" + data2.entry[len2].resource.code.coding[0].display + "<br>";
																	tmp3 = tmp3 + "<b>Result: </b>" + data2.entry[len2].resource.valueQuantity.value + " " + data2.entry[len2].resource.valueQuantity.unit;
																	tmp3 = tmp3 + "<br></p></div>";
																	len2++;
																}
																
																$("#colpre36").append(tmp3);
													
												
												
												
												
												
																url = serviceUri + "/DiagnosticReport?patient=" + patientId;
																$.ajax({
																	url: url,
																	type: "GET",
																	dataType: "json",
																	headers: {
																		"Accept": "application/json+fhir",
																		"Authorization": "Bearer " + accessToken
																	},
																}).done(function(pt){
																	$("#collapse7").css("display","block");
																	data1 = JSON.parse(JSON.stringify(pt));
						
																	tmp1 = "";
																	
																	data1.entry.sort(function(a,b) { 
																		return new Date(b.resource.issued).getTime() - new Date(a.resource.issued).getTime() 
																	});
						
																	var len = data1.entry.length;
																	for(var i=0; i<len; i++) {
																		tmp1 = tmp1 + "<p><b>Date: </b>" + data1.entry[i].resource.issued + "<br>";
																		tmp1 = tmp1 + "<b>Code: </b>" + data1.entry[i].resource.code.text + "<br>";
																		tmp1 = tmp1 + "<b>Performer: </b>" + data1.entry[i].resource.performer.display + "<br>";
																		tmp1 = tmp1 + "<b>Status: </b>" + data1.entry[i].resource.status + "<br>";
																		tmp1 = tmp1 + "</p>";				
																	}
						
																	$("#colpre7").append(tmp1);
					
							
																	url = epicUri + "/DiagnosticReport?patient=" + epicID;
																	$.ajax({
																		url: url,
																		type: "GET",
																		dataType: "json",
																		headers: {
																			"Accept": "application/json+fhir",
																		},
																	}).done(function(pt){
																		$("#collapse27").css("display","block");
									
							
																		data2 = JSON.parse(JSON.stringify(pt));
							
																		tmp2 = "";
																		
																		data2.entry.sort(function(a,b) { 
																			return new Date(b.resource.issued).getTime() - new Date(a.resource.issued).getTime() 
																		});
							
																		var len = data2.entry.length;
							
																		for(var i=0; i<len; i++) {
																			tmp2 = tmp2 + "<p><b>Date: </b>" + data2.entry[i].resource.issued + "<br>";
																			tmp2 = tmp2 + "<b>Code: </b>" + data2.entry[i].resource.code.text + "<br>";
																			tmp2 = tmp2 + "<b>Performer: </b>" + data2.entry[i].resource.performer.display + "<br>";
																			tmp2 = tmp2 + "<b>Status: </b>" + data2.entry[i].resource.status + "<br>";
								
																			var tmps = "";
								
																			tmp2 = tmp2 + tmps;
																			tmp2 = tmp2 + "<br></p>";
																		}
							
																		$("#colpre27").append(tmp2);
							
							
																		$("#collapse37").css("display","block");
																		
																		var tmp3="";
							
																		var len1=0;
																		var len2=0;
																		
																		while(len1<data1.entry.length && len2<data2.entry.length) {
																			if(new Date(data1.entry[len1].resource.issued).getTime() - new Date(data2.entry[len2].resource.issued).getTime() < 0) {
																				tmp3 = tmp3 + "<div style='color:#0000FF'>";
																				tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.issued + "<br>";
																				tmp3 = tmp3 + "<b>Code: </b>" + data2.entry[len2].resource.code.text + "<br>";
																				tmp3 = tmp3 + "<b>Performer: </b>" + data2.entry[len2].resource.performer.display + "<br>";
																				tmp3 = tmp3 + "<b>Status: </b>" + data2.entry[len2].resource.status + "<br>";
																				
																				var tmps = "";
																				var lens = data2.entry[len2].resource.result.length;
																				for(var j=0; j<lens; j++) {
																					tmps = tmps + "<b>Result: </b>" + data2.entry[len2].resource.result[j].display + "<br>";
																				}
																			
																				tmp3 = tmp3 + tmps;
																				tmp3 = tmp3 + "<br></p></div>";
																				len2++;
																			} else {
																				tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.issued + "<br>";
																				tmp3 = tmp3 + "<b>Code: </b>" + data1.entry[len1].resource.code.text + "<br>";
																				tmp3 = tmp3 + "<b>Performer: </b>" + data1.entry[len1].resource.performer.display + "<br>";
																				tmp3 = tmp3 + "<b>Status: </b>" + data1.entry[len1].resource.status + "<br>";
																				tmp3 = tmp3 + "<br></p>";
																				len1++;
																			}
																		}
																		
																		while(len1<data1.entry.length) {
																			tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.issued + "<br>";
																			tmp3 = tmp3 + "<b>Code: </b>" + data1.entry[len1].resource.code.text + "<br>";
																			tmp3 = tmp3 + "<b>Performer: </b>" + data1.entry[len1].resource.performer.display + "<br>";
																			tmp3 = tmp3 + "<b>Status: </b>" + data1.entry[len1].resource.status + "<br>";
																			tmp3 = tmp3 + "<br></p>";
																			len1++;
																		}
																		
																		while(len2<data2.entry.length) {
																			tmp3 = tmp3 + "<div style='color:#0000FF'>";
																			tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.issued + "<br>";
																			tmp3 = tmp3 + "<b>Code: </b>" + data2.entry[len2].resource.code.text + "<br>";
																			tmp3 = tmp3 + "<b>Performer: </b>" + data2.entry[len2].resource.performer.display + "<br>";
																			tmp3 = tmp3 + "<b>Status: </b>" + data2.entry[len2].resource.status + "<br>";
																			
																			var tmps = "";
																			var lens = data2.entry[len2].resource.result.length;
																			for(var j=0; j<lens; j++) {
																				tmps = tmps + "<b>Result: </b>" + data2.entry[len2].resource.result[j].display + "<br>";
																			}
																			
																			tmp3 = tmp3 + tmps;
																			tmp3 = tmp3 + "<br></p></div>";
																			len2++;
																		}
																		
																		
																		$("#colpre37").append(tmp3);
													
												
												
												
																		$('#download_button').removeClass("disabled");
																		$('#progress').hide();
																		$('#progress').removeClass('col-md-2');
																		$('#blue').css("display","block");
																		$('#blue').addClass('col-md-2');
																		$('#progress2').hide();
																		$('#progress2').removeClass('col-md-2');
																		$('#blue2').css("display","block");
																		$('#blue2').addClass('col-md-2');
												
												
												
												
												
												
												

																	});
																});

															});
														});

													});
												});

                                            });
                                        });
                
                                    });
                                });
                
                            });
                
                        });

                    });
                });
			} else {
			    var colnum1;
                var clnpre1;
                var colnum2;
                var clnpre2;
                var colnum3;
                var clnpre3;
                var url1;
                var url2;
                var data1;
                var data2;
                var tmp1;
                var tmp2;
        
                if(data_type == "Patient") {
                    url1 = serviceUri + "/Patient/" + patientId;
                    url2 = epicUri + "/Patient/" + epicID;
                    colnum1 = "#collapse1";
                    clnpre1 = "#colpre1";
                    colnum2 = "#collapse21";
                    clnpre2 = "#colpre21";
                    colnum3 = "#collapse31";
                    clnpre3 = "#colpre31";
                    
                    
                    $.ajax({
                    url: url1,
                    type: "GET",
                    dataType: "json",
                    headers: {
					    "Accept": "application/json+fhir",
                        "Authorization": "Bearer " + accessToken
                    },
					}).done(function(pt){
						$('#paraData').hide();
						$(colnum1).css("display","block");
						data1 = JSON.parse(JSON.stringify(pt));
						
						$(clnpre1).append("<div class='row'><div class = 'col-md-3'><img src='./face3.jpg' /></div></div><br><div>" + data1.text.div + "</div>");
						
					
						$.ajax({
							url: url2,
							type: "GET",
							dataType: "json",
							headers: {
								"Accept": "application/json+fhir",
							},
						}).done(function(pt){
							$('#paraData2').hide();
							$(colnum2).css("display","block");
							
							data2 = JSON.parse(JSON.stringify(pt));
							
							var tmp = "<div><p><b>Name: </b>" + data2.name[0].given[0] + " " + data2.name[0].family[0];
							tmp = tmp + "<br>" + "<b>Gender: </b>" + data2.gender;
							tmp = tmp + "<br>" + "<b>BirthDate: </b>" + data2.birthDate;
							tmp = tmp + "</p></div>";
							
							$(clnpre2).append("<div class='row'><div class = 'col-md-3'><img src='./face4.jpg' /></div></div><br>" + tmp);
							
							
							
							$('#paraData3').hide();
							$(colnum3).css("display","block");
                    		$(clnpre3).append("<div class='row'><div class = 'col-md-3'><img src='./face3.jpg' /></div><div class = 'col-md-3 col-md-offset-2'><img src='./face4.jpg' /></div></div><br><div>" + data1.text.div + "</div>");
                    		
						
						
							$('#download_button').removeClass("disabled");
							$('#progress').hide();
							$('#progress').removeClass('col-md-2');
							$('#blue').css("display","block");
							$('#blue').addClass('col-md-2');
							$('#progress2').hide();
							$('#progress2').removeClass('col-md-2');
							$('#blue2').css("display","block");
							$('#blue2').addClass('col-md-2');
				
						});
				
					});
                    
                    
                    
                    
                    
                } else if(data_type == "MedicationOrder"){
                    url1 = serviceUri + "/" + data_type + "?patient=" + 4342008;
                    url2 = epicUri + "/" + data_type + "?patient=" + epicID;
                    colnum1 = "#collapse2";
                    clnpre1 = "#colpre2";
                    colnum2 = "#collapse22";
                    clnpre2 = "#colpre22";
                    colnum3 = "#collapse32";
                    clnpre3 = "#colpre32";
                    
                    
                    
                    $.ajax({
                    url: url1,
                    type: "GET",
                    dataType: "json",
                    headers: {
					    "Accept": "application/json+fhir",
                        "Authorization": "Bearer " + accessToken
                    },
					}).done(function(pt){
						$('#paraData').hide();
						$(colnum1).css("display","block");
						data1 = JSON.parse(JSON.stringify(pt));
						
						tmp1 = "";
						
						data1.entry.sort(function(a,b) { 
							if(b.resource.dateWritten && a.resource.dateWritten) {
								return new Date(b.resource.dateWritten).getTime() - new Date(a.resource.dateWritten).getTime();
							} else if (a.resource.dateWritten) {
								return -1;
							} else {
								return 1;
							}
						});
						
						var len = data1.entry.length;
						for(var i=0; i<len; i++) {
							tmp1 = tmp1 + "<p><b>Date: </b>" + data1.entry[i].resource.dateWritten + "<br>";
							tmp1 = tmp1 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data1.entry[i].resource.medicationCodeableConcept.text + "</a>";
							tmp1 = tmp1 + "<br>" + "<b>Dosage Instructions: </b>" + data1.entry[i].resource.dosageInstruction[0].text;
							tmp1 = tmp1 + "<br></p>";								
						}
						
						$(clnpre1).append(tmp1);
					
						$.ajax({
							url: url2,
							type: "GET",
							dataType: "json",
							headers: {
								"Accept": "application/json+fhir",
							},
						}).done(function(pt){
							$('#paraData2').hide();
							$(colnum2).css("display","block");
							
							
							
							data2 = JSON.parse(JSON.stringify(pt));
							
							tmp2="";
							
							data2.entry.sort(function(a,b) { 
								if(b.resource.dateWritten && a.resource.dateWritten) {
									return new Date(b.resource.dateWritten).getTime() - new Date(a.resource.dateWritten).getTime();
								} else if (a.resource.dateWritten) {
									return -1;
								} else {
									return 1;
								} 
							});
							
							var len = data2.entry.length;
							for(var i=0; i<len; i++) {
								tmp2 = tmp2 + "<p><b>Date: </b>" + data2.entry[i].resource.dateWritten + "<br>";
								tmp2 = tmp2 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data2.entry[i].resource.medicationReference.display + "</a>";
								tmp2 = tmp2 + "<br>" + "<b>Dosage Instructions: </b>" + data2.entry[i].resource.dosageInstruction[0].text;
								tmp2 = tmp2 + "<br></p>";				
							}
							
							$(clnpre2).append(tmp2);
							
							
							
							$('#paraData3').hide();
							$(colnum3).css("display","block");
							
							var tmp3="";
							
							var len1=0;
							var len2=0;
							
							while(len1<data1.entry.length && len2<data2.entry.length) {
								if(data1.entry[len1].resource.dateWritten && data2.entry[len2].resource.dateWritten) {
									if(new Date(data1.entry[len1].resource.dateWritten).getTime() - new Date(data2.entry[len2].resource.dateWritten).getTime() < 0) {
										tmp3 = tmp3 + "<div style='color:#0000FF'>";
										tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.dateWritten + "<br>";
										tmp3 = tmp3 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data2.entry[len2].resource.medicationReference.display + "</a>";
										tmp3 = tmp3 + "<br>" + "<b>Dosage Instructions: </b>" + data2.entry[len2].resource.dosageInstruction[0].text;
										tmp3 = tmp3 + "<br></p></div>";
										len2++;
									} else {
										tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.dateWritten + "<br>";
										tmp3 = tmp3 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data1.entry[len1].resource.medicationCodeableConcept.text + "</a>";
										tmp3 = tmp3 + "<br>" + "<b>Dosage Instructions: </b>" + data1.entry[len1].resource.dosageInstruction[0].text;
										tmp3 = tmp3 + "<br></p>";
										len1++;
									}
								} else if(data1.entry[len1].resource.dateWritten) {
									tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.dateWritten + "<br>";
									tmp3 = tmp3 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data1.entry[len1].resource.medicationCodeableConcept.text + "</a>";
									tmp3 = tmp3 + "<br>" + "<b>Dosage Instructions: </b>" + data1.entry[len1].resource.dosageInstruction[0].text;
									tmp3 = tmp3 + "<br></p>";
									len1++;
								} else {
									tmp3 = tmp3 + "<div style='color:#0000FF'>";
									tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.dateWritten + "<br>";
									tmp3 = tmp3 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data2.entry[len2].resource.medicationReference.display + "</a>";
									tmp3 = tmp3 + "<br>" + "<b>Dosage Instructions: </b>" + data2.entry[len2].resource.dosageInstruction[0].text;
									tmp3 = tmp3 + "<br></p></div>";
									len2++;
								}
							}
							
							while(len1<data1.entry.length) {
								tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.dateWritten + "<br>";
								tmp3 = tmp3 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data1.entry[len1].resource.medicationCodeableConcept.text + "</a>";
								tmp3 = tmp3 + "<br>" + "<b>Dosage Instructions: </b>" + data1.entry[len1].resource.dosageInstruction[0].text;
								tmp3 = tmp3 + "<br></p>";
								len1++;
							}
							
							while(len2<data2.entry.length) {
								tmp3 = tmp3 + "<div style='color:#0000FF'>";
								tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.dateWritten + "<br>";
								tmp3 = tmp3 + "<b>Medication Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data2.entry[len2].resource.medicationReference.display + "</a>";
								tmp3 = tmp3 + "<br>" + "<b>Dosage Instructions: </b>" + data2.entry[len2].resource.dosageInstruction[0].text;
								tmp3 = tmp3 + "<br></p></div>";
								len2++;
							}
							
                    		$(clnpre3).append(tmp3);
						
						
						
							$('#download_button').removeClass("disabled");
							$('#progress').hide();
							$('#progress').removeClass('col-md-2');
							$('#blue').css("display","block");
							$('#blue').addClass('col-md-2');
							$('#progress2').hide();
							$('#progress2').removeClass('col-md-2');
							$('#blue2').css("display","block");
							$('#blue2').addClass('col-md-2');
				
						});
				
					});
                    
                    
                    
                    
                } else if(data_type == "Immunization"){
                    url1 = serviceUri + "/" + data_type + "?patient=" + 4342009;
                    url2 = epicUri + "/" + data_type + "?patient=" + epicID;
                    colnum1 = "#collapse3";
                    clnpre1 = "#colpre3";
                    colnum2 = "#collapse23";
                    clnpre2 = "#colpre23";
                    colnum3 = "#collapse33";
                    clnpre3 = "#colpre33";
                    
                    
                    
                    $.ajax({
                    url: url1,
                    type: "GET",
                    dataType: "json",
                    headers: {
					    "Accept": "application/json+fhir",
                        "Authorization": "Bearer " + accessToken
                    },
					}).done(function(pt){
						$('#paraData').hide();
						$(colnum1).css("display","block");
						data1 = JSON.parse(JSON.stringify(pt));
						
						tmp1 = "";
						
						data1.entry.sort(function(a,b) { 
							return new Date(b.resource.date).getTime() - new Date(a.resource.date).getTime() 
						});
						
						var len = data1.entry.length;
						for(var i=0; i<len; i++) {
							if(data1.entry[i].resource.resourceType == "Immunization") {
								tmp1 = tmp1 + "<p><b>Date: </b>" + data1.entry[i].resource.date + "<br>";
								tmp1 = tmp1 + "<b>Vaccine Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data1.entry[i].resource.vaccineCode.text + "</a>";
								tmp1 = tmp1 + "<br></p>";
							}					
						}
						
						$(clnpre1).append(tmp1);
						
						
						$.ajax({
							url: url2,
							type: "GET",
							dataType: "json",
							headers: {
								"Accept": "application/json+fhir",
							},
						}).done(function(pt){
							$('#paraData2').hide();
							$(colnum2).css("display","block");
							
							
							
							data2 = JSON.parse(JSON.stringify(pt));
							
							tmp2 = "";
							
							data2.entry.sort(function(a,b) { 
								return new Date(b.resource.date).getTime() - new Date(a.resource.date).getTime() 
							});
							
							var len = data2.entry.length;
							
							for(var i=0; i<len; i++) {
								if(data2.entry[i].resource.resourceType == "Immunization") {
									tmp2 = tmp2 + "<p><b>Date: </b>" + data2.entry[i].resource.date + "<br>";
									tmp2 = tmp2 + "<b>Vaccine Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data2.entry[i].resource.vaccineCode.text + "</a>";
									tmp2 = tmp2 + "<br></p>";
								}
							}
							
							$(clnpre2).append(tmp2);
							
							
							
							$('#paraData3').hide();
							$(colnum3).css("display","block");
							
							var tmp3="";
							
							var len1=0;
							var len2=0;
							
							while(len1<data1.entry.length && len2<data2.entry.length) {
								if(new Date(data1.entry[len1].resource.date).getTime() - new Date(data2.entry[len2].resource.date).getTime() < 0) {
									if(data2.entry[len2].resource.resourceType == "Immunization") {
										tmp3 = tmp3 + "<div style='color:#0000FF'>";
										tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.date + "<br>";
										tmp3 = tmp3 + "<b>Vaccine Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data2.entry[len2].resource.vaccineCode.text + "</a>";
										tmp3 = tmp3 + "<br></p></div>";
									}
									len2++;
								} else {
									if(data1.entry[len1].resource.resourceType == "Immunization") {
										tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.date + "<br>";
										tmp3 = tmp3 + "<b>Vaccine Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data1.entry[len1].resource.vaccineCode.text + "</a>";
										tmp3 = tmp3 + "<br></p>";
									}
									len1++;
								}
							}
							
							while(len1<data1.entry.length) {
								if(data1.entry[len1].resource.resourceType == "Immunization") {
									tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.date + "<br>";
									tmp3 = tmp3 + "<b>Vaccine Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data1.entry[len1].resource.vaccineCode.text + "</a>";
									tmp3 = tmp3 + "<br></p>";
								}
								len1++;
							}
							
							while(len2<data2.entry.length) {
								if(data2.entry[len2].resource.resourceType == "Immunization") {
									tmp3 = tmp3 + "<div style='color:#0000FF'>";
									tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.date + "<br>";
									tmp3 = tmp3 + "<b>Vaccine Name: </b><a href='#' data-toggle='tooltip' title='More details...TBD'>" + data2.entry[len2].resource.vaccineCode.text + "</a>";
									tmp3 = tmp3 + "<br></p></div>";
								}
								len2++;
							}
							
                    		$(clnpre3).append(tmp3);
							
							
						
						
						
							$('#download_button').removeClass("disabled");
							$('#progress').hide();
							$('#progress').removeClass('col-md-2');
							$('#blue').css("display","block");
							$('#blue').addClass('col-md-2');
							$('#progress2').hide();
							$('#progress2').removeClass('col-md-2');
							$('#blue2').css("display","block");
							$('#blue2').addClass('col-md-2');
				
						});
				
					});
                    
                    
                    
                    
                } else if(data_type == "AllergyIntolerance"){
                    url1 = serviceUri + "/" + data_type + "?patient=" + 4342008;
                    url2 = epicUri + "/" + data_type + "?patient=" + epicID;
                    colnum1 = "#collapse4";
                    clnpre1 = "#colpre4";
                    colnum2 = "#collapse24";
                    clnpre2 = "#colpre24";
                    colnum3 = "#collapse34";
                    clnpre3 = "#colpre34";
                    
                    
                    $.ajax({
                    url: url1,
                    type: "GET",
                    dataType: "json",
                    headers: {
					    "Accept": "application/json+fhir",
                        "Authorization": "Bearer " + accessToken
                    },
					}).done(function(pt){
						$('#paraData').hide();
						$(colnum1).css("display","block");
						data1 = JSON.parse(JSON.stringify(pt));
						
						tmp1 = "";
						
						data1.entry.sort(function(a,b) { 
							return new Date(b.resource.recordedDate).getTime() - new Date(a.resource.recordedDate).getTime() 
						});
						
						var len = data1.entry.length;
						for(var i=0; i<len; i++) {
							tmp1 = tmp1 + "<p><b>Date: </b>" + data1.entry[i].resource.recordedDate + "<br>";
							tmp1 = tmp1 + "<b>Substance: </b>" + data1.entry[i].resource.substance.text + "<br>";
							if(data1.entry[i].resource.reaction) {
								tmp1 = tmp1 + "<b>Reaction: </b>" + data1.entry[i].resource.reaction[0].manifestation[0].text;
							}
							tmp1 = tmp1 + "<br></p>";
						}
						
						$(clnpre1).append(tmp1);
					
						$.ajax({
							url: url2,
							type: "GET",
							dataType: "json",
							headers: {
								"Accept": "application/json+fhir",
							},
						}).done(function(pt){
							$('#paraData2').hide();
							$(colnum2).css("display","block");
							
							
							data2 = JSON.parse(JSON.stringify(pt));
							
							tmp2 = "";
							
							data2.entry.sort(function(a,b) { 
								return new Date(b.resource.recordedDate).getTime() - new Date(a.resource.recordedDate).getTime() 
							});
							
							var len = data2.entry.length;
							
							for(var i=0; i<len; i++) {
								tmp2 = tmp2 + "<p><b>Date: </b>" + data2.entry[i].resource.recordedDate + "<br>";
								tmp2 = tmp2 + "<b>Substance: </b>" + data2.entry[i].resource.substance.text + "<br>";
								tmp2 = tmp2 + "<b>Reaction: </b>" + data2.entry[i].resource.reaction[0].manifestation[0].text;
								tmp2 = tmp2 + "<br></p>";
							}
							
							$(clnpre2).append(tmp2);
							
							
							
							$('#paraData3').hide();
							$(colnum3).css("display","block");
							
							
							var tmp3="";
							
							var len1=0;
							var len2=0;
							
							while(len1<data1.entry.length && len2<data2.entry.length) {
								if(new Date(data1.entry[len1].resource.recordedDate).getTime() - new Date(data2.entry[len2].resource.recordedDate).getTime() < 0) {
									tmp3 = tmp3 + "<div style='color:#0000FF'>";
									tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.recordedDate + "<br>";
									tmp3 = tmp3 + "<b>Substance: </b>" + data2.entry[len2].resource.substance.text + "<br>";
									tmp3 = tmp3 + "<b>Reaction: </b>" + data2.entry[len2].resource.reaction[0].manifestation[0].text;
									tmp3 = tmp3 + "<br></p></div>";
									len2++;
								} else {
									tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.recordedDate + "<br>";
									tmp3 = tmp3 + "<b>Substance: </b>" + data1.entry[len1].resource.substance.text + "<br>";
									if(data1.entry[len1].resource.reaction) {
										tmp3 = tmp3 + "<b>Reaction: </b>" + data1.entry[len1].resource.reaction[0].manifestation[0].text;
									}
									tmp3 = tmp3 + "<br></p>";
									len1++;
								}
							}
							
							while(len1<data1.entry.length) {
								tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.recordedDate + "<br>";
								tmp3 = tmp3 + "<b>Substance: </b>" + data1.entry[len1].resource.substance.text + "<br>";
								if(data1.entry[len1].resource.reaction) {
									tmp3 = tmp3 + "<b>Reaction: </b>" + data1.entry[len1].resource.reaction[0].manifestation[0].text;
								}
								tmp3 = tmp3 + "<br></p>";
								len1++;
							}
							
							while(len2<data2.entry.length) {
								tmp3 = tmp3 + "<div style='color:#0000FF'>";
								tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.recordedDate + "<br>";
								tmp3 = tmp3 + "<b>Substance: </b>" + data2.entry[len2].resource.substance.text + "<br>";
								tmp3 = tmp3 + "<b>Reaction: </b>" + data2.entry[len2].resource.reaction[0].manifestation[0].text;
								tmp3 = tmp3 + "<br></p></div>";
								len2++;
							}
							
                    		$(clnpre3).append(tmp3);
						
						
						
						
							$('#download_button').removeClass("disabled");
							$('#progress').hide();
							$('#progress').removeClass('col-md-2');
							$('#blue').css("display","block");
							$('#blue').addClass('col-md-2');
							$('#progress2').hide();
							$('#progress2').removeClass('col-md-2');
							$('#blue2').css("display","block");
							$('#blue2').addClass('col-md-2');
				
						});
				
					});
                    
                    
                    
                    
                } else if(data_type == "Condition"){
                    url1 = serviceUri + "/" + data_type + "?patient=" + 4342008;
                    url2 = epicUri + "/" + data_type + "?patient=" + epicID;
                    colnum1 = "#collapse5";
                    clnpre1 = "#colpre5";
                    colnum2 = "#collapse25";
                    clnpre2 = "#colpre25";
                    colnum3 = "#collapse35";
                    clnpre3 = "#colpre35";
                    
                    
                    $.ajax({
                    url: url1,
                    type: "GET",
                    dataType: "json",
                    headers: {
					    "Accept": "application/json+fhir",
                        "Authorization": "Bearer " + accessToken
                    },
					}).done(function(pt){
						$('#paraData').hide();
						$(colnum1).css("display","block");
						data1 = JSON.parse(JSON.stringify(pt));
						
						tmp1 = "";
						
						data1.entry.sort(function(a,b) { 
							if(a.resource.onsetDateTime && b.resource.onsetDateTime) {
								return new Date(b.resource.onsetDateTime).getTime() - new Date(a.resource.onsetDateTime).getTime() 
							} else if(a.resource.onsetDateTime) {
								return -1;
							} else {
								return 1;
							}
						});
						
						var len = data1.entry.length;
						for(var i=0; i<len; i++) {
							tmp1 = tmp1 + "<p><b>" + data1.entry[i].resource.category.text + ": </b>" + data1.entry[i].resource.code.text + "<br>";
							tmp1 = tmp1 + "<b>ClinicalStatus: </b>" + data1.entry[i].resource.clinicalStatus + "<br>";
							tmp1 = tmp1 + "<b>VerificationStatus: </b>" + data1.entry[i].resource.verificationStatus + "<br>";
							tmp1 = tmp1 + "<b>Onset: </b>" + data1.entry[i].resource.onsetDateTime;
							tmp1 = tmp1 + "<br></p>";				
						}
						
						$(clnpre1).append(tmp1);
					
						$.ajax({
							url: url2,
							type: "GET",
							dataType: "json",
							headers: {
								"Accept": "application/json+fhir",
							},
						}).done(function(pt){
							$('#paraData2').hide();
							$(colnum2).css("display","block");
							
							data2 = JSON.parse(JSON.stringify(pt));
							
							tmp2 = "";
							
							data2.entry.sort(function(a,b) { 
								if(a.resource.onsetDateTime && b.resource.onsetDateTime) {
									return new Date(b.resource.onsetDateTime).getTime() - new Date(a.resource.onsetDateTime).getTime() 
								} else if(a.resource.onsetDateTime) {
									return -1;
								} else {
									return 1;
								}
							});
							
							var len = data2.entry.length;
							
							for(var i=0; i<len; i++) {
								tmp2 = tmp2 + "<p><b>" + data2.entry[i].resource.category.text + ": </b>" + data2.entry[i].resource.code.text + "<br>";
								tmp2 = tmp2 + "<b>ClinicalStatus: </b>" + data2.entry[i].resource.clinicalStatus + "<br>";
								tmp2 = tmp2 + "<b>VerificationStatus: </b>" + data2.entry[i].resource.verificationStatus + "<br>";
								tmp2 = tmp2 + "<b>Onset: </b>" + data2.entry[i].resource.onsetDateTime;
								tmp2 = tmp2 + "<br></p>";
							}
							
							$(clnpre2).append(tmp2);
							
							
							
							$('#paraData3').hide();
							$(colnum3).css("display","block");
							
							var tmp3="";
							
							var len1=0;
							var len2=0;
							
							while(len1<data1.entry.length && len2<data2.entry.length) {
								if(data1.entry[len1].resource.onsetDateTime && data2.entry[len2].resource.onsetDateTime) {
									if(new Date(data1.entry[len1].resource.onsetDateTime).getTime() - new Date(data2.entry[len2].resource.onsetDateTime).getTime() < 0) {
										tmp3 = tmp3 + "<div style='color:#0000FF'>";
										tmp3 = tmp3 + "<p><b>" + data2.entry[len2].resource.category.text + ": </b>" + data2.entry[len2].resource.code.text + "<br>";
										tmp3 = tmp3 + "<b>ClinicalStatus: </b>" + data2.entry[len2].resource.clinicalStatus + "<br>";
										tmp3 = tmp3 + "<b>VerificationStatus: </b>" + data2.entry[len2].resource.verificationStatus + "<br>";
										tmp3 = tmp3 + "<b>Onset: </b>" + data2.entry[len2].resource.onsetDateTime;
										tmp3 = tmp3 + "<br></p></div>";
										len2++;
									} else {
										tmp3 = tmp3 + "<p><b>" + data1.entry[len1].resource.category.text + ": </b>" + data1.entry[len1].resource.code.text + "<br>";
										tmp3 = tmp3 + "<b>ClinicalStatus: </b>" + data1.entry[len1].resource.clinicalStatus + "<br>";
										tmp3 = tmp3 + "<b>VerificationStatus: </b>" + data1.entry[len1].resource.verificationStatus + "<br>";
										tmp3 = tmp3 + "<b>Onset: </b>" + data1.entry[len1].resource.onsetDateTime;
										tmp3 = tmp3 + "<br></p>";	
										len1++;
									}
								} else if(data1.entry[len1].resource.onsetDateTime) {
									tmp3 = tmp3 + "<p><b>" + data1.entry[len1].resource.category.text + ": </b>" + data1.entry[len1].resource.code.text + "<br>";
									tmp3 = tmp3 + "<b>ClinicalStatus: </b>" + data1.entry[len1].resource.clinicalStatus + "<br>";
									tmp3 = tmp3 + "<b>VerificationStatus: </b>" + data1.entry[len1].resource.verificationStatus + "<br>";
									tmp3 = tmp3 + "<b>Onset: </b>" + data1.entry[len1].resource.onsetDateTime;
									tmp3 = tmp3 + "<br></p>";	
									len1++;
								} else {
									tmp3 = tmp3 + "<div style='color:#0000FF'>";
									tmp3 = tmp3 + "<p><b>" + data2.entry[len2].resource.category.text + ": </b>" + data2.entry[len2].resource.code.text + "<br>";
									tmp3 = tmp3 + "<b>ClinicalStatus: </b>" + data2.entry[len2].resource.clinicalStatus + "<br>";
									tmp3 = tmp3 + "<b>VerificationStatus: </b>" + data2.entry[len2].resource.verificationStatus + "<br>";
									tmp3 = tmp3 + "<b>Onset: </b>" + data2.entry[len2].resource.onsetDateTime;
									tmp3 = tmp3 + "<br></p></div>";
									len2++;
								}
							}
							
							while(len1<data1.entry.length) {
								tmp3 = tmp3 + "<p><b>" + data1.entry[len1].resource.category.text + ": </b>" + data1.entry[len1].resource.code.text + "<br>";
								tmp3 = tmp3 + "<b>ClinicalStatus: </b>" + data1.entry[len1].resource.clinicalStatus + "<br>";
								tmp3 = tmp3 + "<b>VerificationStatus: </b>" + data1.entry[len1].resource.verificationStatus + "<br>";
								tmp3 = tmp3 + "<b>Onset: </b>" + data1.entry[len1].resource.onsetDateTime;
								tmp3 = tmp3 + "<br></p>";	
								len1++;
							}
							
							while(len2<data2.entry.length) {
								tmp3 = tmp3 + "<div style='color:#0000FF'>";
								tmp3 = tmp3 + "<p><b>" + data2.entry[len2].resource.category.text + ": </b>" + data2.entry[len2].resource.code.text + "<br>";
								tmp3 = tmp3 + "<b>ClinicalStatus: </b>" + data2.entry[len2].resource.clinicalStatus + "<br>";
								tmp3 = tmp3 + "<b>VerificationStatus: </b>" + data2.entry[len2].resource.verificationStatus + "<br>";
								tmp3 = tmp3 + "<b>Onset: </b>" + data2.entry[len2].resource.onsetDateTime;
								tmp3 = tmp3 + "<br></p></div>";
								len2++;
							}
							
                    		$(clnpre3).append(tmp3);
							
							
						
							$('#download_button').removeClass("disabled");
							$('#progress').hide();
							$('#progress').removeClass('col-md-2');
							$('#blue').css("display","block");
							$('#blue').addClass('col-md-2');
							$('#progress2').hide();
							$('#progress2').removeClass('col-md-2');
							$('#blue2').css("display","block");
							$('#blue2').addClass('col-md-2');
				
						});
				
					});
                    
                    
                    
                } else if(data_type == "Observation"){
                    url1 = serviceUri + "/" + data_type + "?patient=" + patientId;
                    url2 = epicUri + "/" + data_type + "?patient=" + epicID + "&code=8310-5";
                    colnum1 = "#collapse6";
                    clnpre1 = "#colpre6";
                    colnum2 = "#collapse26";
                    clnpre2 = "#colpre26";
                    colnum3 = "#collapse36";
                    clnpre3 = "#colpre36";
                    
                    
                    $.ajax({
                    url: url1,
                    type: "GET",
                    dataType: "json",
                    headers: {
					    "Accept": "application/json+fhir",
                        "Authorization": "Bearer " + accessToken
                    },
					}).done(function(pt){
						$('#paraData').hide();
						$(colnum1).css("display","block");
						data1 = JSON.parse(JSON.stringify(pt));
						
						tmp1 = "";
						
						data1.entry.sort(function(a,b) { 
							if(b.resource.effectiveDateTime && a.resource.effectiveDateTime) {
								return new Date(b.resource.effectiveDateTime).getTime() - new Date(a.resource.effectiveDateTime).getTime() 
							} else if (a.resource.effectiveDateTime) {
								return -1;
							} else {
								return 1;
							}
						});
						
						var len = data1.entry.length;
						for(var i=0; i<len; i++) {
							tmp1 = tmp1 + "<p><b>Date: </b>" + data1.entry[i].resource.effectiveDateTime + "<br>";
							tmp1 = tmp1 + "<b>Status: </b>" + data1.entry[i].resource.status + "<br>";
							tmp1 = tmp1 + "<b>Type: </b>" + data1.entry[i].resource.code.text + "<br>";
							if(data1.entry[i].resource.valueCodeableConcept) {
								tmp1 = tmp1 + "<b>Result: </b>" + data1.entry[i].resource.valueCodeableConcept.text + "<br>";
							}
							if(data1.entry[i].resource.valueQuantity) {
								tmp1 = tmp1 + "<b>Result: </b>" + data1.entry[i].resource.valueQuantity.value + " " + data1.entry[i].resource.valueQuantity.unit + "<br>";
							}
							tmp1 = tmp1 + "</p>";
						}
						
						$(clnpre1).append(tmp1);
					
						$.ajax({
							url: url2,
							type: "GET",
							dataType: "json",
							headers: {
								"Accept": "application/json+fhir",
							},
						}).done(function(pt){
							$('#paraData2').hide();
							$(colnum2).css("display","block");
							data2 = JSON.parse(JSON.stringify(pt));
							
							tmp2 = "";
							
							data2.entry.sort(function(a,b) { 
								if(b.resource.effectiveDateTime && a.resource.effectiveDateTime) {
									return new Date(b.resource.effectiveDateTime).getTime() - new Date(a.resource.effectiveDateTime).getTime() 
								} else if (a.resource.effectiveDateTime) {
									return -1;
								} else {
									return 1;
								} 
							});
							
							var len = data2.entry.length;
							
							for(var i=0; i<len; i++) {
								tmp2 = tmp2 + "<p><b>Date: </b>" + data2.entry[i].resource.effectiveDateTime + "<br>";
								tmp2 = tmp2 + "<b>Status: </b>" + data2.entry[i].resource.status + "<br>";
								tmp2 = tmp2 + "<b>Type: </b>" + data2.entry[i].resource.code.coding[0].display + "<br>";
								tmp2 = tmp2 + "<b>Result: </b>" + data2.entry[i].resource.valueQuantity.value + " " + data2.entry[i].resource.valueQuantity.unit;
								tmp2 = tmp2 + "<br></p>";
							}
							
							$(clnpre2).append(tmp2);
							
							
							
							$('#paraData3').hide();
							$(colnum3).css("display","block");
							
							
                    		var tmp3="";
							
							var len1=0;
							var len2=0;
							
							while(len1<data1.entry.length && len2<data2.entry.length) {
								if(data1.entry[len1].resource.effectiveDateTime && data2.entry[len2].resource.effectiveDateTime) {
									if(new Date(data1.entry[len1].resource.effectiveDateTime).getTime() - new Date(data2.entry[len2].resource.effectiveDateTime).getTime() < 0) {
										tmp3 = tmp3 + "<div style='color:#0000FF'>";
										tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.effectiveDateTime + "<br>";
										tmp3 = tmp3 + "<b>Status: </b>" + data2.entry[len2].resource.status + "<br>";
										tmp3 = tmp3 + "<b>Type: </b>" + data2.entry[len2].resource.code.coding[0].display + "<br>";
										tmp3 = tmp3 + "<b>Result: </b>" + data2.entry[len2].resource.valueQuantity.value + " " + data2.entry[len2].resource.valueQuantity.unit;
										tmp3 = tmp3 + "<br></p></div>";
										len2++;
									} else {
										tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.effectiveDateTime + "<br>";
										tmp3 = tmp3 + "<b>Status: </b>" + data1.entry[len1].resource.status + "<br>";
										tmp3 = tmp3 + "<b>Type: </b>" + data1.entry[len1].resource.code.text + "<br>";
										if(data1.entry[len1].resource.valueCodeableConcept) {
											tmp3 = tmp3 + "<b>Result: </b>" + data1.entry[len1].resource.valueCodeableConcept.text + "<br>";
										}
										if(data1.entry[len1].resource.valueQuantity) {
											tmp3 = tmp3 + "<b>Result: </b>" + data1.entry[len1].resource.valueQuantity.value + " " + data1.entry[len1].resource.valueQuantity.unit + "<br>";
										}
										tmp3 = tmp3 + "<br></p>";
										len1++;
									}
								} else if (data1.entry[len1].resource.effectiveDateTime) {
									tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.effectiveDateTime + "<br>";
									tmp3 = tmp3 + "<b>Status: </b>" + data1.entry[len1].resource.status + "<br>";
									tmp3 = tmp3 + "<b>Type: </b>" + data1.entry[len1].resource.code.text + "<br>";
									if(data1.entry[len1].resource.valueCodeableConcept) {
										tmp3 = tmp3 + "<b>Result: </b>" + data1.entry[len1].resource.valueCodeableConcept.text + "<br>";
									}
									if(data1.entry[len1].resource.valueQuantity) {
										tmp3 = tmp3 + "<b>Result: </b>" + data1.entry[len1].resource.valueQuantity.value + " " + data1.entry[len1].resource.valueQuantity.unit + "<br>";
									}
									tmp3 = tmp3 + "<br></p>";
									len1++;
								} else {
									tmp3 = tmp3 + "<div style='color:#0000FF'>";
									tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.effectiveDateTime + "<br>";
									tmp3 = tmp3 + "<b>Status: </b>" + data2.entry[len2].resource.status + "<br>";
									tmp3 = tmp3 + "<b>Type: </b>" + data2.entry[len2].resource.code.coding[0].display + "<br>";
									tmp3 = tmp3 + "<b>Result: </b>" + data2.entry[len2].resource.valueQuantity.value + " " + data2.entry[len2].resource.valueQuantity.unit;
									tmp3 = tmp3 + "<br></p></div>";
									len2++;
								}
							}
							
							while(len1<data1.entry.length) {
								tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.effectiveDateTime + "<br>";
								tmp3 = tmp3 + "<b>Status: </b>" + data1.entry[len1].resource.status + "<br>";
								tmp3 = tmp3 + "<b>Type: </b>" + data1.entry[len1].resource.code.text + "<br>";
								if(data1.entry[len1].resource.valueCodeableConcept) {
									tmp3 = tmp3 + "<b>Result: </b>" + data1.entry[len1].resource.valueCodeableConcept.text + "<br>";
								}
								if(data1.entry[len1].resource.valueQuantity) {
									tmp3 = tmp3 + "<b>Result: </b>" + data1.entry[len1].resource.valueQuantity.value + " " + data1.entry[len1].resource.valueQuantity.unit + "<br>";
								}
								tmp3 = tmp3 + "<br></p>";
								len1++;
							}
							
							while(len2<data2.entry.length) {
								tmp3 = tmp3 + "<div style='color:#0000FF'>";
								tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.effectiveDateTime + "<br>";
								tmp3 = tmp3 + "<b>Status: </b>" + data2.entry[len2].resource.status + "<br>";
								tmp3 = tmp3 + "<b>Type: </b>" + data2.entry[len2].resource.code.coding[0].display + "<br>";
								tmp3 = tmp3 + "<b>Result: </b>" + data2.entry[len2].resource.valueQuantity.value + " " + data2.entry[len2].resource.valueQuantity.unit;
								tmp3 = tmp3 + "<br></p></div>";
								len2++;
							}
							
                    		$(clnpre3).append(tmp3);
							
						
						
							$('#download_button').removeClass("disabled");
							$('#progress').hide();
							$('#progress').removeClass('col-md-2');
							$('#blue').css("display","block");
							$('#blue').addClass('col-md-2');
							$('#progress2').hide();
							$('#progress2').removeClass('col-md-2');
							$('#blue2').css("display","block");
							$('#blue2').addClass('col-md-2');
				
						});
				
					});
                    
                    
                    
                    
                } else if(data_type == "DiagnosticReport"){
                    url1 = serviceUri + "/" + data_type + "?patient=" + patientId;
                    url2 = epicUri + "/" + data_type + "?patient=" + epicID;
                    colnum1 = "#collapse7";
                    clnpre1 = "#colpre7";
                    colnum2 = "#collapse27";
                    clnpre2 = "#colpre27";
                    colnum3 = "#collapse37";
                    clnpre3 = "#colpre37";
                    
                    
                    
                    
                    $.ajax({
                    url: url1,
                    type: "GET",
                    dataType: "json",
                    headers: {
					    "Accept": "application/json+fhir",
                        "Authorization": "Bearer " + accessToken
                    },
					}).done(function(pt){
						$('#paraData').hide();
						$(colnum1).css("display","block");
						data1 = JSON.parse(JSON.stringify(pt));
						
						tmp1 = "";
						
						data1.entry.sort(function(a,b) { 
							return new Date(b.resource.issued).getTime() - new Date(a.resource.issued).getTime() 
						});
						
						var len = data1.entry.length;
						for(var i=0; i<len; i++) {
							tmp1 = tmp1 + "<p><b>Date: </b>" + data1.entry[i].resource.issued + "<br>";
							tmp1 = tmp1 + "<b>Code: </b>" + data1.entry[i].resource.code.text + "<br>";
							tmp1 = tmp1 + "<b>Performer: </b>" + data1.entry[i].resource.performer.display + "<br>";
							tmp1 = tmp1 + "<b>Status: </b>" + data1.entry[i].resource.status + "<br>";
							tmp1 = tmp1 + "</p>";
						}
						
						$(clnpre1).append(tmp1);
					
						$.ajax({
							url: url2,
							type: "GET",
							dataType: "json",
							headers: {
								"Accept": "application/json+fhir",
							},
						}).done(function(pt){
							$('#paraData2').hide();
							$(colnum2).css("display","block");
							data2 = JSON.parse(JSON.stringify(pt));
							
							tmp2 = "";
							
							data2.entry.sort(function(a,b) { 
								return new Date(b.resource.issued).getTime() - new Date(a.resource.issued).getTime() 
							});
							
							var len = data2.entry.length;
							
							for(var i=0; i<len; i++) {
								tmp2 = tmp2 + "<p><b>Date: </b>" + data2.entry[i].resource.issued + "<br>";
								tmp2 = tmp2 + "<b>Code: </b>" + data2.entry[i].resource.code.text + "<br>";
								tmp2 = tmp2 + "<b>Performer: </b>" + data2.entry[i].resource.performer.display + "<br>";
								tmp2 = tmp2 + "<b>Status: </b>" + data2.entry[i].resource.status + "<br>";
								
								var tmps = "";
								var lens = data2.entry[i].resource.result.length;
								for(var j=0; j<lens; j++) {
									tmps = tmps + "<b>Result: </b>" + data2.entry[i].resource.result[j].display + "<br>";
								}
								
								tmp2 = tmp2 + tmps;
								tmp2 = tmp2 + "<br></p>";
							}
							
							$(clnpre2).append(tmp2);
							
							
							
							$('#paraData3').hide();
							$(colnum3).css("display","block");
                    		
							
							
							var tmp3="";
							
							var len1=0;
							var len2=0;
							
							while(len1<data1.entry.length && len2<data2.entry.length) {
								if(new Date(data1.entry[len1].resource.issued).getTime() - new Date(data2.entry[len2].resource.issued).getTime() < 0) {
									tmp3 = tmp3 + "<div style='color:#0000FF'>";
									tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.issued + "<br>";
									tmp3 = tmp3 + "<b>Code: </b>" + data2.entry[len2].resource.code.text + "<br>";
									tmp3 = tmp3 + "<b>Performer: </b>" + data2.entry[len2].resource.performer.display + "<br>";
									tmp3 = tmp3 + "<b>Status: </b>" + data2.entry[len2].resource.status + "<br>";
									
									var tmps = "";
									var lens = data2.entry[len2].resource.result.length;
									for(var j=0; j<lens; j++) {
										tmps = tmps + "<b>Result: </b>" + data2.entry[len2].resource.result[j].display + "<br>";
									}
								
									tmp3 = tmp3 + tmps;
									tmp3 = tmp3 + "<br></p></div>";
									len2++;
								} else {
									tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.issued + "<br>";
									tmp3 = tmp3 + "<b>Code: </b>" + data1.entry[len1].resource.code.text + "<br>";
									tmp3 = tmp3 + "<b>Performer: </b>" + data1.entry[len1].resource.performer.display + "<br>";
									tmp3 = tmp3 + "<b>Status: </b>" + data1.entry[len1].resource.status + "<br>";
									tmp3 = tmp3 + "<br></p>";
									len1++;
								}
							}
							
							while(len1<data1.entry.length) {
								tmp3 = tmp3 + "<p><b>Date: </b>" + data1.entry[len1].resource.issued + "<br>";
								tmp3 = tmp3 + "<b>Code: </b>" + data1.entry[len1].resource.code.text + "<br>";
								tmp3 = tmp3 + "<b>Performer: </b>" + data1.entry[len1].resource.performer.display + "<br>";
								tmp3 = tmp3 + "<b>Status: </b>" + data1.entry[len1].resource.status + "<br>";
								tmp3 = tmp3 + "<br></p>";
								len1++;
							}
							
							while(len2<data2.entry.length) {
								tmp3 = tmp3 + "<div style='color:#0000FF'>";
								tmp3 = tmp3 + "<p><b>Date: </b>" + data2.entry[len2].resource.issued + "<br>";
								tmp3 = tmp3 + "<b>Code: </b>" + data2.entry[len2].resource.code.text + "<br>";
								tmp3 = tmp3 + "<b>Performer: </b>" + data2.entry[len2].resource.performer.display + "<br>";
								tmp3 = tmp3 + "<b>Status: </b>" + data2.entry[len2].resource.status + "<br>";
								
								var tmps = "";
								var lens = data2.entry[len2].resource.result.length;
								for(var j=0; j<lens; j++) {
									tmps = tmps + "<b>Result: </b>" + data2.entry[len2].resource.result[j].display + "<br>";
								}
								
								tmp3 = tmp3 + tmps;
								tmp3 = tmp3 + "<br></p></div>";
								len2++;
							}
							
                    		$(clnpre3).append(tmp3);
							
						
						
							$('#download_button').removeClass("disabled");
							$('#progress').hide();
							$('#progress').removeClass('col-md-2');
							$('#blue').css("display","block");
							$('#blue').addClass('col-md-2');
							$('#progress2').hide();
							$('#progress2').removeClass('col-md-2');
							$('#blue2').css("display","block");
							$('#blue2').addClass('col-md-2');
				
						});
				
					});
                    
                    
                    
                }
			    
			    
			
			
			}
			
		}//end for epic non-auth test
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



$('#example-selectAllValue').multiselect({
    includeSelectAllOption: true,
    selectAllValue: 'select-all-value'
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

