export default class Registry<T> {
  constructor(public services: { [key: string]: T } = {}) {}

  register(name: string, service: any) {
    this.services[name] = service;
    return this;
  }

  get(name: string) {
    const res = this.services[name];
    if (!res) throw new Error(`No services registered with name ${name}`);
    return res;
  }
}
