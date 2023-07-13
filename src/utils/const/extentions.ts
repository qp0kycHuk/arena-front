export const imageExtention: IExtention = {
  type: 'image',
  accept: 'image/*',
  regex: /^image\/(gif|jpe?g|a?png|svg|webp|bmp)/i,
}

export const videoExtention: IExtention = {
  type: 'video',
  accept: 'video/*',
  regex: /^video\//i,
}

export const docExtention: IExtention = {
  type: 'doc',
  accept: 'application/msword, application/pdf, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain',
  regex: /^(application|text)\/(msword|pdf|vnd\.ms-excel|vnd\.ms-powerpoint|plain)/i,
}
