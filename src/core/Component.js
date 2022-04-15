export default class Component {
  children = [];

  constructor(target, props) {
    this.target = target;
    this.state = props;
    this.render();
    this.setEvent();
    this.mounted();
  }

  render() {}
  setEvent() {}
  mounted() {}

  addEvent({eventType, selector, callback}) {
    const element = this.target.querySelector(selector);
    const isTarget = target => target.closest(selector);

    element.addEventListener(eventType, event => {
      if (!isTarget(event.target)) return;
      callback.call(this, event);
    });
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    };

    this.render();
    this.setEvent();
    this.updated();
  }

  updated() {}

  debounce(callback, delay = 500) {
    let timeoutID;
    return (...args) => {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        callback.apply(this, args);
      }, delay);
    };
  }
}
