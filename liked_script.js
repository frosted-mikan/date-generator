Vue.config.devtools = true

var resultView = new Vue({
  el: '#app',
data:{
		generatedDates: [],
    /* Mock generated dates REPLACE*********************************/
    likedDates: [
      {
        "ID": 0,
       "Name": "Walk in the Arb",
       "About": "As for more relaxed things to do in Ann Arbor for couples, nothing can beat Nichols Arboretum. These grounds are very secluded and quiet – just the thing for couples that want to enjoy each other and not the crowds of strangers. The scenery changes all the time: new plans, new flowers and trees. You will love this setting and maybe it will become your usual place.",
       "PictureLinks": "https://upload.wikimedia.org/wikipedia/commons/e/e3/NicholsArb.JPG",
       "Address": "899 Nichols Dr, Ann Arbor, MI 48109",
       "Price": 0,
       "Season": "Summer, Spring, Fall",
       "Inside": false
     },
     {
       "ID": 1,
       "Name": "Basketball at the CCRB",
       "About": "X",
       "PictureLinks": "https://recsports.umich.edu/wp-content/uploads/CCRB_Gym-Courts-2.jpg",
       "Address": "401 Washtenaw Ave, Ann Arbor, MI 48109",
       "Price": 0,
       "Season": "Any, Summer, Fall, Winter, Spring",
       "Inside": true
     },
     {
       "ID": 2,
       "Name": "Pick apples or run the corn maze at Dexter's Cider Mill",
       "About": "X",
       "PictureLinks": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dextercidermill.com%2F&psig=AOvVaw0KYhOF17IpmHvonmoXBSNf&ust=1637181629416000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJiq_ILfnfQCFQAAAAAdAAAAABAD",
       "Address": "3685 Central St, Dexter, MI 48130",
       "Price": 1,
       "Season": "Fall",
       "Inside": false
     }
   ],
   infoStatus: false,
   infoIndex: 0
},
methods:{
  displayInfo: function(index) {
    console.log("CLICKED LIKED");
    this.infoStatus = !this.infoStatus;
    this.infoIndex = index;
  },
  deleteDate: function(index) {
    this.likedDates.splice(index, 1);
    console.log(this.likedDates);
  }

},
computed: {
  computedInfo: function () {
      if (this.infoStatus) {
        console.log("RETURNED Flex");
        return "flex";
      } else {
        console.log("RETURNED None");
      return "none";
      }
    },
  computedInside: function() {
    if(this.likedDates[this.infoIndex].Inside) {
      return "Inside";
    } else {
      return "Outside";
    }
  },
  computedPrice: function() {
    if(!this.likedDates[this.infoIndex].Price == 0) {
      return "Free";
    } else {
      return "$";
    }
  }
}
})

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
});
