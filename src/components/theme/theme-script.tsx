/**
 * Anti-FOUC theme script. Renders a sync <script> in <head> that reads the
 * persisted theme (or falls back to system preference) and applies it to
 * <html data-theme> before React hydrates. ~280B minified.
 */
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(t==null&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.dataset.theme=d?'dark':'light';document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){document.documentElement.dataset.theme='light';}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />;
}
