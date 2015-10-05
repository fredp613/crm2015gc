
// Xrm.Page.getAttribute("gcbase_clientid").addOnChange(refreshHTMLWebResource);
// Xrm.Page.getAttribute("gcbase_account").addOnChange(refreshHTMLWebResource);

var statusReasons = {
	"Pending" : 100423123,
	"Active" : 1004546456
}

function formLoad() {
	toggleTab()
	disableHeaderFields()
	// Xrm.Page.data.entity.addOnSave(refreshHTMLWebResource);
	registerBusinessProcessEvents()

	// Xrm.Page.data.entity.addOnSave(disableHeaderFields);
	Xrm.Page.data.process.addOnStageChange(disableHeaderFields);
	Xrm.Page.data.process.addOnStageSelected(disableHeaderFields);
	Xrm.Page.data.process.addOnStageChange(toggleTab);
	Xrm.Page.data.process.addOnStageSelected(toggleTab);
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


function refreshHTMLWebResource() {
	setTimeout(function() {
	// if (Xrm.Page.data.entity.getIsDirty()) {
		console.log("dirty")
		var webResArea = Xrm.Page.ui.controls.get("WebResource_client_edit_btn");
		if (webResArea) {
			webResArea.setSrc(webResArea.getSrc());
			var src = Xrm.Page.getControl("WebResource_client_edit_btn").getSrc()
		 	Xrm.Page.getControl("WebResource_client_edit_btn").setSrc(src)
			console.log("web resource refreshed")	
		}
		
	// }

	}, 2000);
	
}

function registerBusinessProcessEvents() {

}

function toggleTab() {
 //var currentStatus = Xrm.Page.getAttribute("statuscode").getText()
 //console.log(currentStatus)
	 var activeStage = Xrm.Page.data.process.getActiveStage();
	 //var selectedStage = Xrm.Page.data.process.getSelectedStage().getName();
	 console.log(activeStage.getName())
	 
	 var stageForToggle = activeStage.getName()
	 //iterate DOM find class with selectedStage - iterate that div, if div title contains wildcard search set activeTab variable
	 
	var stageStr = $(".selectedStage").find(".processStageTailContainer").attr("title")

	if (stageStr.indexOf("Step 1") >= 0) {
	 stageForToggle = "Step 1"
	}
	if (stageStr.indexOf("Step 2") >= 0) {
	 stageForToggle = "Step 2"
	}
	if (stageStr.indexOf("Step 3") >= 0) {
	 stageForToggle = "Step 3"
	} 
     toggleHelper(stageForToggle)
}

function toggleHelper(activeStage) {
// Xrm.Page.ui.tabs.get("tab_warning").setVisible(true);
  switch(activeStage) {
     case "Step 1":
           Xrm.Page.ui.tabs.get("tab_step1").setVisible(true);
           Xrm.Page.ui.tabs.get("tab_step2").setVisible(false);
           Xrm.Page.ui.tabs.get("tab_step3").setVisible(false);           
           break;
     case "Step 2":           
	       // Xrm.Page.ui.tabs.get("tab_warning").setVisible(false);
           Xrm.Page.ui.tabs.get("tab_step1").setVisible(false);       
           Xrm.Page.ui.tabs.get("tab_step2").setVisible(true);
           Xrm.Page.ui.tabs.get("tab_step3").setVisible(false);
           break;
      case "Step 3":
         // Xrm.Page.ui.tabs.get("tab_warning").setVisible(false);
           Xrm.Page.ui.tabs.get("tab_step1").setVisible(false);
           Xrm.Page.ui.tabs.get("tab_step2").setVisible(false);
           Xrm.Page.ui.tabs.get("tab_step3").setVisible(true);
           break;
      default:
       	   // Xrm.Page.ui.tabs.get("tab_warning").setVisible(false);
       	   Xrm.Page.ui.tabs.get("tab_step1").setVisible(true);
           Xrm.Page.ui.tabs.get("tab_step2").setVisible(true);
           Xrm.Page.ui.tabs.get("tab_step3").setVisible(true);
           break;
   }


}




