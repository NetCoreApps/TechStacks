import { sanitize, toDate } from "@servicestack/client";

export const log = (o,msg) => { console.log(msg||"",o); return o };

export const prettifyUrl = (url) => {
    url = (url || '').split('://').pop();
    return url && url[url.length-1] === '/' ? url.substring(0, url.length-1) : url;
}

export const slugCounter = 50;
export const slugRules = [
  v => !!v || "Required",
  v => (v && v.length <= slugCounter) || `Max ${nameCounter} characters`,
  v => (v && /^[a-z0-9\-]+$/.test(v)) || `Only lowercase letters, numbers or hyphens allowed`,
];

export const toSlug = (name) => (name || '').toLowerCase().replace(/[^a-z0-9\-]+/g,'-').replace(/-+/,'-').replace(/^-+|-+$/g, '').substring(0,slugCounter);

export const nameCounter = 50;
export const nameRules = [
  v => !!v || "Required",
  v => (v && v.length <= nameCounter) || `Max ${nameCounter} characters`
];

export const titleCounter = 140;
export const titleRules = [
  v => !!v || "Required",
  v => (v && v.length <= urlCounter) || `Max ${titleCounter} characters`
];

export const summaryCounter = 140;
export const summaryRules = [
  v => !!v || "Required",
  v => (v && v.length <= urlCounter) || `Max ${summaryCounter} characters`
];
export const summaryRulesOptional = [
  v => !v || v.length <= summaryCounter || `Max ${summaryCounter} characters`
];

export const urlCounter = 200;
export const urlRules = [
  v => !!v || "Required",
  v => (v && v.length <= urlCounter) || `Max ${urlCounter} characters`,
  v => (v && v.indexOf('://') >= 0)  || 'Invalid URL'
];
export const urlRulesOptional = [
  v => !v || v.length <= urlCounter || `Max ${urlCounter} characters`, 
  v => !v || v.indexOf('://') >= 0   || 'Invalid URL'
];

export const descriptionCounter = 740;
export const descriptionRules = [
  v => !!v || 'Required', 
  v => v.length >= 50 || 'Min 50 characters', 
  v => v.length <= 740 || 'Max 740 characters'
];

export const contentCounter = 60000;
export const contentRules = [
  v => !v || v.length >= 25   || 'Min 25 characters', 
  v => !v || v.length <= 60000 || 'Max 60,000 characters'
];


const periodFmt = (count,period) => `${count} ${period}${count > 1 ? 's ago' : ' ago'}`;
export const timeDifference = (current, previous) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;
  const elapsed = current - previous;

  if (elapsed < msPerMinute)
    return 'seconds ago';
  else if (elapsed < msPerHour)
    return periodFmt(Math.round(elapsed/msPerMinute), 'minute');
  else if (elapsed < msPerDay)
    return periodFmt(Math.round(elapsed/msPerHour), 'hour');
  else if (elapsed < msPerMonth)
      return periodFmt(Math.round(elapsed/msPerDay), 'day');
  else if (elapsed < msPerYear)
      return periodFmt(Math.round(elapsed/msPerMonth), 'month');

  return periodFmt(Math.round(elapsed/msPerYear), 'year');
}

export const fromNow = (date) => timeDifference(new Date(), new Date(date));
