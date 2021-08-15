
export function isSreachIndexOF(oldstr, kw) {
  if (!oldstr || !kw) return false;
  return oldstr.toLowerCase().indexOf(kw.toLowerCase()) > -1;
}
