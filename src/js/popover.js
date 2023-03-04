export default class Popover {
  constructor(text, title, element) {
    this.text = text;
    this.title = title;
    this.element = element;
    this.popover;
  }

  initialize() {
    this.popover = document.createElement('div');
    this.popover.className = 'popover hide';
    this.popover.innerHTML = `<p class='popover-title'>${this.title}</p><p class='popover-text'>${this.text}</p>`;
    this.element.insertAdjacentElement('afterend', this.popover);

  }

  hide() {
    this.element.nextElementSibling.remove();
  }

  show() {
    this.initialize();
    this.popover.classList.remove('hide');
    this.popover.style.bottom = `${this.element.offsetTop + 50}px`;
    this.popover.style.left = `${this.element.offsetLeft - ((this.popover.offsetWidth - this.element.offsetWidth) / 2)}px`;
  }
}