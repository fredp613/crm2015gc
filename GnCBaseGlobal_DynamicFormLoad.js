

// var DynamicFormLoad = DynamicFormLoad || {}

// _entityId = Xrm.Page.data.entity.getId() || ""
// _entityName = Xrm.Page.data.entity.getEntityName || ""
// _parameters = {};
// _windowOptions = {};

// DynamicFormLoad.getFormObjectData = function(statusReason) {
// 	var formDataObj = {
// 		"entityName":_entityName,		
// 		"entityId":_entityId,
// 		"params":_parameters,
// 		"windowOptions":_windowOptions
// 	};
// 	return formDataObj;
// }



function dynamicFormLoad(params) {

  if (document.readyState == "complete") {     
	 processParams(params);
  }
}

function processParams(params) {
	console.log(params);
	var formParams = params.split(";");
	var _entityId = Xrm.Page.data.entity.getId();
	var _entityName = Xrm.Page.data.entity.getEntityName();

	var parameters = {};			
	var windowOptions = {
		 openInNewWindow: false
	};

	for (var i in formParams) {
		var formData = formParams[i].split("=")
		var formName = formData[0]
		var formId = getFormIdFromLabel(formName)
		var statusReasons = formData[1].split(",")
	 				
		for (var y=0;y<statusReasons.length;y++) {
			var status = statusReasons[y]
			var currentStatus = Xrm.Page.getAttribute("statuscode").getValue();			
			var currentForm = Xrm.Page.ui.formSelector.getCurrentItem().getLabel();
			if (status == currentStatus) {
				if (currentForm != formName) {
					parameters["formid"] = formId;	
					console.log("should toggle form");
					Xrm.Utility.openEntityForm(_entityName, _entityId, parameters, windowOptions);
					return;
				} else {
					console.log("should not toggle form");
				}

			}			
		}
		
	}
}

function getFormIdFromLabel(formLabelParam) {
	 var forms = Xrm.Page.ui.formSelector.items.get();
	 
	 for (var i in forms) {
	 	var form = forms[i];
	 	var formLabel = form.getLabel();
	 	var formId = form.getId();	
	 	if (formLabelParam == formLabel) {
	 		return formId
	 	} 	
	 }	
}




