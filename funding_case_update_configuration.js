

Xrm.Page.getAttribute("statuscode").setSubmitMode("always");
// Xrm.Page.getAttribute("statuscode").addOnChange(toggleForm);


function formLoad() {
	
	var processId =  Xrm.Page.data.process.getActiveProcess();
	
	Xrm.Page.data.process.getEnabledProcesses(function(processes) {
		for (var processId in processes) {
			console.log("PPPP", processId);
			Xrm.Page.data.process.setActiveProcess(processId, function() {
				console.log("PROCESS SET")
				disableHeaderFields()
				Xrm.Page.data.process.addOnStageChange(disableHeaderFields);
				Xrm.Page.data.process.addOnStageSelected(disableHeaderFields);
			})
		}
	})
	if (document.readyState == "complete") {  
		triggerWorkflow();
		 //configure templates
		 // configureTemplate();
		 registerGridHandlers(function() {
		 	console.log("grid handlers registered");
		 });
				

	}
	// triggerWorkflow()
	
	// Xrm.Page.data.entity.save(true);	
	
}

function registerGridHandlers(callback) {

	var grid = document.getElementById("grid_contacts")
	var completed = false;

	if (grid == null) {
       setTimeout(function () { registerGridHandlers() }, 2000);
	       return;
	   }
	grid.control.add_onRefresh(function() {
		// var uuid = generateUUID();
		// Xrm.Page.getAttribute("gcbase_hiddentogglehelper").setValue(uuid);
		validateContacts(function(success) {
			if (success) {
				console.log("success");
			} else {
				console.log("failed");
				
			}
			Xrm.Page.data.save();
			
		})		
		
	})
}

function validateContacts(callback) {

	var entityId = Xrm.Page.data.entity.getId();

    var ODATA_options = "?$filter=gcbase_FundingCase/Id eq guid\'" + entityId + "\'&$select=gcbase_IsSigningAuthority"; 

    var total = 0;
    SDK.REST.retrieveMultipleRecords(
     "gcbase_fundingcasecontact",
      ODATA_options,
     function (results) {
      console.log(results);
      var hasAtLeastOneSigningAuthority = false;      
      Xrm.Page.getAttribute("gcbase_validationhelpernumberofauthorizedcontact").setValue(0);
      if (results.length > 0) {
        for (var i=0;i<results.length;i++) {
      		var isSigningAuthority = results[i]["gcbase_IsSigningAuthority"]
      		if (isSigningAuthority) {
      			hasAtLeastOneSigningAuthority = true;
      			console.log("has at least one signing auth "+hasAtLeastOneSigningAuthority)
      			Xrm.Page.getAttribute("gcbase_validationhelpernumberofauthorizedcontact").setValue(1);      			
      			return;
      		}	          		
      	}
      } 

     },
     errorHandler,
     function () { 
     	console.log("finished")  
     	Xrm.Page.data.save();   
         callback(true)       
      }
    );
}
function errorHandler(error) {
 console.log(error.message);
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



function triggerWorkflow() {
	setTimeout(function() {
		console.log("......................triggering workflow")
		if (Xrm.Page.data.process.getActiveProcess().getId()) {
			console.log("......................process rendered")
			console.log("current active process is: " + Xrm.Page.data.process.getActiveProcess().getId())
			var activeProcess = Xrm.Page.data.process.getActiveProcess().getId()
			var uuid = generateUUID();
			Xrm.Page.getAttribute("gcbase_hiddentogglehelper").setValue(uuid);
			// Xrm.Page.data.process.setActiveProcess(activeProcess, function() {
			// 	Xrm.Page.data.save();
			// });
			Xrm.Page.data.save();
		} else {
			console.log("process not rendered yet, dont set any of those fields")
		}
	}, 1000);
	

	
}

function generateUUID(){
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

// function configureTemplate() {
    
//     var fcId = Xrm.Page.getAttribute("gcbase_program").getValue()[0].id;

//     var ODATA_options = "?$filter=gcbase_FundCentre/Id eq guid\'" + fcId + "\'&$select=gcbase_RealName"; 

//     var total = 0;
//     SDK.REST.retrieveMultipleRecords(
//      "gcbase_fundcentrefundingcasetemplate",
//       ODATA_options,
//      function (results) {
//      	setTimeout(function () { 
//      		 //  var gridName = "grid_"+results[0]["gcbase_RealName"];
// 		      // var grid_fcfcrt = Xrm.Page.getControl(gridName);
// 		      // grid_fcfcrt.setVisible(false);

// 		      //LOOP ALL VISIBLE GRIDS, CHOOSE ONLY TEMPLATE ONES, HIDE THEM, SHOW ONLY THE CORRECT ONE.
//      	}, 2000);
          
//      },
//      errorHandler,
//      function () { 
// 		console.log("completed");
//         // callback(total);       
//       }
//     );
// }
// function errorHandler(error) {
//  console.log(error.message);
// }