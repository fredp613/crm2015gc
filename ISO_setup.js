<html><head><meta charset="utf-8">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<!-- Latest compiled and minified CSS -->
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">

<!-- Optional theme -->
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css" rel="stylesheet">

<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

<style>
</style>
</head>
<body>

<!-- Button trigger modal -->
<button class="btn btn-primary btn-lg" id="btnImport" type="button">
  Import Countries, Sub Divisions and Localities
</button>
 
<script type="text/javascript">



var Xrm = window.parent.Xrm;
var ctxJquery = window.opener
var entityId = Xrm.Page.data.entity.getId()

console.log("entity id is:" + entityId)


$(document).on("click", "#btnImport", function() {
  console.log("testing");
    var thisISO = {
      entityType: "gcbase_iossetup",
      id: Xrm.Page.data.entity.getId()
    };
  // var callback = function (obj) {
  //     console.log("Created new " + obj.savedEntityReference.entityType + " named '" + obj.savedEntityReference.name + "' with id:" + obj.savedEntityReference.id);
  // }
  // var setName = { name: "sttt" };
  // Xrm.Utility.openQuickCreate("account", thisAccount, setName).then(callback, function (error) {
  //     console.log(error.message);
  // });

var windowOptions = {
 openInNewWindow: true 
};

Xrm.Page.getAttribute("statuscode").setValue(1);
Xrm.Page.data.entity.save();
Xrm.Page.getAttribute("statuscode").fireOnChange();
$(this).attr("class", "btn btn-success btn-lg");
$(this).attr("disabled", "disabled");
$(this).html("Import Process Started. This may take a while, you can verify the status later")

});


</script>

</body></html>