export function class_names(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}