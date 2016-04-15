
function grid_setup(params) {
	var grids = params.split(",")
	console.log(grids);
	// for (var i in grids) {
		var grid = document.getElementById("grid_fcwfdecisions");
		grid_registerGridHandler(grid)
	// }
}

function grid_registerGridHandler(grid) {
	if (grid == null) {
		setTimeout(registerGridHandler(grid), 3000);
		return;
	}

	grid.control.add_onRefresh(function() {
		console.log("gird-------------------------------refreshed");
		// window.location.reload(true)
	})
}

