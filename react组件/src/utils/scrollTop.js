
export function getScrollTop() {
  if (!window || !document) return 0;
  if (typeof window.pageYOffset !== 'undefined') {
    return window.pageYOffset;
  } else if (typeof document.compatMode !== 'undefined' && document.compatMode !== 'BackCompat') {
    return document.documentElement.scrollTop;
  } else if (typeof document.body !== 'undefined') {
    return document.body.scrollTop;
  }
}
