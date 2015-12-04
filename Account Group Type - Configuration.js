
function formLoad() {


   var grid = document.getElementById('grid_accounts');
   // if the subgrid still not available we try again after 1 second
   if (grid == null) {
       setTimeout(formLoad, 4000);
       return;
   } else {
	   	// grid.control.add_onRefresh(refreshRecord);
    }   
}


function refreshRecord() {
	Xrm.Page.data.save(true).then(successCallback, errorCallback);
}

function successCallback() {
	console.log("success")
	//Xrm.Page.ui.controls.get("gcbase_numberofassociatedaccounts").refresh();
	return;
}


function errorCallback() {
	console.log("failure")
	return;
}

