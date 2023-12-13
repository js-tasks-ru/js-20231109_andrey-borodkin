class Tooltip {
  static instance;

  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }
    
    Tooltip.instance = this;
  }
  
  createElement(template) {
    const element = document.createElement("div");
    element.innerHTML = template;
    return element.firstElementChild;
  }
  
  createTemplate() {
    return `
    <div class="tooltip">TEST</div>
    `;
  }
  
  addEventListeners() {
    document.addEventListener('pointerover', this.handleDocumentPointerOver);
    document.addEventListener('pointerout', this.handleDocumentPointerOut);
    document.addEventListener('pointermove', this.handleDocumentPointerMove);
  }

  removeEventListeners() {
    document.removeEventListener('pointerover', this.handleDocumentPointerOver);
    document.removeEventListener('pointerout', this.handleDocumentPointerOut);
    document.removeEventListener('pointermove', this.handleDocumentPointerMove);
  }
  
  initialize () {
    this.addEventListeners();
    this.element = this.createElement(this.createTemplate());
  }
  
  
  render(content) {
    console.log('is rendering');
    this.element.textContent = content;
    document.body.appendChild(this.element);
  }

  handleDocumentPointerOver = (event) => {
    const element = event.target;
    if (element.hasAttribute('data-tooltip')) {
      this.render(element.dataset.tooltip);
    }
       
  }

  handleDocumentPointerOut = (event) => {
    if (event.target.hasAttribute('data-tooltip')) {
      this.remove();
    }
  }

  handleDocumentPointerMove = (event) => {
    this.element.style.left = event.clientX + 10 + "px";
    this.element.style.top = event.clientY + 10 + "px";

  }
  
  remove() {
    this.element.remove();
  }
  destroy() {
    this.removeEventListeners();
    this.remove();
  }

}

export default Tooltip;
