// ms-crm-FormSection-Container

var fiscalYears = [];



function onLoad() {
	Xrm.Page.getAttribute("gcbase_startdate").setSubmitMode("always")
	Xrm.Page.getAttribute("gcbase_enddate").setSubmitMode("always")
}


function toggleYears() {
	var inputedFiscalYearData = [];		
	var fiscalYears = [];		
	var startdate = Xrm.Page.getAttribute("gcbase_startdate").getValue()
	var enddate = Xrm.Page.getAttribute("gcbase_enddate").getValue()
	var doc = top.document.getElementById('NavBarGloablQuickCreate').contentWindow.document
	var tableBody = doc.getElementsByName("tab_1_column_2_section_1")[0].getElementsByTagName("tbody")[0];
	var rowCount = tableBody.rows.length; 
	while(--rowCount) tableBody.deleteRow(rowCount);
		
	if (startdate && enddate) {

		fiscalYears = FiscalYear.getYears(startdate, enddate)
		fiscalYears.forEach(function(fy) {
						
			var newRow = tableBody.insertRow(tableBody.rows.length);
			var newCell = newRow.insertCell(0);						
			var newCellInput = newRow.insertCell(1);
			var newLabelText = doc.createTextNode(fy);
			var newText = doc.createElement("input");			
			newText.type = "text";
			newText.onblur = function() {	
				
				if (inputedFiscalYearData.length == 0) {
					inputedFiscalYearData.push({
							fiscalyear: fy,
							value: newText.value,
					})
				}

				for(var i in inputedFiscalYearData) {
				    if (inputedFiscalYearData[i].fiscalyear == fy) {				        
				        inputedFiscalYearData[i].value = newText.value;
				    } else {
				    	inputedFiscalYearData.push({
							fiscalyear: fy,
							value: newText.value,
						})
				    }
				    // break;
				}
	
				var arrayForServer = [];
				for (var i = 0;i < inputedFiscalYearData.length; i++) {
					console.log("araay for server")
					var record = inputedFiscalYearData[i]					
					arrayForServer.push("FY" + record.fiscalyear + "-" + record.value)
				}
				console.log(arrayForServer)
				Xrm.Page.getAttribute("gcbase_amountsbyfiscalyearserver").setValue(arrayForServer.toString());						
			}
			
			newCell.appendChild(newLabelText);
			newCellInput.appendChild(newText)


			
		})
		
		// <label for="gcbase_applicationtype_label" 
		// id="Application Type_label">
		// <div class="ms-crm-div-NotVisible">
		// Application Type Main</div>Main<div 
		// class="ms-crm-Inline-GradientMask"></div>
		// </label>
		
	}

	// updateAnticipatedAmountByYearServer()	
}

function generateBudgetForm(fiscalYears) {
	//remove all rows from table
	$("[name='tab_1_column_2_section_1'] tr").remove()
  	for (var i = 0; i < fiscalYears.length; i++) { 	
  		var textAmount = generateTableRowWithTextField(fiscalYears[i])
  		$("[name='tab_1_column_2_section_1'] tbody").append(textAmount);
  	// textAmount.insertBefore("[name='tab_1_column_2_section_1'] tbody > tr:last")
  	}
}

$(document).on("blur", ".currency", function() {
	// console.log($(this).val())
	if (/^\s*$/.test($(this).val()) || /[a-zA-Z]/.test($(this).val())) {
		$(this).val("0.00")
	}
	var amount = parseInt($(this).val()).format(2,3,',','.') 
	$(this).val(amount)	

	if (amountsValidated() == true) {
		Xrm.Page.getAttribute("gcbase_anticipatedbudgetbyfiscalyearvalidated").setValue(1)
	} else {
		Xrm.Page.getAttribute("gcbase_anticipatedbudgetbyfiscalyearvalidated").setValue(0)

	}
	Xrm.Page.getAttribute("gcbase_anticipatedbudgetbyfiscalyearvalidated").fireOnChange()

	updateAnticipatedAmountByYearServer()


})

function updateAnticipatedAmountByYearServer() {
	var arrayForServer = [];
	var numberOfCurrencyFields = $(".currency").length;
	Xrm.Page.getAttribute("gcbase_amountsbyfiscalyearserver").setValue(null);
	$(".currency").each(function(index, element) {		
		if ($(element).val() != undefined) {
			if (index === numberOfCurrencyFields - 1) {
				arrayForServer.push("FY" + $(element).attr("id") + "-" + $(element).val())
			} else {
				arrayForServer.push("FY" + $(element).attr("id") + "-" + $(element).val() + ';')
			}
			
		}
	})
	
	Xrm.Page.getAttribute("gcbase_amountsbyfiscalyearserver").setValue(arrayForServer.toString());
}

function amountsValidated() {
	var validationArr = []

	$(document).find(".currency").each(function(index, element) {
		// console.log("element value is:" + $(element).val())
		if ($(element).val() == 0) {
			// console.log("not validated")
			validationArr.push("no")			
		}  else {
			validationArr.push("yes")
			// console.log("validated")
		}
		
	})	
	if (jQuery.inArray("no", validationArr) != -1) {
		return false
	}
	return true
}

function generateTableRowWithTextField(fiscalYear) {
	var amt = fiscalYear["Amount"];
	if (amt === undefined) {
		amt = "0.00";
	}
	var newRow = $('<tr id=ROW'+fiscalYear["FY"]+' height=24><td class=ms-crm-ReadField-Normal ms-crm-FieldLabel-LeftAlign id=TR'+fiscalYear["FY"]+'><span class=ms-crm-InlineEditLabelText style=max-width:105px;text-align:Left;>Requested in: FY'+fiscalYear["FY"]+'</span><td class=ms-crm-Field-Data-Print data-height=24><div class=ms-crm-Inline nvarchar><div class=ms-crm-Inline-Value></div><input type=text id='+fiscalYear["FY"]+' maxlength=200 class="ms-crm-InlineInput currency" controlmode=normal value='+amt+'></div></div></td></tr>')	
	return newRow
}

Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));
    
    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
}


