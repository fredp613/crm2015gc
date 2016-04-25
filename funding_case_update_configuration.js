

Xrm.Page.getAttribute("statuscode").setSubmitMode("always");
// Xrm.Page.getAttribute("statuscode").addOnChange(toggleForm);


function formLoad() {
	

	if (document.readyState == "complete") {  
		triggerWorkflow();
		 registerGridHandlers(function() {
		 	console.log("grid handlers registered");
		 });				
	}		
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



function triggerWorkflow() {
	setTimeout(function() {		
		if (Xrm.Page.data.process.getActiveProcess().getId()) {
			console.log("......................process rendered")
			console.log("current active process is: " + Xrm.Page.data.process.getActiveProcess().getId())
			var activeProcess = Xrm.Page.data.process.getActiveProcess().getId()
			var uuid = generateUUID();
			Xrm.Page.getAttribute("gcbase_hiddentogglehelper").setValue(uuid);			
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

