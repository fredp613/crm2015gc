
var wizardParams = "";

function activateWizard(params) {
	if (document.readyState == "complete") {   
		if (params) {
			wizardParams = params;		
			   if (Xrm.Page.getAttribute("processid") != null){
			       	initialLoad(function() {
		       	   		Xrm.Page.data.process.addOnStageChange(handler);
						Xrm.Page.data.process.addOnStageSelected(handler);
					});						  			  	
			   }  	 
	  	}
	}  
}	

function initialLoad(callback) {
	handler();
	callback();
}

function handler() {
	
	console.log(wizardParams);
	var steps = wizardParams.split(";");
	var _entityId = Xrm.Page.data.entity.getId();
	var _entityName = Xrm.Page.data.entity.getEntityName();
	

//Step 1:tab1,tab2;Step2:tab3,tab4
	// var currentStage = Xrm.Page.data.process.getSelectedStage().getName();

	var currentStage = $(".selectedStage").find(".processStageTailContainer").attr("title")
	console.log("current stage is:" + currentStage);

	for (var i in steps) {

		var step = steps[i].split(":")[0];
		var tabsForStep = steps[i].split(":")[1].split(",");
		console.log(currentStage.indexOf(step) + step);
		for (var y in tabsForStep) {
			if (currentStage.indexOf(step) != -1) {
				Xrm.Page.ui.tabs.get(tabsForStep[y]).setVisible(true);				
			} else {
				console.log(tabsForStep[y])
				Xrm.Page.ui.tabs.get(tabsForStep[y]).setVisible(false);
			}
		}			
	}

}



