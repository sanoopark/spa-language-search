export const localStorage = {
  get: ({key}) => {
    try {
      return JSON.parse(window.localStorage.getItem(key));
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  set: ({key, value}) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  },
  remove: ({key}) => {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      console.error(e);
    }
  },
};
