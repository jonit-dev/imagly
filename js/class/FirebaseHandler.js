class FirebaseHandler {

    static initialize() {

        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyAUyIO9c6RAf5QuJCoV5xTEoS9rx7f8jwQ",
            authDomain: "final-exam-wmdd-js.firebaseapp.com",
            databaseURL: "https://final-exam-wmdd-js.firebaseio.com",
            projectId: "final-exam-wmdd-js",
            storageBucket: "final-exam-wmdd-js.appspot.com",
            messagingSenderId: "414999390063"
        };
        firebase.initializeApp(config);

        return firebase.database();
    }

    static createImage(ImageData) {

        console.log(`Saving into database....`);
        console.log(ImageData);

        let insertedCard = frbDb.ref('images/').push(ImageData);

        console.log(insertedCard.key);

    }

    static deleteImage(cardId) {

        frbDb.ref(`images/${cardId}`).remove().then(function (response) {

            console.log('Your item was deleted on firebase... Removing it from data structure');


            //then remove it from data structure
            Image.remove(cardId);

            console.log(images_list);


        }, function (error) {
            console.log('Error while trying to delete item');
            console.log(error);
        })


    }

    static loadImages(type) {

        // This script is responsible for loading all data when user starts the app and when some image is added on firebase.

        $(".cards-list").innerHTML = ""; //refresh container html
        images_list = [];


        frbDb.ref('images/').on('child_added', function (snapshot) {


            let loadedImage = snapshot.val();

            let loadedImageData = {
                id: snapshot.key,
                url: loadedImage.url,
                caption: loadedImage.caption,
                time: loadedImage.time
            };

            // Create data structure

            let newImage = new Image(loadedImageData);

            // console.log(loadedImageData);


            // Render it!

            UIHandler.renderCard(loadedImageData);


        }, function (error) {
            console.log('An error happened while trying to read your data.');
            console.log(error.code);
        });

    }

    static loadNews() {

        frbDb.ref(`news/`).once('value').then(function (snapshot) {

            snapshot.forEach((data) => {

                UIHandler.renderNews({
                    body: data.val().body
                })

            })


        }, function (error) {
            console.log('An error happened while trying to read your data.');
            console.log(error.code);
        });


    }


}