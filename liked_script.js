Vue.config.devtools = true

var resultView = new Vue({
  el: '#app',
data:{
		generatedDates: [],
    /* Mock generated dates REPLACE*********************************/
    likedDates: [],
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
  },
  isEmpty: function() {
    if (!this.likedDates.length) {
      console.log("ISEMPTY RETURNS True");
      return true;
    } else {
      console.log("ISEMPTY RETURNS False");
      return false;
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
