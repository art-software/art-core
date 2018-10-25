export default {

  set(key: string, name: any) {
    name = Object.prototype.toString.call(name).slice(8, -1) === 'Object' ? JSON.stringify(name) : name;
    return window.sessionStorage.setItem(key, name);
  },

  get(key: string) {
    if (key) {
      return window.sessionStorage.getItem(key);
    } else {
      return [];
    }
  },

  removeSession(key: string) {
    if (!key) {
      return window.sessionStorage.clear();
    }
    return window.sessionStorage.removeItem(key);
  }
};
