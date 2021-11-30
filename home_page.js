let generatedDates = [];

var app = new Vue({
	el: '#app',
	data: {
		displayedEvents: [],
		startDate: new Date(),
		endDate: new Date(),
		types: [7, 15, 11, 6, 10]
	},
	methods: {
		validActivity(activity) {
			if (activity.PictureLinks.length === 0) return false;
			if (activity.Name.toLowerCase().includes("cancelled")) return false;
			let repeat = 0;
			for (let i = 0; i < this.displayedEvents.length; ++i) {
				if (activity.Name.toLowerCase() === this.displayedEvents[i].Name.toLowerCase()) {
					if (repeat === 1) return false;
					else repeat += 1;
				}
			}
			return true;
		},
		handleApiCall(response) {
			console.log("api call response:", response.data)
			// this.genres = [...new Set(this.originalSongs.map((song) => song["primaryGenreName"]))]
			this.displayedEvents = response.data.map((activity) => {
				return {
					"Name": activity.event_title,
					"About": activity.description.split("\r")[0],
					"PictureLinks": activity.image_url,
					"Address": activity.location_name,
					"Price": this.getPrice(activity.cost),
					"Season": "Any",
					"Inside": false
				}
			}).filter(this.validActivity)
		},
		getPrice(cost) {
			if (cost.toLowerCase().includes("free") || cost === "" || typeof cost == 'undefined') {
				return 0
			}
			else return 1
		},
		setDates() {
			this.startDate = new Date()
			this.endDate.setDate(this.startDate.getDate() + 10)
		},
		urlDate(jsDate) {
			console.log(jsDate)
			return `${jsDate.getFullYear()}-${jsDate.getMonth()}-${jsDate.getDate()}`
		},
		urlTypes() {
			return this.types.toString()
		},
		urlRange() {
			return `${this.urlDate(this.startDate)}to${this.urlDate(this.endDate)}`
		},
		url() {
			return `https://events.umich.edu/list/json?filter=types:${this.urlTypes()},&range=${this.urlRange()}&v=2&origin=*`
		},
		search(event) {
			this.setDates()
			axios({
				method: 'get',
				url: this.url(),
				withCredentials: false,
			}).then((response) => {
				this.handleApiCall(response)
			}).then(() => {
				generatedDates.push.apply(generatedDates, this.displayedEvents);
			})
		}
	},
	created: function () {
		this.search();
	}
})

$(document).ready(function () {
	console.log("GENERATED DATES UPDATED", generatedDates);
	//sidebar animations
	$("#sidebar").mCustomScrollbar({
		theme: "minimal"
	});

	$('#dismiss, .overlay').on('click', function () {
		$('#sidebar').removeClass('active');
		$('.overlay').removeClass('active');
	});

	$('#sidebarCollapse').on('click', function () {
		$('#sidebar').addClass('active');
		$('.overlay').addClass('active');
		$('.collapse.in').toggleClass('in');
		$('a[aria-expanded=true]').attr('aria-expanded', 'false');
	});

	//filter selections: price and season
	$('.price').on('click', function () {
		$('#priceInputValue').html($(this).html());
	});

	$('.season').on('click', function () {
		$('#seasonInputValue').html($(this).html());
	});

	//pull happening data


	//find button
	$('#findButton').on('click', function () {
		console.log(data);
		let price = $('#priceInputValue').html();
		let season = $('#seasonInputValue').html();
		switch (price) {
			case "free":
				price = 0;
				break;
			case "$":
				price = 1;
				break;
			case "$$$":
				price = 2;
				break;
			default:
				break;
		}
		console.log(price);
		console.log(season);
		console.log(data[0]["Season"]);
		console.log((data[0]["Season"].toLowerCase()).includes(season));
		console.log("GENERATED DATES", generatedDates)
		generatedDates.push.apply(generatedDates, data.filter((dateDict) => {
			let seasonCheck = (dateDict["Season"].toLowerCase()).includes(season);
			let priceCheck = (dateDict["Price"]) === (price);
			return seasonCheck && priceCheck;
		}));
		console.log("GENERATED DATES", generatedDates)
		console.log("filtered before: ", generatedDates);

		// Set dates in sessionStorage
		sessionStorage.setItem('dates', JSON.stringify(generatedDates));

		// Go to swipe page
		window.location.href = 'swipe.html';
	});
});
