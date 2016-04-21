//148030004 intake
//148030005 assessment
//148030001 decision





function getParamObjects(params) {
	var arry = params.split(",")
	var arrOfObjects = [];	
	for (var i in arry) {

		var status = arry[i].split(":")[0];
		var wizardStep = arry[i].split(":")[1];
	
		arrOfObjects.push({
			index: i,
			status1: status,
			wizardStep: wizardStep
		})
	}	
	return arrOfObjects;
}

function getCurrentStatus(paramObjects) {
	for (var key in paramObjects) {
		var p = paramObjects[key]
		if (parseInt(p.status1) == Xrm.Page.getAttribute("statuscode").getValue()) {
			return p;
		}			
	}
	return null;
}




function setup(params) {


		
	var statuses = getParamObjects(params)
	console.log(statuses)
	var currentStatus = getCurrentStatus(statuses)
	
	var stepAttributes = [];
	var hiddenStepAttributes = [];

	if (statuses.length > 0) {
		var indexOfCurrentlyActive = 0;
		Xrm.Page.data.process.getActiveProcess().getStages().get(function(attribute, index){					
			var isActive = attribute.getStatus();
			
			//only get stages that are not hidden
			var parentElemClass = document.querySelector('div[title*="'+attribute.getName()+'"]').parentNode.className
			if (parentElemClass.indexOf("hideStage").length > 0) {
				stepAttributes.push({index: index, attribute: attribute.getName(), status:isActive, isHidden: true})
			} else {
				stepAttributes.push({index: index, attribute: attribute.getName(), status:isActive, isHidden: false})
			}

			console.log(attribute.getName())

		
										
		})

		for (var i in stepAttributes) {
			var attribute = stepAttributes[i]			
			if (attribute.status === "active") {
				indexOfCurrentlyActive = attribute.index;
			}
		}		

		if (currentStatus.index < indexOfCurrentlyActive) {
			
			for (var i = indexOfCurrentlyActive;i>=currentStatus.index;i--) {
				if (stepAttributes[i].isHidden == false) {
					Xrm.Page.data.process.movePrevious();
				}
			}
		}

		if (currentStatus.index > indexOfCurrentlyActive) {
			
			for (var i = indexOfCurrentlyActive;i<=currentStatus.index;i++) {
				if (stepAttributes[i].isHidden == false) {
					Xrm.Page.data.process.moveNext();
				}
			}
		}


	}	
	

	
}
	
