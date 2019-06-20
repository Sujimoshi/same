export default class Registry<T> {
  constructor(public services: { [key: string]: T } = {}) {}

  register<E extends T>(name: string, service: E) {
    this.services[name] = service;
    return this;
  }

  get(name: string) {
    const res = this.services[name];
    if (!res) throw new Error(`No services registered with name ${name}`);
    return res;
  }
}
