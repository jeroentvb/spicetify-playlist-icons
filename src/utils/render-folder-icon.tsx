import FolderImage from '../components/FolderImage';

export function renderFolderIcon(parentElement: HTMLElement, ...iconClasses: string[]) {
   const iconWrapper = document.createElement('div');
   iconWrapper.classList.add(...iconClasses);

   iconWrapper.appendChild(FolderImage());

   parentElement.prepend(iconWrapper);

   return iconWrapper;
}
