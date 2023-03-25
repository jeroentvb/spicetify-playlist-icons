export default function createPlaylistIconElement(src: string): HTMLImageElement | HTMLDivElement {
   const img = document.createElement(src ? 'img' : 'div');
   img.classList.add('playlist-item__img');

   if (src) {
      img.setAttribute('src', src);
   } else {
      img.classList.add('no-icon');
   }

   return img;
}
