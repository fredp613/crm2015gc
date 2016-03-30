
var wizardParams = "";

function activateWizard(params) {
	// console.log(Xrm.Page.getAttribute("processid").getValue())
	if (document.readyState == "complete") {   
		if (params) {
			wizardParams = params;	
			handler();	
			   if (Xrm.Page.getAttribute("processid") != null){
			   	   // Xrm.Page.data.entity.save();
			       	initialLoad(function() {
		       	   		Xrm.Page.data.process.addOnStageChange(handler);
						Xrm.Page.data.process.addOnStageSelected(handler);
					});						  			  	
			   }  	 
	  	}
	}  
}	

function initialLoad(callback) {	
	callback();
}

function handler() {

	var steps = wizardParams.split(";");
	var _entityId = Xrm.Page.data.entity.getId();
	var _entityName = Xrm.Page.data.entity.getEntityName();

	var currentStage = $(".selectedStage").find(".processStageTailContainer").attr("title")
	if (currentStage != null) {

		// console.log("current stage is:" + currentStage);

		for (var i in steps) {

			var step = steps[i].split(":")[0];
			
			var stage = $(".activeStage.selectedStage")

			var tabsForStep = steps[i].split(":")[1].split(",");
			// console.log(currentStage.indexOf(step) + step);
			for (var y in tabsForStep) {
				if (currentStage.indexOf(step) != -1) {
					if (Xrm.Page.ui.tabs.get(tabsForStep[y])) {
						Xrm.Page.ui.tabs.get(tabsForStep[y]).setVisible(true);
						var tabId = document.getElementsByName(tabsForStep[y])[0].id;
						

						if (!stageIsActive(stage)) {
							$('#'+tabId+ " *").attr('disabled','disabled');
							//$("#"+tabId+ " a").attr('href', '/')
							$("#"+tabId+ " .ms-crm-ImageStrip-addButton").hide();

							Xrm.Page.ui.setFormNotification(generateLocalizedMessage("inactive tab"),"WARNING", "1");
						} else {
							for (var i;i<=Xrm.Page.ui.controls.length;i++){
								Xrm.Page.ui.controls[i].refresh();
							}
							$('#'+tabId+ " *").removeAttr("disabled");
							$("#"+tabId+ " .ms-crm-ImageStrip-addButton").show()

							Xrm.Page.ui.clearFormNotification("1");
						
						}
						
					}
									
				} else {
					// console.log(tabsForStep[y])
					if (Xrm.Page.ui.tabs.get(tabsForStep[y])) {
						Xrm.Page.ui.tabs.get(tabsForStep[y]).setVisible(false);
					}
				}
			}			
		}
	}
	

}

function stageIsActive(stage) {
	if (stage.length > 0) {
		// console.log("stage is: "+stage)
		return true;
	}
	return false;
}

function generateLocalizedMessage(messageType) {
	var currentLanguage = Xrm.Page.context.getUserLcid();
	if (messageType == "inactive tab") {
		if (currentLanguage == "1036") {
			return "Cet onglet est inactif , par conséquent, vous ne pouvez pas éditer les champs de formulaire ci-dessous"
		}
		if (currentLanguage == "1033") {
			return "This tab is inactive, therefore you cannot edit any of the form fields below"
		}
	}
	return "";

}


