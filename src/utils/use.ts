export default <T>(hoc: (component: T) => void) => (component: T): void => {
  return hoc(component);
};
