let generatedDates = [];

var app = new Vue({
	el: '#app',
	data: {
		pulledEvents: [],
		startDate: new Date(),
		endDate: new Date(),
		types: [7, 15, 11, 6, 10]
	},
	methods: {
		validActivity(activity, index, array) {
			if (activity.PictureLinks.length === 0) return false;
			if (activity.Name.toLowerCase().includes("cancelled")) return false;
			for (let i = 0; i < index - 1; ++i) {
				if (activity.Name.toLowerCase() === array[i].Name.toLowerCase()) {
					return false;
				}
			}
			return true;
		},
		handleApiCall(response) {
			// console.log("api call response:", response.data)
			this.pulledEvents = response.data.map((activity) => {
				return {
					"Name": this.getName(activity),
					"About": this.getAbout(activity),
					"PictureLinks": this.getPictureLinks(activity),
					"Address": this.getAddress(activity),
					"Price": this.getPrice(activity),
					"Season": this.getSeason(activity),
					"Inside": this.getSeason(activity)
				}
			}).filter(this.validActivity)
		},
		getName(activity) {
			if (!activity.event_title) return "A fun event!"
			return activity.event_title
		},
		getAbout(activity) {
			if (!activity.description) return "Try this one with friends!"
			return activity.description
		},
		getPictureLinks(activity) {
			if (!activity.image_url) return "./datesite_icon_nobkgrd.png"
			return activity.image_url
		},
		getAddress(activity) {
			if (!activity.location_name) return "Virtual"
			return activity.location_name
		},
		getPrice(activity) {
			if (!activity.cost) return 0
			let cost = activity.cost
			if (cost.toLowerCase().includes("free") || cost === "" || typeof cost == 'undefined') {
				return 0
			}
			else return 1
		},
		getSeason(activity) {
			return "any";
		},
		getInside(activity) {
			return true;
		},
		setDates() {
			this.startDate = new Date()
			this.endDate.setDate(this.startDate.getDate() + 1)
			// console.log(this.startDate)
			// console.log(this.endDate)
		},
		urlDate(jsDate) {
			// console.log(jsDate)
			return `${jsDate.getFullYear()}-${jsDate.getMonth() + 1}-${jsDate.getDate()}`
		},
		urlTypes() {
			return this.types.toString()
		},
		urlRange() {
			// console.log("THIS IS THE URLDATE:", this.urlDate(this.startDate), this.urlDate(this.endDate));
			return `${this.urlDate(this.startDate)}to${this.urlDate(this.endDate)}`
		},
		url() {
			return `https://events.umich.edu/list/json?filter=types:${this.urlTypes()},&range=${this.urlRange()}&v=2&origin=*`
		},
		search() {
			this.setDates()
			axios({
				method: 'get',
				url: this.url(),
				withCredentials: false,
			}).then((response) => {
				this.handleApiCall(response)
			}).then(() => {
				generatedDates.push.apply(generatedDates, this.pulledEvents);
			})
		}
	}
})

generatedDates = data;
app.search();

$(document).ready(function () {
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

	//find button
	$('#findButton').on('click', function () {
		// console.log(data);
		let price = $('#priceInputValue').html();
		let season = $('#seasonInputValue').html();
		if(season.includes("season")){
			season = "any";
		}		
		if(price.includes("price")){
			price = "any";
		}
		switch (price) {
			case "free":
				// console.log("0")
				price = 0;
				break;
			case "$":
				// console.log("1")
				price = 1;
				break;
			case "$$$":
				// console.log("2")
				price = 2;
				break;
			default:
				break;
		}

		let filteredDates = generatedDates.filter((dateDict) => {
            /* Season logic: include date if... 
               - date season includes the selected season, 
               - selected season is "any", 
               - OR date season is "any" */ 
			let seasonCheck = ((dateDict["Season"].toLowerCase()).includes(season) 
                                || season === "any" 
                                || dateDict["Season"].toLowerCase() === "any");
			let priceCheck = ((dateDict["Price"]) === (price) || price == "any");
			return seasonCheck && priceCheck;
		});

		// Set dates in sessionStorage
		sessionStorage.setItem('dates', JSON.stringify(filteredDates));

		// Go to swipe page
		window.location.href = 'swipe.html';
	});
});
