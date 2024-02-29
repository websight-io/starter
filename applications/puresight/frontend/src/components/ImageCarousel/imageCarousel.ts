import { ImageCarousel } from './ImageCarousel.class';

document.addEventListener(
    'DOMContentLoaded',
    () => {        
        const elements = document
        .querySelectorAll<HTMLDivElement>(`${ImageCarousel.componentSelector}:not(.is-edit-mode)`);
        Array.from(elements).forEach(() => {
            new ImageCarousel();
        });
    }
);
