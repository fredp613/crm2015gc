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
		

		// console.log($(this).val())
	// if (/^\s*$/.test($(this).val()) || /[a-zA-Z]/.test($(this).val())) {
	// 	$(this).val("0.00")
	// }
	// var amount = parseInt($(this).val()).format(2,3,',','.') 
	// $(this).val(amount)	
	if (startdate && enddate) {
		Xrm.Page.getAttribute("gcbase_amountsbyfiscalyearserver").setValue("");
		fiscalYears = FiscalYear.getYears(startdate, enddate)
		fiscalYears.forEach(function(fy) {
						
			var newRow = tableBody.insertRow(tableBody.rows.length);
			var newCell = newRow.insertCell(0);						
			var newCellInput = newRow.insertCell(1);
			var newLabelText = doc.createTextNode(fy);
			var newText = doc.createElement("input");						
			newText.value = formatNumberToCurrency(parseInt("0"),2,3,',','.');		
			newText.type = "text";
			newText.onblur = function() {	
				
				var amount = formatNumberToCurrency(parseInt(this.value),2,3,',','.');												
				this.value = amount;		
				
				inputedFiscalYearData.push({
					fiscalyear: fy,
					value: this.value,
				})
				updateServerValue(inputedFiscalYearData);						
			}
			newCell.appendChild(newLabelText);
			newCellInput.appendChild(newText);
		});

	}
	
}

function updateServerValue(inputedFiscalYearData) {
	//ONLY DO THIS IF VALID
		var arrayForServer = [];
		for (var i = 0;i <= inputedFiscalYearData.length - 1; i++) {					
			var record = inputedFiscalYearData[i]		
			if (i == (inputedFiscalYearData.length - 1)) {	
				arrayForServer.push("FY" + record.fiscalyear + "-" + record.value)
			} else {
				arrayForServer.push("FY" + record.fiscalyear + "-" + record.value + ";")	
			}			
			
		}				
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

// Number.prototype.format = function(n, x, s, c) {
// 	console.log("formatting");
//     var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
//         num = this.toFixed(Math.max(0, ~~n));
    
//     return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
// }

function formatNumberToCurrency(num,n, x, s, c) {
	  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = num.toFixed(Math.max(0, ~~n));
    
    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
}





