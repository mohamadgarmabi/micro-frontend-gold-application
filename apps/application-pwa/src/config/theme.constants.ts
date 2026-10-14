const THEME_STORAGE_KEY = "aurum:theme"
const DEFAULT_THEME_PREFERENCE = "dark" as const

const THEME_META_COLORS = {
  light: "#f4f5f4",
  dark: "#141514",
} as const

const THEME_INIT_SCRIPT = `(function(){try{var k='${THEME_STORAGE_KEY}';var s=localStorage.getItem(k);var t;if(s==='light'||s==='dark'){t=s;}else if(s==='system'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}else{t='${DEFAULT_THEME_PREFERENCE}';}var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(t);r.setAttribute('data-theme',t);r.style.colorScheme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',t==='dark'?'${THEME_META_COLORS.dark}':'${THEME_META_COLORS.light}');}catch(e){}})();`

export { DEFAULT_THEME_PREFERENCE, THEME_INIT_SCRIPT, THEME_META_COLORS, THEME_STORAGE_KEY }
