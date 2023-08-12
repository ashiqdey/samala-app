
/**
 * Code to delete stored data in extension
 */

// chrome.storage.local.clear(function () {
// 	var error = chrome.runtime.lastError;
// 	if (error) {
// 		console.error(" error error error", error);
// 	}
// });


function userAuthorisation() {
	// chrome.storage.local.get(null, function (result) {
	// 	var user_name = document.querySelectorAll("[placeholder='User Name']")[0];
	// 	user_name && (
	// 		user_name.value = result.username,
	// 		user_name.dispatchEvent(new Event("change")),
	// 		user_name.dispatchEvent(new Event('input')),
	// 		window.observer.disconnect()
	// 	);
	// 	var pwd = document.querySelectorAll("[placeholder='Password']")[0];
	// 	pwd && (pwd.value = result.password, pwd.dispatchEvent(new Event("change")), pwd.dispatchEvent(new Event('input')));
	// });
}


chrome.storage.local.get(null, function (result) {
	var curr_location = window.location.href
	if (curr_location.indexOf("psgninput") !== -1) {
		// code to insert passenger details
		var k = document.querySelectorAll("div.ng-star-inserted > a > span.prenext")[0];
		var sCount = document.querySelectorAll("input[placeholder*='Passenger Name']").length;
		var mCount = result.pessanger_count;
		while (mCount > sCount) { k.click(); mCount--; }
		var a, b, c, d, d1;
		// a = document.querySelectorAll("input[placeholder*='Name']"),
		a = document.querySelectorAll("input[placeholder*='Passenger Name']"),
			b = document.querySelectorAll("input[formcontrolname*='passengerAge']"),
			c = document.querySelectorAll("select[formcontrolname*='passengerGender']"),
			d = document.querySelectorAll("select[formcontrolname*='passengerBerthChoice']"),
			d1 = document.querySelectorAll("select[formcontrolname*='passengerFoodChoice']");


		var pass_name = result.pessanger_name;
		var pass_age = result.passenger_age;
		var pass_gender = result.passenger_gender;
		var pass_berth_choice = result.passenger_berth_choice;
		var passenger_food_choice = result.passenger_food_choice;
		var pass_nationality = result.passenger_nationality;
		var mobile = result.mobile_number;
		var travel_insurance = result.travel_insurance;
		for (var i = 0; i < mCount; i++) {
			a[i] && (a[i].value = pass_name[i], a[i].dispatchEvent(new Event('input')));
			b[i] && (b[i].value = pass_age[i], b[i].dispatchEvent(new Event('input')));
			c[i] && (c[i].value = pass_gender[i], c[i].dispatchEvent(new Event('change')));
			d[i] && (d[i].value = pass_berth_choice[i], d[i].dispatchEvent(new Event('change')));
			d1[i] && (d1[i].value = passenger_food_choice[i], d1[i].dispatchEvent(new Event('change')));
		}
		// Code to enter mobile number
		var mobileNumber = document.getElementById("mobileNumber");
		mobileNumber && (mobileNumber.value = mobile, mobileNumber.dispatchEvent(new Event("change")));

		// Code to Enter Insurance radio button
		var travelInsuranceno = document.getElementById('travelInsuranceOptedNo');
		var travelInsuranceyes = document.getElementById('travelInsuranceOptedYes');
		if (travel_insurance === 'Yes') {
			travelInsuranceyes && (travelInsuranceyes.click());
		} else {
			travelInsuranceno && (travelInsuranceno.click());
		}
		/**
		 * Code to Enter infant details 
		 */

		var infant_name = result.infant_name;
		var infant_age = result.infant_age;
		var infant_gender = result.infant_gender;

		var addInfantButton = document.querySelector(".pip-detail span a");
		cpCount = document.querySelectorAll("input[name*='infant-name']").length;
		mcpCount = result.infant_count;
		while (mcpCount > cpCount) {
			addInfantButton.click();
			mcpCount--;
		}
		var infantName = document.querySelectorAll("[name='infant-name']"),
			infantAge = document.querySelectorAll(".infant_box [formcontrolname='age']"),
			infantGender = document.querySelectorAll(".infant_box [formcontrolname='gender']");

		for (var j = 0; j < mcpCount; j++) {
			infantName[j] && (infantName[j].value = infant_name[j], infantName[j].dispatchEvent(new Event('input')), infantName[j].dispatchEvent(new Event('change')));
			infantAge[j] && (infantAge[j].value = infant_age[j], infantAge[j].dispatchEvent(new Event('change')));
			infantGender[j] && (infantGender[j].value = infant_gender[j], infantGender[j].dispatchEvent(new Event('change')));
		}

		// var travelInsurance = document.getElementById('travelInsuranceOptedYes');
		// travelInsurance && (travelInsurance.click());


	} else {

	}
});

function fromToInfo() {
	var curr_location = window.location.href
	if (curr_location.indexOf("shamala") !== -1) {
		console.log("loger c110");

		/*
		window.observer = new MutationObserver(userAuthorisation); // whenever DOM changes PT1
		var config = {
			attributes: true,
			childList: true,
			characterData: true,
			subtree: true
		}; // PT2
		observer.observe(window.document, config); // PT3
*/

		/*
				chrome.storage.local.get(null, function (result) {
				
						//Code to enter from to 
					 
		
					
					var fromStation = document.querySelectorAll("[formcontrolname='origin'] span input")[0]
					var toStation = document.querySelectorAll("[formcontrolname='destination'] span input")[0]
					var journeydate = document.querySelectorAll("[formcontrolname='journeyDate'] span input")[0]
					var journeyQuota = document.querySelectorAll("[formcontrolname='journeyQuota'] div input")[0]
					var journeyQuotaLabel = document.querySelectorAll("[formcontrolname='journeyQuota'] div div span.ui-dropdown-label")[0]
					var flexiDate = document.getElementById("dateSpecific");
		
					if (fromStation && result.origin) {
						fromStation.value = result.origin;
						fromStation.dispatchEvent(new Event('keydown'));
						fromStation.dispatchEvent(new Event('input'));
					}
					if (toStation && result.destination) {
						toStation.value = result.destination;
						toStation.dispatchEvent(new Event('keydown'));
						toStation.dispatchEvent(new Event('input'));
						toStation.click();
					}
					if (journeydate && result.journey_date) {
						var formateJourneyDate = result.journey_date.replace(/-/g, '/');
						journeydate.value = formateJourneyDate;
						journeydate.dispatchEvent(new Event('keydown'));
						journeydate.dispatchEvent(new Event('input'));
					}
					if (journeyQuota && result.quota) {
						// console.log("journeyQuota, result.quota", journeyQuota, result.quota)
						// console.log("journeyQuotaLabel", journeyQuotaLabel)
						// journeyQuota.value = result.quota;
						// journeyQuota.setAttribute('aria-label', result.quota)
						// journeyQuotaLabel.innerHTML = result.quota;
						// journeyQuota.dispatchEvent(new Event('change'));
						// journeyQuota.dispatchEvent(new Event('input'));
					}
	});
	*/
	}
}
window.onload = fromToInfo;