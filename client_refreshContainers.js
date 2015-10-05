function refreshContainers() {
	 setTimeout(function() {
	 	 var src = Xrm.Page.getControl("WebResource_client_edit_btn").getSrc()
		 Xrm.Page.getControl("WebResource_client_edit_btn").setSrc(src)
		 console.log("test")
	 }, 3000)
	
}