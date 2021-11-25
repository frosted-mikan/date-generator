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

    $('.season').on('click', function(){
        $('#seasonInputValue').html($(this).html());
    });

    //find button
    $('#findButton').on('click', function(){
        console.log(data);
        let price = $('#priceInputValue').html();
        let season = $('#seasonInputValue').html();
        switch (price){
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
        filteredResults = data.filter((dateDict)=>{
            let seasonCheck =(dateDict["Season"].toLowerCase()).includes(season);
            let priceCheck = (dateDict["Price"]) === (price);
            return seasonCheck && priceCheck;
        });
        console.log("filtered: ", filteredResults);
    });
});