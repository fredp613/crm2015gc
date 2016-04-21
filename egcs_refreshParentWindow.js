function refreshParentWindow() {
   setTimeout(function() {
	   	window.parent.opener.location.reload(false);
   }, 100);
   
}