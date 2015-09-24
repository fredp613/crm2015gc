function RegisterSubGridHandler()
{

 var _customerProductGrid = $("")

 if (Xrm.Page.getControl(_customerProductGrid) != null)
 {
  setTimeout(RegisterSubGridHandler, 1000); // call this function again in a second if the grid has not loaded yet.
  return;
 }

 var mySubGrid = document.getElementById(_customerProductGrid);

 var selectedId = undefined;

 //attach hander to the event
 mySubGrid.control.add_onSelectionChange(function (sender)
 {
  if (sender.get_selectedIds()[0] == undefined || sender.get_selectedIds()[0] == selectedId)
  {
   return;
  }

  // selected record is returned as an object
  var selectedRecord = sender.get_selectedRecords()[0];

  // This can now be used to set a lookup's value dynamically and cause a quick form to refresh
  var lookup = [];
  lookup[0] = {}
  lookup[0].id = selectedRecord.Id;
  lookup[0].entityType = selectedRecord.TypeName;
  lookup[0].name = selectedRecord.Name;
  console.log(lookup)
  // set the value of a lookup and fire its on change event
  // Xrm.Page.data.entity.attributes.get("new_lookup_for_a_quick_form").setValue(lookup);
  // Xrm.Page.data.entity.attributes.get("new_lookup_for_a_quick_form").fireOnChange();

  // Or you can use this to now fetch data using REST/SOAP
  
 });

}


function Form_OnLoad()
{
 RegisterSubGridHandler();
}