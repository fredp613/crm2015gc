//148030004 intake
//148030005 assessment
//148030001 decision



function getParamObject(params) {
	var arry = params.split(",")
	var arrOfObjects = [];	
	for (var i in arry) {

		var status = arry[i].split(":")[0];
		var wizardStep = arry[i].split(":")[1];
	
		arrOfObjects.push({
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
	console.log(Xrm.Page.getAttribute("statuscode").getValue())
	console.log(params);
	var paramObjects = getParamObject(params)
	
	console.log(paramObjects);
	var currentStatusObject = getCurrentStatus(paramObjects) 
	if (currentStatusObject) {
		var stepToActivate = currentStatusObject.wizardStep;
		console.log(stepToActivate)
	} else {
		console.log("wrong")
	}
	var activePathCollection = Xrm.Page.data.process.getActivePath();
	// activePathCollection.forEach(function(stage, e) {
	// 	console.log(stage.getName());
	// 	console.log(stage.getId());
	  setTimeout(function() {
	  	// Xrm.Page.data.process.setSelectedStage('1364d75a-208d-6a52-36d9-a4d09e15e349');
		Xrm.Page.data.process.moveNext();
	  }, 500)
		

		// var steps = stage.getSteps();
		// steps.forEach(function(step, i) {
		// 	console.log(step)
		// 	// console.log(step.getName());
		// })
	// })
	

}