function initialize(gridName, formFieldToRefresh) {
	console.log("grid name is: " + gridName)
	var grid = document.getElementById(gridName)

	if (grid == null) {
       setTimeout(function () { initialize(gridName, formFieldToRefresh) }, 2000);
	       return;
	   }
	grid.control.add_onRefresh(function() {
		// var uuid = generateUUID();
		// Xrm.Page.getAttribute("gcbase_hiddentogglehelper").setValue(uuid);
		// validateContact(function(success) {
		// 	if (success) {

		// 	} else {
		// 		console.log("failed")
		// 	}
		// 	Xrm.Page.data.save();
		// })
		Xrm.Page.data.save();
		
	})
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