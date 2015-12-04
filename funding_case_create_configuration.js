// ms-crm-FormSection-Container

var fiscalYears = [];




function onLoad() {
	Xrm.Page.getAttribute("gcbase_startdate").setSubmitMode("always")
	Xrm.Page.getAttribute("gcbase_enddate").setSubmitMode("always")
}


function toggleYears() {
	console.log("event fired")
	fiscalYears = [];
	
	var startdate = Xrm.Page.getAttribute("gcbase_startdate").getValue()
	var enddate = Xrm.Page.getAttribute("gcbase_enddate").getValue()

	if (startdate && enddate) {
		var existingFiscalYears = [];
		$(document).find(".currency").each(function(index, element) {
			var year = $(element).attr("id")
			var intYear = parseInt(year)
			existingFiscalYears.push(intYear)
		})

		fiscalYears = FiscalYear.getYears(startdate, enddate)
		// var difference = new Array
		// jQuery.grep(existingFiscalYears, function(el) {
	 //        if (jQuery.inArray(el, fiscalYears) == -1) difference.push(el);
		// });
		var toAdd = $(fiscalYears).not(existingFiscalYears).get();
		var toDelete = $(existingFiscalYears).not(fiscalYears).get();

		var fyObjects = [];
		fiscalYears.forEach(function(fy) {
			fyObjects.push({
				"FY": fy,
				"Amount": $("#"+fy).val()
			})
		})
		fyObjects.forEach(function(value, index) {
			console.log(value["FY"] + ": " + value["Amount"]);	
		})
		
		generateBudgetForm(fyObjects);		
	}

	updateAnticipatedAmountByYearServer()	
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


function onSave(context) {
	//create record
	// var fundingCaseAmountByFY = {}
	// fundingCaseAmountByFY.gcbase_name = "testing",
	// fundingCaseAmountByFY.gcbase_fiscalyear = "2012",

}

// gcbase_anticipatedbudgetbyfiscalyearvalidated

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


