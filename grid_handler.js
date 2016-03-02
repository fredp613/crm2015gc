Xrm.Page.getAttribute("statuscode").setSubmitMode("always");
function OnLoad() {
	//if (document.readyState == "complete") {  
		var grid = document.getElementById("grid_detail")
		// Xrm.Page.getControl("grid_detail").getGrid()
		if (grid == null) {
	       setTimeout(function () { OnLoad() }, 2000);
		       return;
		   }
		grid.control.add_onRefresh(test)
	//}
	
	//Xrm.Page.getControl("grid_detail").addOnLoad(test);
}


function test() {
	console.log("grid refreshed")
	Xrm.Page.data.save();
}
