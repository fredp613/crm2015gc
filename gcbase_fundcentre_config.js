function formLoad() {

	Xrm.Page.getAttribute("statuscode").setSubmitMode("always");
	var currentState = Xrm.Page.getAttribute("statuscode").getValue()  //.setValue(148030011);

	console.log(Xrm.Page.getAttribute("statuscode").getValue())
		            

	
	if (currentState != 148030011 && currentState != 148030013 && currentState != 148030014 && currentState != 148030015) {
		Xrm.Page.ui.setFormNotification("This fund is not activated therefore new funding cases cannot be created with this fund","WARNING", "1");
		Xrm.Page.ui.process.setVisible(true);
		// disableHeaderFields()
		registerBusinessProcessEvents()
		registerCustomOnChangeEvents()
		// Xrm.Page.data.entity.addOnSave(disableHeaderFields);
		// Xrm.Page.data.process.addOnStageChange(disableHeaderFields);		
		// Xrm.Page.data.process.addOnStageSelected(disableHeaderFields);
		
	} else {
		// var parameters = {};
		// parameters["formid"] = "C88E2ED5-641A-476B-B390-6F49C1C2972F";
		// var _formId = Xrm.Page.ui.formSelector.getCurrentItem().getId();
		// parameters["formid"] = "C88E2ED5-641A-476B-B390-6F49C1C2972F";	
		// Xrm.Page.ui.setFormNotification("This funding case is in post-decision state. Therefore (if approved), payments can be made","WARNING", "1");
		// if (_formId != parameters["formid"].toLowerCase()) {
		// 	Xrm.Utility.openEntityForm("gcbase_fundingcase", _entityId, parameters, windowOptions);
		// }  

		if (currentState == 148030015) {
			Xrm.Page.ui.setFormNotification("This fund is currently on-hold therefore new funding cases cannot be created with this fund","WARNING", "1");
		} 

		var entityId = Xrm.Page.data.entity.getId()
		Xrm.Page.ui.process.setVisible(false);

		// Xrm.Page.ui.clearFormNotification("1")
		var date = new Date()
		var today = date.getDate();
		var enddatex = Xrm.Page.getAttribute("gcbase_enddate").getValue();
		var startdatex = Xrm.Page.getAttribute("gcbase_startdate").getValue();
		var enddate = enddatex.getDate();
		var startdate = startdatex.getDate();
		

		if (enddatex < date) {
			console.log(date)
			console.log(enddatex)
			// set expired
			Xrm.Page.getAttribute("statuscode").setValue(148030014) 
			Xrm.Page.ui.setFormNotification("This fund is no longer active, the end date has passed  New applications cannot be created under this fund centre","WARNING", "2");
		} else {
			console.log(today)
			console.log("jane")
			Xrm.Page.ui.clearFormNotification("2")

		}
		if (startdatex > date) {
			console.log(date)
			console.log(startdatex)
			//set pending
			Xrm.Page.getAttribute("statuscode").setValue(148030013) 
			Xrm.Page.ui.setFormNotification("This fund is not yet active, the start date is greater than today. New applications cannot be created under this fund centre","WARNING", "3");
		} else {
			console.log("ross")
			Xrm.Page.ui.clearFormNotification("3")
		}
	}
}


function registerBusinessProcessEvents() {

	// var originalNextStageHandler = $("#stageAdvanceActionContainer").data("events")["click"][0].handler;	
	// var originalBackStageHandler = $("#stageBackActionContainer").data("events")["click"][0].handler;

	// $("#stageAdvanceActionContainer").unbind("click");
	// $("#stageBackActionContainer").unbind("click");


	// $(document).on("click", "#stageAdvanceActionContainer", function(e) {

	// 	console.log("next stage clicked")
	// 	var errors = $(".ms-crm-Inline-WarningIcon:visible")
	// 	 console.log(errors.length)
	// 	 if (errors.length > 0) {
	// 		console.log("unbind")
	// 	 } else {
	// 	 	var status = $("#header_statuscode_i").attr("defaultvalue")
	// 	 	 $("#header_statuscode").attr("data-raw", status)
	// 	 	   $("#header_statuscode_i").attr("defaultselected", status)


	// 	 	$.proxy(originalNextStageHandler, $("#stageAdvanceActionContainer"))(e);

	// 	 	setTimeout(function() { 
		 	  
	// 	 	  console.log(status)
		 	 
	// 	 	   // Xrm.Page.getAttribute("gcbase_processstagename").fireOnChange()
	// 	 	   Xrm.Page.getAttribute("statuscode").fireOnChange()   
	// 	 	   // 	Xrm.Page.data.refresh(true)	
	// 	 	    // Xrm.Page.data.entity.save()
	// 	   	},7000)
		   	
	// 	 }					
	// })


	// $(document).on("click", "#stageBackActionContainer", function(e) {
		
	// 	console.log("back stage clicked")
	// 	var errors = $(".ms-crm-Inline-WarningIcon:visible")
		 
	// 	 console.log(errors.length)
	// 	 if (errors.length > 0) {
	// 		console.log("unbind")
	// 	 } else {

	// 	 	$.proxy(originalBackStageHandler, $("#stageBackActionContainer"))(e);
	// 	 	var status = $("#header_statuscode_i").attr("defaultvalue")
	// 	 	setTimeout(function() { 
	// 	 		// Xrm.Page.data.entity.save()	
	// 	   	// Xrm.Utility.openEntityForm("gcbase_fundcentre", entityId);
		   	 
	// 	 	  console.log(status)
	// 	 	  $("#header_statuscode").attr("data-raw", status)
	// 	 	   $("#header_statuscode_i").attr("defaultselected", status)
	// 	 	   // Xrm.Page.getAttribute("gcbase_processstagename").fireOnChange()
	// 	 	   Xrm.Page.getAttribute("statuscode").fireOnChange()
	// 	 	   // Xrm.Page.data.refresh(true)
	// 	 	   // Xrm.Page.data.entity.save()				 		
	// 	   	},500)

		   	
	//    	 }			

	// })


}

// function disableHeaderFields() {
// 	 console.log("this is an alert")
// 	 var fieldContainers = document.getElementsByClassName("processStepLabel")
// 	  for(var i=0; i < fieldContainers.length; i++) {
// 	     str = fieldContainers[i].id
// 	     strClean = str.slice(0, str.lastIndexOf('_c'))

// 	    if (Xrm.Page.getControl(strClean) != null) {
// 	       Xrm.Page.getControl(strClean).setDisabled(true);
// 	     } 
// 	 }
// }




function registerCustomOnChangeEvents() {
 Xrm.Page.getAttribute("statuscode").addOnChange(refreshForm);
 Xrm.Page.getAttribute("gcbase_processstagename").addOnChange(test);
 
   function refreshForm() {
 	console.log("display org name")
 	var src = Xrm.Page.getControl("WebResource_fundcenter_wr_confirmation").getSrc()
 	Xrm.Page.getControl("WebResource_fundcenter_wr_confirmation").setSrc(src)
 	// 148030011
 	// Xrm.Page.getAttribute("gcbase_totalbudget").refresh()
 	// Xrm.Page.data.entity.save()
 	// Xrm.Page.data.entity.refresh()
 	// Xrm.Utility.openEntityForm("gcbase_fundcentre", entityId);

   }

   function test() {
   	console.log("field changed")
   }
}



function successCallback() {
  console.log("success")
}

function errorCallback() {
  console.log("error")
}

function forceSave() {
	// setTimeout(function() {
	//  Xrm.Page.getAttribute("statuscode").setValue(148030015)
 //     Xrm.Page.data.entity.save();
 //   }, 3000)
}




