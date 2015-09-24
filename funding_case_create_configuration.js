// ms-crm-FormSection-Container

var fiscalYears = [];


Xrm.Page.data.entity.addOnSave(testFunc);
 // console.log(Xrm.Page.data.entity.getId())

function testFunc() {
	console.log("record id is:" + Xrm.Page.data.entity.getId())
}

function onLoad() {
	
}


function toggleYears() {
	fiscalYears = [];
	Xrm.Page.getAttribute("gcbase_startdate").setSubmitMode("always")
	Xrm.Page.getAttribute("gcbase_enddate").setSubmitMode("always")

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

		if (existingFiscalYears.length > 0) {
			if (toAdd.length > 0) {
				generateBudgetForm(toAdd)
			} else  {

				if (toDelete.length > 0) {
					for (var i=0;i<toDelete.length;i++) {
						$("#FY"+toDelete[i]+"").remove()
						$("#"+toDelete[i]+"").remove()
					}
				} else {
					generateBudgetForm(fiscalYears)	
				}						
			}
		} else {
			generateBudgetForm(fiscalYears)
		}
	}	
}

function generateBudgetForm(fiscalYears) {
  var amountContainer = $("<div class='amountContainer'></div>")
  for (var i = 0; i < fiscalYears.length; i++) {
 	
  	var textAmount = generateTableRowWithTextField(fiscalYears[i])
  	textAmount.insertBefore("[name='tab_1_column_2_section_1'] tbody > tr:first")
  	
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
	var amount = parseInt($(this).val()).format(2,3,',','.') //.format(2,3,'.',',')
	$(this).val(amount)	

	if (amountsValidated() == true) {
		Xrm.Page.getAttribute("gcbase_anticipatedbudgetbyfiscalyearvalidated").setValue(1)
	} else {
		Xrm.Page.getAttribute("gcbase_anticipatedbudgetbyfiscalyearvalidated").setValue(0)

	}
	Xrm.Page.getAttribute("gcbase_anticipatedbudgetbyfiscalyearvalidated").fireOnChange()

	var arrayForServer = [];
	var numberOfCurrencyFields = $(".currency").length;
	$(".currency").each(function(index, element) {		
		if ($(element).val() != undefined) {
			if (index === numberOfCurrencyFields - 1) {
				arrayForServer.push("FY" + $(element).attr("id") + "-" + $(element).val())
			} else {
				arrayForServer.push("FY" + $(element).attr("id") + "-" + $(element).val() + ';')
			}
			
		}
	})
	Xrm.Page.getAttribute("gcbase_amountsbyfiscalyearserver").setValue(arrayForServer.toString())
})

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




Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));
    
    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
}

function generateTableRowWithTextField(fiscalYear) {
	var newRow = $('<tr height=24><td class=ms-crm-ReadField-Normal ms-crm-FieldLabel-LeftAlign id=TR'+fiscalYear+'><span class=ms-crm-InlineEditLabelText style=max-width:105px;text-align:Left;>Requested in: FY'+fiscalYear+'</span><td class=ms-crm-Field-Data-Print data-height=24><div class=ms-crm-Inline nvarchar><div class=ms-crm-Inline-Value></div><input type=text id='+fiscalYear+' maxlength=200 class="ms-crm-InlineInput currency" controlmode=normal></div></div></td></tr>')
	// var newRow = $('<input type=text id='+fiscalYear+' maxlength=200 class="ms-crm-InlineInput currency" controlmode=normal>')

	// var newRow = $("</div><img alt=Required class=ms-crm-ImageStrip-frm_required ms-crm-Inline-RequiredLevel></span></td><td class=ms-crm-Field-Data-Print data-height=24 id=gcbase_title_d><div id=gcbase_title data-attributename=gcbase_title data-formid=5292adc4-1391-4f94-9af5-fcb43af33bb9 data-fdeid=PrimaryEntity data-layout=0 tabindex=1050 class=ms-crm-Inline-Chrome nvarchar><div class=ms-crm-Inline-Value><span><div class=ms-crm-Inline-GradientMask></div></span></div>")
	return newRow
	// $("<label id=FY"+fiscalYear+">FY"+fiscalYear+"<input type='text' class='currency' id="+fiscalYear+"></input><br>")
}


