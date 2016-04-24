var wizardParams = "";

function activateWizard(params) {
	
	
	
	if (document.readyState == "complete") {   
		if (params) {
			wizardParams = params;	
			setTimeout(function() {
				$("#processStepsContainer").find('*').attr('disabled', true);
				$("#header_process_gcbase_clientinformationcomplete").attr('disabled', 'disabled')
				$("#header_process_gcbase_clientinformationcomplete").attr('class', 'ms-crm-Inline-Locked')
			}, 500);
			
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

	var activeStage = Xrm.Page.data.process.getActiveStage(); //$(".selectedStage").find(".processStageTailContainer").attr("title")
	var selectedStage = Xrm.Page.data.process.getSelectedStage();
	var stepsCollection = selectedStage.getSteps().get();

	stepsCollection.forEach(function(step) {		
		if (step) {			
			var nStep = step.getAttribute();						
			var final = "header_process_"+nStep;
			if (Xrm.Page.getControl(final) != null) {				
				Xrm.Page.getControl(final).setDisabled(true);
			}									
		}		
	
	})
	if (activeStage != null) {

		
		for (var i in steps) {

			var step = steps[i].split(":")[0];
			
			var tabsForStep = steps[i].split(":")[1].split(",");
			
			for (var y in tabsForStep) {			
				var tab = Xrm.Page.ui.tabs.get(tabsForStep[y]) 										
				if (selectedStage.getName().indexOf(step) != -1) {					
					if (tab) {																								
						if (activeStage.getName() === selectedStage.getName()) {					
							Xrm.Page.ui.clearFormNotification("1");	
							disableControlsInsideTab(tab, false);

						} else {
							Xrm.Page.ui.setFormNotification(generateLocalizedMessage("inactive tab"),"WARNING", "1");							
							//disable controls inside this tab	
							disableControlsInsideTab(tab, true);
						}

						tab.setVisible(true);
						
					} 
									
				} else {					
					if (tab) {
						tab.setVisible(false);
					}
				}
			}			
		}
	}
	

}

function disableControlsInsideTab(tabObject, disabled) {
	tabObject.sections.forEach(function(section){
		section.controls.forEach(function(control) {
			console.log(control.getControlType())
			if (control.getControlType() === "optionset" || 
				control.getControlType() === "standard"  || 
				control.getControlType() === "lookup") {
				disabled ? control.setDisabled(true) : control.setDisabled(false);				
			}
		})
	})
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


