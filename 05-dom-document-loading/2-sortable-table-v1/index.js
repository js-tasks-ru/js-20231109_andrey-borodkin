export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createElement(this.createTemplate());

    this.subElements = {
      body: this.element.querySelector('[data-element="body"]')
    };
  }

  createElement(template) {
    const element = document.createElement("div");
    element.innerHTML = template;
    return element.firstElementChild;
  }

  createTemplate() {
    return `
      <div class="sortable-table">
        <div data-element="header" class="sortable-table__header sortable-table__row">
          ${this.createHeaderTemplate()}
        </div>
        <div data-element="body" class="sortable-table__body">
          ${this.createBodyTemplate()}
        </div>
      </div>`;
  }

  createHeaderTemplate() {
    return this.headerConfig.map((column) => {
      return `
        <div class="sortable-table__cell" 
          data-id="${column.id}" 
          data-sortable="${column.sortable}" 
          data-order="${this.fieldValue === column.id ? this.orderValue : ''}"
        >
          <span>${column.title}</span>
        </div>
      `;
    }).join(' ');
  }

  createBodyRowCellsTemplate(item) {
    return this.headerConfig.map((config) => {
      const fieldName = config.id;
      const fieldValue = item[fieldName];

      if (config.template) {
        return config.template(fieldValue);
      }

      return `
        <div class="sortable-table__cell">${fieldValue}</div>
      `;
    }).join();
  }

  createBodyRowTemplate(item) {
    return `
      <a href="/products/${item.id}" class="sortable-table__row">
        ${this.createBodyRowCellsTemplate(item)}
      </a>`;
  }

  createBodyTemplate() {
    return this.data.map((item) => 
      this.createBodyRowTemplate(item)
    ).join('');
  }

  sort(fieldValue, orderValue) {
    const LOCALE = ['ru', 'en'];
    const OPTIONS = { caseFirst: 'upper' };

    const sortAscString = (a, b) => a.title.localeCompare(b.title, LOCALE, OPTIONS);
    const sortDescString = (a, b) => b.title.localeCompare(a.title, LOCALE, OPTIONS);
    const sortAscNumber = (a, b) => b[fieldValue] < a[fieldValue] ? 1 : -1;
    const sortDescNumber = (a, b) => b[fieldValue] < a[fieldValue] ? -1 : 1;

    const { sortType } = this.headerConfig.find(config => config.id === fieldValue);

    if (sortType === 'string') {
      this.data.sort(orderValue === 'asc' ? sortAscString : sortDescString);
    }

    if (sortType === 'number') {
      this.data.sort(orderValue === 'asc' ? sortAscNumber : sortDescNumber);
    }

    this.update();
  }

  update() {
    this.subElements.body.innerHTML = this.createBodyTemplate();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}