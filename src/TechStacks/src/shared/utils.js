import { sanitize } from "@servicestack/client";

export const log = (o,msg) => { console.log(msg||"",o); return o };

export const prettifyUrl = (url) => {
    url = (url || '').split('://').pop();
    return url && url[url.length-1] === '/' ? url.substring(0, url.length-1) : url;
}

export const nameCounter = 50;
export const nameRules = [
  v => !!v || "Required",
  v => (v && v.length <= nameCounter) || `Max ${nameCounter} characters`
];

export const urlCounter = 200;
export const urlRules = [
  v => !!v || "Required",
  v => (v && v.length <= urlCounter) || `Max ${urlCounter} characters`,
  v => (v && v.indexOf('://') >= 0)  || 'Invalid URL'
];

export const descriptionCounter = 740;
export const descriptionRules = [
  v => !!v || 'Required', 
  v => v.length >= 50 || 'Min 50 characters', 
  v => v.length <= 740 || 'Max 740 characters'
];