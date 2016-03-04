// 148030000 - pre-decision
// 148030001 - decision
// 148030002 - post-decision
// 148030003 - closed



Xrm.Page.getAttribute("statuscode").setSubmitMode("always");
Xrm.Page.getAttribute("statuscode").addOnChange(toggleForm);


function formLoad() {
	
	var processId =  Xrm.Page.data.process.getActiveProcess();
	
	Xrm.Page.data.process.getEnabledProcesses(function(processes) {
		for (var processId in processes) {
			console.log("PPPP", processId);
			Xrm.Page.data.process.setActiveProcess(processId, function() {
				console.log("PROCESS SET")
				disableHeaderFields()
				Xrm.Page.data.process.addOnStageChange(disableHeaderFields);
				Xrm.Page.data.process.addOnStageSelected(disableHeaderFields);
			})
		}
	})
	if (document.readyState == "complete") {  
		 triggerWorkflow();
		 //configure templates
		 // configureTemplate();
	}
	// triggerWorkflow()
	
	// Xrm.Page.data.entity.save(true);	
	
}

function toggleForm() {
	var _formId = Xrm.Page.ui.formSelector.getCurrentItem().getId();
	console.log(_formId)

	var _currentStatus = Xrm.Page.getAttribute("statuscode").getValue()
	var _entityId =Xrm.Page.data.entity.getId()

	var parameters = {};
		parameters["formid"] = "C88E2ED5-641A-476B-B390-6F49C1C2972F";		
	var windowOptions = {
		 openInNewWindow: false
	};

	if (_currentStatus == "148030002" || _currentStatus == "148030003" ) {
		parameters["formid"] = "C88E2ED5-641A-476B-B390-6F49C1C2972F";	
		Xrm.Page.ui.setFormNotification("This funding case is in post-decision state. Therefore (if approved), payments can be made","WARNING", "1");
		if (_formId != parameters["formid"].toLowerCase()) {
			Xrm.Utility.openEntityForm("gcbase_fundingcase", _entityId, parameters, windowOptions);
		}  
	} 
	if (_currentStatus == "148030001") {
		parameters["formid"] = "C29EE518-E438-4A22-B176-50073F0A3310";	
		Xrm.Page.ui.setFormNotification("Not all decisions have been completed for this funding case therefore no payments can be made","WARNING", "1");
		if (_formId != parameters["formid"].toLowerCase()) {
			Xrm.Utility.openEntityForm("gcbase_fundingcase", _entityId, parameters, windowOptions);
		}
	}

	if (_currentStatus == "148030000") {
		parameters["formid"] = "5292ADC4-1391-4F94-9AF5-FCB43AF33BB9";			
		Xrm.Page.ui.setFormNotification("This funding case is currently in the pre-decision state therefore no payments can be made","WARNING", "1");
		if (_formId != parameters["formid"].toLowerCase()) {			
			Xrm.Utility.openEntityForm("gcbase_fundingcase", _entityId, parameters, windowOptions);
		}
	}

}



function disableHeaderFields() {
	 var fieldContainers = document.getElementsByClassName("processStepLabel")
	  for(var i=0; i < fieldContainers.length; i++) {
	     str = fieldContainers[i].id
	     strClean = str.slice(0, str.lastIndexOf('_c'))

	    if (Xrm.Page.getControl(strClean) != null) {
	       Xrm.Page.getControl(strClean).setDisabled(true);
	     } 
	 }
}



function triggerWorkflow() {
	if (Xrm.Page.getAttribute("gcbase_hiddentogglehelper").getValue() != "toggle") {
		Xrm.Page.getAttribute("gcbase_hiddentogglehelper").setValue("toggle")
	} else {
		Xrm.Page.getAttribute("gcbase_hiddentogglehelper").setValue("toggle1")
	}
	Xrm.Page.getAttribute("gcbase_hiddentogglehelper").fireOnChange();
	Xrm.Page.data.save();
}

// function configureTemplate() {
    
//     var fcId = Xrm.Page.getAttribute("gcbase_program").getValue()[0].id;

//     var ODATA_options = "?$filter=gcbase_FundCentre/Id eq guid\'" + fcId + "\'&$select=gcbase_RealName"; 

//     var total = 0;
//     SDK.REST.retrieveMultipleRecords(
//      "gcbase_fundcentrefundingcasetemplate",
//       ODATA_options,
//      function (results) {
//      	setTimeout(function () { 
//      		 //  var gridName = "grid_"+results[0]["gcbase_RealName"];
// 		      // var grid_fcfcrt = Xrm.Page.getControl(gridName);
// 		      // grid_fcfcrt.setVisible(false);

// 		      //LOOP ALL VISIBLE GRIDS, CHOOSE ONLY TEMPLATE ONES, HIDE THEM, SHOW ONLY THE CORRECT ONE.
//      	}, 2000);
          
//      },
//      errorHandler,
//      function () { 
// 		console.log("completed");
//         // callback(total);       
//       }
//     );
// }
// function errorHandler(error) {
//  console.log(error.message);
// }