declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};