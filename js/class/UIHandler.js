class UIHandler {

    static renderCard(imageData) {

        let decorator = ` <div class="col-md-4">
                            <div class="card mb-4 shadow-sm" data-imgly-card-id="${imageData.id}">
                                <img class="card-img-top"
                                     src="media/${imageData.url}"
                                     alt="Card image cap">
                                <div class="card-body">
                           
                                    <p class="card-text">${imageData.caption}</p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-sm btn-outline-secondary imgly-btn-delete" >Delete</button>
                                            <button type="button" class="btn btn-sm btn-outline-secondary imgly-btn-view">View</button>
                                        <!--</div>-->
                                        <small class="text-muted"></small>
                                    </div>
                                </div>
                            </div>
                        </div>`;

        // Prepend card to cards-list

        $(".cards-list").prepend(decorator);

        $('.imgly-btn-delete').unbind('click');
        $('.imgly-btn-view').unbind('click');


        $(".imgly-btn-delete").on("click", function(){


            let cardId = $(this).closest(".card").attr('data-imgly-card-id');
            console.log(cardId);


            // remove card from UI
            $(`[data-imgly-card-id=${cardId}]`).parent().remove();

            //remove it from Firebase

            FirebaseHandler.deleteImage(cardId);

            //removing from datastructure is inside the funcion above...




        });
        
        $(".imgly-btn-view").on("click", function() {
            
            let imageUrl = $(this).parent().parent().parent().prev().attr('src');

            UIHandler.renderFullImage(imageUrl);

            
        })

        // $("")


    }

    static renderNews(newsData) {

        let decorator = `
            <li>${newsData.body}</li>  
        `;

        $(".news-list").prepend(decorator);



    }

    static validateImageForm(formData) {

        console.log('Validating data');

        let unfilled_list = [];
        for(let key in formData) {

            if(formData[key] == "") {
                unfilled_list.push(key);
            }
        }

        console.log(unfilled_list);


        if(unfilled_list.length > 0) {
            alert(`Please, fill the fields ${unfilled_list.join(', ')} before continuing`)
            return false;
        }


    }

    static renderFullImage(imageUrl) {
        let decorator = `  <div class="full-image-wrapper">
        <img src="${imageUrl}" class="full-image" alt="gallery img">

        <i class="fas fa-times full-image-close"></i>
    </div>
`;
        $("main").prepend(decorator);

        $('.full-image-close').unbind('click');

        $(".full-image-close").on("click", function(){

            console.log('Closing image');

            $(this).parent().remove();

        });

    }






}