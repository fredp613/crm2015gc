// 148030000 - pre-decision
// 148030001 - decision
// 148030002 - post-decision
// 148030003 - closed



Xrm.Page.getAttribute("statuscode").setSubmitMode("always");
Xrm.Page.getAttribute("statuscode").addOnChange(toggleForm);

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