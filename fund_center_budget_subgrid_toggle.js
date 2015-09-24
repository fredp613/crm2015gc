Xrm.Page.getAttribute("gcbase_estimatedannualbudget").addOnChange(refreshBudgetGrid)
Xrm.Page.getAttribute("gcbase_startdate").addOnChange(refreshBudgetGrid)
Xrm.Page.getAttribute("gcbase_enddate").addOnChange(refreshBudgetGrid)
Xrm.Page.getAttribute("statuscode").addOnChange(refreshIframe)


function refreshBudgetGrid() {
	console.log("budget grid should be refreshed");
	Xrm.Page.data.entity.save()
	var subgrid = Xrm.Page.ui.controls.get("AnnualBudgets");
	if (subgrid) {
		subgrid .refresh();
	}
}

function refreshIframe() {
	console.log("iframe refresh")
	var src = Xrm.Page.getControl("IFRAME_IFRAME_Confirmation").getInitialUrl()
	console.log(src)
	Xrm.Page.getControl("IFRAME_IFRAME_Confirmation").setSrc(src)

}
