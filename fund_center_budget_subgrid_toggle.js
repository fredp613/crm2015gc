Xrm.Page.getAttribute("gcbase_estimatedannualbudget").addOnChange(refreshBudgetGrid)
Xrm.Page.getAttribute("gcbase_estimatedannualbudgetgrant").addOnChange(refreshBudgetGrid)

function refreshBudgetGrid() {
	console.log("budget grid should be refreshed");
	Xrm.Page.data.entity.save()
	var subgrid = Xrm.Page.ui.controls.get("AnnualBudgets");
	if (subgrid) {
		subgrid .refresh();
	}
	
}