var FiscalYear = FiscalYear || {};


_fiscalYears = [];

FiscalYear.getYears = function(startdate, enddate) {

    _fiscalYears = []

	var startYear = startdate.getFullYear()
	var endYear = enddate.getFullYear()
	var startMonth = startdate.getMonth()
	var endMonth = enddate.getMonth()
	var numberOfYears = endYear - startYear

	 if (startMonth < 3) {
        if (endMonth > 3) {
            numberOfYears = numberOfYears + 2;
            endYear = endYear + 1;
        }
        else {
            numberOfYears = numberOfYears + 1;
        }
    } else {
        startYear = startYear + 1;
        if (endMonth > 3){
            numberOfYears = numberOfYears + 1;
            endYear = endYear + 1;
        }
    }

    for (var i = 0; i < numberOfYears; i++)
    {
        _fiscalYears[i] = startYear + i;
        //insert / update fiscal years
    }
    return _fiscalYears;


}


