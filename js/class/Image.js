images_list = [];

class Image {
    constructor(newImageData) {
        this.id = newImageData.id;
        this.url = newImageData.url;
        this.caption = newImageData.caption;
        this.time = newImageData.time;
        images_list.push(this);
        Image.instances++;
    }


    static getImageList() {
        return images_list;
    }

    static remove(cardId) {
        images_list = images_list.filter((image) => image.id != cardId)
    }

    static numberOfImages() {
        return Image.instances;
    }


}

Image.instances = 0;