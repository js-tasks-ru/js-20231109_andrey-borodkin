// import { template } from "@babel/core";

export default class SortableTable {
  subElements = {};
  fieldValue
  orderValue

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createElement(this.createTemplate());

  }

  createElement(template) {
    const element = document.createElement("div");
    
    element.innerHTML = template;

    return element.firstElementChild;
  }


  createSortedIconTemplate(id) {
    if (this.fieldValue === 'id') {
      return (`
               <span data-element="arrow" class="sortable-table__sort-arrow">
                 <span class="sort-arrow"></span>
               </span>
      `);
    }
    return '';
  }

  createHeaderTemplate() {
    return this.headerConfig.map((column) => {
      return (`
              <div class="sortable-table__cell" data-id="${column.id}" data-sortable="${column.sortable}"  data-order="${this.fieldValue === column.id ? this.orderValue : ''}">
                <span>${column.title}</span>
                ${this.createSortedIconTemplate(column.id)}
              </div>
      `);
    }).join(' ');

  }

  createBodyTemplate() {
    
    return this.data.map((item, index) => {
      
      return (`
                <a href="/products/${item.id}" class="sortable-table__row">
                  ${this.headerConfig[0].template(this.data[index])}
                  <div class="sortable-table__cell">${item.title}</div>
                  <div class="sortable-table__cell">${item.quantity}</div>
                  <div class="sortable-table__cell">${item.price}</div>
                  <div class="sortable-table__cell">${item.sales}</div>
                </a>
      `);
    }).join(' ');
  }

  createTemplate() {

    return `<div class="sortable-table">
              <div data-element="header" class="sortable-table__header sortable-table__row">
                ${this.createHeaderTemplate()}
              </div>
              <div data-element="body" class="sortable-table__body">
                ${this.createBodyTemplate()}
              </div>
            </div>`;
  }


  sort(fieldValue, orderValue) {
    
    this.fieldValue = fieldValue;
    this.orderValue = orderValue;

    const LOCALE = ['ru', 'en'];
    const OPTIONS = {caseFirst: 'upper'};

    const sortAscString = (a, b) => a.title.localeCompare(b.title, LOCALE, OPTIONS);
    const sortDescString = (a, b) => b.title.localeCompare(a.title, LOCALE, OPTIONS);
    
    const sortAscNumber = (a, b) => b[fieldValue] < a[fieldValue] ? 1 : -1;
    const sortDescNumber = (a, b) => b[fieldValue] < a[fieldValue] ? -1 : 1;



    if (fieldValue === 'title') {
      this.data.sort(orderValue === 'asc' ? sortAscString : sortDescString);
    } else {
      this.data.sort(orderValue === 'asc' ? sortAscNumber : sortDescNumber);
    }
    

    this.update();
  }

  update() {
    this.element.querySelector('[data-element="body"]').innerHTML = this.createBodyTemplate();
  }

  destroy() {
    this.element.remove();
  }

}
