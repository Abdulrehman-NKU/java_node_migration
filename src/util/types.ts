export type Property_To_String<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: string;
};
