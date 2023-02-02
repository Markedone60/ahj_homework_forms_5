import Popover from "./popover";

const button = document.querySelector('.btn');
const text = 'I am your popup';
const title = 'popover title';


const popover = new Popover(text, title, button);

button.addEventListener('click', () => {
  if (!document.querySelector('.popover')) {
    popover.show();
  } else {
    popover.hide();
  }
})