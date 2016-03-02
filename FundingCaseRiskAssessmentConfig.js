function configureFundingCaseForm() {

	initialLoad(function() {
   		if (Xrm.Page.data.process) {
			Xrm.Page.data.process.addOnStageChange(toggleRA);
			Xrm.Page.data.process.addOnStageSelected(toggleRA);
		} else {
			toggleRA
		}
	});		
}

function initialLoad(callback) {
	callback();
}

function toggleRA() {
	var grid_fcra = Xrm.Page.getControl("grid_fcra")
	if (grid_fcra) {
    hasRiskAssessment(function(result) {
      if (result) {
        grid_fcra.setVisible(true);   
      console.log("should be visible");
      } else {
        grid_fcra.setVisible(false);  
        console.log("should be visible NOT");
      }
    })		
	}
}

function hasRiskAssessment(callback) {

    var risktemplatefundcentre = {};
    risktemplatefundcentre.Name = "Sample RF";
    var jsonRF = window.JSON.stringify(risktemplatefundcentre);
    var program = Xrm.Page.getAttribute("gcbase_program").getValue()[0].id

    var ODATA_options = "?$filter=gcbase_FundCentre/Id eq guid\'" + program + "\'&$select=gcbase_name"; 

    var hasRA = false;
    SDK.REST.retrieveMultipleRecords(
     "gcbase_risktemplatefundcentre",
      ODATA_options,
     function (results) {

      if (results.length > 0) {
        hasRA = true;
      } else {
        hasRA = false;
      }

     },
     errorHandler,
     function () { 
     //OnComplete handler
         console.log("completed"+hasRA) 
         callback(hasRA)       
      }
    );
}

function errorHandler(error) {
 console.log(error.message);
}




