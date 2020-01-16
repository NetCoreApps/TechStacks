import { routes } from "~/shared/routes";
import { sanitize, toDate } from "@servicestack/client";

export const log = (o,msg) => { console.log(msg||"",o); return o };

export const prettifyUrl = (url) => {
    url = (url || '').split('://').pop();
    return url && url[url.length-1] === '/' ? url.substring(0, url.length-1) : url;
}

const ignoreWhenFocused = ['INPUT','TEXTAREA','SELECT']
export const inInputField = () => ignoreWhenFocused.indexOf(document.activeElement && document.activeElement.tagName) >= 0;
const browserKeys = [8,33,34,35,36]; // page up/down/home/end/backspace
export const ignoreKeyPress = (e) => {
    return e.shiftKey || e.ctrlKey || browserKeys.indexOf(e.keyCode) >= 0 || inInputField();
}

const PAGE_NAV_INDEX = [
  routes.welcome,
  routes.homeNews,
  routes.homeTop,
  routes.homeStacks,
  routes.homeTech,
  (store) => store.getters.isAuthenticated ? routes.homeFavorites : null,
  (store) => store.getters.isAuthenticated ? routes.user(store.getters.userName) : null,
];

export function globalNavShortcuts(e) {
  if (inInputField()) return;

  if ((e.key === '?' || e.key === 'Escape') && !e.ctrlKey) {
    this.$store.commit('showDialog', this.$store.getters.showDialog !== 'Shortcuts' && e.key !== 'Escape' ? 'Shortcuts' : null);
    return;
  }
  if (ignoreKeyPress(e) || e.altKey)
      return true;
  const c = String.fromCharCode(e.keyCode).toLowerCase();
  if (c === 'h') {
    this.$router.push(this.routes.homeNews);
    return true;
  }

  const pageIndex = parseInt(c);
  if (!isNaN(pageIndex)) {
    const route = PAGE_NAV_INDEX[pageIndex];
    if (route) {
      const path = typeof route == 'function'
        ? route(this.$store)
        : route;
      if (path) {
        this.$router.push(path);
        return true;
      }
    }
  }
  return false;
}

export function getPageIndex(path) {
  if (!path) return null;
  for (let i=0; i<PAGE_NAV_INDEX.length; i++) {
    const route = PAGE_NAV_INDEX[i];
    const navPath = typeof route == 'function'
      ? route(this.$store)
      : route;
    if (!navPath)
      continue;

    if (path === "/" || navPath === "/")
    {
      if (navPath === path)
        return i;
      continue;
    }
    if (path.startsWith(navPath))
      return i;
  }
  return null;
}

export function goNav(modifier) {
  const currentIndex = getPageIndex.call(this, location.pathname);
  if (!isNaN(currentIndex)) {
    const newIndex = currentIndex + modifier;
    const route = PAGE_NAV_INDEX[newIndex];
    const newPath = typeof route == 'function'
      ? route(this.$store)
      : route;
    if (newPath) {
      this.$router.push(newPath);
      return newPath;
    }
  }
  return null;
}

export const slugCounter = 50;
export const slugRules = [
  v => !!v || "Required",
  v => (v && v.length <= slugCounter) || `Max ${slugCounter} characters`,
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
  v => (v && v.length <= titleCounter) || `Max ${titleCounter} characters`
];

export const summaryCounter = 140;
export const summaryRules = [
  v => !!v || "Required",
  v => (v && v.length <= summaryCounter) || `Max ${summaryCounter} characters`
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
export const descriptionRulesOptional = [
  v => !v || v.length <= descriptionCounter || `Max ${descriptionCounter} characters`
];

export const contentCounter = 128000;
export const contentRules = [
  v => !v || v.length >= 25   || 'Min 25 characters',
  v => !v || v.length <= contentCounter || `Max ${contentCounter} characters`
];
export const contentRulesOptional = [
  v => !v || v.length <= contentCounter || `Max ${contentCounter} characters`
];

export const colorRules = [
  v => !!v || 'Required',
  v => v.startsWith('#') && (v.length == 4 || v.length == 7) || 'Invalid Hex Color, e.g. #FFFFFF',
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

export const slugToName = (slug) => slug && (slug[0].toUpperCase() + slug.substring(1)).replace(/-/g,' ');

export const noPrerender = () => window.__PRERENDERED = "NONE";
