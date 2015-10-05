// 148030000 - pre-decision
// 148030001 - decision
// 148030002 - post-decision
// 148030003 - closed



Xrm.Page.getAttribute("statuscode").setSubmitMode("always");
Xrm.Page.getAttribute("statuscode").addOnChange(toggleForm);

function formLoad() {
	toggleTab()
	disableHeaderFields()
	registerBusinessProcessEvents()
	triggerWorkflow()
	Xrm.Page.data.process.addOnStageChange(disableHeaderFields);
	Xrm.Page.data.process.addOnStageSelected(disableHeaderFields);
	Xrm.Page.data.process.addOnStageChange(toggleTab);
	Xrm.Page.data.process.addOnStageSelected(toggleTab);
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


function registerBusinessProcessEvents() {

}

function toggleTab() {
 //var currentStatus = Xrm.Page.getAttribute("statuscode").getText()
 //console.log(currentStatus)
	 var activeStage = Xrm.Page.data.process.getActiveStage();
	 //var selectedStage = Xrm.Page.data.process.getSelectedStage().getName();
	 console.log(activeStage.getName())
	 
	 var stageForToggle = activeStage.getName()
	 //iterate DOM find class with selectedStage - iterate that div, if div title contains wildcard search set activeTab variable
	 
	var stageStr = $(".selectedStage").find(".processStageTailContainer").attr("title")

	if (stageStr.indexOf("Step 1") >= 0) {
	 stageForToggle = "Step 1"
	}
	if (stageStr.indexOf("Step 2") >= 0) {
	 stageForToggle = "Step 2"
	}
	if (stageStr.indexOf("Step 3") >= 0) {
	 stageForToggle = "Step 3"
	} 
     toggleHelper(stageForToggle)
}

function toggleHelper(activeStage) {
// Xrm.Page.ui.tabs.get("tab_warning").setVisible(true);
  switch(activeStage) {
     case "Step 1":   
           Xrm.Page.ui.tabs.get("tab_step1").setVisible(true);
           Xrm.Page.ui.tabs.get("tab_step2").setVisible(false);          
           break;
     case "Step 2":           
	       // Xrm.Page.ui.tabs.get("tab_warning").setVisible(false);
           Xrm.Page.ui.tabs.get("tab_step1").setVisible(false);       
           Xrm.Page.ui.tabs.get("tab_step2").setVisible(true);
           break;
      case "Step 3":
         // Xrm.Page.ui.tabs.get("tab_warning").setVisible(false);
           Xrm.Page.ui.tabs.get("tab_step1").setVisible(false);
           Xrm.Page.ui.tabs.get("tab_step2").setVisible(false);
           break;
      default:
       	   // Xrm.Page.ui.tabs.get("tab_warning").setVisible(false);
       	   Xrm.Page.ui.tabs.get("tab_step1").setVisible(true);
           Xrm.Page.ui.tabs.get("tab_step2").setVisible(true);
           break;
   }


}

function triggerWorkflow() {
	if (Xrm.Page.getAttribute("gcbase_hiddentogglehelper").getValue() != "toggle") {
		Xrm.Page.getAttribute("gcbase_hiddentogglehelper").setValue("toggle")
	} else {
		Xrm.Page.getAttribute("gcbase_hiddentogglehelper").setValue("toggle1")
	}
	Xrm.Page.data.entity.save();
}