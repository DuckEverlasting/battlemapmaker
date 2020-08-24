export function modKey(e: KeyboardEvent) {
  return navigator.appVersion.indexOf("Mac") !== -1
    ? !!e.metaKey
    : !!e.ctrlKey;
}