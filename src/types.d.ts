
type ExtentionType = 'image' | 'doc' | 'video'

interface IExtention {
    type: ExtentionType
    accept: string
    regex: RegExp
}

interface IServerError {
    message: string
}

declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};