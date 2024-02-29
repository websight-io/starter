import Splide from '@splidejs/splide';

export class ImageCarousel {
    static readonly componentSelector = '.image-carousel';
    static readonly mainCarouselClass = '.main-carousel';
    static readonly thumbnailCarouselClass = '.thumbnail-carousel';

    readonly instanceOfMainCarousel: Splide;
    readonly instanceOfThumbnailCarousel: Splide;
    
    constructor() {        
        const mainCaruselConfig = {
            type      : 'fade',
            rewind    : true,
            pagination: false,
            arrows    : false,
        };

        const thumnailsCaruselConfig = {
            fixedWidth  : 80,
            fixedHeight : 80,
            gap         : 10,
            rewind      : true,
            pagination  : false,
            isNavigation: true,
            arrows      : false,
        };

        this.instanceOfMainCarousel = new Splide(ImageCarousel.mainCarouselClass, mainCaruselConfig);
        this.instanceOfThumbnailCarousel = new Splide(ImageCarousel.thumbnailCarouselClass, thumnailsCaruselConfig);

        this.instanceOfMainCarousel.sync(this.instanceOfThumbnailCarousel);
        this.instanceOfMainCarousel.mount();
        this.instanceOfThumbnailCarousel.mount();
    }
}
