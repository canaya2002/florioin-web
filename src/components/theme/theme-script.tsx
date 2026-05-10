/**
 * Light-only mode. The brand is light-first and white everywhere — dark
 * mode has been removed. Any previously-stored "dark" preference is wiped
 * on load so returning visitors never get stranded in dark.
 */
const THEME_SCRIPT = `(function(){try{localStorage.setItem('theme','light');}catch(e){}document.documentElement.dataset.theme='light';document.documentElement.style.colorScheme='light';})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />;
}
