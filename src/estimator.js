const covid19ImpactEstimator = (inputData) => {
	let impact = {};
    let severeImpact = {};
	let days = inputData.timeToElapse;
    switch(inputData.periodType){
    	case "weeks":
    		days = inputData.timeToElapse *7;
    		break;
    	case "months":
    		days = inputData.timeToElapse *30;
    		break;
    };
    let factor = Math.floor(days / 3);

	impact.currentlyInfected = Math.floor(inputData.reportedCases * 10);
	severeImpact.currentlyInfected = Math.floor(inputData.reportedCases * 50);

	impact.infectionsByRequestedTime = Math.floor(impact.currentlyInfected * Math.pow(2, factor));
	severeImpact.infectionsByRequestedTime = Math.floor(severeImpact.currentlyInfected * Math.pow(2, factor));

	impact.severeCasesByRequestedTime = Math.floor(impact.infectionsByRequestedTime * 0.15);
    severeImpact.severeCasesByRequestedTime = Math.floor(severeImpact.infectionsByRequestedTime * 0.15);

    impact.hospitalBedsByRequestedTime = Math.floor((inputData.totalHospitalBeds * 0.35) - impact.severeCasesByRequestedTime);
    severeImpact.hospitalBedsByRequestedTime = Math.floor((inputData.totalHospitalBeds * 0.35) - severeImpact.severeCasesByRequestedTime);

    impact.casesForICUByRequestedTime = Math.floor(impact.infectionsByRequestedTime * 0.5);
    severeImpact.casesForICUByRequestedTime = Math.floor(severeImpact.infectionsByRequestedTime * 0.5);

    impact.casesForVentilatorsByRequestedTime = Math.floor(impact.infectionsByRequestedTime * 0.2);
    severeImpact.casesForVentilatorsByRequestedTime = Math.floor(severeImpact.infectionsByRequestedTime * 0.2);

    impact.dollarsInFlight = Math.floor((impact.infectionsByRequestedTime * inputData.region.avgDailyIncomePopulation * inputData.region.avgDailyIncomeInUSD / days));
    severeImpact.dollarsInFlight = Math.floor((severeImpact.infectionsByRequestedTime * inputData.region.avgDailyIncomePopulation * inputData.region.avgDailyIncomeInUSD) / days);

    return JSON.stringify({ data: inputData, impact: impact, severeImpact: severeImpact });
};

module.exports = covid19ImpactEstimator;
