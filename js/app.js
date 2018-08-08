$(function () {

    /*#############################################################|
    |                        FIREBASE CONFIG
    *##############################################################*/

    frbDb = FirebaseHandler.initialize();


    /*#############################################################|
    |                        LOADING NEW IMAGES
    *##############################################################*/


    //Load once when app is initialized
    FirebaseHandler.loadImages('once');


    /*#############################################################|
    |                        INSERTING NEW IMAGES
    *##############################################################*/

    $("#imgly-form").on("submit", function (e) {

        e.preventDefault();

        const newImageData = {
            url: $("#imgly-url").val(),
            caption: $("#imgly-caption").val(),
            time: Date.now()
        };

        console.log(newImageData);


        /* Validate form data =========================================== */

        UIHandler.validateImageForm(newImageData);


        /* UX =========================================== */

        $("#imgly-url").val("");
        $("#imgly-caption").val("");
        $("#imgly-url").focus();

        /* SAVING TO FIREBASE =========================================== */

        //the data structure will be create on firebase child_added event

        FirebaseHandler.createImage(newImageData);


    });


    /*#############################################################|
    |          >>>>              BONUS PART        <<<<<
    *##############################################################*/


    /* DELETING IMAGES =========================================== */

    $(".card").on("click", function () {

        let cardID = $(this).closest('.card');

    });
    
    /* LOADING LATEST NEWS =========================================== */

    FirebaseHandler.loadNews();

    /* Visitar tracking =========================================== */

    // try to get cookie
    if(localStorage.getItem('visitor_count') !== undefined){

        //if gets it, add +1 and save
        let lastCount = localStorage.getItem('visitor_count');
        lastCount++;
        localStorage.setItem('visitor_count', lastCount)



    } else {
        localStorage.setItem('visitor_count', 1);
    }




});