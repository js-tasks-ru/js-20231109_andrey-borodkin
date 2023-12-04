export default class NotificationMessage {

    static currentNotification = null
    
    constructor(
      message = '',
      type = {
        duration: 0,
        type: ''
      }
    ) {

      this.message = message;
      this.duration = type.duration;
      this.type = type.type;    

      this.element = this.createElement(this.createTemplate());
    }


    createTemplate() {
      return (
        `
      <div class="notification ${this.type}" style="--value:${this.duration}ms">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>

      `);
    }

    createElement(template) {
      const element = document.createElement('div');
      element.innerHTML = template;

      return element;
    }

    show(target = document.body) {
      if (NotificationMessage.currentNotification) {
        NotificationMessage.currentNotification.remove();
      }

      target.append(this.element);
      NotificationMessage.currentNotification = this;

      this.timer = setTimeout(() => {
        this.remove();
      }, this.duration); 
    }



    destroy() {
        clearTimeout(this.timer)
      this.remove();

      if (NotificationMessage.currentNotification === this) {
        NotificationMessage.currentNotification = null
      }
    }

    remove() {
      this.element.remove();
    }
}
