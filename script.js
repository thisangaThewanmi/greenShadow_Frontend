/*$('#dashboard-nav').css({display:'none'});*/
$('#staff').css({display:'none'});
$('#equipment').css({display:'none'});
$('#vehicle').css({display:'none'});
$('#crop').css({display:'none'});
$('#field').css({display:'none'});
/*$('#signup').css({display:'block'});*/



/*$('#staff').css({display:'none'});*/

$('#staff-link').on('click',()=>{
    console.log("satff click")

    $('#staff').css({display:'block'});
    $('#vehicle').css({display:'none'});
    $('#equipment').css({display:'none'});
    $('#crop').css({display:'none'});
    $('#field').css({display:'none'});


});

//course click
$('#vehicle-link').on('click',()=>{
    console.log("vehicle click")

    $('#vehicle').css({display:'block'});
    $('#staff').css({display:'none'});
    $('#equipment').css({display:'none'});
    $('#crop').css({display:'none'});
    $('#field').css({display:'none'});


});

$('#equipment-link').on('click',()=>{
    console.log("equipment click")

    $('#equipment').css({display:'block'});
    $('#staff').css({display:'none'});
    $('#vehicle').css({display:'none'});
    $('#crop').css({display:'none'});
    $('#field').css({display:'none'});

});


$('#crop-link').on('click',()=>{
    console.log("equipment click")

    $('#equipment').css({display:'none'});
    $('#staff').css({display:'none'});
    $('#vehicle').css({display:'none'});
    $('#crop').css({display:'block'});
    $('#field').css({display:'none'});


});

$('#field-link').on('click',()=>{
    console.log("equipment click")

    $('#equipment').css({display:'none'});
    $('#staff').css({display:'none'});
    $('#vehicle').css({display:'none'});
    $('#crop').css({display:'none'});
    $('#field').css({display:'block'});


});



/*---- updateing the time ---*/
function updateTime() {
    console.log("update time")
    const timeElement = document.getElementById('current-time');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// Update the time every second
setInterval(updateTime, 1000);

// Set the initial time
updateTime();


/*-=================*/