import React from 'react';
import ReactDOM from 'react-dom';
import FolderImage from '../components/FolderImage';

export function renderFolderIcon(parentElement: HTMLElement, ...iconClasses: string[]) {
   const iconWrapper = document.createElement('div');
   iconWrapper.classList.add(...iconClasses);

   ReactDOM.render(<FolderImage/>, iconWrapper);

   parentElement.prepend(iconWrapper);

   return iconWrapper;
}
