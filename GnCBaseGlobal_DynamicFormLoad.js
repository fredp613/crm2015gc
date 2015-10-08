// parameters["formid"] = "C29EE518-E438-4A22-B176-50073F0A3310";	
// 		Xrm.Page.ui.setFormNotification("Not all decisions have been completed for this funding case therefore no payments can be made","WARNING", "1");
// 		if (_formId != parameters["formid"].toLowerCase()) {
// 			Xrm.Utility.openEntityForm("gcbase_fundingcase", _entityId, parameters, windowOptions);
// 		}

function dynamicFormLoad(params) {

 if (document.readyState == "complete") {
     var forms = Xrm.Page.ui.formSelector.items.get();
	 for (var i in forms) {
	 	var form = forms[i];
	 	var formName = form.getLabel();
	 	var formId = form.getId();
	 	processParams(params, formId);
	 }
	
  }
}

function processParams(params, formId) {
	var formParams = params.split(";");
	var _entityId = Xrm.Page.data.entity.getId();
	var _entityName = Xrm.Page.data.entity.getEntityName();

	var parameters = {};
		parameters["formid"] = formId;		
	var windowOptions = {
		 openInNewWindow: false
	};

	for (var i in formParams) {
		var formData = formParams[i].split("=")
		var formName = formData[0]

		var statusReasons = formData[1]
		var statusCleaned = statusReasons.split(",")		
		
		for (var y=0;y<statusCleaned.length;y++) {
			var status = statusCleaned[y]
			if (status==xrmStatus) {
				Xrm.Utility.openEntityForm(_entityName, _entityId, parameters, windowOptions);
			}
		}
		
	}
}


