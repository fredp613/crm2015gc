disableHeaderFields()
toggleTab()
registerBusinessProcessEvents()
registerCustomOnChangeEvents()

Xrm.Page.data.entity.addOnSave(disableHeaderFields);
Xrm.Page.data.process.addOnStageChange(disableHeaderFields);
Xrm.Page.data.process.addOnStageSelected(disableHeaderFields);
Xrm.Page.data.process.addOnStageChange(toggleTab);
Xrm.Page.data.process.addOnStageSelected(toggleTab);
var entityId = Xrm.Page.data.entity.getId()

//var selectedStage = Xrm.Page.data.process.getSelectedStage().getName();

// $(document).on("input", "input", function(e) {
//  setTimeout(toggleNextStage, 500);

// 	 function toggleNextStage() {
// 		 console.log("body has changed")
// 		 var errors = $(".egcs-crm-Inline-WarningIcon:visible")
// 		 console.log(errors.length)
// 			 if (errors.length > 0) {
// 				console.log("unbind")
// 			 } else {

// 			 }
// 	 }
// })


function registerBusinessProcessEvents() {

var originalNextStageHandler = $("#stageAdvanceActionContainer").data("events")["click"][0].handler;
var originalBackStageHandler = $("#stageBackActionContainer").data("events")["click"][0].handler;

$("#stageAdvanceActionContainer").unbind("click");
$("#stageBackActionContainer").unbind("click");

$(document).on("click", "#stageAdvanceActionContainer", function(e) {

	console.log("next stage clicked")
	var errors = $(".egcs-crm-Inline-WarningIcon:visible")
	 console.log(errors.length)
	 if (errors.length > 0) {
		console.log("unbind")
	 } else {

	 	$.proxy(originalNextStageHandler, $("#stageAdvanceActionContainer"))(e);
	 	var status = $("#header_statuscode_i").attr("defaultvalue")
	 	setTimeout(function() { 
	 	  
	 	  console.log(status)
	 	  $("#header_statuscode").attr("data-raw", status)
	 	   $("#header_statuscode_i").attr("defaultselected", status)
	 	   Xrm.Page.getAttribute("gcbase_processstagename").fireOnChange()
	 	   Xrm.Page.getAttribute("statuscode").fireOnChange()   		
	   	},500)
	   	
	 }					
})


$(document).on("click", "#stageBackActionContainer", function(e) {
	
	console.log("back stage clicked")
	var errors = $(".egcs-crm-Inline-WarningIcon:visible")
	 
	 console.log(errors.length)
	 if (errors.length > 0) {
		console.log("unbind")
	 } else {

	 	$.proxy(originalBackStageHandler, $("#stageBackActionContainer"))(e);
	 	var status = $("#header_statuscode_i").attr("defaultvalue")
	 	setTimeout(function() { 
	 		// Xrm.Page.data.entity.save()	
	   	// Xrm.Utility.openEntityForm("gcbase_fundcentre", entityId);
	   	 
	 	  console.log(status)
	 	  $("#header_statuscode").attr("data-raw", status)
	 	   $("#header_statuscode_i").attr("defaultselected", status)
	 	   Xrm.Page.getAttribute("gcbase_processstagename").fireOnChange()
	 	   Xrm.Page.getAttribute("statuscode").fireOnChange()
	 	   // Xrm.Page.data.refresh(true|false)
	 	   // Xrm.Page.data.entity.save()				 		
	   	},500)

	   	
   	 }			

})


}

function disableHeaderFields() {
 console.log("this is an alert")
 var fieldContainers = document.getElementsByClassName("processStepLabel")
  for(var i=0; i < fieldContainers.length; i++) {
     str = fieldContainers[i].id
     strClean = str.slice(0, str.lastIndexOf('_c'))

    if (Xrm.Page.getControl(strClean) != null) {
       Xrm.Page.getControl(strClean).setDisabled(true);
     } 
 }
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

if (stageStr.indexOf("Main Fund") >= 0) {
 stageForToggle = "Main Fund Centre Information"
}
if (stageStr.indexOf("Budget") >= 0) {
 stageForToggle = "Annual Budget"
}
if (stageStr.indexOf("Config") >= 0) {
 stageForToggle = "Activate Fund Centre"
}
     toggleHelper(stageForToggle)
}

function registerCustomOnChangeEvents() {
 Xrm.Page.getAttribute("statuscode").addOnChange(refreshForm);
 Xrm.Page.getAttribute("gcbase_processstagename").addOnChange(test);
 
   function refreshForm() {
 	console.log("display org name")
   }

   function test() {
   	console.log("field changed")
   }
}

function toggleHelper(activeStage) {
  switch(activeStage) {
     case "Main Fund Centre Information":
           Xrm.Page.ui.tabs.get("tab_general").setVisible(true);
           Xrm.Page.ui.tabs.get("tab_budget").setVisible(false);
           Xrm.Page.ui.tabs.get("tab_configuration").setVisible(false);
           break;
     case "Annual Budget":
           Xrm.Page.ui.tabs.get("tab_general").setVisible(false);
           Xrm.Page.ui.tabs.get("tab_budget").setVisible(true);
           Xrm.Page.ui.tabs.get("tab_configuration").setVisible(false);
           break;
      case "Activate Fund Centre":
           Xrm.Page.ui.tabs.get("tab_general").setVisible(false);
           Xrm.Page.ui.tabs.get("tab_budget").setVisible(false);
           Xrm.Page.ui.tabs.get("tab_configuration").setVisible(true);
           break;
      default:
        Xrm.Page.ui.tabs.get("tab_general").setVisible(true);
           Xrm.Page.ui.tabs.get("tab_budget").setVisible(true);
           Xrm.Page.ui.tabs.get("tab_configuration").setVisible(true);
   }
   console.log("save or refresh entity")

}

function successCallback() {
  console.log("success")
}

function errorCallback() {
  console.log("error")
}




