export default function createPlaylistIconElement(src: string, className: string): HTMLImageElement | HTMLDivElement {
   const img = document.createElement(src ? 'img' : 'div');
   img.classList.add(className);

   if (src) {
      img.setAttribute('src', src);
   } else {
      img.classList.add('no-icon');
   }

   return img;
}
